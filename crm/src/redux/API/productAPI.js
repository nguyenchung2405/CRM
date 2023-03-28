import axios from "axios"
import { local, TOKEN } from "../../title/title";

export async function getProductListAPI(page, pageSize){
    try {
        const result = await axios({
            url: `${local}/api/product/item/list?page_size=${pageSize}&page=${page}&sort_by=id&order=desc`,
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