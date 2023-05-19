import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    total: 0,
    recieptList: [],
}

const receiptSlice = createSlice({
    name: "receiptSlice",
    initialState,
    reducers: {
        setTotalReceipt: (state, action)=>{
            state.total = action.payload;
        },
        setReceiptList: (state, action)=>{
            state.recieptList = action.payload;
        }
    }
})

export const {setTotalReceipt, setReceiptList} = receiptSlice.actions;
export default receiptSlice.reducer;