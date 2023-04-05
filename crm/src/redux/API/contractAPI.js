import axios from "axios"
import moment from "moment";
import { local, TOKEN } from "../../title/title";

export async function getContractListAPI(page, pageNumber) {
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

export async function getContractTypeListAPI() {
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

export async function createContractAPI(data) {
    try {
        let convertBeginDate = moment(data.contract.begin_date).format("YYYY-MM-DD");
        let convertEndDate = moment(data.contract.end_date).format("YYYY-MM-DD");
        let newRequest = data.request.map(item => {
            return {
                ...item,
                price_ID: item.price_ID.id,
                product_ID: item.product_ID.id,
                details: item.details.map(detail => {
                    return {
                        ...detail,
                        product_ID: item.product_ID.id,
                    }
                })
            }
        })
        data = {
            contract: {
                ...data.contract,
                begin_date: convertBeginDate,
                end_date: convertEndDate
            },
            request: [...newRequest]
        }
        const newData = { ...data, payment: [{ total_value: 100000000 }] }
        console.log(newData)
        const result = await axios({
            url: `${local}/api/contract/create`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data: newData
        });
        console.log(result.data)
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function getContractDetailAPI(contract_id) {
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

export async function getContractRequestAPI(contract_id) {
    try {
        const result = await axios({
            url: `${local}/api/contract/request/list?contract_id=${contract_id}`,
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