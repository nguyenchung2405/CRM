import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    contractList: [],
    total: 0,
    contractTypeList: [],
    contractDetail: {}
};

const contractSlice = createSlice({
    name:"contractSlice",
    initialState,
    reducers: {
        setContractList: (state, action)=>{
            let {total, contractList} = action.payload;
            state.contractList = contractList;
            state.total = total;
        },
        setContractTypeList: (state, action)=>{
            state.contractTypeList = action.payload;
        },
        setContractDetail: (state, action)=>{
            state.contractDetail = action.payload;
        }
    }
});

export const {setContractList, setContractTypeList, setContractDetail} = contractSlice.actions;
export default contractSlice.reducer;