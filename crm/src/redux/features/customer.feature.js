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
        },
        updateCusomer: (state, action)=>{
            let {id} = action.payload;
            let index = state.customerList.findIndex(client => client.id === id);
            state.customerList[index] = action.payload;
        }
    }
})

export const {setCustomerList, addCustomer, updateCusomer} = customerSlice.actions;
export default customerSlice.reducer;