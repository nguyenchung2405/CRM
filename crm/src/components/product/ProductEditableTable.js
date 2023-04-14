import React, { useEffect, useState } from 'react'
import { Form, Input, message, Popconfirm, Select, Table, Typography } from 'antd';
import { FcPlus } from "react-icons/fc"
import { useDispatch, useSelector } from "react-redux"
import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT_ATTRIBUTE, GET_PRODUCT_CHANNEL, GET_PRODUCT_LIST, GET_PRODUCT_LOCATION, GET_PRODUCT_TYPE, SEARCH_CUSTOMER } from '../../title/title';
import Loading from "../../components/Loading"
import { setIsLoading } from '../../redux/features/loadingSlice';
import { useNavigate } from 'react-router-dom';
import { setMessage } from '../../redux/features/messageSlice';
import { checkMicroFe } from '../../untils/helper';
import { MdDelete, MdOutlineModeEditOutline } from 'react-icons/md';
import { v4 as uuidv4 } from "uuid";
import { addProduct, removeProduct } from '../../redux/features/productSlice';

const convertData = (productList) => {
    return productList.map(product => {
        return {
            key: product.id,
            product_id: product.id,
            product_name: product.name,
            attribute_id: product.attribute_ID.id,
            attribute_name: product.attribute_ID.name,
            location_id: product.location_ID.id,
            location_name: product.location_ID.name,
            channel_id: product.location_ID.channel_ID?.id,
            channel_name: product.location_ID.channel_ID.name,
            type_id: product.type_ID.id,
            type_name: product.type_ID.name,
            price: product.price.price * 1000000
        }
    })
}

