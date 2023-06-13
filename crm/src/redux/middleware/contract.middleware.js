import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_CONTRACT, CREATE_DETAIL, CREATE_PAYMENT, CREATE_REQUEST, DELETE_REQUEST, GET_CONTRACT_DETAIL, GET_CONTRACT_LIST, GET_CONTRACT_REQUEST, GET_CONTRACT_TYPE_LIST, GET_OWNER_LIST, GET_REQUEST_OF_EVENT, IMPORT_FILE, SELECT_REQUEST_GENERAL, UPDATE_CONTRACT, UPDATE_DETAIL, UPDATE_PAYMENT, UPDATE_REQUEST } from "../../title/title";
import { dataOfContractMapping, dataOfEventMapping, dataOfPayment } from "../../untils/mapping";
import { createContractAPI, createDetailAPI, createPaymentAPI, createRequestAPI, deleteRequestAPI, getContractDetailAPI, getContractListAPI, getContractRequestAPI, getContractTypeListAPI, getOwnerListAPI, getRequestOfEventAPI, getSelectRequestGeneralAPI, importFileExcelAPI, selectRequestGeneralAPI, updateContractiAPI, updateDetailAPI, updatePaymentAPI, updateRequestAPI } from "../API/contractAPI";
import { addContractRequest, addPayment, deleteContractRequest, setContractDetail, setContractList, setContractRequest, setContractTypeList, setOwnerList, updateContractRequest, updateRequestDetail } from "../features/contractSlice";
import { setRequestOfEvent, setSelectRequest } from "../features/eventSlice";
import { setIsLoading } from "../features/loadingSlice";
import { setMessage } from "../features/messageSlice";
import { addPaymentToReceiptList, updatePaymentToReceiptList } from "../features/receiptSlice";
import {message} from "antd"

function* getContractList(payload) {
    try {
        let { page, pageNumber, status } = payload.data;
        let result = yield call(getContractListAPI, page, pageNumber, status);
        let { total_data: total, contract: data } = result.data;
        yield put(setContractList({ total, contractList: data }));
        yield put(setIsLoading(false))
    } catch (error) {
        console.log(error)
}
}

function* getContractTypeList() {
    try {
        let result = yield call(getContractTypeListAPI);
        let { contract_type } = result.data;
        yield put(setContractTypeList(contract_type))
    } catch (error) {
        console.log(error)
    }
};

function* createContract(payload) {
    try {
        let { data } = payload;
        let result = yield call(createContractAPI, data);
        let { code } = result;
        if (+code === 200 || result.data?.contract?.id) {
            yield put(setMessage({ type: "thành công", msg: "Tạo hợp đồng thành công." }))
        } else {
            yield put(setMessage({ type: "thất bại", msg: "Tạo hợp đồng thất bại." }))
        }
    } catch (error) {
        console.log(error)
    }
};

function* getContractDetail(payload) {
    try {
        let { contract_id } = payload;
        let result = yield call(getContractDetailAPI, contract_id);
        let { code, data } = result;
        let responseRequest = yield call(getContractRequestAPI, contract_id);
        if (+code === 200 || result.data.contract.length > 0) {
            let dataAfterMapping = dataOfContractMapping(result.data.contract[0]);
            dataAfterMapping.payments = dataOfPayment(result.data.contract[0].payments);
            yield put(setContractDetail(dataAfterMapping))
            yield put(setContractRequest(responseRequest.data.contract_request))
            yield put(setSelectRequest(dataAfterMapping.dataContract.event_detail_IDs))
            yield put(setIsLoading(false))
        } else {
            yield put(setContractDetail({}))
        }
    } catch (error) {
        console.log(error)
    }
};

function* getOwnerList(payload){
    try {
        const result = yield call(getOwnerListAPI);
        if(result.data.users.length > 0){
            yield put(setOwnerList(result.data.users))
        }
    } catch (error) {
        console.log(error)
    }
}

function* updateContract(payload){
    try {
        const result = yield call(updateContractiAPI, payload.data);
        if(result.data?.msg === "Updated successfully!"){
            yield put(setMessage({ type: "thành công", msg: "Cập nhật hợp đồng thành công." }))
        } else {
            yield put(setMessage({ type: "thất bại", msg: "Cập nhật hợp đồng thất bại." }))
        }
    } catch (error) {
        console.log(error)
    }
}

function* createRequest(payload){
    try {
        const result = yield call(createRequestAPI ,payload.data);
        if(result.data.requests.length > 0){
            yield put(addContractRequest(result.data.requests[0]));
            yield put(setMessage({ type: "thành công", msg: "Tạo quyền lợi hợp đồng thành công." }))
            yield put({ type: GET_CONTRACT_DETAIL, contract_id: payload.data.contract_id })
        } else {
            yield put(setMessage({ type: "thất bại", msg: "Tạo quyền lợi hợp đồng thất bại." }))
        }
    } catch (error) {
        console.log(error)
    }
}

