import { message } from "antd";
import { call, put, takeLatest } from "redux-saga/effects";
import { ADD_UNSET_CONTRACT_TO_EVENT, CREATE_EVENT, CREATE_REQUEST_EVENT, DELETE_REQUEST_EVENT, GET_EVENT_INFOR, GET_EVENT_LIST, GET_EVENT_REQUEST_CONTRACT_LIST, GET_EVENT_REQUEST_LIST, GET_UNSET_CONTRACT, SEARCH_EVENT, UPDATE_EVENT, UPDATE_REQUEST_EVENT } from "../../title/title";
import { dataOfEventMapping } from "../../untils/mapping";
import { addUnserContractToEventAPI, createEventAPI, createRequestAPI, deleteRequestAPI, getEventInforAPI, getEventListAPI, getEventRequestContractListAPI, getEventRequestListAPI, getUnsetContractAPI, searchEventAPI, updateEventAPI, updateRequestEventAPI } from "../API/eventAPI";
import { addContractRequest, deleteContractRequest, setContractDetail, setContractRequest } from "../features/contractSlice";
import { setDonors, setEventList, setEventRequestContractList, setRequestOfEventAcc, setTotalEventList, setUnsetContract } from "../features/eventSlice";
import { setIsLoading } from "../features/loadingSlice";

function* getEventList(payload){
    try {
        const result = yield call(getEventListAPI, payload.data);
        yield put(setEventList(result.data.event_management))
        yield put(setTotalEventList(result.data.total_data))
        yield put(setIsLoading(false))
    } catch (error) {
        console.log(error)
    }
};

function* createEvent(payload){
    try {
        const result = yield call(createEventAPI, payload.data);
        if(result.data?.id && typeof result.data?.id === "number"){
            message.success("Tạo sự kiện thành công")
        } else {
            message.error("Tạo sự kiện thất bại")
        }
    } catch (error) {
        console.log(error)
    }
};

function* getEventInfor(payload){
    try {
        const result = yield call(getEventInforAPI, payload.data);
        if(result.data.event_management.length > 0){
            let dataMapping = dataOfEventMapping(result.data.event_management[0]);
            yield put(setContractDetail(dataMapping.event))
            yield put(setContractRequest(dataMapping.requests))
            yield put(setDonors(dataMapping.contracts))
        }
    } catch (error) {
        console.log(error)
    }
}

function* updateEvent(payload){
    try {
        const result = yield call(updateEventAPI, payload.data);
        if(result.data.msg === "Update successfully"){
            message.success("Cập nhật sự kiện thành công")
        } else {
            message.error("Cập nhật sự kiện thất bại")
        }
    } catch (error) {
        console.log(error)
    }
}

function* createRequest(payload){
    try {
        const result = yield call(createRequestAPI, payload.data);
        if(result.data.details.length > 0){
            yield put(addContractRequest(result.data.details[0]));
            message.success("Thêm quyền lợi thành công")
        } else {
            message.error("Thêm quyền lợi thất bại")
        }
    } catch (error) {
        console.log(error)
    }
}

function* deleteRequest(payload){
    try {
        const result = yield call(deleteRequestAPI ,payload.request_id);
        if(result.data.result){
            yield put(deleteContractRequest(payload.request_id))
            message.success("Xóa quyền lợi thành công")
        } else {
            message.error("Xóa quyền lợi thất bại")
        }
    } catch (error) {
        console.log(error)
    }
}

function* searchEvent(payload){
    try {
        const result = yield call(searchEventAPI, payload.searchData.name);
        yield put(setEventList(result.data.event_management))
    } catch (error) {
        console.log(error)
    }
}

function* getUnsetContract(){
    try {
        const result = yield call(getUnsetContractAPI);
        yield put(setUnsetContract(result.data.contracts))
    } catch (error) {
        console.log(error)
    }
}

function* addUnserContractToEvent(payload){
    try {
        const result = yield call(addUnserContractToEventAPI, payload.data);
        if(result[0] === "Thành công"){
            message.success("Thêm nhà tài trợ thành công")
        } else {
            message.error("Thêm nhà tài trợ thất bại")
        }
    } catch (error) {
        console.log(error)
    }
}

function* updateRequestEvent(payload){
    try {
        const result = yield call(updateRequestEventAPI, payload.data)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

function* getEventRequestList(payload){
    try {
        const result = yield call(getEventRequestListAPI, payload.event_id);
        yield put(setRequestOfEventAcc(result.data.event_detail))
    } catch (error) {
        console.log(error)
    }
}

function* getEventRequestContractList(payload){
    try {
        let {event_id, detail_id} = payload.data;
        const result = yield call(getEventRequestContractListAPI, event_id, detail_id);
        yield put(setEventRequestContractList(result.data.event_management[0].contracts))
    } catch (error) {
        console.log(error)
    }
}

export default function* EventMiddleware(){
    yield takeLatest(GET_EVENT_LIST, getEventList)
    yield takeLatest(CREATE_EVENT, createEvent)
    yield takeLatest(GET_EVENT_INFOR, getEventInfor)
    yield takeLatest(UPDATE_EVENT, updateEvent)
    yield takeLatest(SEARCH_EVENT, searchEvent)
    yield takeLatest(GET_UNSET_CONTRACT, getUnsetContract)
    yield takeLatest(ADD_UNSET_CONTRACT_TO_EVENT, addUnserContractToEvent)
    // Request
    yield takeLatest(CREATE_REQUEST_EVENT, createRequest)
    yield takeLatest(DELETE_REQUEST_EVENT ,deleteRequest)
    yield takeLatest(UPDATE_REQUEST_EVENT, updateRequestEvent)
    yield takeLatest(GET_EVENT_REQUEST_LIST, getEventRequestList)
    // lấy danh sách nhà tài trợ có tick quyền lợi đó
    yield takeLatest(GET_EVENT_REQUEST_CONTRACT_LIST, getEventRequestContractList)
}