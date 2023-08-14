import moment from "moment";
import { local } from "../../title/title";
import { AxiosExpress } from "../../untils/axios";

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
            result = await AxiosExpress({
                url: `${local}/api/contract/list?page_size=${pageNumber}&page=${page}&sort_by=id&order=desc&search=true${queryString}`,
                method: "GET",
                data: newSearchData
            });
        } else {
            result = await AxiosExpress({
                url: `${local}/api/contract/list?page_size=${pageNumber}&page=${page}&status=${status}&sort_by=id&order=desc`,
                method: "GET",
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
        const result = await AxiosExpress({
            url: `${local}/api/contract/type/list?page_size=10&page=1&sort_by=id&order=desc`,
            method: "GET",
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
        const result = await AxiosExpress({
            url: `${local}/api/contract/create`,
            method: "POST",
            data: newData
        });
        // console.log(result.data)
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function getContractDetailAPI(contract_id, status) {
    try {
        if(typeof status === "string"){
            const result = await AxiosExpress({
                url: `${local}/api/contract/detail?id=${contract_id}&status=${status}`,
                method: "GET",
            });
            return result.data;
        } else {
            const result = await AxiosExpress({
                url: `${local}/api/contract/detail?id=${contract_id}`,
                method: "GET",
            });
            return result.data;
        }
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
};

export async function getContractRequestAPI(contract_id, request_done) {
    try {
        if(request_done === undefined){
            const result = await AxiosExpress({
                url: `${local}/api/contract/request/list?contract_id=${contract_id}`,
                method: "GET",
            });
            return result.data;
        } else {
            const result = await AxiosExpress({
                url: `${local}/api/contract/request/list?contract_id=${contract_id}&done=${request_done}`,
                method: "GET",
            });
            return result.data;
        }
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function getOwnerListAPI(){
    try {
        const result = await AxiosExpress({
            url: `${local}/api/contract/owner/list`,
            method: "GET",
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
        const result = await AxiosExpress({
            url: `${local}/api/contract/update`,
            method: "PUT",
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
        const result = await AxiosExpress({
            url: `${local}/api/contract/create-request`,
            method: "POST",
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
        const result = await AxiosExpress({
            url: `${local}/api/contract/delete-request?request_id=${request_id}`,
            method: "DELETE",
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
        const result = await AxiosExpress({
            url: `${local}/api/contract/update-request?request_id=${data.id}`,
            method: "PUT",
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
        const result = await AxiosExpress({
            url: `${local}/api/contract/detail-create`,
            method: "POST",
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
        const result = await AxiosExpress({
            url: `${local}/api/contract/detail-update?detail_id=${data.id}`,
            method: "PUT",
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
        const result = await AxiosExpress({
            url: `${local}/api/contract/payment-add`,
            method: "POST",
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
        const result = await AxiosExpress({
            url: `${local}/api/contract/payment-update`,
            method: "PUT",
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
        const result = await AxiosExpress({
            url: `${local}/api/event/detail/list?id=${event_id}`,
            method: "GET",
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
        const result = await AxiosExpress({
            url: `${local}/api/contract/import-file-excel?contract_ID=${data.contract_id}`,
            method: "POST",
            headers: {
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
            result = await AxiosExpress({
                url: `${local}/api/contract/type/get-list?page=${page}&page_size=${page_size}&search=true&name=${search}`,
                method: "GET",
            });
        } else {
            result = await AxiosExpress({
                url: `${local}/api/contract/type/get-list?page=${page}&page_size=${page_size}`,
                method: "GET",
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
        const result = await AxiosExpress({
            url: `${local}/api/contract/type/create`,
            method: "POST",
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
        const result = await AxiosExpress({
            url: `${local}/api/contract/type/update?id=${data.id}`,
            method: "PUT",
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
        const result = await AxiosExpress({
            url: `${local}/api/contract/type/delete?id=${id}`,
            method: "DELETE",
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}

export async function createSubContractAPI(data){
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
            ...data.contract,
            begin_date: convertBeginDate,
            end_date: convertEndDate,
            total: data.contract.total / 1000000,
            discount_by_percent: data.contract.discount_by_percent,
            requests: [...newRequest],
            payment: [...newPayment]
        }
        const newData = { ...data }
        const result = await AxiosExpress({
            url: `${local}/api/contract/create-sub`,
            method: "POST",
            data: newData
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}

export async function getDetailSubContractAPI(sub_contract_id){
    try {
        const result = await AxiosExpress({
            url: `${local}/api/contract/get-sub?sub_contract_id=${sub_contract_id}`,
            method: "GET",
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}

export async function getSubContractRequestAPI(sub_contract_id, request_done){
    try {
        if(request_done === undefined){
            const result = await AxiosExpress({
                url: `${local}/api/contract/request/sub-list?sub_contract_id=${sub_contract_id}`,
                method: "GET",
            });
            return result.data;
        } else {
            const result = await AxiosExpress({
                url: `${local}/api/contract/request/sub-list?sub_contract_id=${sub_contract_id}&done=${request_done}`,
                method: "GET",
            });
            return result.data;
        }
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}

export async function getSubContractOfMomContract(contract_id){
    try {
        const result = await AxiosExpress({
            url: `${local}/api/contract/get-sub-by-mom?contract_id=${contract_id}`,
            method: "GET"
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}

export async function createRequestSubContractAPI(data){
    try {
        let newRequest = {
            "contract_ID": +data.contract_id,
            "sub_contract_ID": +data.sub_contract_id,
            "requests": [
                {
                    "product_ID": data.product_ID,
                    "price_ID": data.price_ID,
                    "quality": data.quality,
                    "custom_price": data.custom_price / 1000000 || null,
                }
            ]
        };
        const result = await AxiosExpress({
            url: `${local}/api/contract/create-request`,
            method: "POST",
            data: newRequest
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function updateRequestSubContractAPI(data){
    try {
        let updateRequest = {
            "quality": data.quality,
            "custom_price": data.custom_price >= 1000000 ? data.custom_price / 1000000 : null
        };
        const result = await AxiosExpress({
            url: `${local}/api/contract/update-request?request_id=${data.id}`,
            method: "PUT",
            data: updateRequest
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function updateSubContractAPI(data){
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
        const result = await AxiosExpress({
            url: `${local}/api/contract/update-sub?sub_contract_id=${newData.sub_contract_id}`,
            method: "PUT",
            data: newData
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function importFileSubContractAPI(data){
    try {
        const form = new FormData();
        form.append("file", data.file)
        const result = await AxiosExpress({
            url: `${local}/api/contract/import-file-excel-sub?contract_ID=${data.contract_id}&sub_contract_ID=${data.sub_contract_id}`,
            method: "POST",
            headers: {
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

export async function completedContractAPI(contract_id){
    try {
        const result = await AxiosExpress({
            url: `${local}/api/contract/completed?contract_id=${contract_id}`,
            method: "POST",
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}