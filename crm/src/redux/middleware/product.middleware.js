import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_PRODUCT, CREATE_PRODUCT_ATTRIBUTE, CREATE_PRODUCT_TYPE, DELETE_PRODUCT, DELETE_PRODUCT_ATTRIBUTE, DELETE_PRODUCT_TYPE, GET_PRODUCT_ATTRIBUTE, GET_PRODUCT_CHANNEL, GET_PRODUCT_LIST, GET_PRODUCT_LOCATION, GET_PRODUCT_TYPE, SEARCH_PRODUCT_ATTRIBUTE, SEARCH_PRODUCT_TYPE, UPDATE_PRODUCT_ATTRIBUTE, UPDATE_PRODUCT_TYPE } from "../../title/title";
import { createProduceAPI, createProductAttributeAPI, createProductTypeAPI, deleteProductAPI, deleteProductAttributeAPI, deleteProductTypeAPI, getProductAttributeAPI, getProductChannelAPI, getProductListAPI, getProductLocationAPI, getProductTypeAPI, searchProductAttributeAPI, searchProductTypeAPI, updateProductAttributeAPI, updateProductTypeAPI } from "../API/productAPI";
import { setIsLoading } from "../features/loadingSlice";
import { removeProduct, removeProductAttribute, removeProductType, setProductAttribute, setProductChannel, setProductList, setProductListFull, setProductLocation, setProductType, setTotalProduct, setTotalProductAttribute, setTotalProductType, updateProductAttribute, updateProductType, updateProductWithID } from "../features/productSlice";

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
            yield put(setTotalProductType(result.data.total))
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
            yield put(setTotalProductAttribute(result.data.total))
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

function* createProductType(payload){
    try {
        const result = yield call(createProductTypeAPI, payload.data);
        if(result.data.result){
            yield put(updateProductType({type_id: payload.data.id, data: result.data.data.product_type}))
        } else {
            yield put(removeProductType(payload.data.id))
        }
    } catch (error) {
        console.log(error)
    }
};

function* deleteProductType(payload){
    try {
        const result = yield call(deleteProductTypeAPI, payload.type_id);
        if(result.data.result){
            yield put(removeProductType(payload.type_id))
        }
    } catch (error) {
        console.log(error)
    }
}

function* updateProductTypeMiddlewart(payload){
    try {
        const result = yield call(updateProductTypeAPI, payload.data);
        if(result.data.result){
            yield put(updateProductType({type_id: result.data.data.id, data: result.data.data}))
        }
    } catch (error) {
        console.log(error)
    }
}

function* searchProductType(payload){
    try {
        const result = yield call(searchProductTypeAPI, payload.data);
        if (result.data.data.length > 0) {
            yield put(setProductType(result.data.data))
            yield put(setTotalProductType(result.data.total))
        }
    } catch (error) {
        console.log(error)
    }
}

function* createProductAttribute(payload){
    try {
        const result = yield call(createProductAttributeAPI, payload.data);
        if(result.data.result){
            yield put(updateProductAttribute({attribute_id: payload.data.id, data: result.data.data.product_attribute}));
        } else {
            yield put(removeProductAttribute(payload.data.id))
        }
    } catch (error) {
        console.log(error)
    }
};

function* deleteProductAttribute(payload){
    try {
        const result = yield call(deleteProductAttributeAPI , payload.attribute_id);
        console.log(result.data);
        if(result.data.result){
            yield put(removeProductAttribute(payload.attribute_id))
        }
    } catch (error) {
        console.log(error)
    }
}

function* updateProductAttributeMiddleware(payload){
    try {
        const result = yield call(updateProductAttributeAPI, payload.data);
        if(result.data.result){
            yield put(updateProductAttribute({attribute_id: payload.data.data.id, data: result.data.data}));
        }
    } catch (error) {
        console.log(error)
    }
}

function* searchProductAttribute(payload){
    try {
        const result = yield call(searchProductAttributeAPI ,payload.data);
        yield put(setProductAttribute(result.data.data))
        yield put(setTotalProductAttribute(result.data.total))
    } catch (error) {
        console.log(error)
    }
}

export default function* productMiddleware() {
    yield takeLatest(GET_PRODUCT_LIST, getProductList);
    yield takeLatest(GET_PRODUCT_CHANNEL, getProductChannel);
    yield takeLatest(GET_PRODUCT_LOCATION, getProductLocation);
    yield takeLatest(CREATE_PRODUCT, createProduct);
    yield takeLatest(DELETE_PRODUCT, deleteProduct);
    // Product TYPE
    yield takeLatest(GET_PRODUCT_TYPE, getProductType);
    yield takeLatest(CREATE_PRODUCT_TYPE, createProductType)
    yield takeLatest(DELETE_PRODUCT_TYPE, deleteProductType)
    yield takeLatest(UPDATE_PRODUCT_TYPE, updateProductTypeMiddlewart)
    yield takeLatest(SEARCH_PRODUCT_TYPE, searchProductType)
    // Product Attribute
    yield takeLatest(GET_PRODUCT_ATTRIBUTE, getProductAttribute);
    yield takeLatest(CREATE_PRODUCT_ATTRIBUTE, createProductAttribute);
    yield takeLatest(DELETE_PRODUCT_ATTRIBUTE, deleteProductAttribute);
    yield takeLatest(UPDATE_PRODUCT_ATTRIBUTE, updateProductAttributeMiddleware);
    yield takeLatest(SEARCH_PRODUCT_ATTRIBUTE, searchProductAttribute)
}