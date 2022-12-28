const axios = require("axios");
const {local} = require("../untils/title")

const getCustomerList = async (req, res)=>{
    try {
        console.log("nfaohfuahou")
        const result = await axios({
            url: `${local}/client/list`,
            method: "GET"
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
        let {name, tax_number} = req.query;
        let newName = encodeURI(name)
        const result = await axios({
            url: `${local}/client/search?name=${newName}&tax_number=${tax_number}`,
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