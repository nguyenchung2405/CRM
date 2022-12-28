import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    contractList: [],
    total: 0,
    contractTypeList: []
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
        }
    }
});

export const {setContractList, setContractTypeList} = contractSlice.actions;
export default contractSlice.reducer;