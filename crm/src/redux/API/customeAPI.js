import axios from "axios"
import { local, TOKEN } from "../../title/title"

export async function getCustomerListAPI(page, pageNumber){
    try {
        const result = await axios({
            url: `${local}/api/client/list?page=${page}&page_size=${pageNumber}`,
            method: "GET",
        })
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function createCustomerAPI(dataCustomer){
    try {
        let {files, ...restInforClient} = dataCustomer;
        const form = new FormData();
        for(let i = 0 ; i < files.length; i++){
            form.append("files", files[i]);
        }
        for(let key in restInforClient){
            form.append(key, restInforClient[key])
        }
        const result = await axios({
            url: `${local}/api/client/create`,
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            data: form
        });
        return result.data
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function searchCustomerAPI(data){
    try {
        let {name, tax_number, brief_name} = data;
        const result = await axios({
            url: `${local}/api/client/search?name=${name}&tax_number=${tax_number}&brief_name=${brief_name}`,
            method: "GET"
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function updateCustomerAPI(data){
    try {
        let {id, ...rest} = data;
        const result = await axios({
            url: `${local}/api/client/update?id=${id}`,
            method: "PUT",
            data: rest
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
};

export async function getDetailCustomerAPI(client_id){
    try {
        const result = await axios({
            url: `${local}/api/client/${client_id}`,
            method: "GET"
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function getCustomerTypeListAPI(data){
    try {
        const resuft = await axios({
            url: `${local}/api/client/type/customer`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data: data
        })
        return resuft.data
    } catch (error) {
        console.log(error)
    }

}

export async function getJobTypeListAPI(payload){
    try {
        console.log(payload)
        const result = await axios({
            method: "GET",
            url: `${local}/api/client/job-type-list`,
            data: payload
        });
        return result.data
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}

export async function createCustomerTypeAPI(data){
    try {
        const { name, desc } = data
    const resuft =  await axios({
            method: "POST",
            url:`${local}/api/client/create-type`,
            data: {
                name,
                desc,
                TOKEN
            }
        })
    return resuft.data
    
    } catch (error) {
        console.log(error)
    }
}


export async function deleteCustomerTypeAPI(data){
    try {
        const result = await axios({
            method: "POST",
            url: `${local}/api/client/delete-type`,
            data: {
                id: data,
                token : TOKEN
            }
        })
        return result.data
    } catch (error) {
        console.log(error)
    }
}

export async function deleteJobTypeListAPI(id){
    try {
        const resuft = await axios({
            method: "POST",
            url: `${local}/api/client/delete/job-type-list`,
            data:{
                id,
                TOKEN,
            }
        })
        return resuft.data
    } catch (error) {
        console.log(error)
    }
}

export async function createJobTypeListAPI(data){
    try {
        const resuft = await axios({
            method: "POST",
            url: `${local}/api/client/create/job-type-list`,
            data:{
                TOKEN,
                data
            }
        })
        return resuft.data
    } catch (error) {
        console.log(error)
    }
}