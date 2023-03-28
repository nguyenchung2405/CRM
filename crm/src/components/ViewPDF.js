import React from 'react'
import { Modal } from 'antd';
export default function ViewPDF(props) {

    const {pdf, showModal, setIsShowModal} = props;

    const handleOk = () => {
      setIsShowModal(false);
    };
    const handleCancel = () => {
      setIsShowModal(false);
    };

    return (
        <Modal className="modal__hidden" open={showModal} onOk={handleOk} onCancel={handleCancel} footer={null} closable={false}
        style={{
            top: 0,
          }} >
            <embed type="application/pdf" width="100%" height="100%" src={encodeURI(pdf)} ></embed>
      </Modal>
    )
}