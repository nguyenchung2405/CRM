import { Image, Modal, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { CREATE_CUSTOMER, GET_CUSTOMER_DETAIL, GET_CUSTOMER_TYPE_LIST, GET_JOB_TYPE_LIST, regexEmail, regexPhone, UPDATE_CUSTOMER } from '../../title/title';
import { checkMicroFe } from '../../untils/helper';
import ViewPDF from '../ViewPDF';
import SelectType from './SelectType';

export default function CreateCustomer(props) {

    let uri = checkMicroFe() === true ? "/contract-service" : "";
    let uri_file = checkMicroFe() === true ? 
                                    window.location.href.includes("dev") ?
                                    "https://crmservice-dev.tuoitre.vn/" : "https://crmservice-staging.tuoitre.vn/"
                                    : "http://localhost:3003/";
    const {client_id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [valueRadio, setValueRadio] = useState(false);
    let [valueForm, setValueForm] = useState({is_company: false});
    let [isShowModal, setIsShowModal] = useState(false);
    let [file, setFile] = useState("");
    let [validateForm, setValidateForm] = useState({email: false, phone: false,represent_phone: false, represent_email: false });
    const {isCreateCustomer, dataCustomer, customerTypeList, jobTypeList} = useSelector(state => state.customerReducer)
    
    useEffect(()=>{
      dispatch({
        type: GET_CUSTOMER_TYPE_LIST,
        data: { page: 1, page_size: 100, name: "", sort_by: "id", asc_order: false,}
      })
      dispatch({
        type: GET_JOB_TYPE_LIST,
        data: { page:1 , page_size: 100, name: "", sort_by: "id", asc_order: false,}
      })
    }, [])
    
    useEffect(()=>{
      if(client_id && dataCustomer === null){
          dispatch({
            type: GET_CUSTOMER_DETAIL,
            client_id
          })
      }
    }, [client_id, dataCustomer])

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
        setValidateForm({email: false, phone: false})
        setValueForm({is_company: false})
        navigate(`${uri}/crm/customer`, {replace: true})
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
        navigate(`${uri}/crm/customer`, {replace: true})
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
      setValidateForm({email: false, phone: false,represent_phone: false, represent_email: false })
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
      if(validateForm[nameOfField] && nameOfField.includes("phone")){
          return <p className="required__field">* Số điện thoại không hợp lệ. (Bắt đầu bằng 0 hoặc 84 + 9 số)</p>
      } else if(validateForm[nameOfField]){
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
      if(name.includes("phone")){
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
      } else if(name.includes("email")){
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

    const renderInforBusiness = ()=>{
        return <div className={!valueRadio ? "showInforBusiness" : ""}>
          <div className="modal__two__field">
            <div className="field__input width__241">
                <input type="text" name="representative" 
                    value={valueOfField("representative")}
                    onChange={handleChangeInput} 
                    />
                <label>Người đại diện</label>
            </div>
            <div className="field__input width__241">
                <input type="text" name="represent_position" 
                    value={valueOfField("represent_position")}
                    onChange={handleChangeInput} 
                />
                <label>Chức vụ</label>
            </div>
          </div>
          <div className="modal__field">
              <input type="text" name="represent_addr" 
              value={valueOfField("represent_addr")}
              onChange={handleChangeInput} 
              />
              <label>Địa chỉ (người đại diện)</label>
          </div>
          <div className="modal__field">
              <input type="text" name="represent_phone" 
              value={valueOfField("represent_phone")}
              onBlur={regexValue}
              onChange={handleChangeInput} 
              />
              <label>Số điện thoại (người đại diện)</label>
              {validateForm?.represent_phone ? showRemind("represent_phone") : ""}
          </div>
          <div className="modal__field">
              <input type="text" name="represent_email" 
              value={valueOfField("represent_email")}
              onBlur={regexValue}
              onChange={handleChangeInput} 
              />
              <label>Email (người đại diện)</label>
              {validateForm?.represent_email ? showRemind("represent_email") : ""}
          </div>
        </div>
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
                    <div className="field__input width__241">
                        <input type="text" name="name" 
                        value={valueOfField("name")}
                        onChange={handleChangeInput} />
                        <label>Tên khách hàng</label>
                    </div>
                    <div className="field__input width__241">
                        <input type="text" name="brief_name" 
                        value={valueOfField("brief_name")}
                        onChange={handleChangeInput} />
                        <label>Tên viết tắt</label>
                    </div>
                </div>
                <div className="modal__field__select">
                    <label>Loại khách hàng</label>
                    <SelectType list={customerTypeList} valueForm={valueForm} setValueForm={setValueForm} />
                </div>
                <div className="modal__field__select">
                    <label>Loại ngành nghề</label>
                    <SelectType list={jobTypeList} mode="multiple" valueForm={valueForm} setValueForm={setValueForm} />
                    {/** <SelectType list={jobTypeList} mode="tags" valueForm={valueForm} setValueForm={setValueForm} /> */}
                </div>
                {/**
                  <div className="modal__field">
                        <input type="text" name="business_type"
                        value={valueOfField("business_type")}
                        onChange={handleChangeInput} 
                        />
                    <label className="customer__select__label">Loại ngành nghề</label>
                </div>
              */}
                <div className="modal__field">
                    <input type="text" name="address" 
                    value={valueOfField("address")}
                    onChange={handleChangeInput} />
                    <label>Địa chỉ</label>
                </div>
                <div className="modal__field">
                    <input type="text" name="tax_number" 
                    value={valueOfField("tax_number")}
                    onChange={handleChangeInput} />
                    <label>Mã số thuế</label>
                </div>
                <div className="modal__field">
                    <input type="text" name="phone" 
                    value={valueOfField("phone")}
                    onBlur={regexValue}
                    onChange={handleChangeInput} />
                    <label>Số điện thoại</label>
                    {validateForm?.phone ? showRemind("represent_phone") : ""}
                </div>
                <div className="modal__field">
                    <input type="text" name="email" 
                    value={valueOfField("email")}
                    onBlur={regexValue}
                    onChange={handleChangeInput} />
                    <label>Email</label>
                    {validateForm?.email ? showRemind("represent_email") : ""}
                </div>
                { renderInforBusiness() }
                <div className="modal__upload">
                    <span>Tài liệu liên quan</span>
                    {client_id && typeof +client_id === "number"
                    ? ""
                    :   <>
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
                          <input id="upload" type="file" 
                          multiple 
                          accept="application/pdf, application/msword, image/png, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={e => {
                                let files = e.target.files;
                                setValueForm({...valueForm, files})
                          }} /> 
                        </>
                      }
                </div>
                <div className="client__files">
                    { dataCustomer?.files?.map(file => {
                      if(file.includes("doc") || file.includes("docx")){
                        return <a className="dowload__file" href={uri_file + file}>Tải file word</a>
                      } else if(file.includes("pdf")) {
                        return <>
                            <button onClick={()=>{
                              setIsShowModal(true)
                              setFile(uri_file + file)
                            }}>Xem PDF</button>
                        </>
                      } else {
                        return <Image src={uri_file + file} />
                      }
                    }) }
                    <ViewPDF pdf={file} showModal={isShowModal} setIsShowModal={setIsShowModal} />
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