import { call, put, takeLatest } from "redux-saga/effects";
import { GET_PRODUCT_LIST } from "../../title/title";
import { getProductListAPI } from "../API/productAPI";
import { setProductList } from "../features/productSlice";

function* getProductList(){
    let result = yield call(getProductListAPI);
    yield put(setProductList(result))
}

export default function* productMiddleware(){
    yield takeLatest(GET_PRODUCT_LIST, getProductList);
}