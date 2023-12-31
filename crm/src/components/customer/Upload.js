import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export default function UploadFile({setValueForm, accept}) {

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const { clearDataModal } = useSelector(state => state.acceptanceReducer);

  useEffect(()=>{
    if(clearDataModal){
      setFileList([])
    }
  }, [clearDataModal])

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
    if(window.location.href.includes("crm/detail")){
      setValueForm((prev) => { return { ...prev, files: uploadFiles } });
    } else {
      if(window.location.href.includes("update")){
        setValueForm((prev) => { return { ...prev, filesUpdate: uploadFiles } });
      } else {
        setValueForm((prev) => { return { ...prev, files: uploadFiles } });
      }
    }
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

  return (
    <>
      <Upload
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        multiple={true}
        beforeUpload={(file, fileList)=> false }
        showUploadList={{
            showPreviewIcon: true
        }}
        accept={accept}
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
  )
}
