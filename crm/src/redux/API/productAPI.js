import axios from "axios"
import { local, TOKEN } from "../../title/title";
import { v1 as uuidv1, v3, v4, v5 } from "uuid"

export async function getProductListAPI(page, pageSize, locationID, typeID, attributeID) {
    try {
        let location_id = locationID === null ? "" : locationID;
        let type_id = typeID === null ? "" : typeID;
        let attribute_id = attributeID === null ? "" : attributeID;
        const result = await axios({
            url: `${local}/api/product/item/list?page_size=${pageSize}&page=${page}&type_ID=${type_id}&location_ID=${location_id}&attribute_ID=${attribute_id}`,
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

export async function getProductTypeAPI(page, page_size, locationID) {
    try {
        const result = await axios({
            url: `${local}/api/product/type/list?page_size=${page_size}&page=${page}&location_ID=${locationID}`,
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

export async function getProductAttributeAPI(page, page_size, locationID, typeID) {
    try {
        const result = await axios({
            url: `${local}/api/product/attribute/list?page_size=${page_size}&page=${page}&type_ID=${typeID}&location_ID=${locationID}`,
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

export async function createProductTypeAPI(data){
    try {
        const result = await axios({
            url: `${local}/api/product/type/create`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
};

export async function deleteProductTypeAPI(type_id){
    try {
        const result = await axios({
            url: `${local}/api/product/type/delete?type_id=${type_id}`,
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
}

export async function updateProductTypeAPI(data){
    try {
        const result = await axios({
            url: `${local}/api/product/type/update?type_id=${data.id}`,
            method: "PUT",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
}

export async function searchProductTypeAPI(data){
    try {
        const result = await axios({
            url: `${local}/api/product/type/list?name=${data}`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
}

export async function createProductAttributeAPI(data){
    try {
        const result = await axios({
            url: `${local}/api/product/attribute/create`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
};

export async function deleteProductAttributeAPI(attribute_id){
    try {
        const result = await axios({
            url: `${local}/api/product/attribute/delete?attribute_id=${attribute_id}`,
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

export async function updateProductAttributeAPI(data){
    try {
        const result = await axios({
            url: `${local}/api/product/attribute/update?attribute_id=${data.id}`,
            method: "PUT",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
}

export async function searchProductAttributeAPI(data){
    try {
        const result = await axios({
            url: `${local}/api/product/attribute/list?name=${data}`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
}

export async function getProductSpecialListAPI(page, page_size){
    try {
        const result = await axios({
            url: `${local}/api/product/special-discount?page_size=${page_size}&page=${page}`,
            method: "GET",
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

export async function createProductSpecialAPI(data){
    try {
        let newProduct = {
            ...data,
            discounted_price: data.discounted_price / 1000000
        }
        const result = await axios({
            url: `${local}/api/product/special-discount/create`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data: newProduct
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
}

export async function getProductSpecialForClientAPI(data){
    try {
        const result = await axios({
            url: `${local}/api/product/special-discount-client?product_ID=${data.product_ID}&client_type_ID=${data.client_type_ID}`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Thât bại"
    }
}