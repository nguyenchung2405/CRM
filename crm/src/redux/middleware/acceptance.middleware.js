import { message } from "antd";
import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_ACCEPTANCE, GET_ACCEPTANCE_CONTRACT_LIST } from "../../title/title";
import { createAcceptanceAPI, createDetailInAcceptanceAPI, getAcceptanceContractListAPI } from "../API/acceptanceAPI";
import { setRequestAccList, setTotalRequestAccList } from "../features/acceptanceSlice";

function* createAcceptance(payload){
    try {
        if(payload.data.detail_id && payload.data.detail_id !== null){
            const result = yield call(createAcceptanceAPI, payload.data);
            // console.log("line 10",result)
            if (result.data.msg === "Updated successfully!") {
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
                files: payload.data.files
            }
            const result = yield call(createAcceptanceAPI, newDataAcceptance);
            console.log("line 25",result)
            if (result.data.msg === "Updated successfully!") {
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

export default function* acceptanceMiddleware(){
    yield takeLatest(CREATE_ACCEPTANCE, createAcceptance)
    yield takeLatest(GET_ACCEPTANCE_CONTRACT_LIST, getAcceptanceContractList)
}