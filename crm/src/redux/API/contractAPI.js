import axios from "axios"
import moment from "moment";
import { local, TOKEN } from "../../title/title";

export async function getContractListAPI(page, pageNumber, status, search) {
    try {
        let result;
        if (search) {
            let newSearchData = { ...search }
            let queryString = "&";
            for (let prop in search) {
                if (typeof search[prop] === "string" && search[prop].length > 0) {
                    if (queryString.length > 1) {
                        queryString += `&${prop}=${search[prop]}`
                    } else {
                        queryString += `${prop}=${search[prop]}`
                    }
                }
            }
            result = await axios({
                url: `${local}/api/contract/list?page_size=${pageNumber}&page=${page}&sort_by=id&order=desc&search=true${queryString}`,
                method: "GET",
                headers: {
                    Authorization: "Bearer " + TOKEN
                },
                data: newSearchData
            });
        } else {
            result = await axios({
                url: `${local}/api/contract/list?page_size=${pageNumber}&page=${page}&status=${status}&sort_by=id&order=desc`,
                method: "GET",
                headers: {
                    Authorization: "Bearer " + TOKEN
                }
            });
        }
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
                custom_price: item.custom_price || null,
                details: item.details.map(detail => {
                    return {
                        ...detail,
                        product_ID: item.product_ID.id,
                    }
                })
            }
        })
        let newPayment = data.payment.map(payment => {
            let newRequestDate = moment(payment.request_date).format("YYYY-MM-DD");
            return {
                ...payment,
                total_value: payment.total_value / 1000000,
                request_date: newRequestDate
            }
        })
        data = {
            contract: {
                ...data.contract,
                begin_date: convertBeginDate,
                end_date: convertEndDate,
                total: data.contract.total / 1000000,
                discount_by_percent: data.contract.discount_by_percent,
            },
            request: [...newRequest],
            payment: [...newPayment]
        }
        const newData = { ...data }
        const result = await axios({
            url: `${local}/api/contract/create`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data: newData
        });
        // console.log(result.data)
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

export async function getOwnerListAPI(){
    try {
        const result = await axios({
            url: `${local}/api/contract/owner/list`,
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

export async function updateContractiAPI(data){
    try {
        let convertBeginDate = moment(data.begin_date).format("YYYY-MM-DD");
        let convertEndDate = moment(data.end_date).format("YYYY-MM-DD");
        let newData ={
            ...data,
            begin_date: convertBeginDate,
            end_date: convertEndDate,
            total: data.total / 1000000,
            discount_by_percent: data.discount_by_percent,
            VAT: Number(data.VAT)
        };
        const result = await axios({
            url: `${local}/api/contract/update`,
            method: "PUT",
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

export async function createRequestAPI(data){
    try {
        let newRequest = {
            "contract_ID": +data.contract_id,
            "requests": [
                {
                    "product_ID": data.product_ID,
                    "price_ID": data.price_ID,
                    "quality": data.quality,
                    "custom_price": data.custom_price / 1000000 || null,
                }
            ]
        };
        const result = await axios({
            url: `${local}/api/contract/create-request`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data: newRequest
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function deleteRequestAPI(request_id){
    try {
        const result = await axios({
            url: `${local}/api/contract/delete-request?request_id=${request_id}`,
            method: "DELETE",
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

export async function updateRequestAPI(data){
    try {
        let updateRequest = {
            "quality": data.quality,
            "custom_price": data.custom_price >= 1000000 ? data.custom_price / 1000000 : null
        };
        const result = await axios({
            url: `${local}/api/contract/update-request?request_id=${data.id}`,
            method: "PUT",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data: updateRequest
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function createDetailAPI(data){
    try {
        let newDetail = {
            "contract_ID": +data.contract_id,
            "request_ID": data.request_id,
            "details": [
                {
                    "desc": data.desc,
                    "from_date": data.from_date,
                    "to_date": data.from_date,
                    "file": data.file
                }
            ]
        };
        const result = await axios({
            url: `${local}/api/contract/detail-create`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data: newDetail
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function updateDetailAPI(data){
    try {
        let newDetail = {
            "desc": data.desc,
            "from_date": data.from_date,
            "to_date": data.from_date,
            "file": data.file
        };
        const result = await axios({
            url: `${local}/api/contract/detail-update?detail_id=${data.id}`,
            method: "PUT",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data: newDetail
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function createPaymentAPI(data){
    try {
        let newRequestDate = moment(data.request_date).format("YYYY-MM-DD");
        let newData = {
            ...data,
            request_date: newRequestDate,
            total_value: data.total_value / 1000000
        }
        const result = await axios({
            url: `${local}/api/contract/payment-add`,
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

export async function updatePaymentAPI(data){
    try {
        let newData = {
            "request_date": data.request_date,
            "desc": data.desc,
            "total_value": data.total_value,
            "detail_IDs": data.detail_IDs.map(detail => detail.id),
            id: data.id
        };
        const result = await axios({
            url: `${local}/api/contract/payment-update`,
            method: "PUT",
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

export async function getRequestOfEventAPI(event_id){
    try {
        const result = await axios({
            url: `${local}/api/event/detail/list?id=${event_id}`,
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

export async function importFileExcelAPI(data){
    try {
        const form = new FormData();
        form.append("file", data.file)
        const result = await axios({
            url: `${local}/api/contract/import-file-excel?contract_ID=${data.contract_id}`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + TOKEN,
                'Content-Type': 'multipart/form-data',
            },
            data: form
        });
        return result;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function getContractTypeAPI(data){
    try {
        let {page, page_size, search} = data;
        let result;
        if(search){
            result = await axios({
                url: `${local}/api/contract/type/get-list?page=${page}&page_size=${page_size}&search=true&name=${search}`,
                method: "GET",
                headers: {
                    Authorization: "Bearer " + TOKEN
                },
            });
        } else {
            result = await axios({
                url: `${local}/api/contract/type/get-list?page=${page}&page_size=${page_size}`,
                method: "GET",
                headers: {
                    Authorization: "Bearer " + TOKEN
                },
            });
        }
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}

export async function createContractTypeAPI(data){
    try {
        const result = await axios({
            url: `${local}/api/contract/type/create`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}

export async function updateContractTypeMiddlewareAPI(data){
    try {
        const result = await axios({
            url: `${local}/api/contract/type/update?id=${data.id}`,
            method: "PUT",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}

export async function deleteContractTypeAPI(id){
    try {
        const result = await axios({
            url: `${local}/api/contract/type/delete?id=${id}`,
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}