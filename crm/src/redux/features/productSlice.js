import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    productList: [],
    totalProduct: "",
    productChannel: [],
    productLocation: [],
    productType: [],
    productAttribute: [],
    productListFull: [],
    totalProductType: "",
    totalProductAttribute: "",
    productSpecialList: [],
    totalProductSpecialList: 0,
    customPriceForClient: ""
};

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        setProductList: (state, action) => {
            state.productList = action.payload;
        },
        setTotalProduct: (state, action) => {
            state.totalProduct = action.payload;
        },
        setTotalProductType: (state, action)=>{
            state.totalProductType = action.payload;
        },
        setTotalProductAttribute: (state, action)=>{
            state.totalProductAttribute = action.payload;
        },
        setProductChannel: (state, action)=>{
            state.productChannel = action.payload;
        },
        setProductLocation: (state, action) => {
            state.productLocation = action.payload;
        },
        setProductType: (state, action) => {
            state.productType = action.payload;
        },
        setProductAttribute: (state, action) => {
            state.productAttribute = action.payload;
        },
        setProductListFull: (state, action) => {
            state.productListFull = action.payload;
        },
        addProduct: (state, action) => {
            state.productList.unshift(action.payload);
        },
        removeProduct: (state, action) => {
            let indexOfProduct = state.productList.findIndex(product => product.id === action.payload);
            state.productList.splice(indexOfProduct, 1);
        },
        updateProductWithID: (state, action) => {
            let { product_id, data } = action.payload;
            let productIndex = state.productList.findIndex(product => product.id === product_id);
            state.productList[productIndex] = data;
        },
        // Xử lý Product Type
        addProductType: (state, action)=>{
            state.productType.unshift(action.payload)
        },
        removeProductType: (state, action)=>{
            let indexOfType = state.productType.findIndex( type => type.id === action.payload);
            state.productType.splice(indexOfType, 1)
        },
        updateProductType: (state,action)=>{
            let { type_id, data } = action.payload;
            let indexOfType = state.productType.findIndex( type => type.id === type_id);
            state.productType[indexOfType] = data;
        },
        // Xử lý Product Attribute
        addProductAttribute: (state, action)=>{
            state.productAttribute.unshift(action.payload);
        },
        removeProductAttribute: (state, action)=>{
            let indexAtt = state.productAttribute.findIndex(att => att.id === action.payload);
            state.productAttribute.splice(indexAtt, 1);
        },
        updateProductAttribute: (state, action)=>{
            let { attribute_id, data } = action.payload;
            let indexOfType = state.productAttribute.findIndex( type => type.id === attribute_id);
            state.productAttribute[indexOfType] = data;
        },
        // Xử lý Product Special
        setProductSpecial: (state, action)=>{
            state.productSpecialList = action.payload;
        },
        setTotalProductSpecial: (state, action)=>{
            state.totalProductSpecialList = action.payload;
        },
        addProductSpecial: (state, action)=>{
            state.productSpecialList.unshift(action.payload)
        },
        removeProductSpecial: (state,action)=>{
            let index = state.productSpecialList.findIndex(product => product.id === action.payload);
            state.productSpecialList.splice(index, 1);
        },
        updateProductSpecial: (state, action)=>{
            let index = state.productSpecialList.findIndex(product => product.id === action.payload.id);
            state.productSpecialList[index] = action.payload.data;
        },
        setCustomPriceForClient: (state, action)=>{
            state.customPriceForClient = action.payload;
        }
    }
});

export const { setProductList, setTotalProduct, setProductChannel, setProductType,
setProductLocation, setProductAttribute, setProductListFull, addProduct, removeProduct,
updateProductWithID, setTotalProductType, addProductType, removeProductType, updateProductType,
setTotalProductAttribute, addProductAttribute, removeProductAttribute, updateProductAttribute,
setProductSpecial, setTotalProductSpecial, addProductSpecial, removeProductSpecial, updateProductSpecial,
setCustomPriceForClient} = productSlice.actions;
export default productSlice.reducer;