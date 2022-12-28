import axios from "axios"
import { local, TOKEN } from "../../title/title";

export async function getContractListAPI(page, pageNumber){
    try {
        const result = await axios({
            url: `${local}/api/contract/list?page_size=${pageNumber}&page=${page}&sort_by=id&order=desc`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + TOKEN
            }
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function getContractTypeListAPI(){
    try {
        const result = await axios({
            url: `${local}/api/contract/type/list?page_size=10&page=1&sort_by=id&order=desc`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + TOKEN
            }
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
};

export async function createContractAPI(data){
    try {
        const result = await axios({
            url: `${local}/api/contract/create`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}