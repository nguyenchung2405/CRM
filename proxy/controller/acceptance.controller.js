const axios = require("axios");
const { local } = require("../untils/title");

const createAcceptance = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        // console.log(req.file, req.files);
        let newData = {
            ...req.body,
            "completed_evidences": req.files.length > 0 ? req.files.map(file => file.path) : [req.body.completed_evidences],
        };
        // console.log("new data", newData)
        const result = await axios({
            url: `${local}/contract/detail/update?id=${req.body.detail_id}`,
            method: "PUT",
            headers: {
                Authorization: authorization
            },
            data: newData
        });
        res.send(result.data)
    } catch (error) {
        if (error.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const createEventAcceptance = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let newData ={
            ...req.body,
            "completed_evidences": req.files.length > 0 ? req.files.map(file => file.path) : [req.body.completed_evidences],
            contract_IDs: req.body.contract_IDs.split(",").map(item => +item)
        };
        const result = await axios({
            url: `${local}/event/executive_event_detail/update?executive_event_ID=${req.body.detail_id}`,
            method: "PUT",
            headers: {
                Authorization: authorization
            },
            data: newData
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

const createDetailInAcceptance = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let {contract_id, desc, request_id, from_date} = req.body;
        let newDetail = {
            "contract_ID": contract_id,
            "request_ID": request_id,
            "details": [
                {
                    "desc": desc,
                    "from_date": from_date,
                    "to_date": from_date,
                    "file": req?.file?.path
                }
            ]
        }
        const result = await axios({
            url: `${local}/contract/add-detail`,
            method: "POST",
            headers: {
                Authorization: authorization
            },
            data: newDetail
        });
        res.send(result.data)
    } catch (error) {
        if (error?.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const createDetailInEventAcceptance = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let newDetail = {
            ...req.body,
            "file": req?.file?.path,
            "to_date": req.body.from_date
        };
        const result = await axios({
            url: `${local}/event/executive_event_detail/create`,
            method: "POST",
            headers: {
                Authorization: authorization
            },
            data: newDetail
        });
        res.send(result.data)
    } catch (error) {
        if (error?.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const getAcceptanceContractList = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let {page, page_size} = req.query;
        const result = await axios({
            url: `${local}/contract/request/list?page_size=${page_size}&page=${page}&sort_by=id&asc_order=false`,
            method: "GET",
            headers: {
                Authorization: authorization
            },
        });
        res.send(result.data)
    } catch (error) {
        if (error?.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const getAcceptanceEventList = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let {page, page_size} = req.query;
        const result = await axios({
            url: `${local}/event/detail/list?page_size=${page_size}&page=${page}&sort_by=id&asc_order=true`,
            method: "GET",
            headers: {
                Authorization: authorization
            },
        });
        res.send(result.data)
    } catch (error) {
        if (error?.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

module.exports = {
    createAcceptance,
    createDetailInAcceptance,
    getAcceptanceContractList,
    getAcceptanceEventList,
    createDetailInEventAcceptance,
    createEventAcceptance
}