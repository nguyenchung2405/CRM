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
        let {page, page_size} = req.query;
        const result = await axios({
            url: `${local}/product/list?sort_by=id&asc_order=true&page=${page}&page_size=${page_size}`,
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