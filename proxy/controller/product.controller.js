const axios = require("axios");
const { local } = require("../untils/title");

const getProductTypeList = async (req, res) => {
    try {
        let { headers: { authorization } } = req;
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

const getProductList = async (req, res) => {
    try {
        let { headers: { authorization } } = req;
        let { page, page_size, attribute_ID, location_ID, channel_ID, type_ID } = req.query;
        let queryString = "&";
        let obj = { attribute_ID, location_ID, channel_ID, type_ID };
        for (let prop in obj) {
            if (typeof +obj[prop] === "number" && +obj[prop] > 0) {
                if (queryString.length > 1) {
                    queryString += `&${prop}=${obj[prop]}`
                } else {
                    queryString += `${prop}=${obj[prop]}`
                }
            }
        }
        const result = await axios({
            url: `${local}/product/list?sort_by=id&asc_order=true&page=${page}&page_size=${page_size}${queryString}`,
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

const getProductChannel = async (req, res) => {
    try {
        let { headers: { authorization } } = req;
        let { page, page_size } = req.query;
        const result = await axios({
            url: `${local}/product/channel/list?page_size=${page_size}&page=${page}&sort_by=id&order=desc`,
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

const getProductLocation = async (req, res) => {
    try {
        let { headers: { authorization } } = req;
        let { page, page_size, channel_id } = req.query;
        const result = await axios({
            url: `${local}/product/location/list?channel_id=${channel_id}&page_size=${page_size}&sort_by=id&asc_order=true&page=${page}`,
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

const getProductType = async (req, res) => {
    try {
        let { headers: { authorization } } = req;
        let { page, page_size } = req.query;
        const result = await axios({
            url: `${local}/product/attribute/list?page_size=${page_size}&page=${page}&sort_by=id&order=desc`,
            method: "GET",
            headers: {
                Authorization: authorization
            }
        });
        res.send(result.data)
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    getProductTypeList,
    getProductList,
    getProductChannel,
    getProductLocation,
    getProductType
}