export default function ProductTable() {

    let uri = checkMicroFe() === true ? "/contract-service" : "";
    const { Column } = Table;
    const { Option } = Select;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { isLoading } = useSelector(state => state.loadingReducer);
    const { productList, totalProduct, productChannel, productLocation, productType, productAttribute } = useSelector(state => state.productReducer);
    const { messageAlert } = useSelector(state => state.messageReducer);
    // Normal Table
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const [search, setSearch] = useState({ name: "", tax_number: "", brief_name: "" })
    const [isCreate, setIsCreate] = useState(null);
    const [isUpdate, setIsUpdate] = useState(null);

    // Edit table
    const [form] = Form.useForm();
    const [data, setData] = useState();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    // Get channel, location, type, attribute ò product
    const [channelID, setChannelID] = useState(null);
    const [locationID, setLocationID] = useState(null);
    const [typeID, setTypeID] = useState(null);
    const [attributeID, setAttributeID] = useState(null);
    
    useEffect(() => {
        dispatch({
            type: GET_PRODUCT_CHANNEL,
            data: { page: 1, page_size: 1000 }
        })
        dispatch({
            type: GET_PRODUCT_TYPE,
            data: { page: 1, page_size: 1000 }
        })
        dispatch({
            type: GET_PRODUCT_ATTRIBUTE,
            data: { page: 1, page_size: 1000 }
        })
    }, [])

    useEffect(() => {
        if (typeof +channelID === "number" && channelID !== null) {
            dispatch({
                type: GET_PRODUCT_LOCATION,
                data: { page: 1, page_size: 1000, channelID }
            })
        }
    }, [channelID])

    useEffect(() => {
        if (search?.name === "" && search?.tax_number === "" && search?.brief_name === "") {
            dispatch({
                type: GET_PRODUCT_LIST,
                data: { page, pageSize: pageNumber }
            });
            dispatch(setIsLoading(true))
            dispatch(setMessage({}))
        }
    }, [search])

    useEffect(() => {
        if (search?.name === "" && search?.tax_number === "" && search?.brief_name === "") {
            dispatch({
                type: GET_PRODUCT_LIST,
                data: { page, pageSize: pageNumber }
            });
            dispatch(setIsLoading(true))
        }
    }, [page, pageNumber])

    useEffect(() => {
        let { type, msg } = messageAlert;
        if (type === "thành công") {
            message.success(msg)
        } else if (type === "thất bại") {
            message.error(msg)
        }
    }, [messageAlert])

    useEffect(() => {
        setData(convertData(productList))
    }, [productList])

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
            if (inputType === "channel_name") {
                return <Select
                    showSearch
                    filterOption={(input, option) =>
                        (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    value={channelID}
                    onChange={(value) => {
                        setChannelID(value)
                        // record.channel_id = value;
                    }}
                >
                    {renderChannelOption()}
                </Select>
            } else if (inputType === "location_name") {
                return <Select
                    showSearch
                    filterOption={(input, option) =>
                        (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    value={locationID}
                    onChange={(value) => {
                        setLocationID(value)
                        // record.location_id = value;
                    }}
                >
                    {renderLocationOption()}
                </Select>
            } else if (inputType === "type_name") {
                return <Select
                    showSearch
                    filterOption={(input, option) =>
                        (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    value={typeID}
                    onChange={(value) => {
                        setTypeID(value)
                        // record.type_id = value;
                    }}
                >
                    {renderTypeOption()}
                </Select>
            } else if (inputType === "attribute_name") {
                return <Select
                    showSearch
                    filterOption={(input, option) =>
                        (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    value={attributeID}
                    onChange={(value) => {
                        setAttributeID(value)
                        // record.attribute_id = value;
                    }}
                >
                    {renderAttributeOption()}
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
        setChannelID(record.channel_id)
        setLocationID(record.location_id)
        setTypeID(record.type_id)
        setAttributeID(record.attribute_id)
        setIsCreate(false)
        setIsUpdate(true)
    };

    const cancel = () => {
        if(isCreate && (editingKey && editingKey !== "")){
            dispatch(removeProduct(editingKey))
        }
        setEditingKey('');
        setIsCreate(false)
        setIsUpdate(false)
    };

    const save = async (key) => {
        try {
            const newProduct = form.getFieldsValue();
            let channel = productChannel.find(channel => channel.id === channelID);
            let location = productLocation.find(location => location.id === locationID);
            let type = productType.find(type => type.id === typeID);
            let attribute = productAttribute.find(att => att.id === attributeID);
            newProduct.channel_id = channelID;
            newProduct.channel_name = channel.name
            newProduct.location_id = locationID;
            newProduct.location_name = location.name
            newProduct.type_id = typeID;
            newProduct.type_name = type.name
            newProduct.attribute_id = attributeID;
            newProduct.attribute_name = attribute.name
            newProduct.id = editingKey;
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                if(isCreate && !isUpdate){
                    dispatch({
                        type: CREATE_PRODUCT,
                        data: newProduct
                    })
                }
                setIsCreate(false);
                setIsUpdate(false);
                setData(newData);
                setEditingKey('');
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
            dataIndex: "product_name",
            width:"15%",
            className: "product__name"
        },
        {
            editable: true,
            title: "Kênh sản phẩm",
            dataIndex: "channel_name",
            width:"15%"
        },
        {
            editable: true,
            title: "Nhóm sản phẩm",
            dataIndex: "location_name",
            width:"15%"
        },
        {
            editable: true,
            title: "Loại sản phẩm",
            dataIndex: "type_name",
            width:"15%"
        },
        {
            editable: true,
            title: "Thuộc tính sản phẩm",
            dataIndex: "attribute_name",
            width:"15%"
        },
        {
            editable: true,
            title: "Giá",
            dataIndex: "price",
            width:"15%",
            render: (_, record)=>{
                return new Intl.NumberFormat("vi-VI").format(record.price) + " VNĐ"
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
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            <MdOutlineModeEditOutline className="style__svg" />
                        </Typography.Link>
                        <Popconfirm title="Có chắc muốn xóa?" 
                            onConfirm={()=>{
                                dispatch({
                                    type: DELETE_PRODUCT,
                                    product_id: record.key
                                })
                            }} 
                            okText="Có" 
                            cancelText="Không" 
                        >
                            <MdDelete className="style__svg" style={{ backgroundColor: "#F1416C" }} />
                        </Popconfirm>
                    
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

    const handleSearchInput = (e) => {
        let { value, name } = e.target;
        setSearch({
            ...search,
            [name]: value
        })
    }
    const showLoading = () => {
        if (isLoading) {
            return <Loading />
        }
    }

    function renderChannelOption() {
        return productChannel.map(channel => {
            return <Option value={channel.id}>{channel.name}</Option>
        })
    };

    function renderLocationOption() {
        return productLocation.map(location => {
            return <Option value={location.id}>{location.name}</Option>
        })
    };

    function renderTypeOption() {
        return productType.map(type => {
            return <Option value={type.id}>{type.name}</Option>
        })
    };

    function renderAttributeOption() {
        return productAttribute.map(att => {
            return <Option value={att.id}>{att.name}</Option>
        })
    };
    
    const createProduct = () => {
        let newProduct = {
            id: uuidv4(),
            "name": "",
            "location_ID": {
                "name": "",
                "channel_ID": {
                    "name": "",
                    "id": null
                },
                "id": null
            },
            "type_ID": {
                "name": "",
                "id": null
            },
            "attribute_ID": {
                "name": "",
                "id": null
            },
            price: {
                price: 0
            }
        };
        form.resetFields()
        if(!isCreate && editingKey === ""){
            dispatch(addProduct(newProduct))
            setIsCreate(true)
            setIsUpdate(false)
            setEditingKey(newProduct.id);
        }
    }

    return (
        <div className="customer__table content product__table">
            {showLoading()}
            <div className="table__features">
                <div className="table__features__add">
                    <h1>Quản lý sản phẩm</h1>
                    <FcPlus onClick={createProduct} />
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
                            if (search?.name === "" && search?.tax_number === "" && search?.brief_name === "") {
                                message.warning("Dữ liệu tìm kiếm không thể để trống", 1)
                            } else {
                                dispatch({
                                    type: SEARCH_CUSTOMER,
                                    searchData: search
                                })
                            }
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
                        total: totalProduct,
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