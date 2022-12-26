import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    contractList: [],
    total: 0
};

const contractSlice = createSlice({
    name:"contractSlice",
    initialState,
    reducers: {
        setContractList: (state, action)=>{
            let {total, contractList} = action.payload;
            state.contractList = contractList;
            state.total = total;
        }
    }
});

export const {setContractList} = contractSlice.actions;
export default contractSlice.reducer;