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
        res.send(error)
    }
}

const createCustomer = async (req, res)=>{
    try {
        const result = await axios({
            url: `${local}/client/create`,
            method: "POST",
            data: req.body
        });
        res.send(result.data);
    } catch (error) {
        res.send(error)
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
        // console.log(error)
        res.send(error)
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
        res.send(error)
    }
};

module.exports = {
    getCustomerList,
    createCustomer,
    searchCustomer,
    updateCustomer
}