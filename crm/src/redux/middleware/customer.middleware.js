import { call, delay, put, takeLatest } from "redux-saga/effects";
import { UPDATE_CUSTOMER_TYPE,UPDATE_JOB_TYPE_LIST  , CREATE_CUSTOMER, CREATE_JOB_TYPE_LIST , CREATE_CUSTOMER_TYPE, DELETE_JOB_TYPE_LIST ,GET_CUSTOMER_DETAIL, DELETE_CUSTOMER_TYPE , GET_CUSTOMER_LIST, GET_CUSTOMER_TYPE_LIST, GET_JOB_TYPE_LIST, SEARCH_CUSTOMER, UPDATE_CUSTOMER } from "../../title/title";
import { createCustomerAPI, updateCustomerTypeAPI,updateJobTypeAPI ,createJobTypeListAPI ,deleteJobTypeListAPI, deleteCustomerTypeAPI ,createCustomerTypeAPI, getCustomerListAPI, getCustomerTypeListAPI, getDetailCustomerAPI, getJobTypeListAPI, searchCustomerAPI, updateCustomerAPI } from "../API/customeAPI";
import { addCustomer, setUpdateJobType ,setUpdateType ,setJobTypeListDelete , setJobTypeListCreate ,setCustomerTypeDelete , setTotalPageCus , setCustomerTypeListCreate ,  setCustomerList, setCustomerTypeList, setDataCustomer, setJobTypeList, setTotalCustomer, setTotalPage, updateCusomer } from "../features/customer.feature";
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
        message.success("Tạo khách hàng thành công.")
    } else {
        message.error("Tạo khách hàng thất bại.")
    }
}

function* searchCustomer(payload){
    let {searchData} = payload;
    let result = yield call(searchCustomerAPI, searchData);
    // let {code, data: dataResponse} = result;
    if(result.code === 200 || result?.data?.client?.length > 0){
        yield put(setCustomerList(result.data.client))
        yield put(setTotalCustomer(result.data.total_data))
        message.success("Thao tác thành công.")
    } else {
        message.error("Thao tác thất bại.")
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
        
        if(payload?.data?.name !== ""){
            if(resuft?.data?.client_type?.length === 0){
                message.warning("Loại khách hàng không tồn tại")
                yield put(setCustomerTypeList([]))
                yield put(setIsLoading(false))
            }else{
                if(resuft?.data?.client_type?.length > 0){
                    yield put(setCustomerTypeList(resuft?.data?.client_type))
                    yield put(setTotalPageCus({
                        total_data: resuft?.data?.total_data,
                        total_page: resuft?.data?.total_page
                    }))
                    yield put(setIsLoading(false))
                    
                }
            }
        }else{
            if(resuft?.data?.client_type?.length > 0){
                yield put(setCustomerTypeList(resuft?.data?.client_type))
                yield put(setTotalPageCus({
                    total_data: resuft?.data?.total_data,
                    total_page: resuft?.data?.total_page
                }))
                yield put(setIsLoading(false))
            }
        }
    } catch (error) {
        console.log(error)   
    }
}

function* getJobTypeList(payload){
    try {
        const result = yield call(getJobTypeListAPI,payload?.data);
        if(payload?.data?.name !== ""){
            if(result?.data?.sector?.length === 0){
                message.warning("Loại ngành nghề không tồn tại")
                yield put(setJobTypeList([]))
                yield put(setIsLoading(false))
            }else{
                if(result?.data?.sector?.length > 0){
                    yield put(setJobTypeList(result?.data?.sector))
                    yield put(setTotalPage({    
                        total_data: result?.data?.total_data,
                        total_page: result?.data?.total_page,
                    }))
                    yield put(setIsLoading(false))
                }
            }

        }else{
            if(result?.data?.sector?.length){
                yield put(setJobTypeList(result?.data?.sector))
                yield put(setTotalPage({    
                    total_data: result?.data?.total_data,
                    total_page: result?.data?.total_page,
                }))
                yield put(setIsLoading(false))
            }
        }
    } catch (error) {
        console.log(error)
    }
}

function* createCustomerType(payload){
    try {
        const resuft = yield call(createCustomerTypeAPI,payload.data)
        const { data } = resuft
        if(data?.result){
            yield put(setCustomerTypeListCreate(data?.data?.client_type))
            yield put(setIsLoading(false))
            message.success("Tạo thành công")
        }else{
            yield put(setIsLoading(false))
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
            yield put(setCustomerTypeDelete(payload.id))
            yield put(setIsLoading(false))
            message.success(resulf.data)
        }else{
           yield put(setIsLoading(false))
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
            yield put(setJobTypeListDelete(payload.id))
            yield put(setIsLoading(false))
            message.success(resuft.data)
        }else{
            yield put(setIsLoading(false))
            message.error("Xóa thất bại")
        }
    } catch (error) {
        console.log(error)
    }
}
function* createJobTypeList(payload){
    try {

        const resuft = yield call(createJobTypeListAPI,payload?.data)
        console.log(resuft)
        if(resuft.status === 400){
            yield put(setIsLoading(false))
            message.error("Loại ngành nghề đã tồn tại")
        }else{
            if(resuft?.data?.result){

                yield put(setJobTypeListCreate(resuft?.data?.data?.sector))
                yield put(setIsLoading(false))
                message.success("Tạo thành công")
            }
        }
    } catch (error) {
        console.log(error)
    }
}

function* updateCustomerType(payload){
    try {
        const resuft = yield call(updateCustomerTypeAPI,payload?.data)
        if(resuft?.data?.result){
            yield put(setUpdateType(resuft?.data?.data))
            message.success("Cập nhật thành công")
        }
    } catch (error) {
        console.log(error);
    }
}

function* updateJobTypeList(payload){
    try {
        const resuft = yield call(updateJobTypeAPI,payload?.data)
        console.log(resuft);
        if(resuft?.data?.result){
            yield put(setUpdateJobType(resuft?.data?.data))
            message.success("Cập nhật thành công")
        }
    } catch (error) {
        console.log(error);
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
    yield takeLatest(UPDATE_JOB_TYPE_LIST,updateJobTypeList)
    // Customer Type
    yield takeLatest(GET_CUSTOMER_TYPE_LIST, getCustomerTypeList)
    yield takeLatest(CREATE_CUSTOMER_TYPE, createCustomerType)
    yield takeLatest(DELETE_CUSTOMER_TYPE, deleteCustomerType)
    yield takeLatest(UPDATE_CUSTOMER_TYPE, updateCustomerType)
}