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
        if(error.response?.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
}

const createCustomer = async (req, res)=>{
    try {
        const newData = {...req.body};
        newData.files = [];
        for(let file of req.files){
            newData.files.push(file.path)
        }
        let newSectors = newData.sectors.split(',');
        newData.sectors = newSectors;
        const result = await axios({
            url: `${local}/client/create`,
            method: "POST",
            data: newData
        });
        res.send(result.data);
    } catch (error) {
        console.log(error)
        if(error?.response?.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
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
        if(error.response?.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
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
        if(error.response?.data){
            res.send(error.response.data)
        } else {
            res.send(error)
        }
    }
};

const getDetailCustomer = async (req, res)=>{
    try {
        const {client_id} = req.params;
        const result = await axios({
            url: `${local}/client/list?id=${client_id}&page_size=10&sort_by=id&asc_order=true`,
            method: "GET"
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

const getCustomerTypeList = async (req, res)=>{
    try {
        let { headers: { authorization } } = req;
        let {page, page_size} = req.query;
        const result = await axios({
            url: `${local}/client/type?page_size=${page_size}&page=${page}&sort_by=id&asc_order=false`,
            method: "GET",
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
};

const createCustomerType = async (req, res)=>{
    try {
        const { TOKEN } = req.body
        const { name, desc } = req.body
        const data = { name, desc }
        const resuft = await axios({
            method: "POST",
            url: `${local}/client/type/create`,
            data: data,
            headers: {
                Authorization: `Bearer ${TOKEN}`
            },
        })
        res.send(resuft.data)
    } catch (error) {
        res.send(error)
    }
}

const getJobTypeList = async (req,res)=>{
    try {
        // console.log("Dang chay qua dau")
        const { headers: { authorization } } = req
        const { name , page , page_size, sort_by , asc_order } = req.query
        console.log({name,page,page_size});
        name ? `name=${req.query.name}` : ""
        page ? `page=${req.query.page}` : ""
        // console.log({ name , page , page_size, sort_by , asc_order })
        const resuft = await axios({
            method: "GET",
            url: `${local}/client/sector?name=${name}&page=${page}&page_size=${page_size}&sort_by=${sort_by}&asc_order=${asc_order}`,
            headers: {
                Authorization: authorization
            },
        })
        res.send(resuft.data)
    } catch (error) {
       res.send(error)
    }
}




const getListTypeCustomer = async (req,res)=>{
    try {
        const { headers: { authorization } } = req
        const { name , page , page_size, sort_by , asc_order } = req.query
        name ? `name=${req.query.name}` : ""
        page ? `page=${req.query.page}` : ""
        console.log({ name , page , page_size, sort_by , asc_order })

        const resuft =  await axios({
            // url:`${"http://contract.tuoitre.vn"}/client/type?name=${name}&page=${page}&page_size=${page_size}&sort_by=${sort_by}&asc_order=${asc_order}`,
            url:`${local}/client/type?name=${name}&page=${page}&page_size=${page_size}&sort_by=${sort_by}&asc_order=${asc_order}`,
            method: "GET",
            headers: {
                Authorization : authorization
            }
        })
        res.send(resuft.data)
    } catch (error) {
        console.log(error)
    }
}

const deleteCustomerType = async (req,res)=>{
    try {
        const { id , token } = req.body
        const resuft = await axios({
            method : "DELETE",
            url: `${local}/client/type/disable?id=${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        res.send(resuft.data)
    } catch (error) {
        res.send(error)
    }
    
}
const deleteJobType = async (req,res)=>{
    try {
        const { id, TOKEN } = req.body
        const resuft = await axios({
            method: "DELETE",
            url: `${local}/client/sector/disable?id=${id}`,
            headers: {
                Authorization: `Bearer ${TOKEN}`
            },
        })
        res.send(resuft.data);
    } catch (error) {
        res.send(error)
    }
}
const createJobType = async (req,res)=>{
    try {
        const { data , TOKEN } = req.body
        const resuft = await axios({
            method: "POST",
            url: `${local}/client/sector/create`,
            data: data,
            headers: {
                Authorization: `Bearer ${TOKEN}`
            },
        })
        res.send(resuft.data)
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    getCustomerList,
    createCustomer,
    searchCustomer,
    updateCustomer,
    getDetailCustomer,
    getCustomerTypeList,
    getJobTypeList,
    createCustomerType,
    getListTypeCustomer,
    deleteCustomerType,
    deleteJobType,
    createJobType
}