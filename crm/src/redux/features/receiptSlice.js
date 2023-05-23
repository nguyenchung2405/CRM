import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
    total: 0,
    recieptList: [],
    acceptanceListInReceipt: []
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
            let {contract_id, payment_ID} = action.payload;
            let contractIndex = state.recieptList.findIndex(contract => contract.id === contract_id);
            let paymentIndex = state.recieptList[contractIndex].payments.findIndex(pay => pay.id === payment_ID);
            state.recieptList[contractIndex].payments[paymentIndex].receipts.push(action.payload)
        },
        removeReceiptFromList: (state, action)=>{
            let {contract_id, payment_ID} = action.payload;
            let contractIndex = state.recieptList.findIndex(contract => contract.id === contract_id);
            let paymentIndex = state.recieptList[contractIndex].payments.findIndex(pay => pay.id === payment_ID);
            state.recieptList[contractIndex].payments[paymentIndex].receipts = [];
        },
        completeReceiptFromList: (state, action)=>{
            let {contract_id, payment_ID} = action.payload;
            let contractIndex = state.recieptList.findIndex(contract => contract.id === contract_id);
            let paymentIndex = state.recieptList[contractIndex].payments.findIndex(pay => pay.id === payment_ID);
            state.recieptList[contractIndex].payments[paymentIndex].receipts[0].is_complete = true
        },
        setAccListInReceipt: (state, action)=>{
            state.acceptanceListInReceipt = action.payload;
        }
    }
})

export const {setTotalReceipt, setReceiptList, addReceiptToList, removeReceiptFromList, completeReceiptFromList,
setAccListInReceipt} = receiptSlice.actions;
export default receiptSlice.reducer;