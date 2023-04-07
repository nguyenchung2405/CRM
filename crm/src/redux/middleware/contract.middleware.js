import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_CONTRACT, GET_CONTRACT_DETAIL, GET_CONTRACT_LIST, GET_CONTRACT_REQUEST, GET_CONTRACT_TYPE_LIST, GET_OWNER_LIST } from "../../title/title";
import { dataOfContractMapping } from "../../untils/mapping";
import { createContractAPI, getContractDetailAPI, getContractListAPI, getContractRequestAPI, getContractTypeListAPI, getOwnerListAPI } from "../API/contractAPI";
import { setContractDetail, setContractList, setContractRequest, setContractTypeList, setOwnerList } from "../features/contractSlice";
import { setIsLoading } from "../features/loadingSlice";
import { setMessage } from "../features/messageSlice";

function* getContractList(payload) {
    try {
        let { page, pageNumber } = payload.data;
        let result = yield call(getContractListAPI, page, pageNumber);
        let { total_data: total, contract: data } = result.data;
        yield put(setContractList({ total, contractList: data }));
        yield put(setIsLoading(false))
    } catch (error) {
        console.log(error)
}
}

function* getContractTypeList() {
    let result = yield call(getContractTypeListAPI);
    let { contract_type } = result.data;
    yield put(setContractTypeList(contract_type))
};

function* createContract(payload) {
    let { data } = payload;
    let result = yield call(createContractAPI, data);
    let { code } = result;
    if (+code === 200 || result.data?.idcontract) {
        yield put(setMessage({ type: "thành công", msg: "Tạo hợp đồng thành công." }))
    } else {
        yield put(setMessage({ type: "thất bại", msg: "Tạo hợp đồng thất bại." }))
    }
};

function* getContractDetail(payload) {
    let { contract_id } = payload;
    let result = yield call(getContractDetailAPI, contract_id);
    let { code, data } = result;
    let responseRequest = yield call(getContractRequestAPI, contract_id);
    if (+code === 200 || result.data.contract.length > 0) {
        let dataAfterMapping = dataOfContractMapping(result.data.contract[0]);
        yield put(setContractDetail(dataAfterMapping))
        yield put(setContractRequest(responseRequest.data.contract_request))
        yield put(setIsLoading(false))
    } else {
        yield put(setContractDetail({}))
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

export default function* contractMiddleware() {
    yield takeLatest(GET_CONTRACT_LIST, getContractList)
    yield takeLatest(GET_CONTRACT_TYPE_LIST, getContractTypeList)
    yield takeLatest(CREATE_CONTRACT, createContract)
    yield takeLatest(GET_CONTRACT_DETAIL, getContractDetail);
    yield takeLatest(GET_OWNER_LIST, getOwnerList)
}