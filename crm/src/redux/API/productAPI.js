import axios from "axios"
import { local, TOKEN } from "../../title/title";

export async function getProductListAPI(page, pageSize, locationID, typeID, attributeID, channelID) {
    try {
        let location_id = locationID === null ? "" : locationID;
        let type_id = typeID === null ? "" : typeID;
        let attribute_id = attributeID === null ? "" : attributeID;
        let channel_id = channelID === null ? "" : channelID;
        const result = await axios({
            url: `${local}/api/product/item/list?page_size=${pageSize}&page=${page}&type_ID=${type_id}&channel_ID=${channel_id}&location_ID=${location_id}&attribute_ID=${attribute_id}`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + TOKEN
            }
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
};

export async function getProductChannelAPI(page, pageSize) {
    try {
        const result = await axios({
            url: `${local}/api/product/channel/list?page_size=${pageSize}&page=${page}`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + TOKEN
            }
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
};

export async function getProductLocationAPI(page, page_size, channelID) {
    try {
        const result = await axios({
            url: `${local}/api/product/location/list?page_size=${page_size}&page=${page}&channel_id=${channelID}`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + TOKEN
            }
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
};

export async function getProductTypeAPI(page, page_size) {
    try {
        const result = await axios({
            url: `${local}/api/product/type/list?page_size=${page_size}&page=${page}`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + TOKEN
            }
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
};

export async function getProductAttributeAPI(page, page_size) {
    try {
        const result = await axios({
            url: `${local}/api/product/attribute/list?page_size=${page_size}&page=${page}`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + TOKEN
            }
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
}
