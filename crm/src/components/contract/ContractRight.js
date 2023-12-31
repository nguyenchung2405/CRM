import { Form, Image, Input, Popconfirm, Table, Tooltip, Typography } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeRequestDetail, setKeyOfDetailJustAdd, setKeyOfRequestJustAdd, updateRequestDetail } from '../../redux/features/contractSlice';
import axios from "axios"
import { CREATE_DETAIL, DELETE_DETAIL, local, UPDATE_DETAIL } from '../../title/title';
import ViewPDF from '../ViewPDF';
import { checkMicroFe } from '../../untils/helper';
import pdf from "../../img/pdf.png";
import imageIcon from "../../img/image.png";
import ViewDoc from '../ViewDoc';
import word from "../../img/doc.png"
import {v4 as uuidv4} from "uuid"
import ModalInforDetail from './ModalInforDetail';
import { setClearDataModal } from '../../redux/features/acceptanceSlice';

function convertLegacyProps(data){
    try {
        return data.details.map(item => {
          let newFromDate = moment(item.from_date, "YYYY-MM-DD").format("DD-MM-YYYY");
            return {
                request_id: data.id,
                desc: item.desc,
                file: item?.file,
                from_date: newFromDate,
                key: item.id,
                completed_evidences: item.completed_evidences,
                price: item.price
            }
        })
    } catch (error) {
        console.log("convertLegacyProps", error)
    }
}

let pathOfFile = "";

