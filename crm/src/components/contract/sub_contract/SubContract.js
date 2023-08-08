import { DatePicker, Table, Select, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_SUB_CONTRACT, DELETE_REQUEST, GET_CONTRACT_LIST, GET_CONTRACT_TYPE_LIST, GET_CUSTOMER_LIST, GET_DETAIL_SUB_CONTRACT, GET_EVENT_LIST, GET_OWNER_LIST, GET_PRODUCT_LIST, GET_REQUEST_OF_EVENT, UPDATE_SUB_CONTRACT } from "../../../title/title";
import TermModal from "../../modal/sub_contract/Term";
import { useHistory, useParams } from "react-router-dom";
import { addRequestDetail, setContractRequest, deleteContractRequest, removeRequestDetail, setContractDetail } from "../../../redux/features/contractSlice";
import { checkMicroFe } from "../../../untils/helper";
import ContractRight from "./../ContractRight";
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import Loading from "../../Loading";
import { setIsLoading } from "../../../redux/features/loadingSlice";
import RequestEvent from "./../RequestEvent";
import ContractHistory from "./../ContractHistory";
import { CiImport, CiExport } from "react-icons/ci"
import ContractPayment from "../ContractPayment";
import InforCustomer from "../InforCustomer";
import ContractValue from "../ContractValue";

