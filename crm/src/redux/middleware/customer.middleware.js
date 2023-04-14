import { call, delay, put, takeLatest } from "redux-saga/effects";
import { CREATE_CUSTOMER, CREATE_CUSTOMER_TYPE, GET_CUSTOMER_DETAIL, GET_CUSTOMER_LIST, GET_CUSTOMER_TYPE_LIST, GET_JOB_TYPE_LIST, SEARCH_CUSTOMER, UPDATE_CUSTOMER } from "../../title/title";
import { createCustomerAPI, createCustomerTypeAPI, getCustomerListAPI, getCustomerTypeListAPI, getDetailCustomerAPI, getJobTypeListAPI, searchCustomerAPI, updateCustomerAPI } from "../API/customeAPI";
import { addCustomer, addCustomerType, setCustomerList, setCustomerTypeList, setDataCustomer, setJobTypeList, setTotalCustomer, updateCusomer } from "../features/customer.feature";
import { setIsLoading } from "../features/loadingSlice";
import { setMessage } from "../features/messageSlice";

function* getCustomerList(payload){
    let {page, pageNumber} = payload.data;
    let result = yield call(getCustomerListAPI, page, pageNumber);
    // let {code, data} = result.data;
    if(result?.data?.client?.length > 0){
        yield put(setCustomerList(result.data.client))
        yield put(setTotalCustomer(result.data.total_data))
        yield put(setIsLoading(false))
    } else {
        yield put(setIsLoading(false))
    }
}

function* createCustomer(payload){
    let {data} = payload;
    if(!data.is_company){
        data.is_company = false;
    }
    let result = yield call(createCustomerAPI, data);
    let {code, data: dataResponse} = result;
    if(code === 200 || dataResponse){
        yield put(addCustomer(dataResponse));
        yield put(setMessage({type: "thành công", msg:"Tạo khách hàng thành công."}))
        yield delay(1000)
        yield put(setMessage({type: "", msg:""}))
    } else {
        yield put(setMessage({type: "thất bại", msg:"Tạo khách hàng thất bại."}))
        yield delay(1000)
        yield put(setMessage({type: "", msg:""}))
    }
}

function* searchCustomer(payload){
    let {searchData} = payload;
    let result = yield call(searchCustomerAPI, searchData);
    // let {code, data: dataResponse} = result;
    if(result.code === 200 || result?.data?.client?.length > 0){
        yield put(setCustomerList(result.data.client))
        yield put(setTotalCustomer(result.data.total_data))
        yield put(setMessage({type: "thành công", msg:"Thao tác thành công."}))
        yield delay(1000)
        yield put(setMessage({type: "", msg:""}))
    } else {
        yield put(setMessage({type: "thất bại", msg:"Thao tác thất bại."}))
        yield delay(1000)
        yield put(setMessage({type: "", msg:""}))
    }
}

function* updateCustomer(payload){
    let {data} = payload;
    let result = yield call(updateCustomerAPI, data);
    let {result: code, data: dataResponse} = result.data;
    if(code){
        yield put(updateCusomer(dataResponse))
        yield put(setMessage({type: "thành công", msg:"Cập nhật thành công."}))
        yield delay(1000)
        yield put(setMessage({type: "", msg:""}))
    } else {
        yield put(setMessage({type: "thất bại", msg:"Cập nhật thất bại."}))
        yield delay(1000)
        yield put(setMessage({type: "", msg:""}))
    }
};

function* getDetailCustomer(payload){
    const {client_id} = payload;
    let result = yield call(getDetailCustomerAPI, client_id);
    if(result.data.client.length){
        yield put(setDataCustomer(result.data.client[0]));
    }
}

function* getCustomerTypeList(payload){
    try {
        let {page, page_size} = payload.data;
        const result = yield call(getCustomerTypeListAPI, page, page_size);
        yield put(setCustomerTypeList(result.data.client_type))
    } catch (error) {
        console.log(error)
    }
}

function* getJobTypeList(){
    try {
        const result = yield call(getJobTypeListAPI);
        yield put(setJobTypeList(result.data.sector))
    } catch (error) {
        console.log(error)
    }
}

function* createCustomerType(payload){
    try {
        const result = yield call(createCustomerTypeAPI, payload.data);
        if(result.data.result){
            yield put(addCustomerType(result.data.data.client_type))
        }
    } catch (error) {
        console.log(error)
    }
}

export default function* customerMiddleware(){
    yield takeLatest(GET_CUSTOMER_LIST, getCustomerList)
    yield takeLatest(CREATE_CUSTOMER, createCustomer)
    yield takeLatest(SEARCH_CUSTOMER, searchCustomer)
    yield takeLatest(UPDATE_CUSTOMER, updateCustomer)
    yield takeLatest(GET_CUSTOMER_DETAIL, getDetailCustomer)
    yield takeLatest(GET_JOB_TYPE_LIST, getJobTypeList)
    // Customer Type
    yield takeLatest(GET_CUSTOMER_TYPE_LIST, getCustomerTypeList)
    yield takeLatest(CREATE_CUSTOMER_TYPE, createCustomerType)
}