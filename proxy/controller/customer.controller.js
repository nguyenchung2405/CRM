const axios = require("axios");

const getCustomerList = async (req, res)=>{
    try {
        const result = await axios({
            url: `http://tuoitreaws.crm/client/list`,
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
            url: `http://tuoitreaws.crm/client/create`,
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
            url: `http://tuoitreaws.crm/client/search?name=${newName}&tax_number=${tax_number}`,
            method: "GET"
        });
        res.send(result.data);
    } catch (error) {
        // console.log(error)
        res.send(error)
    }
}

module.exports = {
    getCustomerList,
    createCustomer,
    searchCustomer
}