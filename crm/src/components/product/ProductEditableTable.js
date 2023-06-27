import React, { useEffect, useState } from 'react'
import { Form, Input, message, Popconfirm, Select, Table, Tooltip, Typography } from 'antd';
import { FcPlus } from "react-icons/fc"
import { useDispatch, useSelector } from "react-redux"
import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT_ATTRIBUTE, GET_PRODUCT_CHANNEL, GET_PRODUCT_LIST, GET_PRODUCT_LOCATION, GET_PRODUCT_SUBLOCATION, GET_PRODUCT_TYPE, SEARCH_CUSTOMER, UPDATE_PRODUCT } from '../../title/title';
import Loading from "../../components/Loading"
import { setIsLoading } from '../../redux/features/loadingSlice';
import { setMessage } from '../../redux/features/messageSlice';
import { MdDelete, MdOutlineModeEditOutline } from 'react-icons/md';
import { v4 as uuidv4 } from "uuid";
import { addProduct, removeProduct } from '../../redux/features/productSlice';

const convertData = (productList) => {
    return productList.map(product => {
        return {
            key: product.id,
            product_id: product.id,
            product_name: product.name,
            attribute_option_id: product.attribute_option_ID.id,
            attribute_option_name: product.attribute_option_ID.name,
            location_id: product.location.id,
            location_name: product.location.name,
            sub_location_id: product.sub_location_ID.id,
            sub_location_name: product.sub_location_ID.name,
            channel_id: product.channel?.id,
            channel_name: product.channel.name,
            type_id: product.type_ID.id,
            type_name: product.type_ID.name,
            price: product.price.price * 1000000,
            code_indentify: product.code_indentify
        }
    })
}

export default function ProductTable() {

    const { Column } = Table;
    const { Option } = Select;
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.loadingReducer);
    const { productList, totalProduct, productChannel, productLocation, productType, productAttribute, productSubLocation } = useSelector(state => state.productReducer);
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
    const [subLocationID, setSubLocationID] = useState(null);
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

    useEffect(()=>{
        if (typeof locationID === "number" && locationID !== null) {
          dispatch({
            type: GET_PRODUCT_SUBLOCATION,
            data: { page:1, page_size: 1000, locationID }
          })
        }
      }, [locationID, dispatch])

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
        setData(convertData(productList))
    }, [productList])

    const isDisable = ()=>{
        if(isUpdate){
            return true
        } else {
            return false
        }
    }

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
                    disabled={isDisable()}
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
                    disabled={isDisable()}
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
                    disabled={isDisable()}
                >
                    {renderTypeOption()}
                </Select>
            } else if (inputType === "attribute_option_name") {
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
                    disabled={isDisable()}
                >
                    {renderAttributeOption()}
                </Select>
            } else if(inputType === "sub_location_name"){
                return <Select
                showSearch
                filterOption={(input, option) =>
                    (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                }
                value={subLocationID}
                onChange={(value) => {
                    setSubLocationID(value)
                }}
                disabled={isDisable()}
            >
                {renderSubLocationOption()}
            </Select>
            } else {
                return <Input />
            }
        };
        return (
            <td {...restProps} key={uuidv4()}>
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
        setAttributeID(record.attribute_option_id)
        setSubLocationID(record.sub_location_id)
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
            let subLocation = productSubLocation.find(subLoca => subLoca.id === subLocationID)
            let type = productType.find(type => type.id === typeID);
            let attribute = productAttribute.find(att => att.id === attributeID);
            newProduct.channel_id = channelID;
            newProduct.channel_name = channel.name
            newProduct.location_id = locationID;
            newProduct.location_name = location.name
            newProduct.sub_location_ID = subLocationID;
            newProduct.sub_location_name = subLocation.name
            newProduct.type_id = typeID;
            newProduct.type_name = type.name
            newProduct.attribute_option_id = attributeID;
            newProduct.attribute_option_name = attribute.name
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
                } else {
                    dispatch({
                        type: UPDATE_PRODUCT,
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
            title: "Mã sản phẩm",
            dataIndex: "code_indentify",
            width:"11.2%",
            className: "product__code"
        },
        {
            editable: true,
            title: "Sản phẩm",
            dataIndex: "product_name",
            width:"11.2%",
        },
        {
            editable: true,
            title: "Kênh sản phẩm",
            dataIndex: "channel_name",
            width:"11.2%"
        },
        {
            editable: true,
            title: "Nhóm sản phẩm",
            dataIndex: "location_name",
            width:"11.2%"
        },
        {
            editable: true,
            title: "Vị trí sản phẩm",
            dataIndex: "sub_location_name",
            width:"11.2%"
        },
        {
            editable: true,
            title: "Loại sản phẩm",
            dataIndex: "type_name",
            width:"11.2%"
        },
        {
            editable: true,
            title: "Thuộc tính sản phẩm",
            dataIndex: "attribute_option_name",
            width:"11.2%"
        },
        {
            editable: true,
            title: "Giá",
            dataIndex: "price",
            width:"11.2%",
            render: (_, record)=>{
                return new Intl.NumberFormat("vi-VI").format(record.price) + " VNĐ"
            }
        },
        {
            width: "8%",
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
                            <Tooltip title="Chỉnh sửa" color="green" overlayStyle={{ top:"0px" }} >
                                <Typography.Link style={{ display: "inline-block" }} disabled={editingKey !== ''} onClick={() => edit(record)}>
                                    <MdOutlineModeEditOutline className="style__svg" />
                                </Typography.Link>
                            </Tooltip>
                            <Tooltip title="Xóa" color="red">
                                <Popconfirm title="Có chắc muốn xóa?"
                                    onConfirm={() => {
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

    const renderSubLocationOption = () => {
        return productSubLocation.map(sublocation => {
          return <Option key={sublocation.id} value={sublocation.id}>{sublocation.name}</Option>
        });
      }

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
            code_indentify: "",
            "location": {
                "name": "",
                "id": null
            },
            "type_ID": {
                "name": "",
                "id": null
            },
            "attribute_option_ID": {
                "name": "",
                "id": null
            },
            "channel": {
                "name": "",
                "id": null
            },
            sub_location_ID: {
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
                    <Tooltip title="Tạo" color="green">
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