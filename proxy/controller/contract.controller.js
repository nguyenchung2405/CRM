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

module.exports = {
    getContractList
}