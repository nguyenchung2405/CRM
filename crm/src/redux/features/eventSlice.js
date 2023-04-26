import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    eventList: [],
    totalEventList: "",
    donors: []
}

const eventSlice = createSlice({
    name: "eventSlice",
    initialState,
    reducers: {
        setEventList: (state, action)=>{
            state.eventList = action.payload
        },
        setTotalEventList: (state, action)=>{
            state.totalEventList = action.payload;
        },
        setDonors: (state, action)=>{
            state.donors = action.payload;
        }
    }
});

export const {setEventList, setTotalEventList, setDonors} = eventSlice.actions;
export default eventSlice.reducer;