import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    customerList: [],
    isCreateCustomer: null,
    dataCustomer: null,
    totalCustomer: null,
    customerTypeList: [],
    jobTypeList: []
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
        },
        setDataCustomer: (state, action)=>{
            state.dataCustomer = action.payload;
        },
        setIsCreateCustomer: (state, action)=>{
            state.isCreateCustomer = action.payload;
        },
        setTotalCustomer: (state, action)=>{
            state.totalCustomer = action.payload;
        },
        setCustomerTypeList: (state, action)=>{
            state.customerTypeList = action.payload;
        },
        setJobTypeList: (state, action)=>{
            state.jobTypeList = action.payload;
        },
        addCustomerType: (state, action)=>{
            state.customerTypeList.unshift(action.payload)
        },
        
    }
})

export const {setCustomerList, addCustomer, updateCusomer, setDataCustomer, setIsCreateCustomer, setTotalCustomer,
setCustomerTypeList, setJobTypeList, addCustomerType} = customerSlice.actions;
export default customerSlice.reducer;