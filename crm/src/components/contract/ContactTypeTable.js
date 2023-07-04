import React, { useState, useEffect } from 'react'
import { Form, Popconfirm, Table, Typography, Input, AutoComplete, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FcPlus } from "react-icons/fc"
import { MdDelete, MdOutlineModeEditOutline } from 'react-icons/md';
import {v4 as uuidv4} from "uuid";
import { removeProductAttribute } from '../../redux/features/productSlice';
import { CREATE_CONTRACT_TYPE, DELETE_CONTRACT_TYPE, GET_CONTRACT_TYPE, UPDATE_CONTRACT_TYPE } from '../../title/title';
import { addContractType } from '../../redux/features/contractSlice';

function convertAttributeData(data){
    try {
        return data.map( type =>{
            return {
                key: type.id,
                ...type
            }
        } )
    } catch (error) {
        console.log(error)
    }
}

export default function ContactTypeTable() {

    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const { contractTypeList, totalContractType } = useSelector(state => state.contractReducer);
    const [search, setSearch] = useState("");
    // edit table
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [isCreate, setIsCreate] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const isEditing = (record) => record.key === editingKey;

    useEffect(()=>{
        setData(convertAttributeData(contractTypeList))
    }, [contractTypeList])

    useEffect(()=>{
        if(search === ""){
            dispatch({
                type: GET_CONTRACT_TYPE,
                data: { page: page, page_size: pageNumber }
            })
        } else {
            dispatch({
                type: GET_CONTRACT_TYPE,
                data: { page: page, page_size: pageNumber, search }
            })
        }
    }, [page, pageNumber])

    useEffect(()=>{
        if(search === ""){
            if(page === 1){
                dispatch({
                    type: GET_CONTRACT_TYPE,
                    data: { page: page, page_size: pageNumber }
                })
            } else {
                setPage(1)
            }
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
            const contractType = form.getFieldsValue();
            contractType.id = editingKey;
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
                        type: CREATE_CONTRACT_TYPE,
                        data: contractType
                    })
                } else if(!isCreate && isUpdate){
                    dispatch({
                        type: UPDATE_CONTRACT_TYPE,
                        data: contractType
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
            title: "Loại hợp đồng",
            dataIndex: "name",
            className: "contract__type",
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
                                            type: DELETE_CONTRACT_TYPE,
                                            contract_type_id: record.key
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
    
    const createContractType = ()=>{
        let newContractType = {
            id: uuidv4(),
            name: ""
        };
        if (editingKey === "") {
            form.resetFields()
            dispatch(addContractType(newContractType))
            setEditingKey(newContractType.id);
            setIsCreate(true)
        }
    }

    const handleChangeSearch = (e)=>{
        let {value} = e.target;
        setSearch(value)
    }

    return (
        <div className="customer__table content product__table contract__type__table">
            <Form form={form} component={false}>
                <div className="table__features">
                    <div className="table__features__add">
                        <h1>Quản lý loại hợp đồng</h1>
                        <Tooltip title="Tạo" color="green">
                            <FcPlus onClick={createContractType} />
                        </Tooltip>
                    </div>
                    <div className="table__features__search">
                        <input placeholder="Loại hợp đồng" type="text"
                            onChange={handleChangeSearch}
                            onKeyDown={(e) => {
                                let { key } = e;
                                let { value } = e.target;
                                if (key.toLowerCase() === "enter") {
                                    dispatch({
                                        // type: SEARCH_PRODUCT_ATTRIBUTE,
                                        // data: value
                                    })
                                }
                            }}
                        />
                        <div className="table__features__search__btn">
                            <button onClick={() => {
                                dispatch({
                                    type: GET_CONTRACT_TYPE,
                                    data: { page: page, page_size: pageNumber, search }
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
                        defaultPageSize: 10,
                        locale: { items_per_page: "" },
                        defaultCurrent: 1,
                        current: page,
                        showSizeChanger: true,
                        total: totalContractType,
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