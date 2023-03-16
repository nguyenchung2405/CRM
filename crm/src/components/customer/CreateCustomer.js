import { Modal, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CREATE_CUSTOMER, regexEmail, regexPhone, UPDATE_CUSTOMER } from '../../title/title';

export default function CreateCustomer(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [valueRadio, setValueRadio] = useState(false);
    let [valueForm, setValueForm] = useState({is_company: false});
    let [validateForm, setValidateForm] = useState({email: false, phone: false});
    const {isCreateCustomer, dataCustomer} = useSelector(state => state.customerReducer)
    // console.log(valueForm)
    useEffect(()=>{
        if(isCreateCustomer){
            setValueForm({is_company: false})
            setValueRadio(false)
        } else {
            setValueForm({...dataCustomer})
        }
        if(dataCustomer?.is_company){
            setValueRadio(dataCustomer.is_company)
        } else {
            setValueRadio(false)
        }
    }, [dataCustomer]);

    const handleCancel = () => {
    //   if(title === "Khách hàng mới"){
    //     setValidateForm({email: false, phone: false})
    //   } else if(title === "Cập nhật khách hàng"){
    //     setValidateForm({email: false, phone: false})
    //   }
        setValidateForm({email: false, phone: false})
        setValueForm({is_company: false})
        navigate("/crm/customer", {replace: true})
    };

    const handleOk = ()=>{
      let check = checkValueForm();
      if(!check){
        if(window.location.href.includes("/customer/create") || isCreateCustomer){
          dispatch({
            type: CREATE_CUSTOMER,
            data: valueForm
          });
        } else if(window.location.href.includes("/customer/update") || !isCreateCustomer){
          dispatch({
            type: UPDATE_CUSTOMER,
            data: valueForm
          });
        }
        navigate("/crm/customer", {replace: true})
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
                  // console.log("phone")
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
                // console.log("email")
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

  return (
    <div className="modal__customer content create__customer">
        <div>
            <Radio.Group 
            onChange={handleChangeRadio} 
            value={valueRadio} >
                <Radio value={false}>Cá nhân</Radio>
                <Radio value={true}>Doanh nghiệp</Radio>
            </Radio.Group>
            <div className="modal__content">
                <div className="modal__two__field">
                    <input type="text" placeholder="Tên khách hàng" name="name" 
                        value={valueOfField("name")}
                        onChange={handleChangeInput} />
                    <input type="text" placeholder="Tên viết tắt" name="brief_name" 
                    value={valueOfField("brief_name")}
                    onChange={handleChangeInput} />
                </div>
                <div className="modal__field">
                    <input type="text" placeholder="Loại ngành nghề" name="address" 
                    // value={valueOfField("address")}
                    // onChange={handleChangeInput} 
                    />
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
                <div className="modal__field">
                    <input type="text" placeholder="Người phụ trách" name="tax_number" 
                    // value={valueOfField("tax_number")}
                    // onChange={handleChangeInput} 
                    />
                </div>
                {
                  valueRadio 
                  ? 
                  <>
                    <div className="modal__two__field">
                      <input type="text" placeholder="Người đại diện" name="name" 
                          // value={valueOfField("name")}
                          // onChange={handleChangeInput} 
                          />
                      <input type="text" placeholder="Chức vụ" name="brief_name" 
                          // value={valueOfField("brief_name")}
                          // onChange={handleChangeInput} 
                      />
                    </div>
                    <div className="modal__field">
                        <input type="text" placeholder="Địa chỉ (người đại diện)" name="address" 
                        // value={valueOfField("address")}
                        // onChange={handleChangeInput} 
                        />
                    </div>
                    <div className="modal__field">
                        <input type="text" placeholder="Số điện thoại (người đại diện)" name="phone" 
                        // value={valueOfField("phone")}
                        // onBlur={regexValue}
                        // onChange={handleChangeInput} 
                        />
                        {/*validateForm?.phone ? showRemind("phone") : ""*/}
                    </div>
                    <div className="modal__field">
                        <input type="text" placeholder="Email (người đại diện)" name="email" 
                        // value={valueOfField("email")}
                        // onBlur={regexValue}
                        // onChange={handleChangeInput} 
                        />
                        {/*validateForm?.email ? showRemind("email") : ""*/}
                    </div>
                  </>
                  : ""
                }
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
            <div className="contract__service__footer">
            <button type="button" className="ant-btn ant-btn-default btn__cancel" onClick={handleCancel}>
              <span>Hủy</span>
            </button>
            <button type="button" className="ant-btn ant-btn-default btn__add" onClick={handleOk} >
              <span>{ window.location.href.includes("/customer/create") ? "Thêm" : "Cập nhật"}</span>
            </button> 
          </div>
        </div>
    </div>
  )
}
