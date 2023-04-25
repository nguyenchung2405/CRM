import { DatePicker, Table, Select, Progress, message, Popconfirm } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_CONTRACT, CREATE_PAYMENT, DELETE_REQUEST, GET_CONTRACT_DETAIL, GET_CONTRACT_TYPE_LIST, GET_CUSTOMER_LIST, GET_EVENT_LIST, GET_OWNER_LIST, GET_PRODUCT_LIST, UPDATE_CONTRACT } from "../../../title/title";
import TermModal from "../../modal/contract/Term";
import { useNavigate, useParams } from "react-router-dom";
import { addRequestDetail, setContractRequest, deleteContractRequest, removeRequestDetail, setContractDetail } from "../../../redux/features/contractSlice";
import { checkMicroFe } from "../../../untils/helper";
import ContractRight from "./../ContractRight";
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import Loading from "../../Loading";
import { setIsLoading } from "../../../redux/features/loadingSlice";
import { setMessage } from "../../../redux/features/messageSlice";

export default function CreateEvent() {

  let uri = checkMicroFe() === true ? "/contract-service" : "";
  const { Column } = Table;
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contract_id } = useParams();
  const { isLoading } = useSelector(state => state.loadingReducer);
  const { customerList } = useSelector(state => state.customerReducer);
  const { contractTypeList, contractDetail, contractRequest, keyOfDetailJustAdd, keyOfRequestJustAdd, ownerList, isOnlyPayment } = useSelector(state => state.contractReducer);
  const { productList, productListFull } = useSelector(state => state.productReducer)
  const { messageAlert } = useSelector(state => state.messageReducer);
  const [isShowModal, setIsShowModal] = useState(false);
  const [dataToModal, setDataToModal] = useState();
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [valueForm, setValueForm] = useState({});
  const [soTien, setSoTien] = useState(null)
  const [dotThanhToan, setDotThanhToan] = useState([]);
  const [customerInfor, setCustomerInfor] = useState({});
  const [isUpdateDetail, setIsUpdateDetail] = useState(false);
  const [countPayment, setCountPayment] = useState();
  const [unlockInput, setUnlockInput] = useState(true);
  
  useEffect(() => {
    dispatch({
      type: GET_CUSTOMER_LIST,
      data: { page: 1, pageNumber: 1000 }
    });
    dispatch({
      type: GET_PRODUCT_LIST,
      data: {page:1, pageSize: 1000}
    });
    dispatch({
      type: GET_CONTRACT_TYPE_LIST
    });
    dispatch({
      type: GET_OWNER_LIST
    })
    return () => {
      dispatch(setContractDetail({}))
      dispatch(setContractRequest([]));
    }
  }, []);

  useEffect(() => {
    if (customerList.length > 0 && contract_id && typeof +contract_id === "number") {
      let customerInfor = customerList.find(client => client.id === +valueForm.client_ID);
      setCustomerInfor({ ...customerInfor })
    }
  }, [contract_id, customerList, valueForm])

  useEffect(() => {
    if (contract_id && typeof +contract_id === "number") {
      dispatch({
        type: GET_CONTRACT_DETAIL,
        contract_id
      });
      dispatch(setIsLoading(true))
    }
  }, [contract_id])

  useEffect(() => {
    let { type, msg } = messageAlert;
    if (type === "thành công") {
        message.success(msg)
        dispatch(setMessage({}))
    } else if (type === "thất bại") {
        message.error(msg)
        dispatch(setMessage({}))
    }
}, [messageAlert])

useEffect(()=>{
  setValueForm({
    ...valueForm,
    total: showGiaTriThucHien("number") * 1000000
  })
}, [contractRequest])

