import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT_ATTRIBUTE, GET_PRODUCT_CHANNEL, GET_PRODUCT_LIST, GET_PRODUCT_LOCATION, GET_PRODUCT_TYPE } from "../../title/title";
import { createProduceAPI, deleteProductAPI, getProductAttributeAPI, getProductChannelAPI, getProductListAPI, getProductLocationAPI, getProductTypeAPI } from "../API/productAPI";
import { setIsLoading } from "../features/loadingSlice";
import { removeProduct, setProductAttribute, setProductChannel, setProductList, setProductListFull, setProductLocation, setProductType, setTotalProduct, updateProductWithID } from "../features/productSlice";

function* getProductList(payload) {
    let { page, pageSize, locationID, typeID, attributeID, channelID } = payload.data;
    let result = yield call(getProductListAPI, page, pageSize, locationID, typeID, attributeID, channelID);
    yield put(setProductList(result.data.product))
    if (!locationID && !typeID && !attributeID && !channelID) {
        yield put(setProductListFull(result.data.product))
    }
    yield put(setTotalProduct(result.data.total_data))
    yield put(setIsLoading(false))
}


function* getProductChannel(payload) {
    try {
        let { page, page_size } = payload.data;
        let result = yield call(getProductChannelAPI, page, page_size);
        if (result.data.data.length > 0) {
            yield put(setProductChannel(result.data.data))
        }
    } catch (error) {
        console.log(error)
    }
};

function* getProductLocation(payload) {
    try {
        let { page, page_size, channelID } = payload.data;
        let result = yield call(getProductLocationAPI, page, page_size, channelID);
        if (result.data.product_location.length > 0) {
            yield put(setProductLocation(result.data.product_location))
        }
    } catch (error) {
        console.log(error)
    }
};

function* getProductType(payload) {
    try {
        let { page, page_size } = payload.data;
        const result = yield call(getProductTypeAPI, page, page_size);
        if (result.data.data.length > 0) {
            yield put(setProductType(result.data.data))
        }
    } catch (error) {
        console.log(error)
    }
};

function* getProductAttribute(payload) {
    try {
        let { page, page_size } = payload.data;
        const result = yield call(getProductAttributeAPI, page, page_size);
        if (result.data.data.length > 0) {
            yield put(setProductAttribute(result.data.data))
        }
    } catch (error) {
        console.log(error)
    }
}

function* createProduct(payload) {
    try {
        const result = yield call(createProduceAPI, payload.data);
        if (result.data.product.length > 0) {
            yield put(updateProductWithID({ product_id: payload.data.id, data: result.data.product[0] }))
        } else {
            yield put(removeProduct(payload.data.id))
        }
    } catch (error) {
        console.log(error)
    }
};

function* deleteProduct(payload) {
    try {
        const result = yield call(deleteProductAPI, payload.product_id);
        if (result.data.result) {
            yield put(removeProduct(payload.product_id))
        }
    } catch (error) {
        console.log("lỗi ở deleteProduct", error)
    }
}

export default function* productMiddleware() {
    yield takeLatest(GET_PRODUCT_LIST, getProductList);
    yield takeLatest(GET_PRODUCT_CHANNEL, getProductChannel);
    yield takeLatest(GET_PRODUCT_LOCATION, getProductLocation);
    yield takeLatest(GET_PRODUCT_TYPE, getProductType);
    yield takeLatest(GET_PRODUCT_ATTRIBUTE, getProductAttribute);
    yield takeLatest(CREATE_PRODUCT, createProduct);
    yield takeLatest(DELETE_PRODUCT, deleteProduct);
}