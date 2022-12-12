import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_CUSTOMER, GET_CUSTOMER_LIST, SEARCH_CUSTOMER } from "../../title/title";
import { createCustomerAPI, getCustomerListAPI, searchCustomerAPI } from "../API/customeAPI";
import { addCustomer, setCustomerList } from "../features/customer.feature";
import { setIsLoading } from "../features/loadingSlice";
import { setMessage } from "../features/messageSlice";

function* getCustomerList(){
    let result = yield call(getCustomerListAPI);
    let {code, data} = result;
    if(code === 200){
        yield put(setCustomerList(data))
        yield put(setIsLoading(false))
    }
}

function* createCustomer(payload){
    let {data} = payload;
    let result = yield call(createCustomerAPI, data);
    let {code, data: dataResponse} = result;
    if(code === 200){
        yield put(addCustomer(dataResponse));
        yield put(setMessage({type: "thành công", msg:"Tạo khách hàng thành công."}))
    } else {
        yield put(setMessage({type: "thất bại", msg:"Tạo khách hàng thất bại."}))
    }
}

function* searchCustomer(payload){
    let {searchData} = payload;
    let result = yield call(searchCustomerAPI, searchData);
    let {code, data: dataResponse} = result;
    if(code === 200){
        yield put(setCustomerList(dataResponse))
        yield put(setMessage({type: "thành công", msg:"Thao tác thành công."}))
    } else {
        yield put(setMessage({type: "thất bại", msg:"Thao tác thất bại."}))
    }
}

export default function* customerMiddleware(){
    yield takeLatest(GET_CUSTOMER_LIST, getCustomerList)
    yield takeLatest(CREATE_CUSTOMER, createCustomer)
    yield takeLatest(SEARCH_CUSTOMER, searchCustomer)
}