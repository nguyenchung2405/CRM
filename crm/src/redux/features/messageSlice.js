import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    messageAlert: {}
}

const messageSlice = createSlice({
    name: "messageSlice",
    initialState,
    reducers: {
        setMessage: (state, action)=>{
            state.messageAlert = action.payload;
        }
    }
})

export const {setMessage} = messageSlice.actions;
export default messageSlice.reducer;