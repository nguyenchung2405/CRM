import axios from "axios"
import { local } from "../../title/title"

export async function getCustomerListAPI(){
    try {
        const result = await axios({
            url: `${local}/api/client/list`,
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
        const result = await axios({
            url: `${local}/api/client/create`,
            method: "POST",
            data: dataCustomer
        });
        return result.data
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function searchCustomerAPI(data){
    try {
        let {name, tax_number} = data;
        const result = await axios({
            url: `${local}/api/client/search?name=${name}&tax_number=${tax_number}`,
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