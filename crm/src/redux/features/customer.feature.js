import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    customerList: [],
    isCreateCustomer: null,
    dataCustomer: null,
    totalCustomer: null,
    customerTypeList: [],
    jobTypeList: [],
    totalListPage: {
        total_data: "",
        total_page: "",
    },
    totalListPageTypeCus: {
        total_data: "",
        total_page: "",
    }
}

const customerSlice = createSlice({
    name: "customerSlice",
    initialState,
    reducers: {
        setTotalPage: (state, action)=>{
            state.totalListPage = action.payload
        },
        setTotalPageCus: (state,action)=>{
            state.totalListPageTypeCus = action.payload
        },
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
        setCustomerTypeListCreate: (state, action)=>{
            state.customerTypeList = [action.payload,...state.customerTypeList]
        },
        setCustomerTypeDelete: (state,action)=>{
            console.log(action.payload);
            state.customerTypeList = state.customerTypeList.filter((customerType)=>{
                return action.payload !== customerType.id 
            })
        },
        setJobTypeList: (state, action)=>{
            state.jobTypeList = action.payload;
        },
        setJobTypeListCreate: (state,action)=>{
            state.jobTypeList = [action.payload,...state.jobTypeList]
        },
        setJobTypeListDelete: (state,action)=>{
            state.jobTypeList = state.jobTypeList.filter((JobList)=>{
                return action.payload !== JobList.id
            })
        },
        addCustomerType: (state, action)=>{
            state.customerTypeList.unshift(action.payload)
        },
        setUpdateType : (state,action)=>{
            state.customerTypeList = state.customerTypeList.map((customerType)=>{
                return action.payload.id !== customerType.id ? customerType : {...customerType,name: action.payload.name}
            })
        },
        setUpdateJobType: (state,action)=>{
            console.log(action.payload);
            state.jobTypeList = state.jobTypeList.map((jobType)=>{
                return action.payload.id !== jobType.id ? jobType : {...jobType,name: action.payload.name}
            })
            
        }
        
    }
})

export const {setCustomerList, setUpdateJobType ,setUpdateType ,setJobTypeListDelete ,setJobTypeListCreate  ,setCustomerTypeDelete , setTotalPage, setTotalPageCus, setCustomerTypeListCreate , addCustomer, updateCusomer, setDataCustomer, setIsCreateCustomer, setTotalCustomer,
setCustomerTypeList, setJobTypeList, addCustomerType} = customerSlice.actions;
export default customerSlice.reducer;