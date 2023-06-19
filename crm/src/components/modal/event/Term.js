import { DatePicker, Modal, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addContractRequest, updateContractRequest } from '../../../redux/features/contractSlice';
import { CREATE_REQUEST_EVENT, GET_PRODUCT_ATTRIBUTE, GET_PRODUCT_CHANNEL, GET_PRODUCT_LIST, GET_PRODUCT_LOCATION, GET_PRODUCT_SUBLOCATION, GET_PRODUCT_TYPE, UPDATE_REQUEST_EVENT } from '../../../title/title';
import { v4 as uuidv4 } from 'uuid';
import { setProductAttribute, setProductList, setProductType } from '../../../redux/features/productSlice';

export default function TermModalEvent(props) {

  let { isShowModal, setIsShowModal, setDataToModal, dataToModal, isUpdateModal, setIsUpdateModal, event_id } = props;
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const dispatch = useDispatch();
  const [valueModal, setValueModal] = useState({});
  const [channelID, setChannelID] = useState(null);
  const [locationID, setLocationID] = useState(null);
  const [subLocationID, setSubLocationID] = useState(null);
  const [typeID, setTypeID] = useState(null);
  const [attributeID, setAttributeID] = useState(null);
  const { productChannel, productLocation, productSubLocation, productType, productAttribute, productList, customPriceForClient } = useSelector(state => state.productReducer);

  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_CHANNEL,
      data: { page: 1, page_size: 1000 }
    })
  }, [dispatch])

  useEffect(() => {
    if (typeof channelID === "number" && channelID !== null) {
      dispatch({
        type: GET_PRODUCT_LOCATION,
        data: { page: 1, page_size: 1000, channelID }
      })
    }
  }, [channelID, dispatch])

  useEffect(()=>{
    if (typeof locationID === "number" && locationID !== null) {
      dispatch({
        type: GET_PRODUCT_SUBLOCATION,
        data: { page:1, page_size: 1000, locationID }
      })
    }
  }, [locationID, dispatch])

  useEffect(()=>{
    if (typeof subLocationID === "number" && subLocationID !== null) {
      dispatch({
        type: GET_PRODUCT_TYPE,
        data: { page: 1, page_size: 1000, subLocationID  }
      })
    }
  }, [subLocationID])

  useEffect(()=>{
    if(typeof typeID === "number" && typeID !== null) {
      dispatch({
        type: GET_PRODUCT_ATTRIBUTE,
        data: { page: 1, page_size: 1000, typeID }
      })
    }
  }, [typeID, dispatch])
  
  useEffect(() => {
    if( typeof locationID === "number" && typeof typeID === "number" && typeof attributeID === "number" ){
      dispatch({
        type: GET_PRODUCT_LIST,
        data: { page: 1, pageSize: 1000, subLocationID, typeID, attributeID }
      });
    }
    setValueModal({ ...valueModal, product_ID: null, real_price: "", product_name: null, custom_price: "" })
  }, [subLocationID, typeID, attributeID, dispatch])

  useEffect(() => {
    if (isShowModal) {
      setValueModal({ ...dataToModal })
      // setChannelID(dataToModal?.channelID)
      // setLocationID(dataToModal?.locationID)
      // setTypeID(dataToModal?.typeID)
      // setAttributeID(dataToModal?.attributeID)
    }
  }, [dataToModal, isShowModal])

  // useEffect(() => {
  //   if(productList.length === 1){
  //     setValueModal({
  //       ...valueModal,
  //       product_ID: productList[0].id,
  //       real_price: productList[0].price.price * 1000000,
  //       price_ID: productList[0].price.id,
  //       product_name: productList[0].name
  //     })
  //   }
  // }, [productList])

  const handleCancel = () => {
    setIsShowModal(false);
    setValueModal({})
    setDataToModal({})
    setChannelID(null)
    setLocationID(null)
    setTypeID(null)
    setAttributeID(null)
    setIsUpdateModal(false)
  };

  const handleOK = () => {
    if (window.location.href.includes("create")) {
      // Khi tạo mới thì xử lý dưới local xong rồi POST 1 cục data tạo 1 thể
      valueModal.quality = valueModal.quality || 0;
      if (!isUpdateModal) {
        valueModal.id = uuidv4();
        valueModal.details = []
        let newRequest = {
          "product_ID": valueModal.product_ID,
          "quantity": valueModal.quality,
          "price_ID": valueModal.price_ID,
          "value_detail": valueModal.real_price / 1000000,
          "id": valueModal.id
        }
        dispatch(addContractRequest(newRequest));
        setIsUpdateModal(false)
      } else {
        dispatch(updateContractRequest(valueModal))
        setIsUpdateModal(false)
      }
    } else {
      // Khi cập nhật thì PUT riêng từng API
      valueModal.event_ID = event_id;
      if (!isUpdateModal) {
        dispatch({
          type: CREATE_REQUEST_EVENT,
          data: valueModal
        })
      } else {
        dispatch({
          type: UPDATE_REQUEST_EVENT,
          data: valueModal
        })
      }
      setIsUpdateModal(false)
    }
    setIsShowModal(false);
    setValueModal({})
    setDataToModal({})
    setChannelID(null)
    setLocationID(null)
    setTypeID(null)
    setAttributeID(null)
  }

  const handleChange = (name, value) => {
    if (name !== "" && name.length > 0) {
      setValueModal({
        ...valueModal,
        [name]: value
      })
    }
  };

  const valueOfField = (name) => {
    if (valueModal[name] && valueModal[name] !== "" && name !== "rangePicker" && valueModal[name] !== undefined) {
      if (name === "real_price") {
        return new Intl.NumberFormat("vi-VN").format(valueModal[name])
      }
      return valueModal[name]
    } else if (name === "rangePicker" && valueModal["from_date"] && valueModal["to_date"]) {
      let newTuNgay = moment(new Date(valueModal["from_date"])).format("DD-MM-YYYY");
      let newDenNgay = moment(new Date(valueModal["to_date"])).format("DD-MM-YYYY");
      return [moment(newTuNgay, "DD-MM-YYYY"), moment(newDenNgay, "DD-MM-YYYY")]
    } else {
      if (name === "desc" || name === "real_price" || name === "quality" || name === "product_name" || name === "custom_price") {
        return ""
      }
      return null
    }
  }

  // const renderOptionProduct = ()=>{
  //   return productList?.map((item)=>{
  //     return <Option value={item.id}>{item.name}</Option>
  //   });
  // }

  const renderOptionProductChannel = () => {
    return productChannel.map(channel => {
      return <Option key={channel.id} value={channel.id}>{channel.name}</Option>
    })
  };

  const renderOptionProductLocation = () => {
    return productLocation.map(location => {
      return <Option key={location.id} value={location.id}>{location.name}</Option>
    });
  }

  const renderOptionProductSubLocation = () => {
    return productSubLocation.map(sublocation => {
      return <Option key={sublocation.id} value={sublocation.id}>{sublocation.name}</Option>
    });
  }

  const renderOptionProductType = () => {
    return productType.map(type => {
      return <Option key={type.id} value={type.id}>{type.name}</Option>
    });
  };

  const renderOptionProductAttribute = () => {
    return productAttribute.map(att => {
      return <Option key={att.id} value={att.id}>{att.name}</Option>
    });
  }

  const renderOptionProduct = ()=>{
    return productList?.map((item)=>{
      return <Option value={item.id}>{item.name}</Option>
    });
  }

  return (
    <div className="modal__customer modal__term">
      <Modal
        title="Thêm quyền lợi hợp đồng"
        closeIcon={<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.61719 6.5L13.4609 11.3438C13.5911 11.474 13.5911 11.6172 13.4609 11.7734L12.5625 12.6719C12.4062 12.8021 12.263 12.8021 12.1328 12.6719L11.3125 11.8125L7.28906 7.82812L2.44531 12.6719C2.3151 12.8021 2.17188 12.8021 2.01562 12.6719L1.11719 11.7734C0.986979 11.6172 0.986979 11.474 1.11719 11.3438L5.96094 6.5L1.11719 1.65625C0.986979 1.52604 0.986979 1.38281 1.11719 1.22656L2.01562 0.328125C2.17188 0.197917 2.3151 0.197917 2.44531 0.328125L7.28906 5.17188L12.1328 0.328125C12.263 0.197917 12.4062 0.197917 12.5625 0.328125L13.4609 1.22656C13.5911 1.38281 13.5911 1.52604 13.4609 1.65625L12.6016 2.47656L8.61719 6.5Z" fill="black" />
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
          {isUpdateModal ? "" :
            <>
              <div className="modal__field field__select">
                <div>
                  <label className="term__label">Kênh sản phẩm</label>
                  <Select
                    className="style"
                    // placeholder="Chọn kênh sản phẩm"
                    showSearch
                    filterOption={(input, option) =>
                      (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    value={channelID}
                    onChange={(value) => {
                      setChannelID(value)
                      setLocationID(null)
                      setTypeID(null)
                      setAttributeID(null)
                      dispatch(setProductList([]))
                      dispatch(setProductType([]))
                      dispatch(setProductAttribute([]))
                    }}
                  >
                    {renderOptionProductChannel()}
                  </Select>
                </div>
              </div>
              <div className="modal__field field__select">
                <div>
                  <label className="term__label">Nhóm sản phẩm</label>
                  <Select
                    className="style"
                    // placeholder="Chọn nhóm sản phẩm"
                    showSearch
                    filterOption={(input, option) =>
                      (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    value={locationID}
                    onChange={(value) => {
                      setLocationID(value)
                      setTypeID(null)
                      setAttributeID(null)
                      dispatch(setProductList([]))
                      dispatch(setProductAttribute([]))
                    }}
                  >
                    {renderOptionProductLocation()}
                  </Select>
                </div>
              </div>
              <div className="modal__field field__select">
                <div>
                  <label className="term__label">Vị trí đặt sản phẩm</label>
                  <Select
                    className="style"
                    // placeholder="Chọn nhóm sản phẩm"
                    showSearch
                    filterOption={(input, option) =>
                      (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    value={subLocationID}
                    onChange={(value) => {
                      setSubLocationID(value)
                      setTypeID(null)
                      setAttributeID(null)
                      dispatch(setProductList([]))
                      dispatch(setProductAttribute([]))
                    }}
                  >
                    {renderOptionProductSubLocation()}
                  </Select>
                </div>
              </div>
              <div className="modal__field field__select">
                <div>
                  <label className="term__label">Loại sản phẩm</label>
                  <Select
                    className="style"
                    // placeholder="Chọn loại sản phẩm"
                    showSearch
                    filterOption={(input, option) =>
                      (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    value={typeID}
                    onChange={(value) => {
                      setTypeID(value)
                      setAttributeID(null)
                      dispatch(setProductList([]))
                    }}
                  >
                    {renderOptionProductType()}
                  </Select>
                </div>
              </div>
              <div className="modal__field field__select">
                <div>
                  <label className="term__label">Thuộc tính sản phẩm</label>
                  <Select
                    className="style"
                    // placeholder="Chọn thuôc tính sản phẩm"
                    showSearch
                    filterOption={(input, option) =>
                      (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    value={attributeID}
                    onChange={(value) => {
                      setAttributeID(value)
                    }}
                  >
                    {renderOptionProductAttribute()}
                  </Select>
                </div>
              </div>
              <div className="modal__field field__select">
                <div>
                  <label className="term__label">Sản phẩm</label>
                  <Select
                    className="style"
                    showSearch
                    // placeholder="Chọn sản phẩm"
                    filterOption={(input, option) =>
                      (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    value={valueOfField("product_ID")}
                    onChange={(value) => {
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
            </>
          }

          <div className="modal__field">
            <input type="text"
              name="real_price"
              value={valueOfField("real_price")}
              disabled
            />
            <label>Đơn giá</label>
          </div>
          <div className="modal__field">
            <input type="text"
              name="quality"
              value={valueOfField("quality")}
              onChange={(e) => {
                let { value, name } = e.target;
                handleChange(name, +value)
              }}
            />
            <label>Số lượng</label>
          </div>
        </div>
      </Modal>
    </div>
  )
}