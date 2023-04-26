import { message } from "antd";
import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_EVENT, GET_EVENT_INFOR, GET_EVENT_LIST } from "../../title/title";
import { dataOfEventMapping } from "../../untils/mapping";
import { createEventAPI, getEventInforAPI, getEventListAPI } from "../API/eventAPI";
import { setContractDetail, setContractRequest } from "../features/contractSlice";
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
            console.log(dataMapping)
            yield put(setContractDetail(dataMapping.event))
            yield put(setContractRequest(dataMapping.requests))
            yield put(setDonors(dataMapping.contracts))
        }
    } catch (error) {
        console.log(error)
    }
}

export default function* EventMiddleware(){
    yield takeLatest(GET_EVENT_LIST, getEventList)
    yield takeLatest(CREATE_EVENT, createEvent)
    yield takeLatest(GET_EVENT_INFOR, getEventInfor)
}