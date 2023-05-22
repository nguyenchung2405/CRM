import { DatePicker, Modal, Select } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux';
import { CREATE_EXPORT_RECEIPT } from '../../title/title';

export default function CancelReceiptModal(props) {
    
    // const {isShowModal, setIsShowModal} = props;
    const {isShowModal, setIsShowModal, setIsExportReceipt} = props;
    const dispatch = useDispatch();

    const handleCancel = ()=>{
        setIsShowModal(false)
    }

    const handleOk = ()=>{
        setIsShowModal(false)
        setIsExportReceipt(false)
        // dispatch({
        //     type: CREATE_EXPORT_RECEIPT,
        //     data: true
        // })
    }

  return (
    <Modal
            title={<span>Hủy hóa đơn</span>}
            closeIcon={<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.61719 6.5L13.4609 11.3438C13.5911 11.474 13.5911 11.6172 13.4609 11.7734L12.5625 12.6719C12.4062 12.8021 12.263 12.8021 12.1328 12.6719L11.3125 11.8125L7.28906 7.82812L2.44531 12.6719C2.3151 12.8021 2.17188 12.8021 2.01562 12.6719L1.11719 11.7734C0.986979 11.6172 0.986979 11.474 1.11719 11.3438L5.96094 6.5L1.11719 1.65625C0.986979 1.52604 0.986979 1.38281 1.11719 1.22656L2.01562 0.328125C2.17188 0.197917 2.3151 0.197917 2.44531 0.328125L7.28906 5.17188L12.1328 0.328125C12.263 0.197917 12.4062 0.197917 12.5625 0.328125L13.4609 1.22656C13.5911 1.38281 13.5911 1.52604 13.4609 1.65625L12.6016 2.47656L8.61719 6.5Z" fill="black" />
            </svg>}
            footer={
                <div className="contract__service__footer">
                    <button type="button" className="ant-btn ant-btn-default btn__cancel" onClick={handleCancel}>
                        <span>Hủy</span>
                    </button>
                    <button type="button" className="ant-btn ant-btn-default btn__add" onClick={handleOk} >
                        <span>Xác nhận</span>
                    </button>
                </div>
            }
            open={isShowModal}
            onCancel={handleCancel}
        >
        <div className="modal__content contract__service cancel__receipt__modal">          
              <div className="modal__field field__select modal__report__upload">
                  <div className="modal__field">
                      <p>Lý do</p>
                      <textarea></textarea>
                  </div>
              </div>
          </div>
    </Modal>
  )
}