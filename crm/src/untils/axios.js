import axios from "axios";
import { TOKEN } from "../title/title";
import jwt_decode from "jwt-decode"
import doc_cookie from "doc-cookies"

const AxiosExpress = axios.create();

AxiosExpress.interceptors.request.use(
    async config => {
        if(TOKEN !== undefined){
            if (Date.now() / 1000 >= jwt_decode(TOKEN).exp) {
                // Token hết hạn
                // console.log("hết hạn")
                window.location.replace("/")
                doc_cookie.removeItem("usertoken", "/")
            } else {
                // vẫn còn hạn
                // console.log("còn hạn")
                config.headers = {
                    'Authorization': "Bearer " + TOKEN,
                }
                return config
            }
        } else {
            window.location.replace("/")
        }
    },
    error => {
        Promise.reject(error)
    }
)

export { AxiosExpress }