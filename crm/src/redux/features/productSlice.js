import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    productList: [],
    totalProduct: "",
    productChannel: [],
    productLocation: [],
    productType: [],
    productAttribute: []
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
        }
    }
});

export const { setProductList, setTotalProduct, setProductChannel, setProductType,
setProductLocation, setProductAttribute} = productSlice.actions;
export default productSlice.reducer;