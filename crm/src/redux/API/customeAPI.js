import axios from "axios"
import { local, TOKEN } from "../../title/title"

export async function getCustomerListAPI(page, pageNumber){
    try {
        const result = await axios({
            url: `${local}/api/client/list?page=${page}&page_size=${pageNumber}`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
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
        for(let i = 0 ; i < files?.length; i++){
            form.append("files", files[i]);
        }
        for(let key in restInforClient){
            form.append(key, restInforClient[key])
        }
        const result = await axios({
            url: `${local}/api/client/create`,
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + TOKEN
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
            method: "GET",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
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
            headers: {
                Authorization: "Bearer " + TOKEN
            },
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
            method: "GET",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function getCustomerTypeListAPI(data){
    try {
        const { page , page_size , name , sort_by , asc_order } = data
        const resuft = await axios({
            url: `${local}/api/client/type/customer?name=${name}&page=${page}&page_size=${page_size}&sort_by=${sort_by}&asc_order=${asc_order}`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
        })
        
        return resuft.data
    } catch (error) {
        console.log(error)
    }

}

export async function getJobTypeListAPI(data){
    try {
        const { page , page_size , name , sort_by , asc_order } = data
        // console.log({page , page_size , name , sort_by , asc_order});
        const result = await axios({
            method: "POST",
            url: `${local}/api/client/job-type-list?name=${name}&page=${page}&page_size=${page_size}&sort_by=${sort_by}&asc_order=${asc_order}`,
            headers: {
                Authorization: "Bearer " + TOKEN
            },
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


export async function updateCustomerTypeAPI(data){
    try {
        const { name , id } = data
        const resufts = await axios({
            method: "PUT",
            url: `${local}/api/client/update/customer-type-list`,
            data: {
                name,
                id,
                TOKEN
            }
        })
        return resufts.data
    } catch (error) {
        console.log(error);
    }
}

export async function updateJobTypeAPI(data){
    try {
        const result = await axios({
            method: "PUT",
            url: `${local}/api/client/update/job-type-list`,
            data: { 
                ...data,
                token: TOKEN
            }
        })
        return result.data
    } catch (error) {
        console.log(error);
    }
}