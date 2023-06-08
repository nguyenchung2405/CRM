import { message } from "antd";
import { call, put, takeLatest } from "redux-saga/effects";
import { CANCEL_EXPORT_RECEIPT, COMPLETE_EXPORT_RECEIPT, CREATE_EXPORT_RECEIPT, GET_ACCEPTANCE_LIST_BY_CONTRACT, GET_ACCEPTANCE_LIST_BY_EVENT, GET_PAYMENT_LIST } from "../../title/title";
import { cancelExportReceiptAPI, completeExportReceiptAPI, createExportReceiptAPI, getAcceptaneListByContractAPI, getPaymentListAPI } from "../API/receiptAPI";
import { addReceiptToList, completeReceiptFromList, removeReceiptFromList, setAccListInReceipt, setAccListInReceiptEvent, setReceiptList, setTotalReceipt } from "../features/receiptSlice";

function* createExportReceipt(payload){
    try {
        const result = yield call(createExportReceiptAPI, payload.data);
        if(result.data.receipt_ID.id){
            let receipt = {
                ...result.data.receipt_ID,
                contract_id: payload.data.contract_id
            }
            yield put(addReceiptToList(receipt))
            message.success("Xuất hóa đơn thành công")
        } else {
            message.error("Xuất hóa đơn thất bại")
        }
    } catch (error) {
        console.log(error)
    }
}

function* cancelExportReceipt(payload){
    try {
        const result = yield call(cancelExportReceiptAPI, payload.data);
        if(result.data.result){
            yield put(removeReceiptFromList(payload.data))
            message.success("Hủy hóa đơn thành công")
        } else {
            message.error("Hủy hóa đơn thất bại")
        }
    } catch (error) {
        console.log(error)
    }
}

function* completeExportReceipt(payload){
    try {
        const result = yield call(completeExportReceiptAPI, payload.data);
        if(result.data.msg){
            yield put(completeReceiptFromList(payload.data))
            message.success("Hoàn tất hóa đơn thành công")
        } else {
            message.error("Hoàn tất hóa đơn thất bại")
        }
    } catch (error) {
        console.log(error)
    }
}

function* getAcceptaneListByContract(payload){
    try {
        let {contract_id, has_payment, is_complete} = payload.data;
        const result = yield call(getAcceptaneListByContractAPI, contract_id, has_payment, is_complete, false);
        yield put(setAccListInReceiptEvent(result.data.contract_detail))
    } catch (error) {
        console.log(error)
    }
}

function* getAcceptaneListByEvent(payload){
    try {
        let {contract_id, has_payment, is_complete} = payload.data;
        const result = yield call(getAcceptaneListByContractAPI, contract_id, has_payment, is_complete, true);
        yield put(setAccListInReceipt(result.data.executive_detail))
    } catch (error) {
        console.log(error)
    }
}

function* getPaymentList(payload){
    try {
        let { page, pageNumber } = payload.data;
        const result = yield call(getPaymentListAPI, page, pageNumber);
        yield put(setTotalReceipt(result.total_data))
        yield put(setReceiptList(result.payment))
    } catch (error) {
        console.log(error)
    }
}

export default function* receiptMiddleware(){
    yield takeLatest(CREATE_EXPORT_RECEIPT, createExportReceipt)
    yield takeLatest(CANCEL_EXPORT_RECEIPT, cancelExportReceipt)
    yield takeLatest(COMPLETE_EXPORT_RECEIPT, completeExportReceipt)
    yield takeLatest(GET_ACCEPTANCE_LIST_BY_CONTRACT, getAcceptaneListByContract)
    yield takeLatest(GET_ACCEPTANCE_LIST_BY_EVENT, getAcceptaneListByEvent)
    // lấy danh sách payment để hiển thị danh sách hóa đơn
    yield takeLatest(GET_PAYMENT_LIST, getPaymentList)
}