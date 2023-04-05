import axios from "axios"
import { local, TOKEN } from "../../title/title";
// import { RCS } from "../../untils/ConstantRouter";
export async function getGroupChannelAPI(page, pageNumber) {
    try {
        const result = await axios({
            url: `${local}/api/lgc`,
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
