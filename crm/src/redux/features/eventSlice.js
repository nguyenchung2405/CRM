import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    eventList: [],
    totalEventList: "",
    donors: [],
    requestOfEvent: [],
    unsetContract: [],
    selectRequest: []
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
        },
        setRequestOfEvent: (state, action)=>{
            state.requestOfEvent = action.payload;
        },
        setUnsetContract: (state, action)=>{
            state.unsetContract = action.payload;
        },
        setSelectRequest: (state, action)=>{
            state.selectRequest = action.payload;
        }
    }
});

export const {setEventList, setTotalEventList, setDonors, setRequestOfEvent, setUnsetContract, setSelectRequest} = eventSlice.actions;
export default eventSlice.reducer;