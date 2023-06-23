/* eslint-disable require-yield */
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_GROUP_CHANNEL,UPDATE_SUB_CHANEL,DELETE_SUB_CHANEL, CREATE_SUB_CHANEL } from "../../title/title";
import { getGroupChannelAPI,updateGroupSubChannelAPI,deleteGroupSubChannelAPI,createGroupSubChannelAPI } from "../API/groupChannelAPI";
import { setGroupChannelList } from "../features/groupChannelSlice";
import { setIsLoading } from "../features/loadingSlice";
import { message } from "antd";
// import { setMessage } from "../features/messageSlice";

function* getGroupChannelList(payload) {
    try {
        let { page, pageNumber, name, location_name } = payload.data;
        let result = yield call(getGroupChannelAPI, page, pageNumber, name, location_name);
        let { total_data: total, product_channel: data} = result.data;
        yield put(setGroupChannelList({ total, groupChannelList: data }));
        yield put(setIsLoading(false))
    } catch (error) {
        console.log(error)
    }
}

function* updateGroupSubChannel(payload){
    try {
        const { data } = payload;
        const resuft = yield call(updateGroupSubChannelAPI,data)
        
         
    } catch (error) {
        console.log(error);
    }

}

function* deleteGroupSubChannel(payload){
    const { data } = payload
    const resuft = yield call(deleteGroupSubChannelAPI,data)

}   

function* createGroupSubChannel(payload){
    const { data } = payload
    const resuft = yield call(createGroupSubChannelAPI,data)
    const dataCreateSub = resuft?.data?.product_sublocation 
    message.success("Tạo nhánh thành công")
}

export default function* groupChannelMiddleware() {
    yield takeLatest(GET_GROUP_CHANNEL, getGroupChannelList)
    yield takeLatest(UPDATE_SUB_CHANEL, updateGroupSubChannel)
    yield takeLatest(DELETE_SUB_CHANEL, deleteGroupSubChannel)
    yield takeLatest(CREATE_SUB_CHANEL, createGroupSubChannel)
}