import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    customerList: [],
    isCreateCustomer: null,
    dataCustomer: null,
    totalCustomer: null,
    customerTypeList: [{name: "VIP"}, {name: "UBND"}, {name: "Thành Đoàn"}, {name: "Thành Ủy"}, {name: "Chính phủ"}],
    jobTypeList: [{name: "Bất động sản", id:1}, {name: "Công nghệ thông tin", id:2}, {name: "Kiến trúc", id:3}, {name: "Marketing", id:4}]
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
        }
    }
})

export const {setCustomerList, addCustomer, updateCusomer, setDataCustomer, setIsCreateCustomer, setTotalCustomer,
setCustomerTypeList, setJobTypeList} = customerSlice.actions;
export default customerSlice.reducer;