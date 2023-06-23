import axios from "axios"
import moment from "moment";
import { local, TOKEN } from "../../title/title";

export async function createExportReceiptAPI(data){
    try {
        let newData = {
            ...data,
            export_date: moment(new Date(data.export_date)).format("YYYY-MM-DD")
        }
        const result = await axios({
            url: `${local}/api/receipt/create`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data: newData
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
}

export async function cancelExportReceiptAPI(data){
    try {
        const result = await axios({
            url: `${local}/api/receipt/cancel`,
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
}

export async function completeExportReceiptAPI(data){
    try {
        let newData = {
            ...data,
            complete_date: moment(new Date(data.complete_date)).format("YYYY-MM-DD")
        }
        const result = await axios({
            url: `${local}/api/receipt/complete?receipt_id=${data.receipt_id}`,
            method: "PUT",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data: newData
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
}

export async function getAcceptaneListByContractAPI(contract_id, has_payment,is_complete, is_event){
    try {
        const result = await axios({
            url: `${local}/api/receipt/acc-list?contract_id=${contract_id}&is_event=${is_event}&has_payment=${has_payment}&is_complete=${is_complete}`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
}

export async function getPaymentListAPI(page, pageNumber, completed){
    try {
        const result = await axios({
            url: `${local}/api/receipt/get-payment-list?page=${page}&page_size=${pageNumber}&completed=${completed}`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
}

export async function deletePaymentAPI(data){
    try {
        console.log(data)
        const result = await axios({
            url: `${local}/api/receipt/delete-payment?payment_id=${data}`,
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}