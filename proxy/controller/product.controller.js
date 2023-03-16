const axios = require("axios");
const {local} = require("../untils/title");

const getProductTypeList = async (req, res)=>{
    try {
        let {headers: {authorization}} = req;
        const result = await axios({
            url: `${local}/product/type/list?page_size=100&page=1&sort_by=id&order=desc`,
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

const getProductList = async (req, res)=>{
    try {
        let {headers: {authorization}} = req;
        const result = await axios({
            url: `${local}/product/list?sort_by=id&asc_order=true&page=1&page_size=1000`,
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

module.exports = {
    getProductTypeList,
    getProductList
}