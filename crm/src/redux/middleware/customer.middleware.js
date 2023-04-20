import { call, delay, put, takeLatest } from "redux-saga/effects";
import { CREATE_CUSTOMER, CREATE_JOB_TYPE_LIST , CREATE_CUSTOMER_TYPE, DELETE_JOB_TYPE_LIST ,GET_CUSTOMER_DETAIL, DELETE_CUSTOMER_TYPE , GET_CUSTOMER_LIST, GET_CUSTOMER_TYPE_LIST, GET_JOB_TYPE_LIST, SEARCH_CUSTOMER, UPDATE_CUSTOMER } from "../../title/title";
import { createCustomerAPI, createJobTypeListAPI ,deleteJobTypeListAPI, deleteCustomerTypeAPI ,createCustomerTypeAPI, getCustomerListAPI, getCustomerTypeListAPI, getDetailCustomerAPI, getJobTypeListAPI, searchCustomerAPI, updateCustomerAPI } from "../API/customeAPI";
import { addCustomer , setTotalPageCus , setCustomerList, setCustomerTypeList, setDataCustomer, setJobTypeList, setTotalCustomer, setTotalPage, updateCusomer } from "../features/customer.feature";
import { setIsLoading } from "../features/loadingSlice";
import { setMessage } from "../features/messageSlice";
import { message } from "antd";

function* getCustomerList(payload){
    let {page, pageNumber} = payload.data;
    let result = yield call(getCustomerListAPI, page, pageNumber);
    // let {code, data} = result.data;
    if(result?.data?.client?.length > 0){
        yield put(setCustomerList(result.data.client))
        yield put(setTotalCustomer(result.data.total_data))
        yield put(setIsLoading(false))
    } else {
        yield put(setIsLoading(false))
    }
}

function* createCustomer(payload){
    let {data} = payload;
    if(!data.is_company){
        data.is_company = false;
    }
    let result = yield call(createCustomerAPI, data);
    let {code, data: dataResponse} = result;
    if(code === 200 || dataResponse){
        yield put(addCustomer(dataResponse));
        yield put(setMessage({type: "thành công", msg:"Tạo khách hàng thành công."}))
        yield delay(1000)
        yield put(setMessage({type: "", msg:""}))
    } else {
        yield put(setMessage({type: "thất bại", msg:"Tạo khách hàng thất bại."}))
        yield delay(1000)
        yield put(setMessage({type: "", msg:""}))
    }
}

function* searchCustomer(payload){
    let {searchData} = payload;
    let result = yield call(searchCustomerAPI, searchData);
    // let {code, data: dataResponse} = result;
    if(result.code === 200 || result?.data?.client?.length > 0){
        yield put(setCustomerList(result.data.client))
        yield put(setTotalCustomer(result.data.total_data))
        yield put(setMessage({type: "thành công", msg:"Thao tác thành công."}))
        yield delay(1000)
        yield put(setMessage({type: "", msg:""}))
    } else {
        yield put(setMessage({type: "thất bại", msg:"Thao tác thất bại."}))
        yield delay(1000)
        yield put(setMessage({type: "", msg:""}))
    }
}

function* updateCustomer(payload){
    let {data} = payload;
    let result = yield call(updateCustomerAPI, data);
    let {result: code, data: dataResponse} = result.data;
    if(code){
        yield put(updateCusomer(dataResponse))
        yield put(setMessage({type: "thành công", msg:"Cập nhật thành công."}))
        yield delay(1000)
        yield put(setMessage({type: "", msg:""}))
    } else {
        yield put(setMessage({type: "thất bại", msg:"Cập nhật thất bại."}))
        yield delay(1000)
        yield put(setMessage({type: "", msg:""}))
    }
};

function* getDetailCustomer(payload){
    const {client_id} = payload;
    let result = yield call(getDetailCustomerAPI, client_id);
    if(result.data.client.length){
        yield put(setDataCustomer(result.data.client[0]));
    }
}

function* getCustomerTypeList(payload){
    try {
        
        const resuft = yield call(getCustomerTypeListAPI, payload?.data)
        
        if(resuft?.data?.client_type?.length){
            yield put(setCustomerTypeList(resuft?.data?.client_type))
            yield put(setTotalPageCus({
                total_data: resuft?.data?.total_data,
                total_page: resuft?.data?.total_page
            }))
        }
    } catch (error) {
        console.log(error)   
    }
}

function* getJobTypeList(payload){
    try {
        const result = yield call(getJobTypeListAPI,payload?.data);
        console.log(result.data.sector.length)
        if(result.data.sector.length){

            yield put(setJobTypeList(result?.data?.sector))
            yield put(setTotalPage({    
                total_data: result?.data?.total_data,
                total_page: result?.data?.total_page,
            }))
        }

    } catch (error) {
        console.log(error)
    }
}

function* createCustomerType(payload){
    try {
        const resuft = yield call(createCustomerTypeAPI,payload.data)
        const { data } = resuft
        console.log(resuft)
        if(data?.result){
            
            message.success("Tạo thành công")
        }else{
            message.error("Loại khách hàng đã tồn tại")
        }
    } catch (error) {
        message.error(error)
    }
}
// delete type customer
function* deleteCustomerType(payload){
    try {
       const resulf = yield call(deleteCustomerTypeAPI,payload.id)
       if(resulf.result){
            message.success(resulf.data)
       }else{
            message.error("Xóa thất bại")
       }
    } catch (error) {
        console.log(error)
    }
}
function* deleteJobTypeList(payload){
    try {
        const resuft = yield call(deleteJobTypeListAPI,payload.id)
        // console.log(resuft)
        if(resuft.result){
            message.success(resuft.data)
        }else{
            message.error("Xóa thất bại")
        }
    } catch (error) {
        console.log(error)
    }
}
function* createJobTypeList(payload){
    try {
        const resuft = yield call(createJobTypeListAPI,payload?.data)
        // console.log(resuft.data.result)
        if(resuft.data.result){
            message.success("Tạo thành công")
        }else{
            message.error("Loại nghành nghề đã tồn tại")
        }
    } catch (error) {
        console.log(error)
    }
}

export default function* customerMiddleware(){
    yield takeLatest(GET_CUSTOMER_LIST, getCustomerList)
    yield takeLatest(CREATE_CUSTOMER, createCustomer)
    yield takeLatest(SEARCH_CUSTOMER, searchCustomer)
    yield takeLatest(UPDATE_CUSTOMER, updateCustomer)
    yield takeLatest(GET_CUSTOMER_DETAIL, getDetailCustomer)

    // Job type 
    yield takeLatest(DELETE_JOB_TYPE_LIST, deleteJobTypeList )
    yield takeLatest(GET_JOB_TYPE_LIST, getJobTypeList)
    yield takeLatest(CREATE_JOB_TYPE_LIST, createJobTypeList)
    // Customer Type
    yield takeLatest(GET_CUSTOMER_TYPE_LIST, getCustomerTypeList)
    yield takeLatest(CREATE_CUSTOMER_TYPE, createCustomerType)
    yield takeLatest(DELETE_CUSTOMER_TYPE, deleteCustomerType)
}