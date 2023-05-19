import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    requestAcceptanceList: [],
    totalRequestAccList: 0,
    eventAcceptanceList: [],
    totalEventAccList: 0,
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
        },
        setEventAccList: (state, action)=>{
            state.eventAcceptanceList = action.payload;
        },
        setTotalEventAccList: (state, action)=>{
            state.totalEventAccList = action.payload;
        }
    }
})

export const {setRequestAccList, setTotalRequestAccList, setEventAccList, setTotalEventAccList} = acceptanceSlice.actions;
export default acceptanceSlice.reducer;