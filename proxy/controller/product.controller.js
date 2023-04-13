const axios = require("axios");
const { local } = require("../untils/title");

const getProductTypeList = async (req, res) => {
    try {
        let { headers: { authorization } } = req;
        let {name, page, page_size, location_ID} = req.query;
        let result;
        if(name && name !== ""){
            result = await axios({
                url: `${local}/product/type/list?page_size=100&page=1&sort_by=id&order=desc&name=${name}`,
                method: "GET",
                headers: {
                    Authorization: authorization
                }
            });
        } else if(location_ID !== "undefined") {
            result = await axios({
                url: `${local}/product/type/list?page_size=${page_size}&page=${page}&sort_by=id&order=desc&location_ID=${location_ID}`,
                method: "GET",
                headers: {
                    Authorization: authorization
                }
            });
        } else {
            result = await axios({
                url: `${local}/product/type/list?page_size=${page_size}&page=${page}&sort_by=id&order=desc`,
                method: "GET",
                headers: {
                    Authorization: authorization
                }
            });
        }
        res.send(result.data)
    } catch (error) {
        if(error.response?.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const getProductList = async (req, res) => {
    try {
        let { headers: { authorization } } = req;
        let { page, page_size, attribute_ID, location_ID, type_ID } = req.query;
        let queryString = "&";
        let obj = { attribute_ID, location_ID, type_ID };
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
            url: `${local}/product/list?sort_by=id&asc_order=false&page=${page}&page_size=${page_size}${queryString}`,
            method: "GET",
            headers: {
                Authorization: authorization
            }
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
        if(error.response?.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
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
        if(error.response?.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const getProductType = async (req, res) => {
    try {
        let { headers: { authorization } } = req;
        let { page, page_size, name , type_ID, location_ID} = req.query;
        let result;
        if(name && name !== ""){
            result = await axios({
                url: `${local}/product/attribute/list?page_size=1000&page=1&sort_by=id&order=desc&name=${encodeURI(name)}`,
                method: "GET",
                headers: {
                    Authorization: authorization
                }
            });
        } else if(type_ID && location_ID && type_ID !== "undefined" &&location_ID !== "undefined") {
            result = await axios({
                url: `${local}/product/attribute/list?page_size=${page_size}&page=${page}&sort_by=id&order=desc&type_ID=${type_ID}&location_ID=${location_ID}`,
                method: "GET",
                headers: {
                    Authorization: authorization
                }
            });
        } else {
            result = await axios({
                url: `${local}/product/attribute/list?page_size=${page_size}&page=${page}&sort_by=id&order=desc`,
                method: "GET",
                headers: {
                    Authorization: authorization
                }
            });
        }
        res.send(result.data)
    } catch (error) {
        if(error.response?.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const createProduct = async (req, res)=>{
    try {
        let {headers: {authorization}} = req;
        const result = await axios({
            url: `${local}/product/item/create`,
            method: "POST",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if(error.response.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const deleteProduct = async (req, res)=>{
    try {
        let {headers: {authorization}} = req;
        let {product_id} = req.query;
        const result = await axios({
            url: `${local}/product/item/disable?product_id=${product_id}`,
            method: "DELETE",
            headers: {
                Authorization: authorization
            },
        });
        res.send(result.data)
    } catch (error) {
        if(error.response.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const createProductType = async (req, res)=>{
    try {
        let {headers: {authorization}} = req;
        const result = await axios({
            url: `${local}/product/type/create`,
            method: "POST",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if(error.response.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const deleteProductType = async (req, res)=>{
    try {
        let {headers: {authorization}} = req;
        let {type_id} = req.query;
        const result = await axios({
            url: `${local}/product/type/disable?id=${type_id}`,
            method: "DELETE",
            headers: {
                Authorization: authorization
            },
        });
        res.send(result.data)
    } catch (error) {
        if(error.response.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const updateProductType = async (req, res)=>{
    try {
        let {headers: {authorization}} = req;
        let {type_id} = req.query;
        const result = await axios({
            url: `${local}/product/type/update?id=${type_id}`,
            method: "PUT",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if(error.response.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const createProductAttribute = async (req, res)=>{
    try {
        let {headers: {authorization}} = req;
        const result = await axios({
            url: `${local}/product/attribute/create`,
            method: "POST",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if(error.response.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const deleteProductAttribute = async (req, res)=>{
    try {
        let {headers: {authorization}} = req;
        let {attribute_id} = req.query;
        const result = await axios({
            url: `${local}/product/attribute/disable?id=${attribute_id}`,
            method: "DELETE",
            headers: {
                Authorization: authorization
            },
        });
        res.send(result.data)
    } catch (error) {
        if(error.response.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const updateProductAttribute = async (req, res)=>{
    try {
        let {headers: {authorization}} = req;
        let {attribute_id} = req.query;
        const result = await axios({
            url: `${local}/product/attribute/update?id=${attribute_id}`,
            method: "PUT",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if(error.response.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const getProductSpecial = async (req, res)=>{
    try {
        let {headers: {authorization}} = req;
        let {page_size, page} = req.query;
        const result = await axios({
            url: `${local}/product/special-discount?page_size=${page_size}&page=${page}&sort_by=id&asc_order=true`,
            method: "GET",
            headers: {
                Authorization: authorization
            },
        });
        res.send(result.data)
    } catch (error) {
        if(error.response.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const createProductSpecial = async (req, res)=>{
    try {
        let {headers: {authorization}} = req;
        const result = await axios({
            url: `${local}/product/special-discount/create`,
            method: "POST",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if(error.response.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        } 
    }
}

module.exports = {
    getProductTypeList,
    getProductList,
    getProductChannel,
    getProductLocation,
    getProductType,
    createProduct,
    deleteProduct,
    createProductType,
    deleteProductType,
    createProductAttribute,
    deleteProductAttribute,
    updateProductType,
    updateProductAttribute,
    getProductSpecial,
    createProductSpecial
}