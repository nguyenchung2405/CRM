import { Input, Popconfirm, Select, Table, Typography, Form, Tooltip, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { FcPlus } from 'react-icons/fc';
import { MdDelete, MdOutlineModeEditOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_PRODUCT_SPECIAL, DELETE_PRODUCT_SPECIAL, GET_CUSTOMER_TYPE_LIST, GET_PRODUCT_LIST, GET_PRODUCT_SPECIAL } from '../../../title/title';
import {v4 as uuidv4} from "uuid";
import { addProductSpecial, removeProductSpecial } from '../../../redux/features/productSlice';

function convertData (data){
    return data.map(product => {
        return {
            key: product.id,
            product_ID: product.product_ID.id,
            product_name: product.product_ID.name,
            client_type_ID: product.client_type_ID.id,
            client_type_name: product.client_type_ID.name,
            discounted_price: product.discounted_price * 1000000
        }
    })
}

export default function SpecialProductTable() {

    const {Column} = Table;
    const {Option} = Select;
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const [productID, setProductID] = useState();
    const [clientTypeID, setClientTypeID] = useState();
    const [isCreate, setIsCreate] = useState(false);
    const {productSpecialList, totalProductSpecialList, productListFull} = useSelector(state => state.productReducer);
    const {customerTypeList} = useSelector(state => state.customerReducer)
    const { messageAlert } = useSelector(state => state.messageReducer);
    // Edit Table
    const [form] = Form.useForm();
    const [data, setData] = useState();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;

    useEffect(()=>{
        dispatch({
            type: GET_PRODUCT_SPECIAL,
            data: {page, page_size: pageNumber}
        })
        dispatch({
            type: GET_PRODUCT_LIST,
            data: { page: 1, pageSize: 500 }
        });
        dispatch({
            type: GET_CUSTOMER_TYPE_LIST,
            data: { page: 1, page_size: 500, name: "", sort_by: "id", asc_order: false,}
        })
    }, [])

    useEffect(()=>{
        setData(convertData(productSpecialList))
    }, [productSpecialList])

    useEffect(() => {
        let { type, msg } = messageAlert;
        if (type === "thành công") {
            message.success(msg)
        } else if (type === "thất bại") {
            message.error(msg)
        }
    }, [messageAlert])
    
    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = () => {
            if (inputType === "client_type_name") {
                return <Select
                    showSearch
                    filterOption={(input, option) =>
                        (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    value={clientTypeID}
                    onChange={(value) => {
                        setClientTypeID(value)
                    }}
                >
                    {renderOptionClientType()}
                </Select>
            } else if(inputType === "product_name"){
                return <Select
                    showSearch
                    filterOption={(input, option) =>
                        (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    value={productID}
                    onChange={(value) => {
                        setProductID(value)
                    }}
                >
                    {renderOptionProduct()}
                </Select>
            } else {
                return <Input />
            }
        };
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode()}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        if(isCreate && (editingKey && editingKey !== "")){
            dispatch(removeProductSpecial(editingKey))
        }
        setEditingKey('');
        setIsCreate(false)
    };

    const save = async (key) => {
        try {
            const product = productListFull.find(product => product.id === productID);
            const customerType = customerTypeList.find(client => client.id === clientTypeID);
            const newProduct = form.getFieldsValue();
            newProduct.id = editingKey;
            newProduct.product_ID = productID;
            newProduct.client_type_ID = clientTypeID;
            newProduct.product_name = product.name;
            newProduct.client_type_name = customerType.name;
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                if(isCreate){
                    dispatch({
                        type: CREATE_PRODUCT_SPECIAL,
                        data: newProduct
                    })
                }
                setData(newData);
                setEditingKey('');
                setIsCreate(false);
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            editable: true,
            title: "Sản phẩm",
            width: "30%",
            dataIndex: "product_name",
            className: "product__name",
            width: "30%"
        },
        {
            editable: true,
            title: "Loại khách hàng",
            width: "30%",
            dataIndex: "client_type_name",
            width: "30%"
        },
        {
            editable: true,
            title: "Giá",
            width: "30%",
            dataIndex: "discounted_price",
            width: "30%",
            render: (_, record)=>{
                return new Intl.NumberFormat("vi-VN").format(record.discounted_price) + " VNĐ"
            }
        },
        {
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Lưu
                        </Typography.Link>
                        <Popconfirm title="Có chắc muốn hủy?" onConfirm={cancel} okText="Có" cancelText="Không" >
                            <a>Hủy</a>
                        </Popconfirm>
                    </span>
                ) : (
                        <span>
                            <Tooltip title="Chỉnh sửa" color="green" >
                                <Typography.Link style={{ display: "inline-block" }} disabled={editingKey !== ''} onClick={() => edit(record)}>
                                    <MdOutlineModeEditOutline className="style__svg" />
                                </Typography.Link>
                            </Tooltip>
                            <Tooltip title="Xóa" color="red">
                                <Popconfirm title="Có chắc muốn xóa?"
                                    onConfirm={() => {
                                        dispatch({
                                            type: DELETE_PRODUCT_SPECIAL,
                                            data: record.key
                                        })
                                    }}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <MdDelete className="style__svg" style={{ backgroundColor: "#F1416C" }} />
                                </Popconfirm>
                            </Tooltip>
                        </span>
                );
            },
        }
    ]

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const renderOptionProduct = ()=>{
        return productListFull.map(product => {
            return <Option value={product.id}>{product.name}</Option>
        })
    };

    const renderOptionClientType = ()=>{
        return customerTypeList.map(customer => {
            return <Option value={customer.id}>{customer.name}</Option>
        })
    }

    const createProduct = () => {
        let newProductSpecial = {
            "product_ID": {
                "name": "",
                "id": 2
              },
              "client_type_ID": {
                "name": "Default",
                "id": 1
              },
              "discounted_price": 25,
              "id": uuidv4()
        };
        form.resetFields();
        if(!isCreate && editingKey === ""){
            dispatch(addProductSpecial(newProductSpecial))
            setEditingKey(newProductSpecial.id)
            setIsCreate(true)
        }
        
    }

  return (
    <div className="customer__table content product__table">
            <div className="table__features">
                <div className="table__features__add">
                    <h1>Quản lý sản phẩm đặc biệt</h1>
                    <Tooltip title="Tạo" color="green" >
                        <FcPlus onClick={createProduct} />
                    </Tooltip>
                </div>
                <div className="table__features__search">
                    <input placeholder="Tên sản phẩm" type="text"
                        name="name"
                    // onChange={handleSearchInput} 
                    />
                    <input placeholder="Kênh sản phẩm" type="text"
                        name="tax_number"
                    // onChange={handleSearchInput} 
                    />
                    <input placeholder="Nhóm sản phẩm" type="text"
                        name="brief_name"
                    // onChange={handleSearchInput} 
                    />
                    <input placeholder="Loại sản phẩm" type="text" style={{ marginLeft: "37px" }}
                        name="brief_name"
                    // onChange={handleSearchInput} 
                    />
                    <input placeholder="Thuộc tính sản phẩm" type="text" style={{ marginLeft: "37px" }}
                        name="brief_name"
                    // onChange={handleSearchInput} 
                    />
                    <div className="table__features__search__btn">
                        <button onClick={() => {
                            // if (search?.name === "" && search?.tax_number === "" && search?.brief_name === "") {
                            //     message.warning("Dữ liệu tìm kiếm không thể để trống", 1)
                            // } else {
                            //     dispatch({
                            //         type: SEARCH_CUSTOMER,
                            //         searchData: search
                            //     })
                            // }
                        }}>Tìm kiếm</button>
                    </div>
                </div>
            </div>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        position: ["bottomLeft"],
                        defaultPageSize: 10,
                        locale: { items_per_page: "" },
                        defaultCurrent: 1,
                        showSizeChanger: true,
                        total: totalProductSpecialList,
                        pageSizeOptions: [10, 50, 100],
                        onChange: (page, pageNumber) => {
                            setPageNumber(pageNumber);
                            setPage(page);
                            setEditingKey("")
                        },
                        showTotal: (total) => {
                            if (pageNumber * page < total) {
                                return `Hiển thị ${pageNumber * page} trong ${total}`;
                            }
                            return `Hiển thị ${total} trong ${total}`;
                        },
                    }}
                />
            </Form>
        </div>
  )
}
