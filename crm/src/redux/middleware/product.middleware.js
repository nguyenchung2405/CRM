import { message } from "antd";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { CREATE_PRODUCT, CREATE_PRODUCT_ATTRIBUTE, CREATE_PRODUCT_SPECIAL, CREATE_PRODUCT_TYPE, DELETE_PRODUCT, DELETE_PRODUCT_ATTRIBUTE, DELETE_PRODUCT_SPECIAL, DELETE_PRODUCT_TYPE, GET_PRODUCT_ATTRIBUTE, GET_PRODUCT_CHANNEL, GET_PRODUCT_LIST, GET_PRODUCT_LIST_CONTRACT, GET_PRODUCT_LOCATION, GET_PRODUCT_SPECIAL, GET_PRODUCT_SPECIAL_FOR_CLIENT, GET_PRODUCT_SUBLOCATION, GET_PRODUCT_TYPE, SEARCH_PRODUCT_ATTRIBUTE, SEARCH_PRODUCT_TYPE, UPDATE_PRODUCT, UPDATE_PRODUCT_ATTRIBUTE, UPDATE_PRODUCT_TYPE } from "../../title/title";
import { createProduceAPI, createProductAttributeAPI, createProductSpecialAPI, createProductTypeAPI, deleteProductAPI, deleteProductAttributeAPI, deleteProductSpecialAPI, deleteProductTypeAPI, getProductAttributeAPI, getProductChannelAPI, getProductListAPI, getProductListContractAPI, getProductLocationAPI, getProductSpecialForClientAPI, getProductSpecialListAPI, getProductSubLocationAPI, getProductTypeAPI, searchProductAttributeAPI, searchProductTypeAPI, updateProductAPI, updateProductAttributeAPI, updateProductTypeAPI } from "../API/productAPI";
import { setIsLoading } from "../features/loadingSlice";
import { setMessage } from "../features/messageSlice";
import { removeProduct, removeProductAttribute, removeProductType, setCustomPriceForClient, setProductAttribute, setProductChannel, setProductList, setProductListFull, setProductLocation, setProductSpecial, setProductType, setTotalProduct, setTotalProductAttribute, setTotalProductSpecial, setTotalProductType, updateProductAttribute, updateProductSpecial, updateProductType, updateProductWithID, removeProductSpecial, setProductSubLocation } from "../features/productSlice";

function* getProductList(payload) {
   try {
       let { page, pageSize, subLocationID, typeID, attributeID, search } = payload.data;
       let result = yield call(getProductListAPI, page, pageSize, subLocationID, typeID, attributeID, search);
       yield put(setProductList(result.data.product))
       if (!subLocationID && !typeID && !attributeID) {
           yield put(setProductListFull(result.data.product))
       }
       yield put(setTotalProduct(result.data.total_data))
       yield put(setIsLoading(false))
   } catch (error) {
       console.log(error)
   }
}

function* getProductListContract(payload){
    try {
        let { page, pageSize, subLocationID, typeID, attributeID, search } = payload.data;
        let result = yield call(getProductListContractAPI, page, pageSize, subLocationID, typeID, attributeID, search);
        yield put(setProductList(result.data.product))
        if (!subLocationID && !typeID && !attributeID) {
            yield put(setProductListFull(result.data.product))
        }
        yield put(setTotalProduct(result.data.total_data))
        yield put(setIsLoading(false))
    } catch (error) {
        console.log(error)
    }
}

function* getProductChannel(payload) {
    try {
        let { page, page_size } = payload.data;
        let result = yield call(getProductChannelAPI, page, page_size);
        if (result.data.product_channel.length > 0) {
            yield put(setProductChannel(result.data.product_channel))
        }
    } catch (error) {
        console.log(error)
    }
};

function* getProductLocation(payload) {
    try {
        let { page, page_size, channelID } = payload.data;
        let result = yield call(getProductLocationAPI, page, page_size, channelID);
        yield put(setProductLocation(result.data.product_location))
    } catch (error) {
        console.log(error)
    }
};

function* getProductSubLocation(payload){
    try {
        let {page, page_size, locationID} = payload.data;
        const result = yield call(getProductSubLocationAPI, page, page_size, locationID);
        yield put(setProductSubLocation(result.data.product_sublocation))
    } catch (error) {
        console.log(error)
    }
}

function* getProductType(payload) {
    try {
        let { page, page_size, subLocationID } = payload.data;
        const result = yield call(getProductTypeAPI, page, page_size, subLocationID);
        yield put(setProductType(result.data.product_type))
        yield put(setTotalProductType(result.data.total_data))
    } catch (error) {
        console.log(error)
    }
};

function* getProductAttribute(payload) {
    try {
        let { page, page_size, typeID, subLocationID } = payload.data;
        const result = yield call(getProductAttributeAPI, page, page_size, typeID, subLocationID);
        yield put(setProductAttribute(result.data.data))
        yield put(setTotalProductAttribute(result.data.total))
    } catch (error) {
        console.log(error)
    }
}

