import { DatePicker, Modal, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addContractRequest, updateContractRequest } from '../../../redux/features/contractSlice';
import { GET_PRODUCT_ATTRIBUTE, GET_PRODUCT_CHANNEL, GET_PRODUCT_LIST, GET_PRODUCT_LOCATION, GET_PRODUCT_TYPE } from '../../../title/title';
import { v4 as uuidv4 } from 'uuid';

export default function TermModal(props) {

  let { isShowModal, setIsShowModal, setDataToModal, productList, dataToModal, isUpdateModal, setIsUpdateModal} = props;
  const {RangePicker} = DatePicker;
  const {Option} = Select;
  const dispatch = useDispatch();
  const [valueModal, setValueModal] = useState({});
  const [channelID, setChannelID] = useState(null);
  const [locationID, setLocationID] = useState(null);
  const [typeID, setTypeID] = useState(null);
  const [attributeID, setAttributeID] = useState(null);
  const {productChannel, productLocation, productType, productAttribute} = useSelector(state => state.productReducer);
    
    useEffect(()=>{
        dispatch({
          type: GET_PRODUCT_CHANNEL,
          data: {page: 1, page_size: 1000}
        })
        dispatch({
          type: GET_PRODUCT_TYPE,
          data: {page: 1, page_size: 1000}
        })
        dispatch({
          type: GET_PRODUCT_ATTRIBUTE,
          data: {page: 1, page_size: 1000}
        })
    }, [])

    useEffect(()=>{
      if(typeof +channelID === "number" && channelID !== null){
        dispatch({
          type: GET_PRODUCT_LOCATION,
          data: {page: 1, page_size: 1000, channelID}
        })
        setLocationID(null)
      }
  }, [channelID])

  useEffect(()=>{
    dispatch({
      type: GET_PRODUCT_LIST,
      data: {page:1, pageSize: 1000, locationID, typeID, attributeID, channelID}
    });
    setValueModal({...valueModal, product_ID: null, real_price: ""})
  }, [locationID, typeID, attributeID, channelID])
  
  useEffect(()=>{
      if(isShowModal){
        setValueModal({...dataToModal})
        // setChannelID(dataToModal?.channelID)
        // setLocationID(dataToModal?.locationID)
        // setTypeID(dataToModal?.typeID)
        // setAttributeID(dataToModal?.attributeID)
      }
  }, [dataToModal, isShowModal])
  
  const handleCancel = () => {
    setIsShowModal(false);
    setValueModal({})
    setDataToModal({})
    setChannelID(null)
    setLocationID(null)
    setTypeID(null)
    setAttributeID(null)
  };

  const handleOK = ()=>{
    // let newDataTable = [...dataTable];
    // newDataTable.push(valueModal)
    // setDataTable([...newDataTable])
    if(window.location.href.includes("create")){
      // valueModal.channelID = channelID;
      // valueModal.locationID = locationID;
      // valueModal.typeID = typeID;
      // valueModal.attributeID = attributeID;
      valueModal.quality =  valueModal.quality || 0;
      if(!isUpdateModal){
        valueModal.id = uuidv4();
        valueModal.details = []
        dispatch(addContractRequest(valueModal))
        setIsUpdateModal(false)
      } else {
        dispatch(updateContractRequest(valueModal))
        setIsUpdateModal(false)
      }
    } else {

    }
    setIsShowModal(false);
    setValueModal({})
    setDataToModal({})
    setChannelID(null)
    setLocationID(null)
    setTypeID(null)
    setAttributeID(null)
  }

  const handleChange = (name, value)=>{
    if(name !== "" && name.length > 0){
      setValueModal({
        ...valueModal,
        [name]: value
      })
    }
  };

  const valueOfField = (name)=>{
    
    if(valueModal[name] && valueModal[name] !== "" && name !== "rangePicker" && valueModal[name] !== undefined){
      if(name === "real_price"){
        return new Intl.NumberFormat("vi-VN").format(valueModal[name])
      }
      return valueModal[name]
    } else if(name === "rangePicker" && valueModal["from_date"] && valueModal["to_date"]) {
      let newTuNgay = moment(new Date(valueModal["from_date"])).format("DD-MM-YYYY");
      let newDenNgay = moment(new Date(valueModal["to_date"])).format("DD-MM-YYYY");
      return [moment(newTuNgay, "DD-MM-YYYY"), moment(newDenNgay, "DD-MM-YYYY")]
    } else {
      if(name === "desc" || name === "real_price" || name === "quality"){
        return ""
      }
      return null
    }
  }

  const renderOptionProduct = ()=>{
    return productList?.map((item)=>{
      return <Option value={item.id}>{item.name}</Option>
    });
  }

  const renderOptionProductChannel = ()=>{
    return productChannel.map( channel => {
      return <Option value={channel.id}>{channel.name}</Option>
    } )
  };

  const renderOptionProductLocation = ()=>{
      return productLocation.map( location => {
          return <Option value={location.id}>{location.name}</Option>
      } ); 
  }

  const renderOptionProductType = ()=>{
    return productType.map( type => {
        return <Option value={type.id}>{type.name}</Option>
    } ); 
  };

  const renderOptionProductAttribute = ()=>{
    return productAttribute.map( att => {
        return <Option value={att.id}>{att.name}</Option>
    } ); 
  }

  return (
    <div className="modal__customer modal__term">
        <Modal
        title="Thêm quyền lợi hợp đồng"
        closeIcon={<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.61719 6.5L13.4609 11.3438C13.5911 11.474 13.5911 11.6172 13.4609 11.7734L12.5625 12.6719C12.4062 12.8021 12.263 12.8021 12.1328 12.6719L11.3125 11.8125L7.28906 7.82812L2.44531 12.6719C2.3151 12.8021 2.17188 12.8021 2.01562 12.6719L1.11719 11.7734C0.986979 11.6172 0.986979 11.474 1.11719 11.3438L5.96094 6.5L1.11719 1.65625C0.986979 1.52604 0.986979 1.38281 1.11719 1.22656L2.01562 0.328125C2.17188 0.197917 2.3151 0.197917 2.44531 0.328125L7.28906 5.17188L12.1328 0.328125C12.263 0.197917 12.4062 0.197917 12.5625 0.328125L13.4609 1.22656C13.5911 1.38281 13.5911 1.52604 13.4609 1.65625L12.6016 2.47656L8.61719 6.5Z" fill="black"/>
        </svg>}
        footer={
          <>
            <button type="button" className="ant-btn ant-btn-default btn__cancel" onClick={handleCancel} >
              <span>Hủy</span>
            </button>
            <button type="button" className="ant-btn ant-btn-default btn__add" onClick={handleOK}>
              <span>Thêm</span>
            </button> 
          </>
        }
        open={isShowModal}
        onCancel={handleCancel}>
              <div className="modal__content contract__service">
                   {/**
                   <div className="modal__field">
                   <input type="text" placeholder="Tên hạng mục"
                   name="desc"
                   value={valueOfField("desc")}
                   onChange={(e)=>{
                       let {value, name} = e.target;
                       handleChange(name, value)
                   }}
                   />
                 </div>
                  */}
                  <div className="modal__field field__select">
                  <div>
                    <label className="term__label">Chọn kênh sản phẩm</label>
                    <Select
                      className="style"
                      // placeholder="Chọn kênh sản phẩm"
                      showSearch
                      filterOption={(input, option) =>
                        (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                      }
                      value={channelID}
                      onChange={(value)=>{
                          setChannelID(value)
                      }}
                    >
                      {renderOptionProductChannel()}
                    </Select>
                  </div>
                </div>
                  <div className="modal__field field__select">
                    <div>
                      <label className="term__label">Chọn nhóm sản phẩm</label>
                      <Select
                        className="style"
                        // placeholder="Chọn nhóm sản phẩm"
                        showSearch
                        filterOption={(input, option) =>
                          (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                        }
                        value={locationID}
                        onChange={(value)=>{
                          setLocationID(value)
                        }}
                      >
                        {renderOptionProductLocation()}
                      </Select>
                    </div>
                  </div>
                  <div className="modal__field field__select">
                    <div>
                      <label className="term__label">Chọn loại sản phẩm</label>
                      <Select
                        className="style"
                        // placeholder="Chọn loại sản phẩm"
                        showSearch
                        filterOption={(input, option) =>
                          (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                        }
                        value={typeID}
                        onChange={(value)=>{
                          setTypeID(value)
                        }}
                      >
                        {renderOptionProductType()}
                      </Select>
                    </div>
                  </div>
                  <div className="modal__field field__select">
                    <div>
                      <label className="term__label">Chọn thuôc tính sản phẩm</label>
                      <Select
                        className="style"
                        // placeholder="Chọn thuôc tính sản phẩm"
                        showSearch
                        filterOption={(input, option) =>
                          (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                        }
                        value={attributeID}
                        onChange={(value)=>{
                          setAttributeID(value)
                        }}
                      >
                        {renderOptionProductAttribute()}
                      </Select>
                    </div>
                  </div>
                  <div className="modal__field field__select">
                    <div>
                      <label className="term__label">Chọn sản phẩm</label>
                      <Select
                        className="style"
                        showSearch
                        // placeholder="Chọn sản phẩm"
                        filterOption={(input, option) =>
                          (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                        }
                        value={valueOfField("product_ID")}
                        onChange={(value)=>{
                            // handleChange("product_ID", value)
                            let product = productList.find(item => item.id === value);
                            // handleChange("real_price", +product.product_price[0].price)
                            // let priceConvert = new Intl.NumberFormat("vi-VN",{currency: "VND"}).format(+product.price.price * 1000000);
                            setValueModal({
                              ...valueModal,
                              product_ID: value,
                              real_price: +product.price.price * 1000000,
                              price_ID: product.price.id
                            })
                        }}
                      >
                        {renderOptionProduct()}
                      </Select>
                    </div>
                  </div>
                  <div className="modal__field">
                    <input type="text"
                    name="real_price"
                    value={valueOfField("real_price")}
                    onChange={(e)=>{
                        // let {value, name} = e.target;
                        // handleChange(name, +value)
                    }}
                    disabled
                    />
                    <label>Đơn giá</label>
                  </div>
                  <div className="modal__field">
                    <input type="text"
                    name="quality"
                    value={valueOfField("quality")}
                    onChange={(e)=>{
                        let {value, name} = e.target;
                        handleChange(name, +value)
                    }}
                    // disabled
                    />
                    <label>Số lượng</label>
                  </div>
                 {/**
                 <div className="modal__field">
                    <RangePicker 
                    format={"DD-MM-YYYY"}
                    suffixIcon={<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.625 9H3.375C3.125 9 3 8.875 3 8.625V7.375C3 7.125 3.125 7 3.375 7H4.625C4.875 7 5 7.125 5 7.375V8.625C5 8.875 4.875 9 4.625 9ZM8 8.625C8 8.875 7.875 9 7.625 9H6.375C6.125 9 6 8.875 6 8.625V7.375C6 7.125 6.125 7 6.375 7H7.625C7.875 7 8 7.125 8 7.375V8.625ZM11 8.625C11 8.875 10.875 9 10.625 9H9.375C9.125 9 9 8.875 9 8.625V7.375C9 7.125 9.125 7 9.375 7H10.625C10.875 7 11 7.125 11 7.375V8.625ZM8 11.625C8 11.875 7.875 12 7.625 12H6.375C6.125 12 6 11.875 6 11.625V10.375C6 10.125 6.125 10 6.375 10H7.625C7.875 10 8 10.125 8 10.375V11.625ZM5 11.625C5 11.875 4.875 12 4.625 12H3.375C3.125 12 3 11.875 3 11.625V10.375C3 10.125 3.125 10 3.375 10H4.625C4.875 10 5 10.125 5 10.375V11.625ZM11 11.625C11 11.875 10.875 12 10.625 12H9.375C9.125 12 9 11.875 9 11.625V10.375C9 10.125 9.125 10 9.375 10H10.625C10.875 10 11 10.125 11 10.375V11.625ZM14 3.5V14.5C14 14.9167 13.8542 15.2708 13.5625 15.5625C13.2708 15.8542 12.9167 16 12.5 16H1.5C1.08333 16 0.729167 15.8542 0.4375 15.5625C0.145833 15.2708 0 14.9167 0 14.5V3.5C0 3.08333 0.145833 2.72917 0.4375 2.4375C0.729167 2.14583 1.08333 2 1.5 2H3V0.375C3 0.125 3.125 0 3.375 0H4.625C4.875 0 5 0.125 5 0.375V2H9V0.375C9 0.125 9.125 0 9.375 0H10.625C10.875 0 11 0.125 11 0.375V2H12.5C12.9167 2 13.2708 2.14583 13.5625 2.4375C13.8542 2.72917 14 3.08333 14 3.5ZM12.5 14.3125V5H1.5V14.3125C1.5 14.4375 1.5625 14.5 1.6875 14.5H12.3125C12.4375 14.5 12.5 14.4375 12.5 14.3125Z" fill="#666666" fillOpacity="0.6"/>
                    </svg>}
                    className='style' 
                    placeholder={['Ngày đăng', "Kết thúc"]}
                    value={valueOfField("rangePicker")}
                    onChange={(date, dateString)=>{
                      console.log(dateString)
                      let ngayDang = moment(dateString[0], "DD-MM-YYYY").toISOString();
                      let ngayKetThuc = moment(dateString[1], "DD-MM-YYYY").toISOString();
                      setValueModal({
                        ...valueModal,
                        from_date: ngayDang,
                        to_date: ngayKetThuc
                      })
                    }}
                    />
                  </div>
                */}
                 {/**
                 <div className="modal__field">
                 <input type="text" placeholder="Nội dung"
                 name="desc"
                 value={valueOfField("desc")}
                 onChange={(e)=>{
                     let {value, name} = e.target;
                     handleChange(name, value)
                 }}
                 />
               </div>
                  */}
                
                  {/**
                      <div className="modal__field">
                    <input type="text" placeholder="Ghi chú" />
                  </div>
                */}
              </div>
        </Modal>
    </div>
  )
}
