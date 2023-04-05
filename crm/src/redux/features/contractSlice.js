import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
    contractList: [],
    total: 0,
    contractTypeList: [],
    contractDetail: {},
    contractRequest: [
    //     {
    //     "desc": "string",
    //     "product_ID": {
    //       "name": "1 trang màu toàn quốc",
    //       "desc": "1 trang màu toàn quốc",
    //       "code_indentify": "M1TQ",
    //       "location_ID": 2,
    //       "type_ID": 1,
    //       "attribute_ID": 2,
    //       "attribute_option_ID": null,
    //       "price": null,
    //       "id": 1
    //     },
    //     "price_ID": {
    //       "price": 20.5,
    //       "execute_date": "2023-03-14T14:42:24",
    //       "id": 1,
    //       "product_ID": 1
    //     },
    //     "quality": 10,
    //     "details": [{
    //         "desc": "string",
    //         "product_ID": {
    //           "name": "1 trang màu toàn quốc",
    //           "desc": "1 trang màu toàn quốc",
    //           "code_indentify": "M1TQ",
    //           "location_ID": 2,
    //           "type_ID": 1,
    //           "attribute_ID": 2,
    //           "attribute_option_ID": null,
    //           "price": null,
    //           "id": 1
    //         },
    //         "price_ID": {
    //           "price": 20.5,
    //           "execute_date": "2023-03-14T14:42:24",
    //           "id": 1,
    //           "product_ID": 1
    //         },
    //         "from_date": "2023-03-30",
    //         "to_date": "2023-03-30",
    //         "file": null,
    //         "id": 5,
    //         "is_disable": false
    //       }, {
    //         "desc": "string",
    //         "product_ID": {
    //           "name": "1 trang màu toàn quốc",
    //           "desc": "1 trang màu toàn quốc",
    //           "code_indentify": "M1TQ",
    //           "location_ID": 2,
    //           "type_ID": 1,
    //           "attribute_ID": 2,
    //           "attribute_option_ID": null,
    //           "price": null,
    //           "id": 1
    //         },
    //         "price_ID": {
    //           "price": 20.5,
    //           "execute_date": "2023-03-14T14:42:24",
    //           "id": 1,
    //           "product_ID": 1
    //         },
    //         "from_date": "2023-03-30",
    //         "to_date": "2023-03-30",
    //         "file": null,
    //         "id": 6,
    //         "is_disable": false
    //       }],
    //     "id": 2,
    //     "is_disable": false
    //   },
    //   {
    //     "desc": "string",
    //     "product_ID": {
    //       "name": "top trang chủ TTO PC",
    //       "desc": "top trang chủ TTO PC",
    //       "code_indentify": "THETTOPC",
    //       "location_ID": 3,
    //       "type_ID": 3,
    //       "attribute_ID": 3,
    //       "attribute_option_ID": null,
    //       "price": null,
    //       "id": 4
    //     },
    //     "price_ID": {
    //       "price": 30.7,
    //       "execute_date": "2023-03-14T14:42:24",
    //       "id": 4,
    //       "product_ID": 4
    //     },
    //     "quality": 10,
    //     "details": [],
    //     "id": 3,
    //     "is_disable": false
    //   }
    ],
    keyOfDetailJustAdd: "",
    keyOfRequestJustAdd: "",
};

const contractSlice = createSlice({
    name:"contractSlice",
    initialState,
    reducers: {
        setContractList: (state, action)=>{
            let {total, contractList} = action.payload;
            state.contractList = contractList;
            state.total = total;
        },
        setContractTypeList: (state, action)=>{
            state.contractTypeList = action.payload;
        },
        setContractDetail: (state, action)=>{
            state.contractDetail = action.payload;
        },
        setKeyOfRequestJustAdd: (state, action)=>{
            state.keyOfRequestJustAdd = action.payload
        },
        setKeyOfDetailJustAdd: (state, action)=>{
            state.keyOfDetailJustAdd = action.payload
        },
        setContractRequest: (state, action)=>{
            state.contractRequest = action.payload
        },
        addContractRequest: (state, action)=>{
            let newRequest = {
                quality: action.payload.quality,
                price_ID: {
                    id: action.payload.price_ID,
                    price: action.payload.real_price / 1000000
                },
                product_ID: {
                    id: action.payload.product_ID
                },
                id: action.payload.id,
                details: action.payload.details
            }
            state.contractRequest.push(newRequest)
        },
        updateContractRequest: (state, action)=>{
            let indexReq = state.contractRequest.findIndex(req => req.id === action.payload.id);
            state.contractRequest[indexReq].quality = action.payload.quality;
            state.contractRequest[indexReq].price_ID.id = action.payload.price_ID;
            state.contractRequest[indexReq].product_ID.id = action.payload.product_ID;
            state.contractRequest[indexReq].price_ID.price = action.payload.real_price / 1000000;
        },
        deleteContractRequest: (state, action)=>{
            let indexReq = state.contractRequest.findIndex(req => req.id === action.payload);
            state.contractRequest.splice(indexReq, 1);
        },
        addRequestDetail: (state, action)=>{
            let indexReq = state.contractRequest.findIndex(req => req.id === action.payload.request_id);
            state.contractRequest[indexReq].details.unshift(action.payload.detail)
            state.keyOfDetailJustAdd = action.payload.detail.id
            state.keyOfRequestJustAdd = action.payload.request_id
        },
        removeRequestDetail: (state, action)=>{
            let {request_id, detail_id} = action.payload;
            let indexReq = state.contractRequest.findIndex(req => req.id === request_id);
            state.contractRequest[indexReq].details = state.contractRequest[indexReq].details.filter(detail => detail.id !== detail_id)
            state.keyOfRequestJustAdd = ""
            state.keyOfDetailJustAdd = ""
        },
        updateRequestDetail: (state, action)=>{
            let {request_id, detailData} = action.payload;
            let indexReq = state.contractRequest.findIndex(req => req.id === request_id);
            let indexDetail = state.contractRequest[indexReq].details.findIndex(detail => detail.id === detailData.id);
            state.contractRequest[indexReq].details[indexDetail] = detailData;
        }
    }
});

export const {setContractList, setContractTypeList, setContractDetail, addContractRequest
,updateContractRequest, deleteContractRequest, addRequestDetail, removeRequestDetail, setKeyOfRequestJustAdd,
setKeyOfDetailJustAdd, updateRequestDetail, setContractRequest} = contractSlice.actions;
export default contractSlice.reducer;