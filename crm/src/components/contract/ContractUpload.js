import { Image, Modal, Tooltip, Upload } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"
import word from "../../img/doc.png"
import pdf from "../../img/pdf.png";
import image from "../../img/image.png";
import ViewDoc from '../ViewDoc';
import ViewPDF from '../ViewPDF';
import { checkMicroFe } from "../../untils/helper";
import axios from "axios";
import { local } from "../../title/title";
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
export default function ContractUpload({ setValueForm, valueForm, contract_id , completed_contract_id}) {

    let uri_file = checkMicroFe() === true ?
        window.location.href.includes("dev") ?
            "https://crmservice-dev.tuoitre.vn/" : "https://crmservice-staging.tuoitre.vn/"
        : "http://localhost:3003/";
    const [isShowModalWord, setIsShowModalWord] = useState(false);
    const [imageVisible, setImageVisible] = useState(false);
    const [file, setFile] = useState("");
    const [isShowModal, setIsShowModal] = useState(false);
    // Upload
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const { isResetUpload } = useSelector(state => state.contractReducer);

    useEffect(()=>{
        if(isResetUpload){
            setFileList([])
            setValueForm(prev => {
                return {
                    ...prev,
                    filesUpload: []
                }
            })
        }
    }, [isResetUpload])

    const deletePathOfFile = async (index) => {
        await axios({
            url: `${local}/api/remove-file`,
            method: "DELETE",
            data: { path: valueForm.files[index] }
        })
        let newFiles = [...valueForm.files]
        newFiles.splice(index, 1)
        setValueForm(prev => {
            return {
                ...prev,
                files: newFiles
            }
        })
    }

    const renderFiles = () => {
        if (valueForm?.files?.length > 0) {
            return valueForm?.files?.map((file, indexFile) => {
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
                            <img key={uuidv4()} className="file" src={image} alt="Xem ảnh" onClick={() => {
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
            })
        }
    }

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => {
        // console.log("line 26", file); 
        let uploadFiles = newFileList.map(file => {
            return file.originFileObj
        })
        setValueForm(prev => { return { ...prev, filesUpload: uploadFiles } })
        setFileList(newFileList)
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const renderUpload = ()=>{
        if(!contract_id && completed_contract_id){
            return ""
        } else {
            return <>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    multiple={true}
                    beforeUpload={(file, fileList) => false}
                    showUploadList={{
                        showPreviewIcon: true
                    }}
                    accept="application/pdf, application/msword, image/png, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/jpg, image/gif"
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img
                        alt="example"
                        style={{
                            width: '100%',
                        }}
                        src={previewImage}
                    />
                </Modal>
            </>
        }
    }

    return (
        <div className="create__contract__payment border_bottom_3px">
            <div className="display__flex contract__payment">
                <div className="display__flex">
                    <p>Tập tin đính kèm</p>
                </div>
            </div>
            { renderUpload() }
            <div className="client__files" key={uuidv4()}>
                {renderFiles()}
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
                <ViewPDF key={uuidv4()} pdf={file} showModal={isShowModal} setIsShowModal={setIsShowModal} />
            </div>
        </div>
    )
}