export default function SubContract() {

  let uri = checkMicroFe() === true ? "/contract-service" : "";
  const { Column } = Table;
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const history = useHistory();
  const { sub_contract_id } = useParams();
  const { isLoading } = useSelector(state => state.loadingReducer);
  const { customerList } = useSelector(state => state.customerReducer);
  const { contractTypeList, contractDetail, contractRequest, keyOfDetailJustAdd, keyOfRequestJustAdd, ownerList, subContractInfor } = useSelector(state => state.contractReducer);
  const { productList, productListFull } = useSelector(state => state.productReducer)
  const { eventList, requestOfEvent, selectRequest } = useSelector(state => state.eventReducer);
  const [isShowModal, setIsShowModal] = useState(false);
  const [dataToModal, setDataToModal] = useState();
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [valueForm, setValueForm] = useState({VAT: 10, payment_type: "Nhiều đợt", pay_before_run: true, discount_by_percent: 0});
  const [requestDate, setRequestDate] = useState(null)
  const [dotThanhToan, setDotThanhToan] = useState([]);
  const [customerInfor, setCustomerInfor] = useState({});
  const [isUpdateDetail, setIsUpdateDetail] = useState(false);
  const [unlockInput, setUnlockInput] = useState(true);
  const [selectGeneralRequest, setSelectGeneralRequest] = useState([]);

  useEffect(() => {
    dispatch({
      type: GET_EVENT_LIST,
      data: { page: 1, pageNumber: 1000 }
    });
    dispatch({
        type: GET_CONTRACT_LIST,
        data: { page: 1, pageNumber: 1000 }
    })
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
    if (customerList.length > 0 && sub_contract_id && typeof +sub_contract_id === "number") {
      let customerInfor = customerList.find(client => client.id === +valueForm.client_ID);
      setCustomerInfor({ ...customerInfor })
    }
  }, [sub_contract_id, customerList, valueForm])

  useEffect(() => {
    if (sub_contract_id && typeof +sub_contract_id === "number" && +sub_contract_id > 0) {
      dispatch({
        type: GET_DETAIL_SUB_CONTRACT,
        sub_contract_id
      });
      dispatch(setIsLoading(true))
    }
  }, [sub_contract_id])

  useEffect(() => {
    if(!sub_contract_id){
      setValueForm({
        ...valueForm,
        total: showGiaTriThucHien("total") * 1000000
      })
    }
  }, [contractRequest])

  useEffect(() => {
    let { dataContract, dataTable: dataOfTable, payments } = contractDetail;
    // if(dataContract && dataOfTable){
    //   setValueForm({...dataContract})
    //   setDataTable([...dataOfTable])
    // }
    if (dataContract) {
      setValueForm({ ...dataContract })
    }
    if (payments) {
      setDotThanhToan(payments)
    }
  }, [contractDetail])

  useEffect(() => {
    if (typeof valueForm.event_ID === "number") {
      dispatch({
        type: GET_REQUEST_OF_EVENT,
        event_id: valueForm.event_ID
      })
    }
  }, [valueForm.event_ID])

  useEffect(()=>{
      if (subContractInfor?.contract_ID) {
          let newData = {
              ...valueForm,
              ...subContractInfor,
          }
          setValueForm({ ...newData })
      }
  }, [subContractInfor])

  useEffect(()=>{
    setSelectGeneralRequest([...selectRequest])
  }, [selectRequest])

  const convertContractRequest = () => {
    return contractRequest?.map(request => {
      return {
        key: request?.id,
        id: request?.id,
        price_ID: request.price_ID.id,
        product_ID: request.product_ID.id,
        quality: request.quality,
        real_price: request.price_ID.price_include_VAT * 1000000,
        details: request.details,
        custom_price: request.custom_price * 1000000
      }
    })
  }

  const renderOption = () => {
    return customerList?.map((customer) => {
      return <Option key={customer.id} value={+customer.id}>{customer.name}</Option>;
    });
  };

  const renderOptionOwner = () => {
    return ownerList?.map((customer) => {
      return <Option key={customer.id} value={+customer.id}>{customer.user_full_name}</Option>;
    });
  };

  const handleChangeValue = (name, value) => {
    if (name === "client_ID") {
      let customerInfor = customerList.find(client => client.id === value);
      setCustomerInfor({ ...customerInfor })
    }
    if(name === "contract_type_ID"){
      if(value !== 4){
        setValueForm({
          ...valueForm,
          event_ID: null,
          [name]: value
        })
      } else {
        setValueForm({ ...valueForm, [name]: value })
      }
    }
    if (name !== "" && name.length > 0 && name !== "contract_type_ID") {
      setValueForm({ ...valueForm, [name]: value })
    }
  };

  const titleOfSubContract = ()=>{
    if(!sub_contract_id){
        if(!valueForm.extend_parent_contract){
            return "Tạo hợp đồng con"
        } else if(valueForm.extend_parent_contract){
            return "Tạo phụ lục"
        }
    } else if(sub_contract_id) {
        if(!valueForm.extend_parent_contract){
            return "Chỉnh sửa hợp đồng con"
        } else if(valueForm.extend_parent_contract){
            return "Chỉnh sửa phụ lục"
        }
    }
  }

    const renderLoaiHopDong = () => {
        return contractTypeList?.map((item) => {
            return <Option key={item.id} value={+item.id}>{item.name}</Option>
        });
    }

    const renderEventOption = ()=>{
        return eventList.map(item => {
          return <Option key={item.id} value={item.id}>{item.name}</Option>
        })
      };
  
  const valueOfField = (name) => {
    if (name === "rangePicker") {
      let newTuNgay = moment(new Date(valueForm["begin_date"])).format("DD-MM-YYYY");
      let newDenNgay = moment(new Date(valueForm["end_date"])).format("DD-MM-YYYY");
      if (valueForm["begin_date"] === undefined && valueForm["end_date"] === undefined) {
        return [null, null]
      }
      return [moment(newTuNgay, "DD-MM-YYYY"), moment(newDenNgay, "DD-MM-YYYY")]
    } else if(name === "requestDate"){
      if(requestDate !== null){
        let newRequestDate = moment(new Date(requestDate)).format("DD-MM-YYYY")
        return moment(newRequestDate, "DD-MM-YYYY");
      }
      return null
    } else {
      if (valueForm[name] && name === "total") {
        return new Intl.NumberFormat("vi-VN").format(valueForm[name])
      }
      return valueForm[name]
    }
  }

  const valueOfCustomer = (name) => {
    if (name === "daiDien") {
      if (customerInfor["representative"] && customerInfor["represent_position"] && customerInfor["representative"] !== null && customerInfor["represent_position"] !== null) {
        return customerInfor["representative"] + " - " + customerInfor["represent_position"]
      } else {
        return "";
      }
    } else if(name === "lienHe"){
      if (customerInfor["contact"] && customerInfor["contact_position"] && customerInfor["contact"] !== null && customerInfor["contact_position"] !== null) {
        return customerInfor["contact"] + " - " + customerInfor["contact_position"]
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
    if (sub_contract_id) {
      return <button className="footer__btn btn__create"
        onClick={() => {
          valueForm.sub_contract_id = +sub_contract_id;
          valueForm.event_detail_IDs = selectGeneralRequest;
          dispatch({
            type: UPDATE_SUB_CONTRACT,
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
            type: CREATE_SUB_CONTRACT,
            data: newData
          });
          dispatch(setContractRequest([]));
          setTimeout(() => {
            history.push(`${uri}/crm/contract`)
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

  const showGiaTriThucHien = (mode = "display")=>{
    let total = 0;
    contractRequest.forEach((request) => {
      if (request.custom_price) {
        total += request.custom_price;
      } else {
        total += request.price_ID.price_include_VAT * request.quality;
      }
    })
    if(total > 0 ){
      if(mode === "display"){
        return new Intl.NumberFormat("vi-VN").format(total * 1000000);
      } else if(mode === "number"){
        return new Intl.NumberFormat("vi-VN").format(valueForm.discount_total * 1000000);
      } else if(mode === "total_contract"){
        return new Intl.NumberFormat("vi-VN").format(valueForm.total);
      } else {
        return total;
      }
    } else {
      return null;
    }
  }

  const showGiaTriGoc = (mode = "display") => {
    let total = 0;
    contractRequest.forEach((request) => {
      total += request.price_ID.price * request.quality;
    })
    // return new Intl.NumberFormat("vi--VN").format(total) + " VNĐ";
    if(total > 0 && mode === "display"){
      return new Intl.NumberFormat("vi-VN").format(total * 1000000);
    } else {
      if(mode === "number"){
        // return total;
        return new Intl.NumberFormat("vi-VN").format(valueForm.original_total * 1000000);
      }
      return null;
    }
  }

  return (
    <div className="create__contract content">
      {showLoading()}
      <div className="create__contract__content">
        <div className="create__contract__header border_bottom_3px">
          <h2>{titleOfSubContract()}</h2>
        </div>
        <div className="create__contract__inforCustomer border_bottom_3px create__contract__inforContract">
          <p>Thông tin hợp đồng</p>
          <div className="field__input field__flex two__field">
            <div className="contract__field" style={{ alignItems: "flex-end" }} >
              <input
                className="style"
                type="text"
                name="sub_contract_number"
                onChange={(e) => {
                  let { value, name } = e.target;
                  handleChangeValue(name, value)
                }}
                value={valueOfField("sub_contract_number")}
              />
              <label id="soHD">Số hợp đồng</label>
            </div>
            <div className="field__input_2">
              <label>Loại hợp đồng</label>
              <Select
                className="style"
                type="text"
                placeholder={window.location.href.includes("create") ? "Loại hợp đồng" : ""}
                onChange={(value) => {
                  handleChangeValue("contract_type_ID", value);
                }}
                value={valueOfField("contract_type_ID")}
              >
                {renderLoaiHopDong()}
              </Select>
            </div>
          </div>
          <div className="field__input field__flex">
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
            <div className="field__input_2">
              <label>Tên sự kiện</label>
              <Select
                className="style"
                type="text"
                placeholder={window.location.href.includes("create") ? "Tên sự kiện" : ""}
                onChange={(value) => {
                  handleChangeValue("event_ID", value)
                }}
                value={valueOfField("event_ID")}
                disabled={valueForm.contract_type_ID === 4 ? false : true}
              >
                {renderEventOption()}
              </Select>
            </div>
          </div>
        </div>
        <InforCustomer
          renderOption={renderOption}
          handleChangeValue={handleChangeValue}
          valueOfField={valueOfField}
          setValueForm={setValueForm}
          valueForm={valueForm}
          renderOptionOwner={renderOptionOwner}
          valueOfCustomer={valueOfCustomer}
          history={history}
        />
        { valueForm.event_ID && !window.location.href.includes("create") ?
          <RequestEvent
            productListFull={productListFull}
            requestOfEvent={requestOfEvent}
            selectGeneralRequest={selectGeneralRequest}
            setSelectGeneralRequest={setSelectGeneralRequest}
          /> : ""
        }
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
            {sub_contract_id ?
                <>
                  <div className="upload__file">
                    <Tooltip title="Nhập file" color="green">
                      <label htmlFor="upFileExcel">
                        <CiImport />
                      </label>
                      <input id="upFileExcel" type="file" onChange={e => {
                        // dispatch({
                        //   type: IMPORT_FILE,
                        //   data: { file: e.target.files[0], sub_contract_id }
                        // })
                      }} />
                    </Tooltip>
                  </div>
                  <Tooltip title="Xuất file" color="green">
                    <CiExport
                      onClick={async (e) => {
                        // const result = await axios({
                        //   url: `${local}/api/contract/request-get-file?contract_ID=${sub_contract_id}`,
                        //   method: "GET",
                        //   headers: {
                        //     Authorization: "Bearer " + TOKEN,
                        //     "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        //   },
                        //   responseType: 'arraybuffer'
                        // });
                        // let fileBlob = new Blob([result.data], {
                        //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
                        // })
                        // FileSaver.saveAs(fileBlob, "yeu_cau_hop_dong.xlsx")
                      }}
                    />
                  </Tooltip>
                </>
            : ""
            }
          </div>
          <Table
            className="term__table"
            dataSource={convertContractRequest()}
            pagination={false}
            expandable={{
              expandedRowRender: (record) => {
                return <ContractRight data={record} contract_id={sub_contract_id} isUpdateDetail={isUpdateDetail} setIsUpdateDetail={setIsUpdateDetail} />
              },
              rowExpandable: (record) => record?.details?.length > 0,
            }}
          >
            <Column
              className="item"
              title="Sản phẩm"
              key="item"
              // dataIndex="product_ID"
              render={(text) => {
                // let product = productList?.find(product => product.id === text)
                // return product?.name || product?.Product_name
                let product = productListFull.find(product => product.id === text.product_ID)
                return product?.channel?.name + " - " + product?.location?.name + " - " + product?.name
              }}
            />
            <Column
              className="donGia"
              title="Đơn giá"
              key="price"
              render={(text) => {
                // console.log("text", text)
                // let vndCurrency = new Intl.NumberFormat("vi-VN",{currency: "VND"}).format(text.real_price)
                // return `${text.real_price} VNĐ`;
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
                // let vndCurrency = new Intl.NumberFormat("vi-VN",{currency: "VND"}).format(text.real_price)
                // return `${text.real_price} VNĐ`;
                // return `${new Intl.NumberFormat("vi-VN").format(text.quality * text.price)} VNĐ`;
                // console.log(text)
                // let newPrice = Number(text.real_price.replaceAll(".",""));
                return `${new Intl.NumberFormat("vi-VN").format(text.real_price * text.quality)} VNĐ`;
              }}
            />
            <Column
              className="price"
              title="Giá trị hiệu chỉnh"
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
                    //   dispatch({
                    //     type: DELETE_REQUEST,
                    //     data: {request_id: text.id, sub_contract_id}
                    //   })
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
            sub_contract_id={sub_contract_id}
            customerInfor={customerInfor}
            contract_id={valueForm.contract_ID}
          />
        </div>
        <ContractValue
          handleChangeValue={handleChangeValue}
          valueOfField={valueOfField}
          valueForm={valueForm}
          setValueForm={setValueForm}
          showGiaTriThucHien={showGiaTriThucHien}
          setUnlockInput={setUnlockInput}
          unlockInput={unlockInput}
          showGiaTriGoc={showGiaTriGoc}
        />
        <ContractPayment
          dotThanhToan={dotThanhToan}
          valueOfField={valueOfField}
          setValueForm={setValueForm}
          valueForm={valueForm}
        />
        <ContractHistory data={valueForm.history} VAT={valueForm.VAT} />
        <div className="create__contract__footer">
          <button className="footer__btn btn__delete" onClick={() => { history.replace(`${uri}/crm/contract`) }}>Hủy</button>
          {renderButtonCreateUpdate()}
        </div>
      </div >
    </div >
  );
}