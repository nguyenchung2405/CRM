import React, { useState, useEffect } from 'react'
import { Form, Popconfirm, Table, Typography, Input, AutoComplete, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FcPlus } from "react-icons/fc"
import { MdDelete, MdOutlineModeEditOutline } from 'react-icons/md';
import {v4 as uuidv4} from "uuid";
import { addProductAttribute, removeProductAttribute } from '../../redux/features/productSlice';
import { CREATE_PRODUCT_ATTRIBUTE, DELETE_PRODUCT_ATTRIBUTE, GET_PRODUCT_ATTRIBUTE, SEARCH_PRODUCT_ATTRIBUTE, UPDATE_PRODUCT_ATTRIBUTE } from '../../title/title';

function convertAttributeData(data){
    try {
        return data.map( att =>{
            return {
                key: att.id,
                name: att.name
            }
        } )
    } catch (error) {
        console.log(error)
    }
}

export default function ProductAttributeEditTable() {

    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(5);
    const { productAttribute, totalProductAttribute } = useSelector(state => state.productReducer);
    const [search, setSearch] = useState(null);
    // edit table
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [isCreate, setIsCreate] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const isEditing = (record) => record.key === editingKey;

    useEffect(()=>{
        setData(convertAttributeData(productAttribute))
    }, [productAttribute])

    useEffect(()=>{
        if(search === ""){
            dispatch({
                type: GET_PRODUCT_ATTRIBUTE,
                data: { page: 1, page_size: 1000 }
            })
        }
    }, [search])

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        key,
        ...restProps
    }) => {
        const inputNode = <Input />;
        return (
            <td {...restProps} key={key}>
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
                        {inputNode}
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
        setIsCreate(false);
        setIsUpdate(true);
    };
    
    const cancel = () => {
        if (typeof editingKey === "string") {
            dispatch(removeProductAttribute(editingKey))
        }
        setEditingKey('');
        setIsCreate(false);
        setIsUpdate(false);
    };

    const save = async (key) => {
        try {
            const attribute = form.getFieldsValue();
            attribute.id = editingKey;
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
                        type: CREATE_PRODUCT_ATTRIBUTE,
                        data: attribute
                    })
                } else if(!isCreate && isUpdate){
                    dispatch({
                        type: UPDATE_PRODUCT_ATTRIBUTE,
                        data: attribute
                    })
                }
                setData(newData);
                setEditingKey('');
                setIsCreate(false);
                setIsUpdate(false);
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
            title: "Thuộc tính",
            dataIndex: "name",
            className: "attribute__name",
            width: "50%",
            key: uuidv4()
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
                            <Tooltip title="Chỉnh sửa" color="green">
                                <Typography.Link style={{ display: "inline-block" }} disabled={editingKey !== ''} onClick={() => edit(record)}>
                                    <MdOutlineModeEditOutline className="style__svg" />
                                </Typography.Link>
                            </Tooltip>
                            <Tooltip title="Xóa" color="red">
                                <Popconfirm title="Có chắc muốn xóa?"
                                    onConfirm={() => {
                                        dispatch({
                                            type: DELETE_PRODUCT_ATTRIBUTE,
                                            attribute_id: record.key
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
    
    const createProductAttribute = ()=>{
        let newAtt = {
            id: uuidv4(),
            name: ""
        };
        if (editingKey === "") {
            form.resetFields()
            dispatch(addProductAttribute(newAtt))
            setEditingKey(newAtt.id);
            setIsCreate(true)
        }
    }

    const handleChangeSearch = (e)=>{
        let {value} = e.target;
        setSearch(value)
    }

    return (
        <div className="width__50">
            <Form form={form} component={false}>
                <div className="table__features">
                    <div className="table__features__add">
                        <h1>Quản lý thuộc tính sản phẩm</h1>
                        <Tooltip title="Tạo" color="green">
                            <FcPlus onClick={createProductAttribute} />
                        </Tooltip>
                    </div>
                    <div className="table__features__search">
                        <input placeholder="Thuộc tính sản phẩm" type="text" 
                            onChange={handleChangeSearch} 
                            onKeyDown={(e)=>{
                                let { key } = e;
                                let { value } = e.target;
                                if (key.toLowerCase() === "enter") {
                                    dispatch({
                                        type: SEARCH_PRODUCT_ATTRIBUTE,
                                        data: value
                                    })
                                }
                            }}
                        />
                        {
                            /**
                             <AutoComplete 
                            allowClear
                            className="antd__auto__complete__style"
                            placeholder="Thuộc tính sản phẩm"
                            filterOption={(input, option) => {
                                // let index = input.lastIndexOf(",");
                                // let str_replace = input.slice(0, index + 1);
                                // input = input.replace(str_replace, "");
                                return (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            }
                        />
                        */
                        }
                        <div className="table__features__search__btn">
                            <button onClick={()=>{
                                dispatch({
                                    type: SEARCH_PRODUCT_ATTRIBUTE,
                                    data: search
                                })
                            }}>Tìm kiếm</button>
                        </div>
                    </div>
                </div>
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
                        defaultPageSize: 5,
                        locale: { items_per_page: "" },
                        defaultCurrent: 1,
                        showSizeChanger: true,
                        total: totalProductAttribute,
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
