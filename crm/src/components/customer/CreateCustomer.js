import { Image, message, Modal, Radio, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { CREATE_CUSTOMER, GET_CUSTOMER_DETAIL, GET_CUSTOMER_TYPE_LIST, GET_JOB_TYPE_LIST, local, regexEmail, regexPhone, UPDATE_CUSTOMER } from '../../title/title';
import { checkMicroFe } from '../../untils/helper';
import ViewPDF from '../ViewPDF';
import SelectType from './SelectType';
import {v4 as uuidv4} from "uuid"
import { FcImageFile } from 'react-icons/fc';
import ViewDoc from '../ViewDoc';
import word from "../../img/doc.png"
import pdf from "../../img/pdf.png";
import Contacter from './Contacter';
import UploadFile from "./Upload"
import axios from 'axios';

export default function CreateCustomer() {

    let uri = checkMicroFe() === true ? "/contract-service" : "";
    let uri_file = checkMicroFe() === true ? 
                                    window.location.href.includes("dev") ?
                                    "https://crmservice-dev.tuoitre.vn/" : "https://crmservice-staging.tuoitre.vn/"
                                    : "http://localhost:3003/";
    const {client_id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    let [valueRadio, setValueRadio] = useState(false);
    let [valueForm, setValueForm] = useState({is_company: false});
    let [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalWord, setIsShowModalWord] = useState(false);
    const [imageVisible, setImageVisible] = useState(false);
    let [file, setFile] = useState("");
    let [validateForm, setValidateForm] = useState({email: false, phone: false});
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
        history.replace(`${uri}/crm/customer`)
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
        history.replace(`${uri}/crm/customer`)
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
      setValidateForm({email: false, phone: false })
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
      let newValiDateForm = valueForm.is_company ? {...validateForm} : {email: false, phone: false}
      console.log(validateForm)
      for(let vali in newValiDateForm){
        if(vali.includes("phone")){
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
        if(vali.includes("email")){
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
              // onBlur={regexValue}
              onChange={(e)=>{
                let {value} = e.target;
                if (value.length >= 10) {
                  if (regexPhone.test(value)) {
                    handleChangeInput(e)
                  } else {
                    message.error("Số điện thoại không phù hợp")
                  }
                } else {
                  handleChangeInput(e)
                }
              }} 
              />
              <label>Số điện thoại (người đại diện)</label>
              {/* validateForm?.represent_phone ? showRemind("represent_phone") : "" */}
          </div>
          <div className="modal__field">
              <input type="text" name="represent_email" 
              value={valueOfField("represent_email")}
              // onBlur={regexValue}
              onChange={handleChangeInput} 
              />
              <label>Email (người đại diện)</label>
              {/* validateForm?.represent_email ? showRemind("represent_email") : "" */}
          </div>
          <Contacter
            valueForm={valueForm}
            setValueForm={setValueForm}
            handleChangeInput={handleChangeInput}
            valueOfField={valueOfField}
          />
        </div>
    }
    
    const deletePathOfFile = (index)=>{
      axios({
        url: `${local}/api/remove-file`,
        method: "DELETE",
        data: {path: valueForm.files[index]}
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

    const renderFiles = ()=>{
      if(valueForm?.files?.length > 0){
        return valueForm?.files?.map((file, indexFile) => {
          // if(file.includes("doc") || file.includes("docx")){
          //   return <a key={uuidv4()} className="dowload__file" href={uri_file + file}>Tải file word</a>
          // } else if(file.includes("pdf")) {
          //   return <>
          //       <button key={uuidv4()} onClick={()=>{
          //         setIsShowModal(true)
          //         setFile(uri_file + file)
          //       }}>Xem PDF</button>
          //   </>
          // } else {
          //   return <Image key={uuidv4()} src={uri_file + file} />
          // }
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
              <svg onClick={()=>{ deletePathOfFile(indexFile) }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
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
              <svg onClick={()=>{ deletePathOfFile(indexFile) }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
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
              <svg onClick={()=>{ deletePathOfFile(indexFile) }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
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
    <div className="modal__customer content create__customer">
      <div>
        <Radio.Group
          onChange={handleChangeRadio}
          value={valueRadio} >
          <Radio value={false}>Cá nhân</Radio>
          <Radio value={true}>Tổ chức</Radio>
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
            {validateForm?.phone ? showRemind("phone") : ""}
          </div>
          <div className="modal__field">
            <input type="text" name="email"
              value={valueOfField("email")}
              onBlur={regexValue}
              onChange={handleChangeInput} />
            <label>Email</label>
            {validateForm?.email ? showRemind("email") : ""}
          </div>
          {renderInforBusiness()}
          <div className="modal__upload">
            <span>Tài liệu liên quan</span>
            <UploadFile setValueForm={setValueForm} />
            { /*  client_id && typeof +client_id === "number"
              ? ""
              : 
              // <>
              //   <label htmlFor="upload">
              //     <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              //       <path d="M5 11L11 11" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" />
              //       <path d="M5 7L9 7" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" />
              //       <path d="M5 15L9 15" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" />
              //       <path d="M15 11V12C15 13.8613 15 14.7919 14.7553 15.5451C14.2607 17.0673 13.0673 18.2607 11.5451 18.7553C10.7919 19 9.86128 19 8 19V19C6.13872 19 5.20808 19 4.45492 18.7553C2.93273 18.2607 1.73931 17.0673 1.24472 15.5451C1 14.7919 1 13.8613 1 12V7C1 6.07099 1 5.60649 1.06156 5.21783C1.40042 3.07837 3.07837 1.40042 5.21783 1.06156C5.60649 1 6.07099 1 7 1V1" stroke="#CCCCCC" strokeWidth="2" />
              //       <path d="M14 1L14 7" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" />
              //       <path d="M17 4L11 4" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" />
              //     </svg>
              //     <br />
              //     <span>Tải tài liệu</span>
              //   </label>
              //   <input id="upload" type="file"
              //     multiple
              //     accept="application/pdf, application/msword, image/png, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/jpg, image/gif"
              //     onChange={e => {
              //       let files = e.target.files;
              //       setValueForm({ ...valueForm, files })
              //     }} />
              // </>
            */   }
          </div>
          <div className="client__files" key={uuidv4()}>
            {
              client_id && typeof +client_id === "number"
                ?
                <>
                  {renderFiles()}
                </>
                : <></>
            }
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
        <div className="contract__service__footer">
          <button type="button" className="ant-btn ant-btn-default btn__cancel" onClick={handleCancel}>
            <span>Hủy</span>
          </button>
          <button type="button" className="ant-btn ant-btn-default btn__add" onClick={handleOk} >
            <span>{window.location.href.includes("/customer/create") ? "Thêm" : "Cập nhật"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}