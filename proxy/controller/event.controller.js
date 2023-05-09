const axios = require("axios");
const { local } = require("../untils/title");

const getEventList = async (req, res)=>{
    try {
        let {page, page_size} = req.query;
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/event/list?page_size=${page_size}&sort_by=id&asc_order=true&page=${page}`,
            method: "GET",
            headers: {
                Authorization: authorization
            },
        });
        res.send(result.data)
    } catch (error) {
        if (error.response.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const createEvent = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/event/create`,
            method: "POST",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if (error.response.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const getEventInfor = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let {id} = req.query;
        const result = await axios({
            url: `${local}/event/list?id=${id}`,
            method: "GET",
            headers: {
                Authorization: authorization
            },
        });
        res.send(result.data)
    } catch (error) {
        if (error.response.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const updateEvent = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/event/update?id=${req.body.id}`,
            method: "PUT",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if (error.response.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const createRequest = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/event/detail/create`,
            method: "POST",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data);
    } catch (error) {
        if (error.response.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const deleteRequest = async (req,res)=>{
    try {
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/event/detail/disable?id=${req.query.id}`,
            method: "DELETE",
            headers: {
                Authorization: authorization
            },
        });
        res.send(result.data);
    } catch (error) {
        if (error.response.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const searchEvent = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/event/list?name=${encodeURI(req.query.name)}`,
            method: "GET",
            headers: {
                Authorization: authorization
            },
        });
        res.send(result.data);
    } catch (error) {
        if (error.response.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const getUnsetContract = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/event/unset_contract`,
            method: "GET",
            headers: {
                Authorization: authorization
            },
        });
        res.send(result.data);
    } catch (error) {
        if (error.response.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const addUnserContractToEvent = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let promiseArr = req.body.map(contract =>{
            console.log("line 174",contract)
            return axios({
                url: `${local}/contract/update?id=${contract.id}`,
                method: "PUT",
                headers: {
                    Authorization: authorization
                },
                data: contract
            })
        });
        Promise.all(promiseArr)
        .then(resolve => {
            let result = [];
            for(let i = 0; i < resolve.length; i++){
                // console.log(resolve[i].data)
                result.push(resolve[i].data)
            }
            result.unshift({msg: "Thành công"})
            res.send(result)
        })
        .catch(err => {
            if (err.response?.data) {
                res.send(err.response.data)
            } else {
                res.send(err)
            }
        })
    } catch (error) {
        if (error.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

module.exports = {
    getEventList,
    createEvent,
    getEventInfor,
    updateEvent,
    createRequest,
    deleteRequest,
    searchEvent,
    getUnsetContract,
    addUnserContractToEvent
}