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
        },
        addDetailEventAccList: (state,action)=>{
            let {event_id, data} = action.payload;
            let eventIndex = state.eventAcceptanceList.findIndex(event => event.event_ID === event_id);
            state.eventAcceptanceList[eventIndex].executive_details.push(data);
        },
        addDetailContractAccList: (state,action)=>{
            let {request_id, data, detail_id} = action.payload;
            if(detail_id){
                let contractIndex = state.requestAcceptanceList.findIndex(event => event.id === request_id);
                let detailIndex = state.requestAcceptanceList[contractIndex].details.findIndex(detail => detail.id === detail_id);
                state.requestAcceptanceList[contractIndex].details[detailIndex] = data
            } else {
                let contractIndex = state.requestAcceptanceList.findIndex(event => event.id === request_id);
                state.requestAcceptanceList[contractIndex].details.push(data);
            }
        }
    }
})

export const {setRequestAccList, setTotalRequestAccList, setEventAccList, setTotalEventAccList,
addDetailEventAccList, addDetailContractAccList} = acceptanceSlice.actions;
export default acceptanceSlice.reducer;