useEffect(() => {
  let { dataContract, dataTable: dataOfTable, payments } = contractDetail;
  if (dataContract) {
    setValueForm({ ...dataContract })
  }
  if(payments){
    setDotThanhToan(payments)
  }
}, [contractDetail])

  const convertContractRequest = () => {
    return contractRequest?.map(request => {
      return {
        key: request?.id,
        id: request?.id,
        price_ID: request.price_ID.id,
        product_ID: request.product_ID.id,
        quality: request.quality,
        real_price: request.price_ID.price * 1000000,
        details: request.details,
        custom_price: request.custom_price * 1000000
      }
    })
  }

  const renderOption = () => {
    return customerList?.map((customer) => {
      return <Option value={+customer.id}>{customer.name}</Option>;
    });
  };

  const renderOptionOwner = () => {
    return ownerList?.map((customer) => {
      return <Option value={+customer.id}>{customer.user_full_name}</Option>;
    });
  };

  const handleChangeValue = (name, value) => {
    if (name === "client_ID") {
      let customerInfor = customerList.find(client => client.id === value);
      setCustomerInfor({ ...customerInfor })
    }
    if (name !== "" && name.length > 0) {
      setValueForm({ ...valueForm, [name]: value })
    }
  };

  const renderLoaiHopDong = () => {
    return contractTypeList?.map((item) => {
      return <Option value={+item.id}>{item.name}</Option>
    });
  }

  const valueOfField = (name) => {
    if (name === "rangePicker") {
      let newTuNgay = moment(new Date(valueForm["begin_date"])).format("DD-MM-YYYY");
      let newDenNgay = moment(new Date(valueForm["end_date"])).format("DD-MM-YYYY");
      if (valueForm["begin_date"] === undefined && valueForm["end_date"] === undefined) {
        return [null, null]
      }
      return [moment(newTuNgay, "DD-MM-YYYY"), moment(newDenNgay, "DD-MM-YYYY")]
    } else {
      if (valueForm[name] && name === "total") {
        return new Intl.NumberFormat("vi-VN").format(valueForm[name])
      }
      return valueForm[name] || null
    }
  }

  const valueOfCustomer = (name) => {
    if (name === "daiDien") {
      if (customerInfor["representative"] && customerInfor["represent_position"] && customerInfor["representative"] !== null && customerInfor["represent_position"] !== null) {
        return customerInfor["representative"] + " - " + customerInfor["represent_position"]
      } else {
        return "";
      }
    } else {
      if (customerInfor[name]) {
        return customerInfor[name]
      } else {
        return null
      }
    }
  }

  const renderButtonCreateUpdate = () => {
    if (contract_id) {
      return <button className="footer__btn btn__create"
        onClick={() => {
          valueForm.contract_id = +contract_id;
          dispatch({
            type: UPDATE_CONTRACT,
            data: valueForm
          })
        }}>
        Cập nhật
      </button>
    } else {
      return <button className="footer__btn btn__create"
        onClick={() => {
          let newData = {
            contract: { ...valueForm },
            request: contractRequest,
            payment: dotThanhToan
          };
          dispatch({
            type: CREATE_CONTRACT,
            data: newData
          });
          dispatch(setContractRequest([]));
          setTimeout(() => {
            navigate(`${uri}/crm/contract`)
          }, 1000)
        }}
      >Tạo</button>
    }
  }

  const addDetailWhenCreate = (request_id) => {
    let detail = {
      "desc": "",
      "from_date": "",
      "file": null,
      "id": uuidv4()
    };
    if (keyOfDetailJustAdd && (keyOfRequestJustAdd && keyOfRequestJustAdd !== "")) {
      dispatch(removeRequestDetail({ request_id: keyOfRequestJustAdd, detail_id: keyOfDetailJustAdd }));
    }
    dispatch(addRequestDetail({ request_id, detail }));
  }

  const showLoading = () => {
    if (isLoading) {
      return <Loading />
    }
  }

  const handleAddPayment = ()=>{
    if(+soTien >= 1000){
      if(!window.location.href.includes("detail")){
        let newDotThanhToan = [...dotThanhToan, {
          total_value: +soTien
        }]
        setDotThanhToan([...newDotThanhToan])
        setSoTien("")
      } else {
        let newPayment = {
          total_value: +soTien,
          contract_ID: +contract_id
        }
        dispatch({
          type: CREATE_PAYMENT,
          data: newPayment
        })
        setSoTien("")
      }
    }
  }

  const showGiaTriThucHien = (mode = "display")=>{
    let total = 0;
    contractRequest.forEach((request) => {
      if (request.custom_price) {
        total += request.custom_price;
      } else {
        total += request.price_ID.price * request.quality;
      }
    })
    if(total > 0 ){
      if(mode === "display"){
        return new Intl.NumberFormat("vi-VN").format(total * 1000000);
      } else if(mode === "number"){
        return total;
      }
    } else {
      return null;
    }
  }

  const showGiaTriGoc = (mode = "display")=>{
    let total = 0;
    contractRequest.forEach((request) => {
      total += request.price_ID.price * request.quality;
    })
    // return new Intl.NumberFormat("vi--VN").format(total) + " VNĐ";
    if(total > 0 && mode === "display"){
      return new Intl.NumberFormat("vi-VN").format(total * 1000000);
    } else {
      if(mode === "number"){
        return total;
      }
      return null;
    }
  }

  return (
    <div className="create__contract content">
      {showLoading()}
      <div className="create__contract__content">
        <div className="create__contract__header border_bottom_3px">
          <h2>{!contract_id ? "Tạo hợp đồng" : "Chỉnh sửa hợp đồng"}</h2>
        </div>
        {
          !isOnlyPayment ? 
            <>
              <div className="create__contract__inforCustomer border_bottom_3px create__contract__inforContract">
                <p>Thông tin hợp đồng</p>
                <div className="field__input field__flex two__field">
                  <div className="contract__field" style={{ alignItems: "flex-end" }} >
                    <input
                      className="style"
                      type="text"
                      name="contract_number"
                      onChange={(e) => {
                        let { value, name } = e.target;
                        handleChangeValue(name, +value)
                      }}
                      value={valueOfField("contract_number")}
                    />
                    <label>Số hợp đồng</label>
                  </div>
                  <div className="field__input_2">
                    <label>Loại hợp đồng</label>
                    <Select
                      className="style"
                      type="text"
                      placeholder={window.location.href.includes("create") ? "Loại hợp đồng" : ""}
                      onChange={(value) => {
                        handleChangeValue("contract_type_id", value);
                        dispatch({
                          type: GET_EVENT_LIST,
                          data: value
                        })
                      }}
                      value={valueOfField("contract_type_id")}
                    >
                      {renderLoaiHopDong()}
                    </Select>
                  </div>
                </div>
                <div className="field__input field__flex">
                  <div className="field__input_2">
                    <label>Tên sự kiện</label>
                    <Select
                      className="style"
                      type="text"
                      placeholder={window.location.href.includes("create") ? "Tên hợp đồng" : ""}
                      onChange={(value) => {
                        handleChangeValue("contract_type_id", value)
                      }}
                      value={valueOfField("contract_type_id")}
                    >
                      {renderLoaiHopDong()}
                    </Select>
                  </div>
                  <div className="field__input_2">
                    <label>Ngày bắt đầu - Ngày kết thúc</label>
                    <RangePicker
                      className="date__range__picker"
                      format={"DD-MM-YYYY"}
                      placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                      suffixIcon={
                        <svg
                          width="14"
                          height="16"
                          viewBox="0 0 14 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.625 9H3.375C3.125 9 3 8.875 3 8.625V7.375C3 7.125 3.125 7 3.375 7H4.625C4.875 7 5 7.125 5 7.375V8.625C5 8.875 4.875 9 4.625 9ZM8 8.625C8 8.875 7.875 9 7.625 9H6.375C6.125 9 6 8.875 6 8.625V7.375C6 7.125 6.125 7 6.375 7H7.625C7.875 7 8 7.125 8 7.375V8.625ZM11 8.625C11 8.875 10.875 9 10.625 9H9.375C9.125 9 9 8.875 9 8.625V7.375C9 7.125 9.125 7 9.375 7H10.625C10.875 7 11 7.125 11 7.375V8.625ZM8 11.625C8 11.875 7.875 12 7.625 12H6.375C6.125 12 6 11.875 6 11.625V10.375C6 10.125 6.125 10 6.375 10H7.625C7.875 10 8 10.125 8 10.375V11.625ZM5 11.625C5 11.875 4.875 12 4.625 12H3.375C3.125 12 3 11.875 3 11.625V10.375C3 10.125 3.125 10 3.375 10H4.625C4.875 10 5 10.125 5 10.375V11.625ZM11 11.625C11 11.875 10.875 12 10.625 12H9.375C9.125 12 9 11.875 9 11.625V10.375C9 10.125 9.125 10 9.375 10H10.625C10.875 10 11 10.125 11 10.375V11.625ZM14 3.5V14.5C14 14.9167 13.8542 15.2708 13.5625 15.5625C13.2708 15.8542 12.9167 16 12.5 16H1.5C1.08333 16 0.729167 15.8542 0.4375 15.5625C0.145833 15.2708 0 14.9167 0 14.5V3.5C0 3.08333 0.145833 2.72917 0.4375 2.4375C0.729167 2.14583 1.08333 2 1.5 2H3V0.375C3 0.125 3.125 0 3.375 0H4.625C4.875 0 5 0.125 5 0.375V2H9V0.375C9 0.125 9.125 0 9.375 0H10.625C10.875 0 11 0.125 11 0.375V2H12.5C12.9167 2 13.2708 2.14583 13.5625 2.4375C13.8542 2.72917 14 3.08333 14 3.5ZM12.5 14.3125V5H1.5V14.3125C1.5 14.4375 1.5625 14.5 1.6875 14.5H12.3125C12.4375 14.5 12.5 14.4375 12.5 14.3125Z"
                            fill="#666666"
                            fillOpacity="0.6"
                          />
                        </svg>
                      }
                      onChange={(date, dateString) => {
                        let ngayThucHien = moment(dateString[0], "DD-MM-YYYY").toISOString();
                        let ngayKetThucThucHien = moment(dateString[1], "DD-MM-YYYY").toISOString();
                        setValueForm({
                          ...valueForm,
                          begin_date: ngayThucHien,
                          end_date: ngayKetThucThucHien
                        })
                      }}
                      value={valueOfField("rangePicker")}
                    />
                  </div>
                </div>
              </div>
              <div className="create__contract__inforCustomer border_bottom_3px">
                <p>Thông tin khách hàng</p>
                <div className="field__input field__flex">
                  <div className="field__input_2">
                    <label>Tên khách hàng</label>
                    <Select
                      className="style"
                      showSearch
                      showArrow={false}
                      placeholder="Tên khách hàng"
                      filterOption={(input, option) =>
                        (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                      }
                      onChange={(value) => {
                        handleChangeValue("client_ID", +value)
                      }}
                      value={valueOfField("client_ID")}
                    >
                      {renderOption()}
                    </Select>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 7.32739V14.6537"
                        stroke="#35794A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.6667 10.9904H7.33337"
                        stroke="#35794A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z"
                        stroke="#35794A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="field__input_2">
                    <label>Người đầu mối</label>
                    <Select
                      className="style"
                      showSearch
                      showArrow={false}
                      placeholder="Người đầu mối"
                      filterOption={(input, option) =>
                        (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                      }
                      onChange={(value, option) => {
                        setValueForm({
                          ...valueForm,
                          owner: +value,
                          owner_name: option.children
                        })
                      }}
                      value={valueOfField("owner")}
                    >
                      {renderOptionOwner()}
                    </Select>
                    {/**
                    <input
                    className="style"
                    placeholder="Người đầu mối"
                    type="text"
                    name="owner"
                    onChange={(e) => {
                      let { value, name } = e.target;
                      handleChangeValue(name, +value)
                    }}
                    value={valueOfField("owner")}
                  />
                */}
                  </div>
                </div>
                <div className="field__input field__flex two__field">
                  <div className="contract__field">
                    <input
                      className="style not__allow"
                      type="text"
                      disabled
                      value={valueOfCustomer("tax_number")}
                    />
                    <label>Mã số thuế</label>
                  </div>
                  <div className="contract__field">
                    <input
                      className="style not__allow"
                      type="text"
                      disabled
                      value={valueOfCustomer("phone")}
                    />
                    <label>Số điện thoại</label>
                  </div>
                </div>
                <div className="field__input field__flex two__field">
                  <div className="contract__field">
                    <input
                      className="style not__allow"
                      type="text"
                      disabled
                      value={valueOfCustomer("address")}
                    />
                    <label>Địa chỉ</label>
                  </div>
                  <div className="contract__field">
                    <input
                      className="style not__allow"
                      type="text"
                      disabled
                      value={valueOfCustomer("email")}
                    />
                    <label>Email</label>
                  </div>
                </div>
                <div className="field__input field__flex two__field">
                  <div className="contract__field">
                    <input
                      className="style not__allow"
                      type="text"
                      disabled
                      value={valueOfCustomer("daiDien")}
                    />
                    <label>Người đại diện và chức danh</label>
                  </div>
                  <div className="contract__field">
                    <input
                      className="style"
                      type="text"
                      disabled
                      value=""
                    // value={()=>{
                    //   if(customerInfor["representative"] && customerInfor["represent_position"]){
                    //     return customerInfor["representative"] + " - " + customerInfor["represent_position"]
                    //   } else {
                    //     return null;
                    //   }
                    // }}
                    />
                    <label>Người liên hệ và chức danh</label>
                  </div>
                </div>
              </div>
              <div className="create__contract__term border_bottom_3px">
                <div className="display__flex">
                  <p>Quyền lợi hợp đồng</p>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      setIsShowModal(true);
                    }}
                  >
                    <path
                      d="M11 7.32739V14.6537"
                      stroke="#35794A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.6667 10.9904H7.33337"
                      stroke="#35794A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z"
                      stroke="#35794A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <Table
                  className="term__table"
                  dataSource={convertContractRequest()}
                  pagination={false}
                  expandable={{
                    expandedRowRender: (record) => {
                      return <ContractRight data={record} contract_id={contract_id} isUpdateDetail={isUpdateDetail} setIsUpdateDetail={setIsUpdateDetail} />
                    },
                    rowExpandable: (record) => record.details.length > 0,
                  }}
                >
                  <Column
                    className="item"
                    title="Sản phẩm"
                    key="item"
                    // dataIndex="product_ID"
                    render={(text) => {
                      let product = productListFull.find(product => product.id === text.product_ID)
                      return product?.location_ID?.channel_ID?.name + " - " + product?.location_ID?.name + " - " + product?.name
                    }}
                  />
                  <Column
                    className="donGia"
                    title="Đơn giá"
                    key="price"
                    render={(text) => {
                      return `${new Intl.NumberFormat("vi-VN").format(text.real_price)} VNĐ`;
                    }}
                  />
                  <Column
                    className="quality"
                    title="Số lượng"
                    key="quality"
                    render={(text) => {
                      // let vndCurrency = new Intl.NumberFormat("vi-VN",{currency: "VND"}).format(text.real_price)
                      // return `${text.real_price} VNĐ`;
                      return `${text.quality}`;
                    }}
                  />
                  <Column
                    className="price"
                    title="Thành tiền"
                    key="price"
                    render={(text) => {
                      return `${new Intl.NumberFormat("vi-VN").format(text.real_price * text.quality)} VNĐ`;
                    }}
                  />
                  <Column
                    className="price"
                    title="Giá hiệu chỉnh"
                    key="custom_price"
                    render={(text) => {
                      if (text.custom_price > 0) {
                        return `${new Intl.NumberFormat("vi-VN").format(text.custom_price)} VNĐ`;
                      } else {
                        return null;
                      }
                    }}
                  />
                  <Column
                    className="thaoTac"
                    render={(text) => {
                      return <div>
                        <button className="btn__green" onClick={() => {
                          addDetailWhenCreate(text.id)
                        }}>Thêm chi tiết</button>
                        <MdOutlineModeEditOutline onClick={() => {
                          setIsShowModal(true);
                          setIsUpdateModal(true)
                          setDataToModal(text)
                        }} />
                        <MdDelete onClick={() => {
                          if (window.location.href.includes("create")) {
                            dispatch(deleteContractRequest(text.id))
                          } else {
                            dispatch({
                              type: DELETE_REQUEST,
                              request_id: text.id
                            })
                          }
                        }} />
                      </div>
                    }}
                  />
                </Table>
                <TermModal
                  isShowModal={isShowModal}
                  setIsShowModal={setIsShowModal}
                  productList={productList}
                  dataToModal={dataToModal}
                  setDataToModal={setDataToModal}
                  isUpdateModal={isUpdateModal}
                  setIsUpdateModal={setIsUpdateModal}
                  contract_id={contract_id}
                  customerInfor={customerInfor}
                />
              </div>
              <div className="create__contract__value border_bottom_3px">
                <p>Giá trị hợp đồng</p>
                <div className="field__input_3">
                  <div className="contract__field">
                    <input className="style" type="text"
                      name="discount_by_percent"
                      // disabled
                      onChange={(e) => {
                        let { value, name } = e.target;
                        handleChangeValue(name, +value)
                      }}
                      value={valueOfField("discount_by_percent")}
                    />
                    <label>Chiết khấu (%)</label>
                  </div>
                  <div className="contract__field">
                    <input className="style" type="text"
                      name="VAT"
                      // onChange={(e) => {
                      //   let { value, name } = e.target;
                      //   handleChangeValue(name, +value)
                      // }}
                      value={showGiaTriGoc()}
                      disabled
                    />
                    <label>Giá trị gốc</label>
                  </div>
                  <div className="contract__field">
                    <input className="style" type="text"
                      name="VAT"
                      // onChange={(e) => {
                      //   let { value, name } = e.target;
                      //   handleChangeValue(name, +value)
                      // }}
                      value={showGiaTriThucHien()}
                      disabled
                    />
                    <label>Giá trị thực hiện</label>
                  </div>
                  <div className="contract__field">
                    <Popconfirm
                      title="Bạn có muốn chỉnh sửa không?"
                      onConfirm={()=>{ setUnlockInput(false) }}
                      // onCancel={cancel}
                      okText="Có"
                      cancelText="Không"
                      disabled={!unlockInput}
                    >
                      <input
                        className="style"
                        type="text"
                        name="total"
                        onChange={(e) => {
                          let { value, name } = e.target;
                          let newValue = value.replaceAll(".", "");
                          handleChangeValue(name, +newValue)
                        }}
                        value={valueOfField("total")}
                        disabled={unlockInput}
                      />
                      <label className="pink__color">Giá trị hợp đồng</label>
                    </Popconfirm>
                  </div>
                </div>
                <div className="contract__value__note">
                  <textarea id="note"
                    name="note"
                    onChange={(e) => {
                      let { value, name } = e.target;
                      handleChangeValue(name, value)
                    }}
                    value={valueOfField("note")}
                  ></textarea>
                  <label>Ghi chú</label>
                </div>
              </div>
            </>
          : ""
        }
        <div className="create__contract__payment border_bottom_3px">
          <div className="display__flex contract__payment">
            <div className="display__flex">
              <p>Đợt thanh toán</p>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleAddPayment}
              >
                <path
                  d="M11 7.32739V14.6537"
                  stroke="#35794A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.6667 10.9904H7.33337"
                  stroke="#35794A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z"
                  stroke="#35794A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="display__flex soDotThanhToan">
              <label htmlFor="kieuThanhToan">Kiểu thanh toán:</label>
              <select name="kieuThanhToan" id="kieuThanhToan" onChange={(e) => { setValueForm({ ...valueForm, pay_before_run: e.target.value }) }}>
                <option value={true}>Trước thực hiện</option>
                <option value={false}>Sau thực hiện</option>
              </select>
            </div>
            <div className="display__flex soDotThanhToan">
              <label htmlFor="soDotThanhToan">Số đợt thanh toán:</label>
              <select name="soDotThanhToan" id="soDotThanhToan" onChange={(e) => { setValueForm({ ...valueForm, payment_type: e.target.value }) }}>
                <option value="Một đợt">1 đợt</option>
                <option value="Nhiều đợt">Nhiều đợt</option>
                <option value="Theo tháng">Theo thàng</option>
                <option value="Theo yêu cầu hợp đồng">Theo quyền lợi</option>
              </select>
            </div>
          </div>
          <div className="display__flex">
            <input className="style" type="text" placeholder="Số tiền"
              value={soTien}
              onChange={(e) => {
                let { value } = e.target;
                setSoTien(value)
              }} />
          </div>
          <div className="contract__payment__process">
            {dotThanhToan?.map((payment, index) => {
              return <div className="payment__contract">
                <span>Đợt thanh toán {index + 1}</span>
                <span>{new Intl.NumberFormat("vi-VN").format(payment.total_value)} VNĐ</span>
              </div>
            })}
          </div>
        </div>
        <div className="create__contract__footer">
          <button className="footer__btn btn__delete" onClick={() => { navigate(`${uri}/crm/contract`, { replace: true }) }}>Hủy</button>
          {renderButtonCreateUpdate()}
        </div>
      </div >
    </div >
  );
}
