const axios = require("axios");
const {local} = require("../untils/title")

const getCustomerList = async (req, res)=>{
    try {
        // let {headers: {authorization}} = req;
        let {page, page_size} = req.query;
        const result = await axios({
            url: `${local}/client/list?sort_by=id&asc_order=false&page=${page}&page_size=${page_size}`,
            method: "GET",
            // headers: {
            //     Authorization: authorization
            // }
        });
        res.send(result.data);
    } catch (error) {
        if(error.response?.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const createCustomer = async (req, res)=>{
    try {
        const newData = {...req.body};
        newData.files = [];
        for(let file of req.files){
            newData.files.push(file.path)
        }
        const result = await axios({
            url: `${local}/client/create`,
            method: "POST",
            data: newData
        });
        res.send(result.data);
    } catch (error) {
        if(error.response?.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const searchCustomer = async (req, res)=>{
    try {
        let {name, tax_number, brief_name} = req.query;
        let newName = encodeURI(name)
        const result = await axios({
            url: `${local}/client/list?name=${newName}&tax_number=${tax_number}&brief_name=${brief_name}&page=1&page_size=1000&sort_by=id&asc_order=false`,
            method: "GET"
        });
        res.send(result.data);
    } catch (error) {
        if(error.response?.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const updateCustomer = async (req, res)=>{
    try {
        let {id} = req.query;
        const result = await axios({
            url: `${local}/client/update?id=${id}`,
            method: "PUT",
            data: req.body
        });
        res.send(result.data);
    } catch (error) {
        if(error.response?.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const getDetailCustomer = async (req, res)=>{
    try {
        const {client_id} = req.params;
        const result = await axios({
            url: `${local}/client/list?id=${client_id}&page_size=10&sort_by=id&asc_order=true`,
            method: "GET"
        });
        res.send(result.data)
    } catch (error) {
        if(error.response?.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const getCustomerTypeList = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let {page, page_size} = req.query;
        const result = await axios({
            url: `${local}/client/type?page_size=${page_size}&page=${page}&sort_by=id&asc_order=false`,
            method: "GET",
            headers: {
                Authorization: authorization
            },
        });
        res.send(result.data)
    } catch (error) {
        if(error.response?.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const createCustomerType = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        console.log(req.body)
        const result = await axios({
            url: `${local}/client/type/create`,
            method: "POST",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if(error.response?.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const getJobTypeList = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/client/sector?page_size=100&page=1&sort_by=id&asc_order=true`,
            method: "GET",
            headers: {
                Authorization: authorization
            },
        });
        res.send(result.data)
    } catch (error) {
        if(error.response?.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

module.exports = {
    getCustomerList,
    createCustomer,
    searchCustomer,
    updateCustomer,
    getDetailCustomer,
    getCustomerTypeList,
    getJobTypeList,
    createCustomerType
}