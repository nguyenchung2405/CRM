import axios from "axios"
import { local } from "../../title/title"

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