import { message } from "antd";
import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_EVENT, CREATE_REQUEST_EVENT, DELETE_REQUEST_EVENT, GET_EVENT_INFOR, GET_EVENT_LIST, SEARCH_EVENT, UPDATE_EVENT } from "../../title/title";
import { dataOfEventMapping } from "../../untils/mapping";
import { createEventAPI, createRequestAPI, deleteRequestAPI, getEventInforAPI, getEventListAPI, searchEventAPI, updateEventAPI } from "../API/eventAPI";
import { addContractRequest, deleteContractRequest, setContractDetail, setContractRequest } from "../features/contractSlice";
import { setDonors, setEventList, setTotalEventList } from "../features/eventSlice";
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

export default function* EventMiddleware(){
    yield takeLatest(GET_EVENT_LIST, getEventList)
    yield takeLatest(CREATE_EVENT, createEvent)
    yield takeLatest(GET_EVENT_INFOR, getEventInfor)
    yield takeLatest(UPDATE_EVENT, updateEvent)
    yield takeLatest(SEARCH_EVENT, searchEvent)
    // Request
    yield takeLatest(CREATE_REQUEST_EVENT, createRequest)
    yield takeLatest(DELETE_REQUEST_EVENT ,deleteRequest)
}