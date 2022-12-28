import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_CONTRACT, GET_CONTRACT_LIST, GET_CONTRACT_TYPE_LIST } from "../../title/title";
import { createContractAPI, getContractListAPI, getContractTypeListAPI } from "../API/contractAPI";
import { setContractList, setContractTypeList } from "../features/contractSlice";

function* getContractList(payload){
    let {page, pageNumber} = payload.data;
    let result = yield call(getContractListAPI, page, pageNumber);
    let {total, data} = result;
    yield put(setContractList({total, contractList: data}));
}

function* getContractTypeList(){
    let result = yield call(getContractTypeListAPI);
    let {data } = result;
    yield put(setContractTypeList(data))
};

function* createContract(payload){
    let {data} = payload;
    let result = yield call(createContractAPI, data);
    console.log(result)
}

export default function* contractMiddleware(){
    yield takeLatest(GET_CONTRACT_LIST, getContractList)
    yield takeLatest(GET_CONTRACT_TYPE_LIST, getContractTypeList)
    yield takeLatest(CREATE_CONTRACT, createContract)
}