import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    groupChannelList: [],
    total: 0,
};

const groupChannelSlice = createSlice({
    name: "groupChannelSlice",
    initialState,
    reducers: {
        setGroupChannelList: (state, action) => {
            let { total, groupChannelList } = action.payload;
            state.groupChannelList = groupChannelList;
            state.total = total;
        },
    }
});

export const { setGroupChannelList,
} = groupChannelSlice.actions;
export default groupChannelSlice.reducer;