function* deleteRequest(payload){
    try {
        const result = yield call(deleteRequestAPI ,payload.request_id);
        if(result.data.msg === "Vô hiệu yêu cầu hợp đồng thành công."){
            yield put(deleteContractRequest(payload.request_id))
            yield put(setMessage({ type: "thành công", msg: "Xóa quyền lợi hợp đồng thành công." }))
        } else {
            yield put(setMessage({ type: "thất bại", msg: "Xóa quyền lợi hợp đồng thất bại." }))
        }
    } catch (error) {
        console.log(error)
    }
}

function* updateRequest(payload){
    try {
        const result = yield call(updateRequestAPI, payload.data);
        if(result.data.msg === "Updated successfully!"){
            yield put(updateContractRequest(payload.data))
            yield put(setMessage({ type: "thành công", msg: "Cập nhật quyền lợi hợp đồng thành công." }))
        } else {
            yield put(setMessage({ type: "thất bại", msg: "Cập nhật quyền lợi hợp đồng thất bại." }))
        }
    } catch (error) {
        console.log(error)
    }
}

function* createDetail(payload){
    try {
        const result = yield call(createDetailAPI, payload.data);
        if(result.data.details.length > 0){
            yield put(updateRequestDetail({ request_id: payload.data.request_id, detailData: result.data.details[0], detail_id_old: payload.data.id }))
            yield put(setMessage({ type: "thành công", msg: "Thêm chi tiết quyền lợi hợp đồng thành công." }))
        } else {
            yield put(setMessage({ type: "thất bại", msg: "Thêm chi tiết quyền lợi hợp đồng thất bại." }))
        }
    } catch (error) {
        console.log(error)
    }
}

function* updateDetail(payload){
    try {
        const result = yield call(updateDetailAPI, payload.data);
        if(result.data.msg === "Updated successfully!"){
            yield put(updateRequestDetail({ request_id: payload.data.request_id, detailData: payload.data }))
            yield put(setMessage({ type: "thành công", msg: "Cập nhật chi tiết quyền lợi hợp đồng thành công." }))
        } else {
            yield put(setMessage({ type: "thất bại", msg: "Cập nhật chi tiết quyền lợi hợp đồng thất bại." }))
        }
    } catch (error) {
        console.log(error)
    }
}

function* createPayment(payload){
    try {
        const result = yield call(createPaymentAPI, payload.data);
        if(result.data.payment.contract_ID){
            let newPayment = {
                ...result.data.payment,
                total_value: result.data.payment.total_value * 1000000,
            }
            message.success("Thêm đợt thanh toán thành công.")
            yield put(addPayment(newPayment))
            yield put(addPaymentToReceiptList({contract_id: payload.data.contract_ID, data: {...result.data.payment, receipts: [], total_value: result.data.payment.total_value}}))
            // yield put(setMessage({ type: "thành công", msg: "Thêm đợt thanh toán thành công." }))
        } else {
            // yield put(setMessage({ type: "thất bại", msg: "Thêm đợt thanh toán thất bại." }))
            message.error("Thêm đợt thanh toán thất bại.")
        }
    } catch (error) {
        console.log(error)
    }
}

function* updatePayment(payload){
    try {
        const result = yield call(updatePaymentAPI, payload.data);
        if(result.data?.msg === "Updated successfully!"){
            message.success("Cập nhât thành công.")
            yield put(updatePaymentToReceiptList({contract_id: payload.data.contract_id, data: payload.data}))
        } else {
            message.error("Cập nhât thất bại.")
        }
    } catch (error) {
        console.log(error)
    }
}

function* getRequestOfEvent(payload){
    try {
        const result = yield call(getRequestOfEventAPI, payload.event_id);
        let dataMapping = dataOfEventMapping(result.data.event_management[0]);
        yield put(setRequestOfEvent(dataMapping.requests))
    } catch (error) {
        console.log(error)
    }
}

function* importFileExcel(payload){
    try {
        const result = yield call(importFileExcelAPI, payload.data);
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

export default function* contractMiddleware() {
    yield takeLatest(GET_CONTRACT_LIST, getContractList)
    yield takeLatest(GET_CONTRACT_TYPE_LIST, getContractTypeList)
    yield takeLatest(CREATE_CONTRACT, createContract)
    yield takeLatest(GET_CONTRACT_DETAIL, getContractDetail);
    yield takeLatest(GET_OWNER_LIST, getOwnerList)
    yield takeLatest(UPDATE_CONTRACT, updateContract)
    // Request Middleware
    yield takeLatest(CREATE_REQUEST, createRequest)
    yield takeLatest(DELETE_REQUEST, deleteRequest)
    yield takeLatest(UPDATE_REQUEST, updateRequest)
    // Detail Middleware
    yield takeLatest(CREATE_DETAIL, createDetail)
    yield takeLatest(UPDATE_DETAIL, updateDetail)
    // Payment
    yield takeLatest(CREATE_PAYMENT, createPayment)
    yield takeLatest(UPDATE_PAYMENT, updatePayment)
    // Event
    // call API lấy quyền lợi chung về nếu loại HĐ là "Sự kịện"
    yield takeLatest(GET_REQUEST_OF_EVENT, getRequestOfEvent)
    // Import Export file Excel
    yield takeLatest(IMPORT_FILE, importFileExcel)
}