import { Form, Input, Popconfirm, Table, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { FcPlus } from 'react-icons/fc';
import { MdDelete, MdOutlineModeEditOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {v4 as uuidv4} from "uuid";
import { addProductType, removeProductType  } from '../../redux/features/productSlice';
import { CREATE_PRODUCT_TYPE, DELETE_PRODUCT_TYPE, GET_PRODUCT_TYPE, SEARCH_PRODUCT_TYPE, UPDATE_PRODUCT_TYPE } from '../../title/title';

function convertTypeData(data){
    try {
        return data.map(type => {
            return {
                key: type.id,
                name: type.name
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export default function ProductTypeEditTable() {

    const dispatch = useDispatch();
    const { productType, totalProductType } = useSelector(state => state.productReducer);
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(5);
    const [isCreate, setIsCreate] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [search, setSearch] = useState(null);
    // edit table
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;

    useEffect(()=>{
        setData(convertTypeData(productType))
    }, [productType])

    useEffect(()=>{
        if(search === ""){
            dispatch({
                type: GET_PRODUCT_TYPE,
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
        ...restProps
    }) => {
        const inputNode = <Input />;
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
        setEditingKey('');
        setIsCreate(false);
        setIsUpdate(false);
    };

    const save = async (key) => {
        try {
            const type = form.getFieldsValue();
            type.id = editingKey;
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
                        type: CREATE_PRODUCT_TYPE,
                        data: type
                    })
                } else if(!isCreate && isUpdate){
                    dispatch({
                        type: UPDATE_PRODUCT_TYPE,
                        data: type
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
            title: "Loại",
            dataIndex: "name",
            className: "type__name",
            width: "50%"
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
                                            type: DELETE_PRODUCT_TYPE,
                                            type_id: record.key
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

    const createProductType = () => {
        let newType = {
            id: uuidv4(),
            name: ""
        };
        if (editingKey === "") {
            dispatch(addProductType(newType))
            setEditingKey(newType.id);
            setIsCreate(true)
            form.resetFields()
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
                      <h1>Quản lý loại sản phẩm</h1>
                      <Tooltip title="Tạo" color="green">
                        <FcPlus onClick={createProductType} />
                      </Tooltip>
                  </div>
                  <div className="table__features__search">
                      <input placeholder="Loại sản phẩm" type="text"
                          onChange={handleChangeSearch}
                          onKeyDown={(e) => {
                              let { key } = e;
                              let { value } = e.target;
                              if (key.toLowerCase() === "enter") {
                                  dispatch({
                                      type: SEARCH_PRODUCT_TYPE,
                                      data: value
                                  })
                              }
                          }}
                      />
                      <div className="table__features__search__btn">
                          <button onClick={()=>{
                            dispatch({
                                type: SEARCH_PRODUCT_TYPE,
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
                      total: totalProductType,
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
