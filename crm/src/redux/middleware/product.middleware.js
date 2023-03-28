import { call, put, takeLatest } from "redux-saga/effects";
import { GET_PRODUCT_LIST } from "../../title/title";
import { getProductListAPI } from "../API/productAPI";
import { setIsLoading } from "../features/loadingSlice";
import { setProductList, setTotalProduct } from "../features/productSlice";

function* getProductList(payload){
    let {page, pageSize} = payload.data;
    let result = yield call(getProductListAPI, page, pageSize);
    yield put(setProductList(result.data.product))
    yield put(setTotalProduct(result.data.total_data))
    yield put(setIsLoading(false))
}

export default function* productMiddleware(){
    yield takeLatest(GET_PRODUCT_LIST, getProductList);
}