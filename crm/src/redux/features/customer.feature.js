import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    customerList: []
}

const customerSlice = createSlice({
    name: "customerSlice",
    initialState,
    reducers: {
        setCustomerList: (state, action)=>{
            state.customerList = action.payload;
        },
        addCustomer: (state, action)=>{
            state.customerList.unshift(action.payload)
        }
    }
})

export const {setCustomerList, addCustomer} = customerSlice.actions;
export default customerSlice.reducer;