function* createProduct(payload) {
    try {
        const result = yield call(createProduceAPI, payload.data);
        if (result.data?.product?.length > 0) {
            yield put(updateProductWithID({ product_id: payload.data.id, data: result.data.product[0] }))
            message.success("Tạo sản phẩm thành công.")
        } else {
            yield put(removeProduct(payload.data.id))
            message.error("Tạo sản phẩm thất bại.")
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
            message.success("Xóa sản phẩm thành công.")
        } else {
            message.error("Xóa sản phẩm thất bại.")
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
            message.success("Tạo loại sản phẩm thành công.")
        } else {
            yield put(removeProductType(payload.data.id))
            message.error("Tạo loại sản phẩm thất bại.")
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
            message.success("Xóa loại sản phẩm thành công.")
        } else {
            message.error("Xóa loại sản phẩm thất bại.")
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
            message.success("Cập nhật loại sản phẩm thành công.")
        } else {
            message.error("Cập nhật loại sản phẩm thất bại.")
        }
    } catch (error) {
        console.log(error)
    }
}

function* searchProductType(payload){
    try {
        const result = yield call(searchProductTypeAPI, payload.data);
        if (result.data.product_type.length > 0) {
            yield put(setProductType(result.data.product_type))
            yield put(setTotalProductType(result.data.total_data))
        }
    } catch (error) {
        console.log(error)
    }
}

function* createProductAttribute(payload){
    try {
        const result = yield call(createProductAttributeAPI, payload.data);
        console.log(result)
        if(result.data.result){
            yield put(updateProductAttribute({attribute_id: payload.data.id, data: result.data.data.product_option_attribute}));
            message.success("Tạo thuộc tính sản phẩm thành công.")
        } else {
            yield put(removeProductAttribute(payload.data.id))
            message.error("Tạo thuộc tính sản phẩm thất bại.")
        }
    } catch (error) {
        console.log(error)
    }
};

function* deleteProductAttribute(payload){
    try {
        const result = yield call(deleteProductAttributeAPI , payload.attribute_id);
        if(result.data.result){
            yield put(removeProductAttribute(payload.attribute_id))
            message.success("Xóa thuộc tính sản phẩm thành công.")
        } else {
            message.error("Xóa thuộc tính sản phẩm thất bại.")
        }
    } catch (error) {
        console.log(error)
    }
}

function* updateProductAttributeMiddleware(payload){
    try {
        const result = yield call(updateProductAttributeAPI, payload.data);
        if(result.data.result){
            yield put(updateProductAttribute({attribute_id: payload.data.id, data: result.data.data}));
            message.success("Cập nhật thuộc tính sản phẩm thành công.")
        } else {
            message.error("Cập nhật thuộc tính sản phẩm thất bại.")
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

function* getProductSpecial(payload){
    try {
        let {page, page_size} = payload.data;
        const result = yield call(getProductSpecialListAPI,page, page_size);
        if(result.data.page){
            yield put(setProductSpecial(result.data.product_discount_by_clientType))
            yield put(setTotalProductSpecial(result.data.total_data))
        }
    } catch (error) {
        console.log(error)
    }
}

function* createProductSpecial(payload){
    try {
        const result = yield call(createProductSpecialAPI, payload.data);
        if(result.data.product_discount_by_clientType.length > 0){
            yield put(updateProductSpecial({id: payload.data.id, data: result.data.product_discount_by_clientType[0]}))
            yield put(setMessage({ type: "thành công", msg: "Tạo sản phẩm thành công." }))
            message.success("Tạo sản phẩm thành công.")
        } else {
            yield put(setMessage({ type: "thất bại", msg: "Tạo sản phẩm thất bại." }))
            message.error("Tạo sản phẩm thất bại.")
        }
    } catch (error) {
        console.log(error)
    }
}

function* getProductSpecialForClient(payload){
    try {
        const result = yield call(getProductSpecialForClientAPI, payload.data);
        if(result.data.product_discount_by_clientType.length > 0){
            yield put(setCustomPriceForClient(result.data.product_discount_by_clientType[0].discounted_price))
            yield delay(1000)
            yield put(setCustomPriceForClient(0))
        }
    } catch (error) {
        console.log(error)
    }
}

function* updateProduct(payload){
    try {
        const result = yield call(updateProductAPI, payload.data);
        if(result[0] === "Success"){
            message.success("Cập nhật sản phẩm thành công.")
        } else {
            message.error("Cập nhật sản phẩm thất bại.")
        }
    } catch (error) {
        console.log(error)
    }
}

function* deleteProductSpecial(payload){
    try {
        const result = yield call(deleteProductSpecialAPI, payload.data);
        if(result.data.result){
            yield put(removeProductSpecial(payload.data))
            message.success("Xóa sản phẩm thành công.")
        } else {
            message.error("Xóa sản phẩm thất bại.")
        }
    } catch (error) {
        console.log(error)
    }
}

export default function* productMiddleware() {
    yield takeLatest(GET_PRODUCT_LIST, getProductList);
    yield takeLatest(GET_PRODUCT_CHANNEL, getProductChannel);
    yield takeLatest(GET_PRODUCT_LOCATION, getProductLocation);
    yield takeLatest(GET_PRODUCT_SUBLOCATION, getProductSubLocation)
    yield takeLatest(CREATE_PRODUCT, createProduct);
    yield takeLatest(DELETE_PRODUCT, deleteProduct);
    yield takeLatest(UPDATE_PRODUCT, updateProduct);
    yield takeLatest(GET_PRODUCT_LIST_CONTRACT, getProductListContract)
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
    // Product Special
    yield takeLatest(GET_PRODUCT_SPECIAL, getProductSpecial)
    yield takeLatest(CREATE_PRODUCT_SPECIAL, createProductSpecial)
    yield takeLatest(GET_PRODUCT_SPECIAL_FOR_CLIENT, getProductSpecialForClient)
    yield takeLatest(DELETE_PRODUCT_SPECIAL, deleteProductSpecial)
}