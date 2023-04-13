const express = require("express");
const { getCustomerList, createCustomer, searchCustomer, updateCustomer, getDetailCustomer, getCustomerTypeList, getJobTypeList } = require("../controller/customer.controller");
const { uploadFileCreateClient } = require("../middleware/upload");
const clientRouter = express.Router();

clientRouter.get("/search", searchCustomer);
clientRouter.get("/list", getCustomerList)
clientRouter.post("/create", uploadFileCreateClient(), createCustomer)
clientRouter.put("/update", updateCustomer)
clientRouter.get("/type-list", getCustomerTypeList)
clientRouter.get("/job-type-list", getJobTypeList)

clientRouter.get("/:client_id", getDetailCustomer)

module.exports = {
    clientRouter
}