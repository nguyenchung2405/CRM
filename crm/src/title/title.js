import { getTokenInCookie } from "../untils/helper";

export const local = "http://192.168.169.24:87"
export const TOKEN = getTokenInCookie();

export const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const regexPhone = /(84[3|5|7|8|9]|0[3|5|7|8|9])+([0-9]{8}|[0-9]{9})\b/;

export const GET_CUSTOMER_LIST = "GET_CUSTOMER_LIST";
export const GET_PRODUCT_TYPE_LIST = "GET_PRODUCT_TYPE_LIST";
export const GET_PRODUCT_LIST = "GET_PRODUCT_LIST";
export const GET_CONTRACT_TYPE_LIST = "GET_CONTRACT_TYPE_LIST";
export const CREATE_CUSTOMER = "CREATE_CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const SEARCH_CUSTOMER = "SEARCH_CUSTOMER";
export const GET_CONTRACT_LIST = "GET_CONTRACT_LIST";
export const CREATE_CONTRACT = "CREATE_CONTRACT";