import moment from "moment";
import { local } from "../../title/title";
import { AxiosExpress } from "../../untils/axios";

export async function getEventListAPI(payload){
    try {
        const result = await AxiosExpress({
            url: `${local}/api/event/list?page_size=${payload.pageNumber}&page=${payload.page}`,
            method: "GET",
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
};

export async function createEventAPI(data){
    try {
        let convertBeginDate = moment(data.event.from_date).format("YYYY-MM-DD");
        let convertEndDate = moment(data.event.to_date).format("YYYY-MM-DD");
        let newRequest = data.details.map(item => {
            return {
                ...item,
                product_ID: item.product_ID,
                quantity: item.quality
            }
        })
        data = {
            event: {
                ...data.event,
                from_date: convertBeginDate,
                to_date: convertEndDate,
                value_event: data.event.value_event / 1000000
            },
            details: [...newRequest],
        };
        let newData = {...data}
        const result = await AxiosExpress({
            url: `${local}/api/event/create`,
            method: "POST",
            data: newData
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
};

export async function getEventInforAPI(event_id){
    try {
        const result = await AxiosExpress({
            url: `${local}/api/event/detail/list?id=${event_id}`,
            method: "GET",
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
};

export async function updateEventAPI(data){
    try {
        let convertBeginDate = moment(data.from_date).format("YYYY-MM-DD");
        let convertEndDate = moment(data.to_date).format("YYYY-MM-DD");
        let newData = {
            ...data,
            from_date: convertBeginDate,
            to_date: convertEndDate,
            value_event: data.value_event / 1000000
        }
        const result = await AxiosExpress({
            url: `${local}/api/event/update`,
            method: "PUT",
            data: newData
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
};

export async function createRequestAPI(data){
    try {
        let newData = {
            ...data,
            "event_ID": +data.event_ID,
            "details": [
                {
                    "product_ID": data.product_ID,
                    "quantity": data.quality
                }
            ],
        };
        const result = await AxiosExpress({
            url: `${local}/api/event/create-request`,
            method: "POST",
            data: newData
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
};

export async function deleteRequestAPI(request_id){
    try {
        const result = await AxiosExpress({
            url: `${local}/api/event/delete-request?id=${request_id}`,
            method: "DELETE",
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
};

export async function searchEventAPI(data){
    try {
        const result = await AxiosExpress({
            url: `${local}/api/event/search?name=${data}`,
            method: "GET",
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}

export async function getUnsetContractAPI(){
    try {
        const result = await AxiosExpress({
            url: `${local}/api/event/unset_contract`,
            method: "GET",
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}

export async function addUnserContractToEventAPI(data){
    try {
        const result = await AxiosExpress({
            url: `${local}/api/event/add-unset-contract`,
            method: "PUT",
            data
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}

export async function updateRequestEventAPI(data){
    try {
        let newData ={
            ...data,
            quantity: data.quality,
            value_detail: data.real_price / 1000000,
            desc: ""
        }
        const result = await AxiosExpress({
            url: `${local}/api/event/update-request?id=${data.id}`,
            method: "PUT",
            data: newData
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}

export async function getEventRequestListAPI(event_id){
    try {
        const result = await AxiosExpress({
            url: `${local}/api/event/request-list?id=${event_id}`,
            method: "GET",
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}

export async function getEventRequestContractListAPI(event_id, detail_id){
    try {
        const result = await AxiosExpress({
            url: `${local}/api/event/request-contract?event_id=${event_id}&detail_id=${detail_id}`,
            method: "GET",
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}