import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    groupChannelList: [],
    total: 0,
    groupChannelSubList: [],
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
        setGroupChannelSubList: (state,action)=>{
            // console.log(action.payload);
            state.groupChannelSubList = action.payload.reverse()
        },
        setUpdateChanelSubList: (state,action)=>{
            state.groupChannelSubList = state.groupChannelSubList.map((x)=>{
                return x.id === action.payload.id ? action.payload : x
            })
        },
        setCreateChanelSubList: (state,action)=>{
            state.groupChannelSubList = [action.payload,...state.groupChannelSubList]
        },
        setDeleteChanelSubList: (state,action)=>{
            
            state.groupChannelSubList = state.groupChannelSubList.filter((x)=>{
                return x.id !== action.payload;
            })
        }
    }
});

export const { setGroupChannelList, setGroupChannelSubList, setUpdateChanelSubList,setCreateChanelSubList,setDeleteChanelSubList
} = groupChannelSlice.actions;
export default groupChannelSlice.reducer;