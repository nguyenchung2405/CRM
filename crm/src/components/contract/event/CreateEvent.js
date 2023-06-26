import { DatePicker, Table, Select, message } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_EVENT, DELETE_REQUEST_EVENT, GET_EVENT_INFOR, GET_EVENT_LIST, GET_PRODUCT_LIST, GET_UNSET_CONTRACT, UPDATE_EVENT } from "../../../title/title";
import { Link, useHistory, useParams } from "react-router-dom";
import { setContractRequest, deleteContractRequest, setContractDetail } from "../../../redux/features/contractSlice";
import { checkMicroFe } from "../../../untils/helper";
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import Loading from "../../Loading";
import { setIsLoading } from "../../../redux/features/loadingSlice";
import { setMessage } from "../../../redux/features/messageSlice";
import TermModalEvent from "../../modal/event/Term";
import { setDonors } from "../../../redux/features/eventSlice";
import ModalDonor from "./ModalDonor";
import QuanLyChi from "./QuanLyChi";

export default function CreateEvent() {

  let uri = checkMicroFe() === true ? "/contract-service" : "";
  const { Column } = Table;
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const history = useHistory();
  const { event_id } = useParams();
  const { isLoading } = useSelector(state => state.loadingReducer);
  const { customerList } = useSelector(state => state.customerReducer);
  const { contractRequest, contractDetail } = useSelector(state => state.contractReducer);
  const { productList, productListFull } = useSelector(state => state.productReducer)
  const { messageAlert } = useSelector(state => state.messageReducer);
  const { donors } = useSelector(state => state.eventReducer);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowDonorModal, setIsShowDonorModal] = useState(false);
  const [dataToModal, setDataToModal] = useState();
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [valueForm, setValueForm] = useState({});
  const [customerInfor, setCustomerInfor] = useState({});
  const [donateToTal, setDonateTotal] = useState();
  const [quanLyChi, setQuanLyChi] = useState({})

  useEffect(() => {
    dispatch({
      type: GET_EVENT_LIST,
      data: { page: 1, pageNumber: 1000 }
    });
    dispatch({
      type: GET_PRODUCT_LIST,
      data: { page: 1, pageSize: 1000 }
    });
    return () => {
      dispatch(setContractDetail({}))
      dispatch(setContractRequest([]));
      dispatch(setDonors([]))
    }
  }, []);

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
    if(typeof +event_id === "number"){
      dispatch({
        type: GET_EVENT_INFOR,
        data: event_id
      })
      dispatch({
        type: GET_UNSET_CONTRACT,
      })
    }
  }, [event_id])

  useEffect(()=>{
    setValueForm({...contractDetail})
    setQuanLyChi({...contractDetail.event_cost_list})
  }, [contractDetail])

  useEffect(()=>{
    if(donors.length > 0){
      let total = donors.reduce((pre,cur)=> {
        return pre + cur.contract_total
      }, 0);
      setDonateTotal(total)
    }
  }, [donors])

  const convertContractRequest = () => {
    return contractRequest?.map(request => {
      return {
        key: request?.id,
        id: request?.id,
        price_ID: request.price_ID,
        product_ID: request.product_ID,
        quality: request.quantity,
        real_price: request.value_detail * 1000000,
        custom_price: 0
      }
    })
  }

  const handleChangeValue = (name, value) => {
    if (name === "client_ID") {
      let customerInfor = customerList.find(client => client.id === value);
      setCustomerInfor({ ...customerInfor })
    }
    if (name !== "" && name.length > 0) {
      setValueForm({ ...valueForm, [name]: value })
    }
  };

  const valueOfField = (name) => {
    if (name === "rangePicker") {
      let newTuNgay = moment(new Date(valueForm["from_date"])).format("DD-MM-YYYY");
      let newDenNgay = moment(new Date(valueForm["to_date"])).format("DD-MM-YYYY");
      if (valueForm["from_date"] === undefined && valueForm["to_date"] === undefined) {
        return [null, null]
      }
      return [moment(newTuNgay, "DD-MM-YYYY"), moment(newDenNgay, "DD-MM-YYYY")]
    } else {
      if (valueForm[name] && name === "value_event") {
        return new Intl.NumberFormat("vi-VN").format(valueForm[name])
      }
      return valueForm[name]
    }
  }

  const renderButtonCreateUpdate = () => {
    if (event_id) {
      return <button className="footer__btn btn__create"
        onClick={() => {
          let newValueForm = {...valueForm, event_cost_list: quanLyChi}
          dispatch({
            type: UPDATE_EVENT,
            data: newValueForm
          })
        }}>
        Cập nhật
      </button>
    } else {
      return <button className="footer__btn btn__create"
        onClick={() => {
          let newData = {
            event: { ...valueForm, event_cost_list: quanLyChi },
            details: contractRequest,
          };
          dispatch({
            type: CREATE_EVENT,
            data: newData
          });
          dispatch(setContractRequest([]));
          setTimeout(() => {
            history.push(`${uri}/crm/event`)
          }, 1000)
        }}
      >Tạo</button>
    }
  }

  const showLoading = () => {
    if (isLoading) {
      return <Loading />
    }
  }
  
  const renderDonorList = () => {
    let newDonors = [...donors]
    let sortArr = newDonors.sort((a, b) => {
      return b.contract_total - a.contract_total
    })
    return sortArr.map(donor => {
      return <Link key={uuidv4()} to={`${uri}/crm/detail/${donor.contract_ID}`} target="_self">
        <li>{donor.client_name + " - " + new Intl.NumberFormat("vi-VN").format(donor.contract_total * 1000000) + " VNĐ"}</li>
      </Link>
    })
  }

  return (
    <div className="create__contract content event__content">
      {showLoading()}
      <div className="create__contract__content">
        <div className="create__contract__header border_bottom_3px">
          <h2>{!event_id ? "Tạo sự kiện" : "Chỉnh sửa sự kiện"}</h2>
        </div>
        <div className="create__contract__inforCustomer border_bottom_3px create__contract__inforContract">
          <p>Thông tin sự kiện</p>
          <div className="field__input field__flex two__field">
            <div className="contract__field" style={{ alignItems: "flex-end" }} >
              <input
                className="style"
                type="text"
                name="name"
                onChange={(e) => {
                  let { value, name } = e.target;
                  handleChangeValue(name, value)
                }}
                value={valueOfField("name")}
              />
              <label id="soHD">Tên sự kiện</label>
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
                    from_date: ngayThucHien,
                    to_date: ngayKetThucThucHien
                  })
                }}
                value={valueOfField("rangePicker")}
              />
            </div>
          </div>
        </div>
        <div className="create__contract__term border_bottom_3px">
          <div className="display__flex">
            <p>Quyền lợi chung</p>
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
          >
            <Column
              className="item"
              title="Sản phẩm"
              key="item"
              // dataIndex="product_ID"
              render={(text) => {
                let product = productListFull.find(product => product.id === text.product_ID)
                return product?.channel?.name + " - " + product?.location?.name + " - " + product?.name
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
              className="thaoTac"
              render={(text) => {
                return <div>
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
                        type: DELETE_REQUEST_EVENT,
                        request_id: text.id
                      })
                    }
                  }} />
                </div>
              }}
            />
          </Table>
          <TermModalEvent
            isShowModal={isShowModal}
            setIsShowModal={setIsShowModal}
            productList={productList}
            dataToModal={dataToModal}
            setDataToModal={setDataToModal}
            isUpdateModal={isUpdateModal}
            setIsUpdateModal={setIsUpdateModal}
            event_id={event_id}
            customerInfor={customerInfor}
          />
        </div>
        <div className="create__contract__value border_bottom_3px event__donors">
          <div className="display__flex">
            <p>Hợp đồng tài trợ</p>
            {
              !window.location.href.includes("create")
                ?
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    setIsShowDonorModal(true);
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
                : ""
            }
          </div>
          <ol>
            {renderDonorList()}
          </ol>
          <div className="donate__total padding_30px">
            {
              !window.location.href.includes("create") && donateToTal > 0
                ? <b>Tổng tiền tài trợ: {new Intl.NumberFormat("vi-VN").format(donateToTal * 1000000) + " VNĐ"}</b>
                : ""
            }
          </div>
          <ModalDonor
              isShowModal={isShowDonorModal}
              setIsShowModal={setIsShowDonorModal}
              event_id={event_id}
          />
        </div>
        <div className="create__contract__payment create__contract__value border_bottom_3px create__contract__inforCustomer">
          <p>Giá trị sự kiện</p>
          <div className="field__input field__flex two__field">
            <div className="contract__field" >
              <input
                className="style"
                type="text"
                name="value_event"
                onChange={(e) => {
                  let { value, name } = e.target;
                  let newValue = value.replaceAll(".", "");
                  handleChangeValue(name, +newValue)
                }}
                value={valueOfField("value_event")}
              />
              <label id="soHD">Giá trị sự kiện</label>
            </div>
          </div>
          <div className="contract__value__note">
            <textarea id="note"
              name="desc"
              onChange={(e) => {
                let { value, name } = e.target;
                handleChangeValue(name, value)
              }}
              value={valueOfField("desc")}
            ></textarea>
            <label>Ghi chú</label>
          </div>
        </div>
        <QuanLyChi 
          quanLyChi={quanLyChi}
          setQuanLyChi={setQuanLyChi}
        />
        <div className="create__contract__footer">
          <button className="footer__btn btn__delete" onClick={() => { history.replace(`${uri}/crm/event`) }}>Hủy</button>
          {renderButtonCreateUpdate()}
        </div>
      </div >
    </div >
  );
}