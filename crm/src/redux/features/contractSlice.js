import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
    contractList: [],
    total: 0,
    contractTypeList: [],
    contractDetail: {},
    contractRequest: [
        // {
        //     id: "01bc15f7-299e-4b03-b647-07220b04b91a",
        //     price_ID: 5,
        //     product_ID: 5,
        //     quality: 4,
        //     real_price: "21.800.000"
        // }
    ],
    contractRequestDetails: [
    //     {
    //     "desc": "Đây là mô tả 1",
    //     "product_ID": {
    //       "name": "Nửa trang đen trắng 24h",
    //       "desc": "1 đen trắng 24h",
    //       "code_indentify": "DTNUA24H",
    //       "location_ID": 1,
    //       "type_ID": 2,
    //       "attribute_ID": 1,
    //       "attribute_option_ID": null,
    //       "price": null,
    //       "id": 3
    //     },
    //     "price_ID": {
    //       "price": 5.5,
    //       "execute_date": "2023-03-15T02:11:52",
    //       "id": 3,
    //       "product_ID": 3
    //     },
    //     "from_date": "2023-04-15",
    //     "to_date": "2023-05-15",
    //     "id": 1,
    //     "is_disable": true,
    //     "file" : ""
    //   }, {
    //     "desc": "Đây là mô tả 2",
    //     "product_ID": {
    //       "name": "Nửa trang đen trắng 24h",
    //       "desc": "1 đen trắng 24h",
    //       "code_indentify": "DTNUA24H",
    //       "location_ID": 1,
    //       "type_ID": 2,
    //       "attribute_ID": 1,
    //       "attribute_option_ID": null,
    //       "price": null,
    //       "id": 3
    //     },
    //     "price_ID": {
    //       "price": 6.5,
    //       "execute_date": "2023-03-15T02:11:52",
    //       "id": 3,
    //       "product_ID": 3
    //     },
    //     "from_date": "2023-04-15",
    //     "to_date": "2023-05-15",
    //     "id": 2,
    //     "is_disable": true,
    //     "file": "C:\\fakepath\\Contract_Manager.vpd (2).png"
    //   }
    ]
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
        addContractRequest: (state, action)=>{
            state.contractRequest.push(action.payload)
        },
        updateContractRequest: (state, action)=>{
            let indexReq = state.contractRequest.findIndex(req => req.id === action.payload.id);
            state.contractRequest[indexReq] = action.payload;
        },
        deleteContractRequest: (state, action)=>{
            let indexReq = state.contractRequest.findIndex(req => req.id === action.payload);
            state.contractRequest.splice(indexReq, 1);
        }
    }
});

export const {setContractList, setContractTypeList, setContractDetail, addContractRequest
,updateContractRequest, deleteContractRequest} = contractSlice.actions;
export default contractSlice.reducer;