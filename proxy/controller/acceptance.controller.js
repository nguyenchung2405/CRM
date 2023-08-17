const axios = require("axios");
const { local } = require("../untils/title");

const createAcceptance = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        console.log(req.files?.length, ", " , req.body.completed_evidences, typeof req.body.completed_evidences);
        let evidenctUpdate;
        if(req.body.completed_evidences !== undefined && req.body.completed_evidences !== "undefined"){
            if(req.files.length > 0){
                evidenctUpdate = req.body.completed_evidences.split("\r\n").concat(req.files.map(file => file.path))
            } else {
                evidenctUpdate = req.body.completed_evidences.split("\r\n")
            }
        } else if(req.files.length > 0 && (req.body.completed_evidences === undefined || req.body.completed_evidences === "undefined") ){
            evidenctUpdate = req.files.map(file => file.path)
        } else {
            evidenctUpdate = null
        }
        let newData = {
            ...req.body,
            // "completed_evidences": req.files.length > 0 ? req.files.map(file => file.path) : [req.body.completed_evidences],
            "completed_evidences": evidenctUpdate,
        };
        console.log(newData)
        res.send(newData)
        // const result = await axios({
        //     url: `${local}/contract/detail/update?id=${req.body.detail_id}`,
        //     method: "PUT",
        //     headers: {
        //         Authorization: authorization
        //     },
        //     data: newData
        // });
        // res.send(result.data)
    } catch (error) {
        if (error.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const updateAcceptance = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let evidenceOriginal = req.body.completed_evidences.split(",");
        // let evidenctUpdate = req.body.completed_evidences_update !== undefined ? req.body.completed_evidences_update.split("\r\n").concat(req.files.map(file => file.path)) : []
        let evidenctUpdate;
        if(req.body.completed_evidences_update !== undefined){
            if(req.files.length > 0){
                evidenctUpdate = req.body.completed_evidences_update.split("\r\n").concat(req.files.map(file => file.path))
            } else {
                evidenctUpdate = req.body.completed_evidences_update.split("\r\n")
            }
        } else if(req.body.completed_evidences_update === undefined && req.files.length > 0){
            evidenctUpdate = req.files.map(file => file.path)
        } else {
            evidenctUpdate = []
        }
        let newData = {
            ...req.body,
            "completed_evidences": evidenceOriginal.concat(evidenctUpdate),
        };
        // console.log("new data", newData)
        const result = await axios({
            url: `${local}/contract/detail/update?id=${req.body.key}`,
            method: "PUT",
            headers: {
                Authorization: authorization
            },
            data: newData
        });
        res.send(result.data)
    } catch (error) {
        if (error.response?.data) {
            console.log("Lỗi 1")
            res.send(error.response.data)
        } else {
            console.log("Lỗi 2", error)
            res.send(error)
        }
    }
}

const createEventAcceptance = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let evidenctUpdate;
        if(req.body.completed_evidences !== undefined && req.body.completed_evidences !== "undefined"){
            if(req.files.length > 0){
                evidenctUpdate = req.body.completed_evidences.split("\r\n").concat(req.files.map(file => file.path))
            } else {
                evidenctUpdate = req.body.completed_evidences.split("\r\n")
            }
        } else if((req.body.completed_evidences === undefined || req.body.completed_evidences === "undefined") && req.files.length > 0){
            evidenctUpdate = req.files.map(file => file.path)
        } else {
            evidenctUpdate = []
        }
        let newData ={
            ...req.body,
            // "completed_evidences": req.files.length > 0 ? req.files.map(file => file.path) : [req.body.completed_evidences],
            "completed_evidences": evidenctUpdate,
            contract_IDs: req.body.contract_IDs.split(",").map(item => +item),
            sub_contract_IDs: []
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
        let {contract_id, desc, request_id, from_date, sub_contract_id} = req.body;
        let newDetail = {
            "contract_ID": contract_id,
            "request_ID": request_id,
            "sub_contract_ID": sub_contract_id === undefined || sub_contract_id === "undefined" ? null : sub_contract_id,
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
        let newDetail;
        for(let pro in req.body){
            if(req.body[pro] === "undefined"){
                newDetail = {
                    ...newDetail,
                    [pro]: ""
                }
            } else {
                newDetail = {
                    ...newDetail,
                    [pro]: req.body[pro]
                }
            }
        }
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
    createEventAcceptance,
    updateAcceptance
}