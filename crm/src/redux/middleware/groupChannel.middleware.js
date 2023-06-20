import { call, put, takeLatest } from "redux-saga/effects";
import { GET_GROUP_CHANNEL } from "../../title/title";
import { getGroupChannelAPI, } from "../API/groupChannelAPI";
import { setGroupChannelList } from "../features/groupChannelSlice";
import { setIsLoading } from "../features/loadingSlice";
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


export default function* groupChannelMiddleware() {
    yield takeLatest(GET_GROUP_CHANNEL, getGroupChannelList)
}