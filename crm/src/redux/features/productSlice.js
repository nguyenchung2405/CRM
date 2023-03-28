import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    productTypeList: [],
    productList: [],
    totalProduct: ""
};

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        setProductTypeList: (state, action)=>{
            state.productTypeList = action.payload;
        },
        setProductList: (state, action)=>{
            state.productList = action.payload;
        },
        setTotalProduct: (state, action)=>{
            state.totalProduct = action.payload;
        }
    }
});

export const {setProductTypeList, setProductList, setTotalProduct} = productSlice.actions;
export default productSlice.reducer;