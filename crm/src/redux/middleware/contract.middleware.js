import { call, put, takeLatest } from "redux-saga/effects";
import { GET_CONTRACT_LIST } from "../../title/title";
import { getContractListAPI } from "../API/contractAPI";
import { setContractList } from "../features/contractSlice";

function* getContractList(payload){
    let {page, pageNumber} = payload.data;
    let result = yield call(getContractListAPI, page, pageNumber);
    let {total, data} = result;
    yield call(setContractList({total, contractList: data}));
}

export default function* contractMiddleware(){
    yield takeLatest(GET_CONTRACT_LIST, getContractList)
}