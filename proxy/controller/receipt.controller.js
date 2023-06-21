const axios = require("axios");
const { local } = require("../untils/title");

const createExportReceipt = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/payment/receipt/add`,
            method: "POST",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if (error.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const cancelExportReceipt = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/payment/receipt/disable`,
            method: "DELETE",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if (error.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const completeExportReceipt = async (req, res)=>{
    try {
        let {receipt_id} = req.query;
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/payment/receipt/update?receipt_ID=${receipt_id}`,
            method: "PUT",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if (error.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const getAcceptaneListByContractID = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let {contract_id, is_event, has_payment, is_complete} = req.query;
        let result;
        if(is_event === "true"){
            result = await axios({
                url: `${local}/event/executive_event_detail/list?contract_ID=${contract_id}&is_complete=${is_complete}&has_payment=${has_payment}&page_size=100&page=1&sort_by=id&asc_order=true`,
                method: "GET",
                headers: {
                    Authorization: authorization
                },
            })
        } else {
            result = await axios({
                url: `${local}/contract/detail/list?contract_id=${contract_id}&is_complete=${is_complete}&has_payment=${has_payment}&page_size=10&page=1&sort_by=id&asc_order=true`,
                method: "GET",
                headers: {
                    Authorization: authorization
                },
            })
        }
        res.send(result.data)
    } catch (error) {
        if (error.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const getPaymentList = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let {page, page_size, completed} = req.query;
        const result = await axios({
            url: `${local}/payment/list?&page_size=${page_size}&page=${page}&sort_by=id&asc_order=false&completed=${completed}`,
            method: "GET",
            headers: {
                Authorization: authorization
            },
        });
        res.send(result.data)
    } catch (error) {
        if (error.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const deletePayment = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let { payment_id } = req.query;
        const result = await axios({
            url: `${local}/payment/disable?payment_id=${payment_id}`,
            method: "DELETE",
            headers: {
                Authorization: authorization
            },
        })
        res.send(result.data)
    } catch (error) {
        if (error.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

module.exports = {
    createExportReceipt,
    cancelExportReceipt,
    completeExportReceipt,
    getAcceptaneListByContractID,
    getPaymentList,
    deletePayment
}