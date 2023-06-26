import axios from "axios"
import { local, TOKEN } from "../../title/title";
// import { RCS } from "../../untils/ConstantRouter";
export async function getGroupChannelAPI(page, pageNumber, name, location_name) {
    try {
        const result = await axios({
            url: `${local}/api/lgc?name=${name}&location_name=${location_name}`,
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

export async function updateGroupSubChannelAPI(data){
    try {
        const resuft = await axios({
            url: `${local}/api/usubg`,
            method: "PUT",
            data: data,
            headers: {
                Authorization: "Bearer " + TOKEN
            }
        })
        return resuft.data
    } catch (error) {
        console.log(error);
    }
}

export async function deleteGroupSubChannelAPI(id){
    try {
        const resuft = await axios({
            url: `${local}/api/dsubg`,
            method: "PUT",
            data: id ,
            headers: {
                Authorization: "Bearer " + TOKEN
            }
        })
        return resuft.data;
    } catch (error) {
        console.log(error);
    }
}

export async function createGroupSubChannelAPI(data){
    try {
        const resuft = await axios({
            url: `${local}/api/csubg`,
            method: "POST",
            data: data,
            headers: {
                Authorization: "Bearer " + TOKEN
            }
        })
        return resuft.data
    } catch (error) {
        console.log(error);
    }
}

export async function getGroupSubChannelAPI(data){
    try {
        const { location_id } = data
        console.log({location_id});
        const resuft = await axios({
            url: `${local}/api/gsubg?location_id=${location_id}`,
            method: "GET",
            data: data,
            headers: {
                Authorization: "Bearer " + TOKEN
            }
        })
        return resuft.data
    } catch (error) {
        console.log(error);
    }


}