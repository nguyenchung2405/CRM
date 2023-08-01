import moment from "moment";
import { local } from "../../title/title";
import { AxiosExpress } from "../../untils/axios";

export async function createAcceptanceAPI(data){
    try {
        // console.log("createAcceptanceAPI", data)
        const formAcceptance = new FormData();
        let {files, ...rest} = data;
        if(files?.length > 0){
            for(let i = 0 ; i < files.length; i++){
                formAcceptance.append("files", files[i]);
            }
        }
        for(let key in rest){
            if(key === "report_date" || key === "from_date"){
                let newReportDate = moment(new Date(rest[key])).format("YYYY-MM-DD")
                formAcceptance.append(key, newReportDate)
            } else {
                formAcceptance.append(key, rest[key])
            }
        }
        if(!rest.to_date){
            let newToDate = moment(new Date(rest["from_date"])).format("YYYY-MM-DD")
            formAcceptance.append("to_date", newToDate)
        }
        const result = await AxiosExpress({
            url: `${local}/api/acceptance/create`,
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formAcceptance
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
};

export async function updateAcceptanceAPI(data){
    try {
        const formAcceptance = new FormData();
        let {files, ...rest} = data;
        if(files?.length > 0){
            for(let i = 0 ; i < files.length; i++){
                formAcceptance.append("files", files[i]);
            }
        }
        for(let key in rest){
            if(key === "report_date" || key === "from_date"){
                let newReportDate = moment(new Date(rest[key])).format("YYYY-MM-DD")
                formAcceptance.append(key, newReportDate)
            } else {
                formAcceptance.append(key, rest[key])
            }
        }
        if(!rest.to_date){
            let newToDate = moment(new Date(rest["from_date"])).format("YYYY-MM-DD")
            formAcceptance.append("to_date", newToDate)
        }
        for (const pair of formAcceptance.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
          }
        const result = await AxiosExpress({
            url: `${local}/api/acceptance/update`,
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formAcceptance
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}

export async function createEventAcceptanceAPI(data){
    try {
        // console.log("createAcceptanceAPI", data)
        const formAcceptance = new FormData();
        let {files, ...rest} = data;
        if(files?.length > 0){
            for(let i = 0 ; i < files.length; i++){
                formAcceptance.append("files", files[i]);
            }
        }
        for(let key in rest){
            if(key === "report_date"){
                let newReportDate = moment(new Date(rest[key])).format("YYYY-MM-DD")
                formAcceptance.append(key, newReportDate)
            } else {
                formAcceptance.append(key, rest[key])
            }
        }
        const result = await AxiosExpress({
            url: `${local}/api/acceptance/event-create`,
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formAcceptance
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function createDetailInAcceptanceAPI(data){
    try {
        let {desc, contract_id,request_id, from_date, ...rest} = data;
        let file = data?.fileDetail;
        const formDetail = new FormData();
        let newFromDate = moment(new Date(from_date)).format("YYYY-MM-DD");
        formDetail.append("fileDetail", file)
        formDetail.append("desc", desc)
        formDetail.append("contract_id", contract_id)
        formDetail.append("request_id", request_id)
        formDetail.append("from_date", newFromDate)
        const result = await AxiosExpress({
            url: `${local}/api/acceptance/detail-create`,
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formDetail
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function createDetailInEventAcceptanceAPI(data){
    try {
        // console.log("data", data)
        let {detail_id, desc, from_date, ...rest} = data;
        let file = data?.fileDetail;
        const formDetail = new FormData();
        let newFromDate = moment(new Date(from_date)).format("YYYY-MM-DD");
        formDetail.append("event_detail_ID", detail_id)
        formDetail.append("desc", desc)
        formDetail.append("from_date", newFromDate)
        formDetail.append("fileDetail", file)
        const result = await AxiosExpress({
            url: `${local}/api/acceptance/event-detail-create`,
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formDetail
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function getAcceptanceContractListAPI(page, pageNumber){
    try {
        const result = await AxiosExpress({
            url: `${local}/api/acceptance/request-list?page=${page}&page_size=${pageNumber}`,
            method: "GET",
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}

export async function getAcceptanceEventListAPI(page, pageNumber){
    try {
        const result = await AxiosExpress({
            url: `${local}/api/acceptance/event-list?page=${page}&page_size=${pageNumber}`,
            method: "GET",
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thất bại"
    }
}