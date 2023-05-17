import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    requestAcceptanceList: [],
    totalRequestAccList: 0,
}

const acceptanceSlice = createSlice({
    name: "acceptanceSlice",
    initialState,
    reducers: {
        setRequestAccList: (state, action)=>{
            state.requestAcceptanceList = action.payload;
        },
        setTotalRequestAccList: (state, action)=>{
            state.totalRequestAccList = action.payload;
        }
    }
})

export const {setRequestAccList, setTotalRequestAccList} = acceptanceSlice.actions;
export default acceptanceSlice.reducer;