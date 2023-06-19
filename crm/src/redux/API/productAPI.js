import axios from "axios"
import { local, TOKEN } from "../../title/title";
import { v1 as uuidv1 } from "uuid"

export async function getProductListAPI(page, pageSize, subLocationID, typeID, attributeID) {
    try {
        let sub_location_ID = subLocationID === null ? "" : subLocationID;
        let type_id = typeID === null ? "" : typeID;
        let attribute_id = attributeID === null ? "" : attributeID;
        const result = await axios({
            url: `${local}/api/product/item/list?page_size=${pageSize}&page=${page}&type_ID=${type_id}&sub_location_ID=${sub_location_ID}&attribute_ID=${attribute_id}`,
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

export async function getProductSubLocationAPI(page, page_size, locationID){
    try {
        const result = await axios({
            url: `${local}/api/product/sublocation/list?page=${page}&page_size=${page_size}&location_id=${locationID}`,
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

export async function getProductTypeAPI(page, page_size, subLocationID) {
    try {
        const result = await axios({
            url: `${local}/api/product/type/list?page_size=${page_size}&page=${page}&sub_location_ID=${subLocationID}`,
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

export async function getProductAttributeAPI(page, page_size, typeID) {
    try {
        const result = await axios({
            url: `${local}/api/product/attribute/list?page_size=${page_size}&page=${page}&type_ID=${typeID}`,
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
        console.log(data)
        let product = {
            "name": data.product_name,
            "location_ID": data.location_id,
            sub_location_ID: data.sub_location_ID,
            "type_ID": data.type_id,
            "attribute_option_ID": data.attribute_option_id,
            "code_indentify": uuidv1().slice(0, 10),
            "price": {
                "price": +data.price / 1000000,
            }
        };
        console.log("product", product)
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

export async function updateProductAPI(data){
    try {
        let product = {
           ...data,
            "price": +data.price / 1000000,
            "code_indentify": uuidv1().slice(0, 10),
        };
        const result = await axios({
            url: `${local}/api/product/update`,
            method: "PUT",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data: product
        });
        return result.data;
    } catch (error) {
        console.log(error)
        return "Fail"
    }
}

export async function deleteProductSpecialAPI(product_special_id){
    try {
        const result = await axios({
            url: `${local}/api/product/special-discount/delete?id=${product_special_id}`,
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