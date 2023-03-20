import axios from "axios"
import moment from "moment";
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
        let convertBeginDate = moment(data.contract.begin_date).format("YYYY-MM-DD");
        let convertEndDate = moment(data.contract.end_date).format("YYYY-MM-DD");
        data = {
            contract: {
                ...data.contract, 
                begin_date: convertBeginDate, 
                end_date: convertEndDate
            }
        }
        const newData = {...data, payment: [{total_value: 100000000, desc: ""}]}
        const result = await axios({
            url: `${local}/api/contract/create`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data: newData
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function getContractDetailAPI(contract_id){
    try {
        const result = await axios({
            url: `${local}/api/contract/detail?id=${contract_id}`,
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