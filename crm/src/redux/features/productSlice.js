import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    productTypeList: [],
    productList: []
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
        }
    }
});

export const {setProductTypeList, setProductList} = productSlice.actions;
export default productSlice.reducer;