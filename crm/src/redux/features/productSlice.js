import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    productList: [],
    totalProduct: "",
    productChannel: [],
    productLocation: [],
    productType: [],
    productAttribute: [],
    productListFull: []
};

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        setProductList: (state, action)=>{
            state.productList = action.payload;
        },
        setTotalProduct: (state, action)=>{
            state.totalProduct = action.payload;
        },
        setProductChannel: (state, action)=>{
            state.productChannel = action.payload;
        },
        setProductLocation: (state, action)=>{
            state.productLocation = action.payload;
        },
        setProductType: (state, action)=>{
            state.productType = action.payload;
        },
        setProductAttribute: (state, action)=>{
            state.productAttribute = action.payload;
        },
        setProductListFull: (state, action)=>{
            state.productListFull = action.payload;
        },
        addProduct: (state, action)=>{
            state.productList.unshift(action.payload);
        },
        removeProduct: (state, action)=>{
            let indexOfProduct = state.productList.findIndex(product => product.id === action.payload);
            state.productList.splice(indexOfProduct, 1);
        },
        updateProductWithID: (state, action)=>{
            let { product_id, data } = action.payload;
            let productIndex = state.productList.findIndex(product => product.id === product_id);
            state.productList[productIndex] = data;
        }
    }
});

export const { setProductList, setTotalProduct, setProductChannel, setProductType,
setProductLocation, setProductAttribute, setProductListFull, addProduct, removeProduct,
updateProductWithID} = productSlice.actions;
export default productSlice.reducer;