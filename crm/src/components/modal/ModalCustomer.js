import { Modal, Radio } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { CREATE_CUSTOMER } from '../../title/title';

export default function ModalCustomer(props) {

    const dispatch = useDispatch()
    let {title, isShowModal, setIsShowModal} = props;
    let [valueRadio, setValueRadio] = useState(false);
    let [valueForm, setValueForm] = useState({is_company: false});
    // console.log(valueForm)
    const handleCancel = () => {
      setIsShowModal(false);
    };

    const handleOk = ()=>{
      dispatch({
        type: CREATE_CUSTOMER,
        data: valueForm
      });
      setIsShowModal(false);
    }

    const handleChangeRadio = (e)=>{
      let {value} = e.target;
      setValueRadio(value)
      setValueForm({
        ...valueForm,
        is_company: value
      })
    }

    const handleChangeInput = (e)=>{
      let {value, name} = e.target;
      setValueForm({
        ...valueForm,
        [name]: value
      })
    }

  return (
    <div className="modal__customer">
        <Modal
        title={<span>{title}</span>}
        closeIcon={<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.61719 6.5L13.4609 11.3438C13.5911 11.474 13.5911 11.6172 13.4609 11.7734L12.5625 12.6719C12.4062 12.8021 12.263 12.8021 12.1328 12.6719L11.3125 11.8125L7.28906 7.82812L2.44531 12.6719C2.3151 12.8021 2.17188 12.8021 2.01562 12.6719L1.11719 11.7734C0.986979 11.6172 0.986979 11.474 1.11719 11.3438L5.96094 6.5L1.11719 1.65625C0.986979 1.52604 0.986979 1.38281 1.11719 1.22656L2.01562 0.328125C2.17188 0.197917 2.3151 0.197917 2.44531 0.328125L7.28906 5.17188L12.1328 0.328125C12.263 0.197917 12.4062 0.197917 12.5625 0.328125L13.4609 1.22656C13.5911 1.38281 13.5911 1.52604 13.4609 1.65625L12.6016 2.47656L8.61719 6.5Z" fill="black"/>
        </svg>}
        footer={
          <div className="contract__service__footer">
            <button type="button" className="ant-btn ant-btn-default btn__cancel" onClick={handleCancel}>
              <span>Hủy</span>
            </button>
            <button type="button" className="ant-btn ant-btn-default btn__add" onClick={handleOk} >
              <span>Thêm</span>
            </button> 
          </div>
        }
        open={isShowModal}
        onCancel={handleCancel}>
              <Radio.Group 
                onChange={handleChangeRadio} 
                value={valueRadio} >
                  <Radio value={false}>Cá nhân</Radio>
                  <Radio value={true}>Doanh nghiệp</Radio>
              </Radio.Group>
              <div className="modal__content">
                  <div className="modal__field">
                    <input type="text" placeholder="Tên khách hàng" name="name" onChange={handleChangeInput} />
                  </div>
                  <div className="modal__field">
                    <input type="text" placeholder="Địa chỉ" name="address" onChange={handleChangeInput} />
                  </div>
                  <div className="modal__field">
                    <input type="text" placeholder="Mã số thuế" name="tax_number" onChange={handleChangeInput} />
                  </div>
                  <div className="modal__field">
                    <input type="text" placeholder="Số điện thoại" name="phone" onChange={handleChangeInput} />
                  </div>
                  <div className="modal__field">
                    <input type="text" placeholder="Email" name="email" onChange={handleChangeInput} />
                  </div>
                  <div className="modal__upload">
                      <span>Giấy tờ</span>
                      <label htmlFor="upload">
                          <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 11L11 11" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M5 7L9 7" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M5 15L9 15" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M15 11V12C15 13.8613 15 14.7919 14.7553 15.5451C14.2607 17.0673 13.0673 18.2607 11.5451 18.7553C10.7919 19 9.86128 19 8 19V19C6.13872 19 5.20808 19 4.45492 18.7553C2.93273 18.2607 1.73931 17.0673 1.24472 15.5451C1 14.7919 1 13.8613 1 12V7C1 6.07099 1 5.60649 1.06156 5.21783C1.40042 3.07837 3.07837 1.40042 5.21783 1.06156C5.60649 1 6.07099 1 7 1V1" stroke="#CCCCCC" strokeWidth="2"/>
                            <path d="M14 1L14 7" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M17 4L11 4" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <br/>
                          <span>Tải tài liệu</span>
                      </label>  
                    <input id="upload" type="file" />
                  </div>
              </div>
        </Modal>
    </div>
  )
}
