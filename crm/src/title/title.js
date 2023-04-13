import { checkMicroFe, getTokenInCookie } from "../untils/helper";

export const local = checkMicroFe() === true ?
    window.location.href.includes("staging")
        ? "https://crmservice-staging.tuoitre.vn"
        : "https://crmservice-dev.tuoitre.vn"
    : ""

// export const TOKEN = getTokenInCookie();
export const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJwYXJ0X2lkIjoxLCJwb3NpdGlvbl9pZCI6MSwiZXhwaXJlcyI6MTY4MDY2ODk1MC4xNTM4OTJ9.0KojOXS_Iv7nhW_zv2dOQzL-i3harT6oVzCV7wB5b74";

export const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const regexPhone = /(84[3|5|7|8|9]|0[3|5|7|8|9])+([0-9]{8}|[0-9]{9})\b/;

export const GET_CUSTOMER_LIST = "GET_CUSTOMER_LIST";
export const GET_CUSTOMER_TYPE_LIST = "GET_CUSTOMER_TYPE_LIST";
export const CREATE_CUSTOMER_TYPE = "CREATE_CUSTOMER_TYPE";
export const GET_JOB_TYPE_LIST = "GET_JOB_TYPE_LIST";
export const GET_CUSTOMER_DETAIL = "GET_CUSTOMER_DETAIL";
export const CREATE_CUSTOMER = "CREATE_CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const SEARCH_CUSTOMER = "SEARCH_CUSTOMER";
export const GET_CONTRACT_LIST = "GET_CONTRACT_LIST";
export const CREATE_CONTRACT = "CREATE_CONTRACT";
export const GET_PRODUCT_LIST = "GET_PRODUCT_LIST";
export const GET_CONTRACT_TYPE_LIST = "GET_CONTRACT_TYPE_LIST";
export const GET_CONTRACT_DETAIL = "GET_CONTRACT_DETAIL";
export const UPDATE_CONTRACT = "UPDATE_CONTRACT";
export const GET_PRODUCT_CHANNEL = "GET_PRODUCT_CHANNEL";
export const GET_PRODUCT_LOCATION = "GET_PRODUCT_LOCATION";
export const GET_PRODUCT_TYPE = "GET_PRODUCT_TYPE";
export const GET_PRODUCT_ATTRIBUTE = "GET_PRODUCT_ATTRIBUTE";
export const GET_PRODUCT_SPECIAL = "GET_PRODUCT_SPECIAL";
export const CREATE_PRODUCT_SPECIAL = "CREATE_PRODUCT_SPECIAL";
export const GET_GROUP_CHANNEL = "GET_GROUP_CHANNEL"
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT_TYPE = "CREATE_PRODUCT_TYPE";
export const UPDATE_PRODUCT_TYPE = "UPDATE_PRODUCT_TYPE";
export const DELETE_PRODUCT_TYPE = "DELETE_PRODUCT_TYPE";
export const SEARCH_PRODUCT_TYPE = "SEARCH_PRODUCT_TYPE";
export const CREATE_PRODUCT_ATTRIBUTE = "CREATE_PRODUCT_ATTRIBUTE";
export const UPDATE_PRODUCT_ATTRIBUTE = "UPDATE_PRODUCT_ATTRIBUTE";
export const DELETE_PRODUCT_ATTRIBUTE = "DELETE_PRODUCT_ATTRIBUTE";
export const SEARCH_PRODUCT_ATTRIBUTE = "SEARCH_PRODUCT_ATTRIBUTE";
export const GET_OWNER_LIST = "GET_OWNER_LIST";
export const CREATE_REQUEST = "CREATE_REQUEST";
export const DELETE_REQUEST = "DELETE_REQUEST";
export const UPDATE_REQUEST = "UPDATE_REQUEST";
export const CREATE_DETAIL = "CREATE_DETAIL";
export const UPDATE_DETAIL = "UPDATE_DETAIL";