import { put, takeLatest } from "redux-saga/effects";
import { CREATE_EXPORT_RECEIPT } from "../../title/title";

function* createExportReceipt(payload){
    try {
        
    } catch (error) {
        console.log(error)
    }
}

export default function* receiptMiddleware(){
    yield takeLatest(CREATE_EXPORT_RECEIPT, createExportReceipt)
}