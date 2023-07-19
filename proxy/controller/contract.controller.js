const axios = require("axios");
const { local } = require("../untils/title");
const formData = require("form-data");
const fs = require("fs")

const getContractList = async (req, res) => {
    try {
        let { headers: { authorization } } = req;
        let { page, page_size, status, search, client_name, contract_type, owner_name } = req.query;
        let result;
        if(status !== "undefined" && search !== "true"){
            result = await axios({
                url: `${local}/contract/list?page_size=${page_size}&page=${page}&status=${encodeURI(status)}&sort_by=id&asc_order=false`,
                method: "GET",
                headers: {
                    Authorization: authorization
                }
            });
        } else if(search === "true"){
            let searchData = { client_name, contract_type, owner_name };
            let queryString = "&";
            for (let prop in searchData) {
                if (typeof searchData[prop] === "string" && searchData[prop].length > 0) {
                    if (queryString.length > 1) {
                        queryString += `&${prop}=${encodeURI(searchData[prop])}`
                    } else {
                        queryString += `${prop}=${encodeURI(searchData[prop])}`
                    }
                }
            }
            result = await axios({
                url: `${local}/contract/list?page_size=${page_size}&page=${page}&sort_by=id&asc_order=false${queryString}`,
                method: "GET",
                headers: {
                    Authorization: authorization
                }
            });
        } else {
            result = await axios({
                url: `${local}/contract/list?page_size=${page_size}&page=${page}&sort_by=id&asc_order=false`,
                method: "GET",
                headers: {
                    Authorization: authorization
                }
            });
        }
        res.status(result.status).send(result.data);
    } catch (error) {
        if(error.response?.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const getContractTypeList = async (req, res) => {
    try {
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/contract/type/list?page_size=100&page=1&sort_by=id&order=desc`,
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

const createContract = async (req, res) => {
    try {
        // console.log("creat contract proxy", req.body.request[0])
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/contract/create`,
            method: "POST",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if (error.response.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const getContractDetail = async (req, res) => {
    try {
        let { headers: { authorization } } = req;
        let { id } = req.query;
        const result = await axios({
            url: `${local}/contract/list?id=${id}`,
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

const uploadFileDetailResponse = async (req, res) => {
    try {
        let { file } = req;
        res.send(file.path)
    } catch (error) {
        console.log(error)
    }
};

const getContractRequest = async (req, res) => {
    try {
        let { headers: { authorization } } = req;
        let { contract_id } = req.query;
        const result = await axios({
            url: `${local}/contract/request/list?contract_id=${contract_id}&page_size=100&sort_by=id&asc_order=true`,
            method: "GET",
            headers: {
                Authorization: authorization
            }
        });
        res.send(result.data)
    } catch (error) {
        if (error.response.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const getOwnerList = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/info/communication-department-users`,
            method: "GET",
            headers: {
                Authorization: authorization
            }
        });
        res.send(result.data)
    } catch (error) {
        if (error.response.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const updateContract = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let {contract_id, ...dataContract} = req.body;
        const result = await axios({
            url: `${local}/contract/update?id=${contract_id}`,
            method: "PUT",
            headers: {
                Authorization: authorization
            },
            data: dataContract
        });
        res.send(result.data)
    } catch (error) {
        if (error?.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const createRequest = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/contract/add-request`,
            method: "POST",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if (error?.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const deleteRequest = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let {request_id} = req.query;
        const result = await axios({
            url: `${local}/contractrequest/disable?contract_request_id=${request_id}`,
            method: "DELETE",
            headers: {
                Authorization: authorization
            },
        });
        res.send(result.data)
    } catch (error) {
        if (error?.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const updateRequest = async (req,res)=>{
    try {
        let { headers: { authorization } } = req;
        let {request_id} = req.query;
        const result = await axios({
            url: `${local}/contract/request/update?id=${request_id}`,
            method: "PUT",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if (error?.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const createDetail = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/contract/add-detail`,
            method: "POST",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if (error?.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const updateDetail = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let {detail_id} = req.query;
        const result = await axios({
            url: `${local}/contract/detail/update?id=${detail_id}`,
            method: "PUT",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if (error?.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const createPayment = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/payment/add`,
            method: "POST",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if (error?.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const updatePayment= async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/payment/update?id=${req.body.id}`,
            method: "PUT",
            headers: {
                Authorization: authorization
            },
            data: req.body
        });
        res.send(result.data)
    } catch (error) {
        if (error?.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const getInforPayment = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let { id } = req.query;
        const result = await axios({
            url: `${local}/payment/list?id=${id}`,
            method: "GET",
            headers: {
                Authorization: authorization
            },
        });
        res.send(result.data)
    } catch (error) {
        if (error?.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const getFile = async (req, res)=>{
    try {
        axios.get(req.query.link,{ responseType: 'arraybuffer' })
        .then((response)=>{
            const type = response.headers['content-type']
            const link = Buffer.from(response.data,"base64url").toString("base64")
            res.send({type, link})
        })
        .catch((err)=>{
            res.status(500).send(err)
        })
    } catch (error) {
        if (error?.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const getExportFile = (req,res)=>{
    try {
        let {contract_ID} = req.query;
        let { headers: { authorization } } = req;
        axios({
            url: `${local}/contract/request/get-file?contract_ID=${contract_ID}`,
            method: "GET",
            headers: {
                Authorization: authorization,
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            },
            responseType: 'arraybuffer'
        })
        .then(response => {
            // console.log(response.data)
            res.send(response.data)
        })
        .catch(err => {
            if (err?.response?.data) {
                res.send(err.response.data)
            } else {
                res.send(err)
            }
        })
    } catch (error) {
        if (error?.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const importFileExcel = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let { contract_ID } = req.query;
        let {file} = req;
        const form = new formData();
        form.append("file", fs.readFileSync(file.path), file.originalname)
        const result = await axios({
            url: `${local}/contract/modify-requests-by-file?contract_ID=${contract_ID}`,
            method: "POST",
            headers: {
                Authorization: authorization,
                'Content-Type': 'multipart/form-data'
            },
            data: form
        });
        res.send(result.data)
    } catch (error) {
        if (error?.response?.data) {
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const getContractType = async (req, res) => {
    try {
        let { headers: { authorization } } = req;
        let {page, page_size, search, name} = req.query;
        let result;
        if(search === "true"){
            result = await axios({
                url: `${local}/contract/type/list?page_size=${page_size}&page=${page}&sort_by=id&asc_order=false&name=${encodeURI(name)}`,
                method: "GET",
                headers: {
                    Authorization: authorization
                }
            });
        } else {
            result = await axios({
                url: `${local}/contract/type/list?page_size=${page_size}&page=${page}&sort_by=id&asc_order=false`,
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

const createContractType = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        const result = await axios({
            url: `${local}/contract/type/create`,
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

const updateContractType = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let {id} = req.query;
        const result = await axios({
            url: `${local}/contract/type/update?id=${id}`,
            method: "PUT",
            headers: {
                Authorization: authorization
            },
            data: req.body
        })
        res.send(result.data)
    } catch (error) {
        if(error.response?.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const deleteContractType = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let { id } = req.query;
        const result = await axios({
            url: `${local}/contract/type/disable?id=${id}`,
            method: "DELETE",
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
    getContractList,
    getContractTypeList,
    createContract,
    getContractDetail,
    uploadFileDetailResponse,
    getContractRequest,
    getOwnerList,
    updateContract,
    createRequest,
    deleteRequest,
    updateRequest,
    createDetail,
    updateDetail,
    createPayment,
    getFile,
    updatePayment,
    getExportFile,
    importFileExcel,
    getInforPayment,
    getContractType,
    createContractType,
    updateContractType,
    deleteContractType
}