import axios from "axios"
import { local, TOKEN } from "../../title/title";
import { v1 as uuidv1, v3, v4, v5 } from "uuid"

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

export async function createProduceAPI(data) {
    try {
        let product = {
            "name": data.product_name,
            "location_ID": data.location_id,
            "type_ID": data.type_id,
            "attribute_ID": data.attribute_id,
            "code_indentify": uuidv1().slice(0, 10),
            "price": {
                "price": +data.price / 1000000,
            }
        };
        const result = await axios({
            url: `${local}/api/product/create`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data: product
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
};

export async function deleteProductAPI(product_id) {
    try {
        const result = await axios({
            url: `${local}/api/product/delete?product_id=${product_id}`,
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
};
