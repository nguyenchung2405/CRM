import { DatePicker, Modal, Select } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAccListInReceipt, setAccListInReceiptEvent } from '../../redux/features/receiptSlice';
import { CREATE_PAYMENT, GET_ACCEPTANCE_LIST_BY_CONTRACT, GET_ACCEPTANCE_LIST_BY_EVENT, GET_CONTRACT_DETAIL, GET_EVENT_INFOR, UPDATE_PAYMENT } from '../../title/title';
import AcceptanceRow from './AcceptanceRow';
import EventAccRow from './EventAccRow';
import EventAccRowOfContract from './EventAccRowOfContract';
import {v4 as uuidv4} from "uuid"

export default function CreateReceiptModal(props) {
    
    const {isShowModal, setIsShowModal, dataToCreateModal} = props;
    const dispatch = useDispatch();
    const {Option} = Select;
    const { acceptanceListInReceipt, acceptanceListInReceiptEvent } = useSelector(state => state.receiptReducer);
    const {contractDetail} = useSelector(state => state.contractReducer)
    const { donors } = useSelector(state => state.eventReducer);
    const [valueModal, setValueModal] = useState({delay_payment: 15});
    const [moreValue, setMoreValue] = useState({});
    const [multiSelect, setMultiSelect] = useState([]);
    const [multiSelect2, setMultiSelect2] = useState([]);

    useEffect(()=>{
        if(dataToCreateModal.contract_id && isShowModal){
            dispatch({
                type: GET_CONTRACT_DETAIL,
                contract_id: dataToCreateModal.contract_id
            });
            dispatch({
                type: GET_ACCEPTANCE_LIST_BY_CONTRACT,
                data: {contract_id: dataToCreateModal.contract_id, has_payment: false, is_complete: true}
            })
        }
        // if(!dataToCreateModal.event_id && dataToCreateModal.contract_id){
        //     dispatch({
        //         type: GET_ACCEPTANCE_LIST_BY_CONTRACT,
        //         contract_id: dataToCreateModal.contract_id
        //     })
        // }
    }, [dataToCreateModal.contract_id, isShowModal])

    useEffect(()=>{
        if(dataToCreateModal.event_id && typeof dataToCreateModal.event_id === "number" && isShowModal){
            dispatch({
                type: GET_EVENT_INFOR,
                data: dataToCreateModal.event_id
            })
        }
    }, [dataToCreateModal.event_id, isShowModal])

    useEffect(()=>{
        if(dataToCreateModal.isUpdate){
            let {isUpdate, ...rest} = dataToCreateModal;
            let newData = {
                ...rest,
                total_value: rest.total_value * 1000000
            }
            setValueModal({...newData})
        }
    }, [dataToCreateModal])

    useEffect(()=>{
        setMoreValue({
            real_time_total: contractDetail.dataContract?.real_time_total,
            total_completed_payments: contractDetail.dataContract?.total_completed_payments,
            total_created_payments: contractDetail.dataContract?.total_created_payments
        })
    }, [contractDetail])

    const handleCancel = ()=>{
        setIsShowModal(false)
        setValueModal({delay_payment: 15})
        setMultiSelect([])
        setMultiSelect2([])
        dispatch(setAccListInReceiptEvent([]))
        dispatch(setAccListInReceipt([]))
    }

    const handleOk = ()=>{
        if(!dataToCreateModal.isUpdate){
            let newPayment = {
                ...valueModal,
                desc: "",
                contract_ID: dataToCreateModal.contract_id ? dataToCreateModal.contract_id : valueModal.contract_ID,
                detail_IDs: multiSelect,
                executive_event_IDs: multiSelect2
            }
            dispatch({
                type: CREATE_PAYMENT,
                data: newPayment
            })
        } else {
            let newPayment ={
                ...valueModal,
                total_value: valueModal.total_value / 1000000,
                request_date: moment(valueModal.request_date).format("YYYY-MM-DD")
            }
            dispatch({
                type: UPDATE_PAYMENT,
                data: newPayment
            })
        }
        dispatch(setAccListInReceiptEvent([]))
        dispatch(setAccListInReceipt([]))
        setIsShowModal(false)
        setValueModal({delay_payment: 15})
        setMultiSelect([])
    }

    const handleChangeValue = (name, value)=>{
        setValueModal({
            ...valueModal,
            [name]: value
        })
    };

    const valueOfField = (name)=>{
        if(name === "request_date"){
            if(valueModal[name]){
                let newRequestDate = moment(new Date(valueModal[name])).format("DD-MM-YYYY")
                return moment(newRequestDate, "DD-MM-YYYY")
            }
            return null
        } else {
            if(valueModal[name]){
                return valueModal[name]
            } else {
                return ""
            }
        }
    }
    
    const showValue = (name)=>{
        if(moreValue[name] >= 0 && moreValue[name] !== undefined){
            return new Intl.NumberFormat("vi-VN").format(moreValue[name] * 1000000)
        } else {
            return 0
        }
    }

    const renderAccList = ()=>{
        return acceptanceListInReceiptEvent?.map(acc => {
            let ngayNghiemThu = moment(new Date(acc.report_date)).format("DD-MM-YYYY")
            return <AcceptanceRow 
            ngayNghiemThu={ngayNghiemThu}
            data={acc}
            setMultiSelect={setMultiSelect}
            multiSelect={multiSelect}
            key={uuidv4()}
            />
        })
    }

    const renderAccListForEvent = ()=>{
        let accOfEvent = acceptanceListInReceipt.map(item => {
            let convertDate = moment(new Date(item.report_date)).format("DD-MM-YYYY")
            return <EventAccRow 
            convertDate={convertDate}
            data={item}
            setMultiSelect2={setMultiSelect2}
            multiSelect2={multiSelect2}
            key={uuidv4()}
            />
        });
        let accOfContract = acceptanceListInReceiptEvent.map(item => {
            let convertDate = moment(new Date(item.report_date)).format("DD-MM-YYYY")
            return <EventAccRowOfContract 
            convertDate={convertDate}
            data={item}
            setMultiSelect={setMultiSelect}
            multiSelect={multiSelect}
            key={uuidv4()}
            />
        })
        return accOfEvent.concat(accOfContract)
    }

    const renderOptionDonors = ()=>{
        return donors.map(item => {
            return <Option key={item.contract_ID} value={item.contract_ID}>{item.client_name}</Option>
        })
    }

    const renderContentOFModal = ()=>{
        if(dataToCreateModal.event_id){
            return <>
                <div className="modal__field field__select" key={uuidv4()}>
                    <div>
                        <label className="term__label">Danh sách hợp đồng</label>
                        <Select
                            className="style"
                            showSearch
                            filterOption={(input, option) =>
                                (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                            }
                            value={valueOfField("contract_ID")}
                            onChange={(value) => {
                                dispatch({
                                    type: GET_ACCEPTANCE_LIST_BY_EVENT,
                                    data: { contract_id: value, has_payment: false, is_complete: true }
                                })
                                dispatch({
                                    type: GET_ACCEPTANCE_LIST_BY_CONTRACT,
                                    data: { contract_id: value, has_payment: false, is_complete: true }
                                })
                                dispatch({
                                    type: GET_CONTRACT_DETAIL,
                                    contract_id: value
                                });
                                handleChangeValue("contract_ID", value)
                            }}
                        >
                            {renderOptionDonors()}
                        </Select>
                    </div>
                </div>
                <div className="modal__field field__select" key={uuidv4()}>
                    <div>
                        <label className="term__label">Ngày quyết toán</label>
                        <DatePicker
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
                            className="style report__date"
                            format={"DD-MM-YYYY"}
                            onChange={(date, dateString) => {
                                let ngayThanhToan = moment(dateString, "DD-MM-YYYY").toISOString();
                                handleChangeValue("request_date", ngayThanhToan)
                            }}
                            value={valueOfField("request_date")}
                        />
                    </div>
                </div>
                <div className="modal__field field__select modal__report__upload" key={uuidv4()}>
                    <div className="modal__field">
                        <input type="text"
                            name="total_value"
                            value={valueOfField("total_value")}
                            onChange={e => {
                                let { value, name } = e.target;
                                handleChangeValue(name, value)
                            }}
                        />
                        <label>Tiền</label>
                    </div>
                </div>
                {!dataToCreateModal.isUpdate
                    ?
                    <>
                        <div className="modal__field field__select modal__report__upload" key={uuidv4()}>
                            <div className="modal__field">
                                <input type="text"
                                    name="delay_payment"
                                    value={valueOfField("delay_payment")}
                                    onChange={e => {
                                        let { value, name } = e.target;
                                        handleChangeValue(name, value)
                                    }}
                                />
                                <label>Số ngày hết hạn</label>
                            </div>
                        </div>
                        <div className="modal__field field__select width_525" key={uuidv4()}>
                            <div>
                                <label className="term__label">Danh sách đã nghiệm thu</label>
                                <div className="acceptance__list" key={uuidv4()}>
                                    {renderAccListForEvent()}
                                </div>
                            </div>
                        </div>
                    </>
                    : ""
                }
            </>
        } else {
            return <>
                <div className="modal__field field__select" key={uuidv4()}>
                    <div>
                        <label className="term__label">Ngày quyết toán</label>
                        <DatePicker
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
                            className="style report__date"
                            format={"DD-MM-YYYY"}
                            onChange={(date, dateString) => {
                                let ngayThanhToan = moment(dateString, "DD-MM-YYYY").toISOString();
                                handleChangeValue("request_date", ngayThanhToan)
                            }}
                            value={valueOfField("request_date")}
                        />
                    </div>
                </div>
                <div className="modal__field field__select modal__report__upload" key={uuidv4()}>
                    <div className="modal__field">
                        <input type="text"
                            name="total_value"
                            value={valueOfField("total_value")}
                            onChange={e => {
                                let { value, name } = e.target;
                                handleChangeValue(name, value)
                            }}
                        />
                        <label>Tiền</label>
                    </div>
                </div>
                {!dataToCreateModal.isUpdate
                    ?
                    <>
                        <div className="modal__field field__select modal__report__upload" key={uuidv4()}>
                            <div className="modal__field">
                                <input type="text"
                                    name="delay_payment"
                                    value={valueOfField("delay_payment")}
                                    onChange={e => {
                                        let { value, name } = e.target;
                                        handleChangeValue(name, value)
                                    }}
                                />
                                <label>Số ngày hết hạn</label>
                            </div>
                        </div>
                        <div className="modal__field field__select width_525" key={uuidv4()}>
                            <div>
                                <label className="term__label">Danh sách đã nghiệm thu</label>
                                <div className="acceptance__list" key={uuidv4()}>
                                    {renderAccList()}
                                </div>
                            </div>
                        </div>
                    </>
                    : ""
                }
            </>
        }
    }

  return (
      <Modal
          title={<span>{!dataToCreateModal.isUpdate ? "Tạo quyết toán" : "Cập nhật quyết toán"}</span>}
          closeIcon={<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.61719 6.5L13.4609 11.3438C13.5911 11.474 13.5911 11.6172 13.4609 11.7734L12.5625 12.6719C12.4062 12.8021 12.263 12.8021 12.1328 12.6719L11.3125 11.8125L7.28906 7.82812L2.44531 12.6719C2.3151 12.8021 2.17188 12.8021 2.01562 12.6719L1.11719 11.7734C0.986979 11.6172 0.986979 11.474 1.11719 11.3438L5.96094 6.5L1.11719 1.65625C0.986979 1.52604 0.986979 1.38281 1.11719 1.22656L2.01562 0.328125C2.17188 0.197917 2.3151 0.197917 2.44531 0.328125L7.28906 5.17188L12.1328 0.328125C12.263 0.197917 12.4062 0.197917 12.5625 0.328125L13.4609 1.22656C13.5911 1.38281 13.5911 1.52604 13.4609 1.65625L12.6016 2.47656L8.61719 6.5Z" fill="black" />
          </svg>}
          footer={
              <div className="contract__service__footer">
                  <button type="button" className="ant-btn ant-btn-default btn__cancel" onClick={handleCancel}>
                      <span>Hủy</span>
                  </button>
                  <button type="button" className="ant-btn ant-btn-default btn__add" onClick={handleOk} >
                      <span>{!dataToCreateModal.isUpdate ? "Tạo" : "Cập nhật"}</span>
                  </button>
              </div>
          }
          open={isShowModal}
          onCancel={handleCancel}
      >
          <div className="modal__content contract__service">
                {renderContentOFModal()}
              <div className="receipt__modal__acceptance__values">
                  <h3>Tổng giá trị đã nghiệm thu: {showValue("real_time_total")} VNĐ</h3>
                  <h3>Tổng giá trị hợp đồng đã thanh toán: {showValue("total_completed_payments")} VNĐ</h3>
                  <h3>Tổng giá trị thanh toán đã tạo: {showValue("total_created_payments")} VNĐ</h3>
              </div>
          </div>
      </Modal>
  )
}