import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
    contractList: [],
    total: 0,
    contractTypeList: [],
    contractDetail: {},
    contractRequest: [],
    keyOfDetailJustAdd: "",
    keyOfRequestJustAdd: "",
    ownerList: [],
    isOnlyPayment: false
};

const contractSlice = createSlice({
    name: "contractSlice",
    initialState,
    reducers: {
        setContractList: (state, action) => {
            let { total, contractList } = action.payload;
            state.contractList = contractList;
            state.total = total;
        },
        setContractTypeList: (state, action) => {
            state.contractTypeList = action.payload;
        },
        setContractDetail: (state, action) => {
            state.contractDetail = action.payload;
        },
        setKeyOfRequestJustAdd: (state, action) => {
            state.keyOfRequestJustAdd = action.payload
        },
        setKeyOfDetailJustAdd: (state, action) => {
            state.keyOfDetailJustAdd = action.payload
        },
        setContractRequest: (state, action) => {
            state.contractRequest = action.payload
        },
        addContractRequest: (state, action) => {
            state.contractRequest.push(action.payload)
        },
        updateContractRequest: (state, action) => {
            let indexReq = state.contractRequest.findIndex(req => req.id === action.payload.id);
            state.contractRequest[indexReq].quality = action.payload.quality;
            state.contractRequest[indexReq].price_ID.id = action.payload.price_ID;
            state.contractRequest[indexReq].product_ID.id = action.payload.product_ID;
            state.contractRequest[indexReq].price_ID.price = action.payload.real_price / 1000000;
            state.contractRequest[indexReq].custom_price = action.payload.custom_price >= 1000000 ? action.payload.custom_price / 1000000 : action.payload.custom_price;
        },
        deleteContractRequest: (state, action) => {
            let indexReq = state.contractRequest.findIndex(req => req.id === action.payload);
            state.contractRequest.splice(indexReq, 1);
        },
        addRequestDetail: (state, action) => {
            let indexReq = state.contractRequest.findIndex(req => req.id === action.payload.request_id);
            state.contractRequest[indexReq].details.unshift(action.payload.detail)
            state.keyOfDetailJustAdd = action.payload.detail.id
            state.keyOfRequestJustAdd = action.payload.request_id
        },
        removeRequestDetail: (state, action) => {
            let { request_id, detail_id } = action.payload;
            let indexReq = state.contractRequest.findIndex(req => req.id === request_id);
            state.contractRequest[indexReq].details = state.contractRequest[indexReq].details.filter(detail => detail.id !== detail_id)
            state.keyOfRequestJustAdd = ""
            state.keyOfDetailJustAdd = ""
        },
        updateRequestDetail: (state, action) => {
            let { request_id, detailData, detail_id_old } = action.payload;
            if(detail_id_old){
                let indexReq = state.contractRequest.findIndex(req => req.id === request_id);
                let indexDetail = state.contractRequest[indexReq].details.findIndex(detail => detail.id === detail_id_old);
                state.contractRequest[indexReq].details[indexDetail] = detailData;
            }
            let indexReq = state.contractRequest.findIndex(req => req.id === request_id);
            let indexDetail = state.contractRequest[indexReq].details.findIndex(detail => detail.id === detailData.id);
            state.contractRequest[indexReq].details[indexDetail] = detailData;
        },
        setOwnerList: (state, action)=>{
            state.ownerList = action.payload;
        },
        addPayment: (state, action)=>{
            state.contractDetail.payments.push(action.payload)
        },
        setIsOnlyPayment: (state,action)=>{
            state.isOnlyPayment = action.payload;
        }
    }
});

export const { setContractList, setContractTypeList, setContractDetail, addContractRequest, updateContractRequest, 
deleteContractRequest, addRequestDetail, removeRequestDetail, setKeyOfRequestJustAdd, setKeyOfDetailJustAdd, 
updateRequestDetail, setContractRequest, setOwnerList, addPayment, setIsOnlyPayment } = contractSlice.actions;
export default contractSlice.reducer;