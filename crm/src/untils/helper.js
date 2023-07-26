import docCookie from "doc-cookies"
import moment from "moment"

export let getTokenInCookie = () => {
    try {
        let tokenCookie = docCookie.getItem("usertoken")
        if (!tokenCookie) {
            // window.location.replace("/")
            return
        }
        // console.log(tokenCookie);
        return tokenCookie
    } catch (error) {
        console.log(error)
    }
}

export function convertDate(dateString) {
    try {
        let convert;
        if (dateString.includes(".000Z")) {
            convert = moment(new Date(dateString)).format("DD-MM-YYYY");
        } else {
            convert = moment(new Date(dateString.concat(".000Z"))).format("DD-MM-YYYY");
        }
        return convert;
    } catch (error) {
        console.log(error)
    }
}

export let checkMicroFe = () => {
    if (window.location.href.includes("3002") || window.location.href.includes("localhost") || window.location.href.includes("3003") || window.location.href.includes("crmservice")) {
        return false;
    } else {
        return true;
    }
}
