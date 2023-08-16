const axios = require("axios");
const { local } = require("../untils/title");

const getProductTypeList = async (req, res) => {
    try {
        let { headers: { authorization } } = req;
        let {name, page, page_size, sub_location_ID} = req.query;
        let result;
        if(name && name !== ""){
            result = await axios({
                url: `${local}/product/type/list?page_size=100&page=1&sort_by=id&asc_order=false&name=${name}`,
                method: "GET",
                headers: {
                    Authorization: authorization
                }
            });
        } else if(sub_location_ID !== "undefined") {
            result = await axios({
                url: `${local}/product/type/list?page_size=${page_size}&page=${page}&sort_by=id&asc_order=false&sub_location_ID=${sub_location_ID}`,
                method: "GET",
                headers: {
                    Authorization: authorization
                }
            });
        } else {
            result = await axios({
                url: `${local}/product/type/list?page_size=${page_size}&page=${page}&sort_by=id&asc_order=false`,
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
        let { page, page_size, attribute_ID: attribute_option_ID, sub_location_ID, type_ID, search, name, location_ID, channel_ID } = req.query;
        let queryString = "&";
        let obj = { attribute_option_ID, sub_location_ID, type_ID };
        let result;
        if(search === "true"){
            result = await axios({
                url: `${local}/product/list?sort_by=id&asc_order=false&page=${page}&page_size=${page_size}&name=${encodeURI(name)}`,
                method: "POST",
                headers: {
                    Authorization: authorization
                },
                data: req.body
            });
        } else {
            // for (let prop in obj) {
            //     if (typeof +obj[prop] === "number" && +obj[prop] > 0) {
            //         if (queryString.length > 1) {
            //             queryString += `&${prop}=${obj[prop]}`
            //         } else {
            //             queryString += `${prop}=${obj[prop]}`
            //         }
            //     }
            // }
            result = await axios({
                url: `${local}/product/list?sort_by=id&asc_order=false&page=${page}&page_size=${page_size}`,
                method: "POST",
                headers: {
                    Authorization: authorization
                },
                data: req.body
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

const getProductListContract = async (req, res) => {
    try {
        let { headers: { authorization } } = req;
        let { page, page_size, attribute_ID: attribute_option_ID, sub_location_ID, type_ID, search, name } = req.query;
        let queryString = "&";
        let obj = { attribute_option_ID, sub_location_ID, type_ID };
        let result;
        if(search === "true"){
            result = await axios({
                url: `${local}/product/list?sort_by=id&asc_order=false&page=${page}&page_size=${page_size}&name=${encodeURI(name)}`,
                method: "GET",
                headers: {
                    Authorization: authorization
                }
            });
        } else {
            for (let prop in obj) {
                if (typeof +obj[prop] === "number" && +obj[prop] > 0) {
                    if (queryString.length > 1) {
                        queryString += `&${prop}=${obj[prop]}`
                    } else {
                        queryString += `${prop}=${obj[prop]}`
                    }
                }
            }
            result = await axios({
                url: `${local}/product/list?sort_by=id&asc_order=false&page=${page}&page_size=${page_size}${queryString}`,
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

const getProductSubLocation = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let { page, page_size, location_id } = req.query;
        const result = await axios({
            url: `${local}/product/sublocation/list?page=${page}&page_size=${page_size}&location_id=${location_id}`,
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
}

const getProductType = async (req, res) => {
    try {
        let { headers: { authorization } } = req;
        let { page, page_size, name , type_ID, sub_location_ID} = req.query;
        let result;
        if(name && name !== ""){
            result = await axios({
                url: `${local}/product/optionattribute/list?page_size=1000&page=1&sort_by=id&order=desc&name=${encodeURI(name)}`,
                method: "GET",
                headers: {
                    Authorization: authorization
                }
            });
        } else if(type_ID && type_ID !== "undefined" && sub_location_ID && sub_location_ID !== "undefined" ) {
            result = await axios({
                url: `${local}/product/optionattribute/list?page_size=${page_size}&page=${page}&sort_by=id&order=desc&type_ID=${type_ID}&sub_location_ID=${sub_location_ID}`,
                method: "GET",
                headers: {
                    Authorization: authorization
                }
            });
        } else {
            result = await axios({
                url: `${local}/product/optionattribute/list?page_size=${page_size}&page=${page}&sort_by=id&order=desc`,
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
            url: `${local}/product/optionattribute/create`,
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
            url: `${local}/product/optionattribute/disable?id=${attribute_id}`,
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
            url: `${local}/product/optionattribute/update?id=${attribute_id}`,
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
        if(error?.response?.data){
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
};

const deleteProductSpecial = async (req, res)=>{
    try {
        let {headers: {authorization}} = req;
        let {id} = req.query;
        const result = await axios({
            url: `${local}/productspecial-discount/disable?id=${id}`,
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

const getProductSpecialForClient = async (req, res)=>{
    try {
        let {headers: {authorization}} = req;
        let {product_ID, client_type_ID} = req.query;
        const result = await axios({
            url: `${local}/product/special-discount?product_ID=${product_ID}&client_type_ID=${client_type_ID}`,
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
}

const updateProduct = async (req, res)=>{
    try {
        let {headers: {authorization}} = req;
        let {product_name, code_indentify, id, price_include_VAT} = req.body;
        let product = {
            "name": product_name,
            "code_indentify": code_indentify,
            price_include_VAT
        };
        // let newPrice = {
        //     "product_ID": id,
        //     "price": price,
        // };
        // const resultPrice = await axios({
        //     url: `${local}/product/price/create/`,
        //     method: "POST",
        //     headers: {
        //         Authorization: authorization
        //     },
        //     data: newPrice
        // });
        const resultProduct = await axios({
            url: `${local}/product/item/update?product_id=${id}`,
            method: "PUT",
            headers: {
                Authorization: authorization
            },
            data: product
        });
        res.send(["Success", resultProduct.data])
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
    createProductSpecial,
    getProductSpecialForClient,
    updateProduct,
    deleteProductSpecial,
    getProductSubLocation,
    getProductListContract
}