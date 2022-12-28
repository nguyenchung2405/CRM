const axios = require("axios");
const {local} = require("../untils/title");

const getContractList = async (req, res)=>{
    try {
        let {headers: {authorization}} = req;
        let {page, page_size} = req.query;
        const result = await axios({
            url: `${local}/contract/list?page_size=${page_size}&page=${page}&sort_by=id&order=desc`,
            method: "GET",
            headers: {
                Authorization: authorization
            }
        });
        res.send(result.data);
    } catch (error) {
        res.send(error)
    }
};

const getContractTypeList = async (req, res)=>{
    try {
        let {headers: {authorization}} = req;
        const result = await axios({
            url: `${local}/contract/type/list?page_size=100&page=1&sort_by=id&order=desc`,
            method: "GET",
            headers: {
                Authorization: authorization
            }
        });
        res.send(result.data)
    } catch (error) {
        res.send(error)
    }
};

const createContract = async (req,res)=>{
    try {
        let {headers: {authorization}} = req;
        console.log(req.body)
        const result = await axios({
            url: `${local}/contract/create`,
            method: "POST",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    getContractList,
    getContractTypeList,
    createContract
}