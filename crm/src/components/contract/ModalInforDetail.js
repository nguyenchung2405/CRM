import { Image, Modal, Tooltip } from 'antd'
import React, { useState } from 'react'
import UploadFile from '../customer/Upload';
import word from "../../img/doc.png"
import pdf from "../../img/pdf.png";
import { v4 as uuidv4 } from "uuid"
import ViewPDF from '../ViewPDF';
import ViewDoc from '../ViewDoc';
import { checkMicroFe } from '../../untils/helper';
import axios from 'axios';
import { local, UPDATE_ACCEPTANCE } from '../../title/title';
import { FcImageFile } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setClearDataModal } from '../../redux/features/acceptanceSlice';

export default function ModalInforDetail(props) {

    let uri_file = checkMicroFe() === true ? 
                                    window.location.href.includes("dev") ?
                                    "https://crmservice-dev.tuoitre.vn/" : "https://crmservice-staging.tuoitre.vn/"
                                    : "http://localhost:3003/";

    const { isShowModal, setIsShowModal, data, setDataModalDetail } = props;
    const [isShowModalPDF, setIsShowModalPDF] = useState(false);
    const [isShowModalWord, setIsShowModalWord] = useState(false);
    const [imageVisible, setImageVisible] = useState(false);
    let [file, setFile] = useState("");
    const dispatch = useDispatch();

    const handleCancel = () => {
        setIsShowModal(false)
        dispatch(setClearDataModal(false))
    }

    const handleOK = ()=>{
        dispatch({
            type: UPDATE_ACCEPTANCE,
            data: data
        })
        setIsShowModal(false)
        setFile("")
        dispatch(setClearDataModal(false))
    }

    const deletePathOfFile = (index) => {
        if(!data.completed_evidences[index].includes("http")){
            axios({
                url: `${local}/api/remove-file`,
                method: "DELETE",
                data: { path: data.completed_evidences[index] }
            })
            let newFiles = [...data.completed_evidences]
            newFiles.splice(index, 1)
            setDataModalDetail(prev => {
                return {
                    ...prev,
                    completed_evidences: newFiles
                }
            })
        } else {
            let newFiles = [...data.completed_evidences]
            newFiles.splice(index, 1)
            setDataModalDetail(prev => {
                return {
                    ...prev,
                    completed_evidences: newFiles
                }
            })
        }
    }

    const renderFiles = ()=>{
        if (data?.completed_evidences?.length > 0) {
            return data?.completed_evidences.map((file, indexFile) => {
                if (!file.includes("http")) {
                    let index = file.indexOf("_")
                    let name = file.slice(index + 1)
                    if (file?.includes("doc") || file?.includes("docx")) {
                        return <div className="upload__file" key={uuidv4()}>
                            <Tooltip title={name}>
                                <img key={uuidv4()} className="file" src={word} alt="xem word" onClick={() => {
                                    setIsShowModalWord(true)
                                    setFile(uri_file + file)
                                }} />
                            </Tooltip>
                            <svg onClick={() => { deletePathOfFile(indexFile) }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z">
                                </path>
                                <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                            </svg>
                        </div>
                    } else if (file?.includes("pdf")) {
                        return <div className="upload__file" key={uuidv4()}>
                            <Tooltip title={name}>
                                <img key={uuidv4()} className="file" src={pdf} alt="xem pdf" onClick={() => {
                                    setIsShowModal(true)
                                    setFile(uri_file + file)
                                }} />
                            </Tooltip>
                            <svg onClick={() => { deletePathOfFile(indexFile) }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z">
                                </path>
                                <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                            </svg>
                        </div>
                    } else {
                        return <div className="upload__file" key={uuidv4()}>
                            <Tooltip title={name}>
                                <FcImageFile key={uuidv4()} className="file" onClick={() => {
                                    setFile(uri_file + file)
                                    setImageVisible(true)
                                }} />
                            </Tooltip>
                            <svg onClick={() => { deletePathOfFile(indexFile) }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z">
                                </path>
                                <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                            </svg>
                        </div>
                    }
                } else {
                    return <div className="upload__file" key={uuidv4()}>
                         <Tooltip title={file}>
                            <a href={file} target="_blank" rel='noreferrer'>Link</a>
                         </Tooltip>
                         <svg onClick={() => { deletePathOfFile(indexFile) }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z">
                                </path>
                                <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                            </svg>
                    </div>
                }
            })
        }
    }

  return (
      <Modal
          title={<span>Chi tiết đã thực hiện</span>}
          closeIcon={<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.61719 6.5L13.4609 11.3438C13.5911 11.474 13.5911 11.6172 13.4609 11.7734L12.5625 12.6719C12.4062 12.8021 12.263 12.8021 12.1328 12.6719L11.3125 11.8125L7.28906 7.82812L2.44531 12.6719C2.3151 12.8021 2.17188 12.8021 2.01562 12.6719L1.11719 11.7734C0.986979 11.6172 0.986979 11.474 1.11719 11.3438L5.96094 6.5L1.11719 1.65625C0.986979 1.52604 0.986979 1.38281 1.11719 1.22656L2.01562 0.328125C2.17188 0.197917 2.3151 0.197917 2.44531 0.328125L7.28906 5.17188L12.1328 0.328125C12.263 0.197917 12.4062 0.197917 12.5625 0.328125L13.4609 1.22656C13.5911 1.38281 13.5911 1.52604 13.4609 1.65625L12.6016 2.47656L8.61719 6.5Z" fill="black" />
          </svg>}
          footer={
              <div className="contract__service__footer">
                  <button type="button" className="ant-btn ant-btn-default btn__cancel" onClick={handleCancel}>
                      <span>Hủy</span>
                  </button>
                  <button type="button" className="ant-btn ant-btn-default btn__add" onClick={handleOK}>
                      <span>Cập nhật</span>
                  </button>
              </div>
          }
          open={isShowModal}
          onCancel={handleCancel}
          className="detail__infor__modal"
          width="700px"
      >
          <div className="modal__field field__select modal__report__upload">
              <label>Link</label>
              <textarea
                  name="completed_evidences_update"
                  value={data.completed_evidences_update || ""}
                  onChange={(e)=>{
                    let {name, value} = e.target;
                    setDataModalDetail({
                        ...data,
                        [name]: value
                    })
                  }}
              >
              </textarea>
          </div>
          <div className="modal__upload">
                <UploadFile setValueForm={setDataModalDetail} accept="image/*" />
                <p>Danh sách bằng chứng:</p>
                <div className="client__files">
                    {renderFiles()}
                </div>
          </div>
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
          <ViewPDF key={uuidv4()} pdf={file} showModal={isShowModalPDF} setIsShowModal={setIsShowModalPDF} />
      </Modal>
  )
}