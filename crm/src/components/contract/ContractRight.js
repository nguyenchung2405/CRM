import { Form, Input, Popconfirm, Table, Typography } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeRequestDetail, setKeyOfDetailJustAdd, setKeyOfRequestJustAdd, updateRequestDetail } from '../../redux/features/contractSlice';
import axios from "axios"
import { local } from '../../title/title';

function convertLegacyProps(data){
    try {
        return data.details.map(item => {
          let newFromDate = moment(item.from_date, "YYYY-MM-DD").format("DD-MM-YYYY");
            return {
                request_id: data.id,
                desc: item.desc,
                file: item?.file,
                from_date: newFromDate,
                key: item.id
            }
        })
    } catch (error) {
        console.log("convertLegacyProps", error)
    }
}

let pathOfFile = "";

export default function ContractRight(props) {
    const [data, setData] = useState();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const {keyOfDetailJustAdd, keyOfRequestJustAdd} = useSelector(state => state.contractReducer)
    const [requestId, setRequestId] = useState();
    const isEditing = (record) => record.key === editingKey;
    
    useEffect(()=>{
      setData(convertLegacyProps(props.data))
    }, [props.data])
    
    useEffect(()=>{ 
      if(keyOfDetailJustAdd !== ""){
        form.setFieldsValue({
          "desc": "",
          "from_date": "",
          "file": null,
          "id": keyOfDetailJustAdd
        });
      }
      setEditingKey(keyOfDetailJustAdd)
    }, [keyOfDetailJustAdd])

    useEffect(()=>{
      setRequestId(keyOfRequestJustAdd)
    }, [keyOfRequestJustAdd])

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
      const inputNode = inputType === 'file' ? 
                              record?.file?.length > 0 ?
                                  <> 
                                      <input type="file" onChange={(e)=>{ uploadFileDetail(e.target.files[0], editingKey, e) }} /> 
                                  </>
                              :  <input type="file" onChange={(e)=>{ uploadFileDetail(e.target.files[0], editingKey, e) }} /> 
                          : <Input />;
                         
      const required = ()=>{
        if(inputType === 'upload' || inputType === "file"){
          return false
        } else {
          return true
        }
      }
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
                  required: required(),
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

    async function uploadFileDetail(file, detail_id, inputTag){
        try {
            let formData = new FormData();
            formData.append("detailFile", file);
            const upload = await axios({
              url: `${local}/api/contract/upload/detail`,
              method: "POST",
              data: formData
            });
            pathOfFile = upload.data;
        } catch (error) {
          console.log("uploadFileDetail", error)
        }
    }

    const edit = (record) => {
        form.setFieldsValue({
          ...record,
        });
        setEditingKey(record.key);
        setRequestId(record.request_id)
        pathOfFile = record.file;
    };
      const cancel = () => {
        if((keyOfDetailJustAdd && keyOfDetailJustAdd !== "") && (keyOfRequestJustAdd && keyOfRequestJustAdd !== "")){
          dispatch(removeRequestDetail({request_id: keyOfRequestJustAdd, detail_id: keyOfDetailJustAdd}))
        }
        setEditingKey('');
      };
      const save = async (key) => {
        try {
          let newDetailJustAdd = form.getFieldsValue();
          newDetailJustAdd.id = editingKey;
          newDetailJustAdd.from_date = moment(newDetailJustAdd.from_date, "DD-MM-YYYY").format("YYYY-MM-DD")
          newDetailJustAdd.file = pathOfFile;
          const row = await form.validateFields();
          const newData = [...data];
          const index = newData.findIndex((item) => key === item.key);
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            setData(newData);
            dispatch(updateRequestDetail({request_id: requestId, detailData: newDetailJustAdd}))
            setEditingKey('');
            dispatch(setKeyOfRequestJustAdd(""))
            dispatch(setKeyOfDetailJustAdd(""))
            pathOfFile = "";
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
          dataIndex: "from_date",
          title: "Ngày đăng"
        },
        {
            editable: true,
            dataIndex: "desc",
            title: "Mô tả"
        },
        {
            editable: true,
            dataIndex: "file",
            title: "File",
        },
        {
            className: "thaoTac",
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
                  <Popconfirm title="Bạn có muốn hủy?" onConfirm={cancel} okText="Có" cancelText="Không">
                    <a>Hủy</a>
                  </Popconfirm>
                </span>
              ) : (
                <>
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                  Sửa
                </Typography.Link>
                <Typography.Link onClick={()=>{
                  // if(record.file.includes("doc") || record.file.includes("docx")){
                  //   return <a className="dowload__file" href={uri_file + file}>Tải file word</a>
                  // } else if((record.file.includes("pdf")) {
                  //   return <>
                  //       <button onClick={()=>{
                  //         setIsShowModal(true)
                  //       }}>Xem PDF</button>
                  //       <ViewPDF pdf={uri_file + file} showModal={isShowModal} setIsShowModal={setIsShowModal} />
                  //   </>
                  // } else {
                  //   return <Image src={uri_file + file} />
                  // }
                }}>Xem</Typography.Link>
                </>
              );
            }
        }
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record) => {
            return {
                record,
                inputType: col.dataIndex === 'file' ? 'file' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
              }
          }
        };
      });
      
  return (
    <Form form={form} component={false}>
        <Table
            className="expand__table"
            components={{
                body: {
                cell: EditableCell,
                },
            }}
            dataSource={data}
            pagination={false}
            showHeader={true}
            columns={mergedColumns}      
        >
           
        </Table>
    </Form>
  )
}