export default function ContractRight(props) {

  let uri_file = checkMicroFe() === true ? 
                                    window.location.href.includes("dev") ?
                                    "https://crmservice-dev.tuoitre.vn/" : "https://crmservice-staging.tuoitre.vn/"
                                    : "http://localhost:3003/";
    const [data, setData] = useState();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const {keyOfDetailJustAdd, keyOfRequestJustAdd} = useSelector(state => state.contractReducer)
    const [requestId, setRequestId] = useState();
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalWord, setIsShowModalWord] = useState(false);
    const [isShowModalDetail, setIsShowModalDetail] = useState(false);
    const [dataModalDetail, setDataModalDetail] = useState({});
    const [file, setFile] = useState("");
    const [imageVisible, setImageVisible] = useState(false);
    const isEditing = (record) => record.key === editingKey;
    const {isUpdateDetail, setIsUpdateDetail, contract_id} = props;

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
      key,
      ...restProps
    }) => {
      const inputNode = inputType === 'file' ?
        record?.file?.length > 0 ?
          <>
            <input type="file" onChange={(e) => { uploadFileDetail(e.target.files[0], editingKey, e) }} />
          </>
          : <input type="file" onChange={(e) => { uploadFileDetail(e.target.files[0], editingKey, e) }} />
        : <Input />;
                         
      const required = ()=>{
        if(inputType === 'upload' || inputType === "file"){
          return false
        } else {
          return true
        }
      }
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
              headers: {
                "Content-Type": "multipart/form-data",
                // Authorization: "Bearer " + TOKEN
              },
              method: "POST",
              data: formData
            });
            if(upload?.data){
              await axios({
                url: `${local}/api/remove-file`,
                method: "DELETE",
                data: {path: pathOfFile}
              })
              pathOfFile = upload.data;
            }
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
      setIsUpdateDetail(true)
      pathOfFile = record.file;
    };

    const cancel = () => {
      if ((keyOfDetailJustAdd && keyOfDetailJustAdd !== "") && (keyOfRequestJustAdd && keyOfRequestJustAdd !== "")) {
        dispatch(removeRequestDetail({ request_id: keyOfRequestJustAdd, detail_id: keyOfDetailJustAdd }))
        axios({
          url: `${local}/api/remove-file`,
          method: "DELETE",
          data: {path: pathOfFile}
        })
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
          if(window.location.href.includes("create")){
            setData(newData);
            dispatch(updateRequestDetail({ request_id: requestId, detailData: newDetailJustAdd }))
          } else {
            newDetailJustAdd.request_id = requestId;
            newDetailJustAdd.contract_id = contract_id;
            if(isUpdateDetail){
              dispatch({
                type: UPDATE_DETAIL,
                data: newDetailJustAdd
              })
            } else {
              dispatch({
                type: CREATE_DETAIL,
                data: newDetailJustAdd
              })
            }
            setIsUpdateDetail(false)
          }
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
          title: "Ngày đăng",
          key: uuidv4(),
          width: "18%"
        },
        {
            editable: true,
            dataIndex: "desc",
            title: "Mô tả",
            key: uuidv4(),
            width: "40%",
            render: (_, record)=>{
              if ((record.desc.split(" ").length - 1) > 15) {
                let indexSpace = 0
                let numberIndex = 0
                for (let i = 0; i < record.desc.length; i++) {
                  if (record.desc[i] === " " && numberIndex < 7) {
                    indexSpace = i
                    numberIndex += 1
                  } else if(numberIndex >= 7){
                    break;
                  }
                }
                return <Tooltip title={record.desc}>
                  {record.desc.slice(0, indexSpace) + "..."}
                </Tooltip>
              } else {
                return record.desc
              }
            }
        },
        {
            editable: true,
            dataIndex: "file",
            title: "File",
            width: "10%",
            key: uuidv4(),
            render: (_,record)=>{
              if(record.file?.includes("doc") || record.file?.includes("docx")){
                // return <a className="dowload__file" href={uri_file + record.file}>Tải file word</a>
                return <img className="file" src={word} alt="xem word" onClick={()=>{
                        setIsShowModalWord(true)
                        setFile(uri_file + record.file)
                }} />
              } else if(record.file?.includes("pdf")) {
                return <img className="file" src={pdf} alt="xem pdf" onClick={()=>{
                        setIsShowModal(true)
                        setFile(uri_file + record.file)
                }} />
              } else {
                return <img className="file" src={imageIcon} alt="xem pdf" onClick={() => {
                  setFile(uri_file + record.file)
                  setImageVisible(true)
                }} />
              }
            }
        },
        {
          className: "price__detail",
          key: uuidv4(),
          title: "Giá trước thuế (VNĐ)",
          width: "max-content",
          render: (_,record)=>{
            if(record.completed_evidences?.length > 0){
              return new Intl.NumberFormat("vi-VN").format((record.price * 1000000).toFixed(6)) + " VNĐ"
            } else {
              return ""
            }
          }
        },
        {
            className: "thaoTac",
            key: uuidv4(),
            width: "10%",
            render: (_, record) => {
              const editable = isEditing(record);
              if(record.completed_evidences?.length > 0){
                return <Typography.Link onClick={() => {
                  setDataModalDetail(record)
                  setIsShowModalDetail(true)
                  dispatch(setClearDataModal(true))
                }}>
                Xem chi tiết
              </Typography.Link>
              }
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
                  record.completed_evidences?.length > 0
                    ?
                    ""
                    : <>
                      <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Sửa
                      </Typography.Link>
                      <Popconfirm title="Bạn có muốn xóa chi tiết ?" onConfirm={()=>{
                        dispatch({
                          type: DELETE_DETAIL,
                          data: {contract_detail_id: record.key, request_id: record.request_id}
                        })
                      }} okText="Có" cancelText="Không">
                        <Typography.Link>Xóa</Typography.Link>
                      </Popconfirm>
                    </>
              );
            }
          },
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
        <ModalInforDetail isShowModal={isShowModalDetail} setIsShowModal={setIsShowModalDetail} data={dataModalDetail} setDataModalDetail={setDataModalDetail} />
        <ViewPDF pdf={file} showModal={isShowModal} setIsShowModal={setIsShowModal} />
        <ViewDoc showModal={isShowModalWord} setIsShowModal={setIsShowModalWord} word={file} />
        <Image 
          style={{
            display: 'none',
          }} 
          preview={{ 
            visible: imageVisible, 
            src: file, 
            onVisibleChange: (value) => {
              setImageVisible(value);
            }, 
          }} 
        />
    </Form>
  )
}
