import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
    total: 0,
    recieptList: [],
    acceptanceListInReceipt: [],
    acceptanceListInReceiptEvent: []
}

const receiptSlice = createSlice({
    name: "receiptSlice",
    initialState,
    reducers: {
        setTotalReceipt: (state, action)=>{
            state.total = action.payload;
        },
        setReceiptList: (state, action)=>{
            state.recieptList = action.payload;
        },
        addReceiptToList: (state, action)=>{
            let { payment_ID } = action.payload;
            // let contractIndex = state.recieptList.findIndex(contract => contract.id === contract_id);
            let paymentIndex = state.recieptList.findIndex(pay => pay.id === payment_ID);
            state.recieptList[paymentIndex].receipts.push(action.payload)
        },
        removeReceiptFromList: (state, action)=>{
            let { payment_ID } = action.payload;
            // let contractIndex = state.recieptList.findIndex(contract => contract.id === contract_id);
            let paymentIndex = state.recieptList.findIndex(pay => pay.id === payment_ID);
            state.recieptList[paymentIndex].receipts = [];
        },
        completeReceiptFromList: (state, action)=>{
            let { payment_ID } = action.payload;
            // let contractIndex = state.recieptList.findIndex(contract => contract.id === contract_id);
            let paymentIndex = state.recieptList.findIndex(pay => pay.id === payment_ID);
            state.recieptList[paymentIndex].receipts[0].is_complete = true
        },
        setAccListInReceipt: (state, action)=>{
            state.acceptanceListInReceipt = action.payload;
        },
        setAccListInReceiptEvent: (state, action)=>{
            state.acceptanceListInReceiptEvent = action.payload;
        },
        addPaymentToReceiptList: (state, action)=>{
            let {contract_id, data} = action.payload;
            let receiptIndex = state.recieptList.findIndex(item => item.id === contract_id);
            state.recieptList[receiptIndex]?.payments?.push(data)
        },
        updatePaymentToReceiptList: (state, action)=>{
            let {data} = action.payload;
            let receiptIndex = state.recieptList.findIndex(pay => pay.id === data.id);
            // let paymentIndex = state.recieptList[receiptIndex].payments.findIndex(pay => pay.id === data.id);
            state.recieptList[receiptIndex] = data
        }
    }
})

export const {setTotalReceipt, setReceiptList, addReceiptToList, removeReceiptFromList, completeReceiptFromList,
setAccListInReceipt, addPaymentToReceiptList, updatePaymentToReceiptList, setAccListInReceiptEvent} = receiptSlice.actions;
export default receiptSlice.reducer;