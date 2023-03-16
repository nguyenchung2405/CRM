import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_CONTRACT, GET_CONTRACT_DETAIL, GET_CONTRACT_LIST, GET_CONTRACT_TYPE_LIST } from "../../title/title";
import { dataOfContractMapping } from "../../untils/mapping";
import { createContractAPI, getContractDetailAPI, getContractListAPI, getContractTypeListAPI } from "../API/contractAPI";
import { setContractDetail, setContractList, setContractTypeList } from "../features/contractSlice";
import { setIsLoading } from "../features/loadingSlice";
import { setMessage } from "../features/messageSlice";

function* getContractList(payload){
    let {page, pageNumber} = payload.data;
    let result = yield call(getContractListAPI, page, pageNumber);
    let {total_data: total, contract: data} = result.data;
    yield put(setContractList({total, contractList: data}));
    yield put(setIsLoading(false))

}

function* getContractTypeList(){
    let result = yield call(getContractTypeListAPI);
    let {contract_type } = result.data;
    yield put(setContractTypeList(contract_type))
};

function* createContract(payload){
    let {data} = payload;
    let result = yield call(createContractAPI, data);
    let {code} = result;
    if(+code === 200){
        yield put(setMessage({type: "thành công", msg:"Tạo hợp đồng thành công."}))
    } else {
        yield put(setMessage({type: "thất bại", msg:"Tạo hợp đồng thất bại."}))
    }
};

function* getContractDetail(payload){
    let {contract_id} = payload;
    let result = yield call(getContractDetailAPI, contract_id);
    let {code, data} = result;
    if(+code === 200){
        let dataAfterMapping = dataOfContractMapping(data);
        yield put(setContractDetail(dataAfterMapping))
    } else {
        yield put(setContractDetail({}))
    }
}

export default function* contractMiddleware(){
    yield takeLatest(GET_CONTRACT_LIST, getContractList)
    yield takeLatest(GET_CONTRACT_TYPE_LIST, getContractTypeList)
    yield takeLatest(CREATE_CONTRACT, createContract)
    yield takeLatest(GET_CONTRACT_DETAIL, getContractDetail);
}