import { Modal, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { CREATE_CUSTOMER, regexEmail, regexPhone, UPDATE_CUSTOMER } from '../../title/title';

export default function ModalCustomer(props) {

    const dispatch = useDispatch()
    let {title, isShowModal, setIsShowModal, dataToModal, setIsShowModalUpdate} = props;
    let [valueRadio, setValueRadio] = useState(false);
    let [valueForm, setValueForm] = useState({is_company: false});
    let [validateForm, setValidateForm] = useState({email: false, phone: false});
    // console.log(validateForm)
    useEffect(()=>{
        setValueForm({...dataToModal})
    }, [dataToModal]);

    const handleCancel = () => {
      if(title === "Khách hàng mới"){
        setIsShowModal(false);
        setValidateForm({email: false, phone: false})
      } else if(title === "Cập nhật khách hàng"){
        setIsShowModalUpdate(false);
        setValidateForm({email: false, phone: false})
      }
      setValueForm({is_company: false})
    };

    const handleOk = ()=>{
      let check = checkValueForm();
      if(!check){
        if(title === "Khách hàng mới"){
          dispatch({
            type: CREATE_CUSTOMER,
            data: valueForm
          });
          setIsShowModal(false);
        } else if(title === "Cập nhật khách hàng"){
          dispatch({
            type: UPDATE_CUSTOMER,
            data: valueForm
          });
          setIsShowModalUpdate(false);
        }
        setValueForm({is_company: false})
      }
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
    };

    const checkValueForm = ()=>{
      let check = true;
      let newValidate = {};
      for(let vali in validateForm){
        if(vali === "phone"){
            if(valueForm[vali] && valueForm[vali] !== "" && valueForm[vali] !== undefined){
                if(regexPhone.test(valueForm[vali])){
                  newValidate = {...newValidate, [vali]: false}
                  check = false;
                  console.log("phone")
                } else {
                  newValidate = {...newValidate, [vali]: true}
                  check = true;
                }
            } else {
              newValidate = {...newValidate, [vali]: true}
              check = true;
            }
        } 
        if(vali === "email"){
          if(valueForm[vali] && valueForm[vali] !== "" && valueForm[vali] !== undefined){
              if(regexEmail.test(valueForm[vali])){
                newValidate = {...newValidate, [vali]: false}
                check = false;
                console.log("email")
              } else {
                newValidate = {...newValidate, [vali]: true}
                check = true;
              }
          } else {
              newValidate = {...newValidate, [vali]: true}
              check = true;
          } 
        }
      }
      setValidateForm({...newValidate})
      if(newValidate.email || newValidate.phone){
        check = true;
      }
      return check;
    };

    const showRemind = (nameOfField)=>{
      if(nameOfField === "phone" && validateForm[nameOfField]){
          return <p className="required__field">* Số điện thoại không hợp lệ. (Bắt đầu bằng 0 hoặc 84 + 9 số)</p>
      } else if(nameOfField === "email" && validateForm[nameOfField]){
        return <p className="required__field">* Email không hợp lệ</p>
      }
      
    }

    const valueOfField = (name)=>{
      if(valueForm[name] && valueForm[name] !== "" && valueForm[name] !== undefined){
        return valueForm[name]
      } else {
        return ""
      }
    };

    const regexValue = (e)=>{
      let {value, name} = e.target;
      if(name=== "phone"){
          if(regexPhone.test(value)){
            setValidateForm({
              ...validateForm,
              [name]: false
            });
          } else {
            setValidateForm({
              ...validateForm,
              [name]: true
            });
          }
      } else if(name === "email"){
        if(regexEmail.test(value)){
          setValidateForm({
            ...validateForm,
            [name]: false
          });
        } else {
          setValidateForm({
            ...validateForm,
            [name]: true
          });
        }
      }
    }

    const renderContentModal = ()=>{
      if(title === "Khách hàng mới"){
        return  <Modal
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
                    <input type="text" placeholder="Tên khách hàng" name="name" 
                    value={valueOfField("name")}
                    onChange={handleChangeInput} />
                  </div>
                  <div className="modal__field">
                    <input type="text" placeholder="Địa chỉ" name="address" 
                    value={valueOfField("address")}
                    onChange={handleChangeInput} />
                  </div>
                  <div className="modal__field">
                    <input type="text" placeholder="Mã số thuế" name="tax_number" 
                    value={valueOfField("tax_number")}
                    onChange={handleChangeInput} />
                  </div>
                  <div className="modal__field">
                    <input type="text" placeholder="Số điện thoại" name="phone" 
                    value={valueOfField("phone")}
                    onBlur={regexValue}
                    onChange={handleChangeInput} />
                    {validateForm?.phone ? showRemind("phone") : ""}
                  </div>
                  <div className="modal__field">
                    <input type="text" placeholder="Email" name="email" 
                    value={valueOfField("email")}
                    onBlur={regexValue}
                    onChange={handleChangeInput} />
                    {validateForm?.email ? showRemind("email") : ""}
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
      } else if(title === "Cập nhật khách hàng"){
        return <Modal
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
              <span>Cập nhật</span>
            </button> 
          </div>
        }
        open={isShowModal}
        onCancel={handleCancel}>
            <Radio.Group 
              onChange={handleChangeRadio} 
              value={valueForm["is_company"]} >
                <Radio value={false}>Cá nhân</Radio>
                <Radio value={true}>Doanh nghiệp</Radio>
            </Radio.Group>
            <div className="modal__content">
                  <div className="modal__field">
                    <input type="text" placeholder="Tên khách hàng" name="name" 
                    value={valueOfField("name")}
                    onChange={handleChangeInput} />
                  </div>
                  <div className="modal__field">
                    <input type="text" placeholder="Địa chỉ" name="address" 
                    value={valueOfField("address")}
                    onChange={handleChangeInput} />
                  </div>
                  <div className="modal__field">
                    <input type="text" placeholder="Mã số thuế" name="tax_number" 
                    value={valueOfField("tax_number")}
                    onChange={handleChangeInput} />
                  </div>
                  <div className="modal__field">
                    <input type="text" placeholder="Số điện thoại" name="phone" 
                    value={valueOfField("phone")}
                    onBlur={regexValue}
                    onChange={handleChangeInput} />
                    {validateForm?.phone ? showRemind("phone") : ""}
                  </div>
                  <div className="modal__field">
                    <input type="text" placeholder="Email" name="email" 
                    value={valueOfField("email")}
                    onBlur={regexValue}
                    onChange={handleChangeInput} />
                    {validateForm?.email ? showRemind("email") : ""}
                  </div>
            </div>
        </Modal>
      }
    }

  return (
    <div className="modal__customer">
       {renderContentModal()}
    </div>
  )
}
