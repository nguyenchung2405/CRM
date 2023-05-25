import { message } from "antd";
import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_ACCEPTANCE, CREATE_EVENT_ACCEPTANCE, GET_ACCEPTANCE_CONTRACT_LIST, GET_ACCEPTANCE_EVENT_LIST } from "../../title/title";
import { createAcceptanceAPI, createDetailInAcceptanceAPI, createDetailInEventAcceptanceAPI, createEventAcceptanceAPI, getAcceptanceContractListAPI, getAcceptanceEventListAPI } from "../API/acceptanceAPI";
import { addDetailContractAccList, addDetailEventAccList, setEventAccList, setRequestAccList, setTotalEventAccList, setTotalRequestAccList } from "../features/acceptanceSlice";

function* createAcceptance(payload){
    try {
        console.log(payload.data)
        if(payload.data.detail_id && payload.data.detail_id !== null){
            const result = yield call(createAcceptanceAPI, payload.data);
            console.log("line 10",result)
            if (result.data.msg === "Updated successfully!") {
                yield put(addDetailContractAccList({request_id: payload.data.request_id, data: result.data.contract_detail, detail_id: result.data.contract_detail.id}))
                message.success("Tạo nghiệm thu thành công")
            } else {
                message.error("Tạo nghiệm thu thất bại")
            }
        } else {
            const resultDetail = yield call(createDetailInAcceptanceAPI, payload.data);
            let detail_id = resultDetail.data.details[0].id;
            let newDataAcceptance = {
                ...resultDetail.data.details[0],
                detail_id,
                files: payload.data.files,
                completed_evidences: payload.data.completed_evidences,
            }
            const result = yield call(createAcceptanceAPI, newDataAcceptance);
            console.log("line 25",result)
            if (result.data.msg === "Updated successfully!") {
                yield put(addDetailContractAccList({request_id: payload.data.request_id, data: result.data.contract_detail}))
                message.success("Tạo nghiệm thu thành công")
            } else {
                message.error("Tạo nghiệm thu thất bại")
            }
        }
    } catch (error) {
        console.log(error)
    }
}

function* getAcceptanceContractList(payload){
    try {
        let {page, pageNumber} = payload.data;
        const result = yield call(getAcceptanceContractListAPI, page, pageNumber);
        yield put(setRequestAccList(result.data.contract_request))
        yield put(setTotalRequestAccList(result.data.total_data))
    } catch (error) {
        console.log(error)
    }
}

function* getAcceptanceEventList(payload){
    try {
        let {page, pageNumber} = payload.data;
        const result = yield call(getAcceptanceEventListAPI, page, pageNumber);
        yield put(setEventAccList(result.data.event_detail))
        yield put(setTotalEventAccList(result.data.total_data))
    } catch (error) {
        console.log(error)
    }
}

function* createEventAcceptance(payload){
    try {
        // console.log("data gôc", payload.data)
        const resultDetail = yield call(createDetailInEventAcceptanceAPI, payload.data);
        let newDataAcceptance = {
            ...resultDetail.data?.event_executive_detail,
            files: payload.data.files,
            completed_evidences: payload.data.completed_evidences,
            contract_IDs: payload.data.contract_IDs,
            detail_id: resultDetail.data?.event_executive_detail.id,
            report_date: payload.data.report_date
        };
        const result = yield call(createEventAcceptanceAPI, newDataAcceptance);
        if(result.data?.msg === "Updated successfully!"){
            yield put(addDetailEventAccList({event_id: payload.data.event_id, data: result.data.executive_detail}))
            message.success("Tạo nghiệm thu thành công")
        } else {
            message.error("Tạo nghiệm thu thất bại")
        }
    } catch (error) {
        console.log(error)
    }
}

export default function* acceptanceMiddleware(){
    yield takeLatest(CREATE_ACCEPTANCE, createAcceptance)
    yield takeLatest(GET_ACCEPTANCE_CONTRACT_LIST, getAcceptanceContractList)
    yield takeLatest(GET_ACCEPTANCE_EVENT_LIST, getAcceptanceEventList)
    yield takeLatest(CREATE_EVENT_ACCEPTANCE, createEventAcceptance)
}