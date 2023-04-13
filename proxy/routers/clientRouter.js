const express = require("express");
const { getCustomerList, createCustomer, searchCustomer, updateCustomer, getDetailCustomer, getCustomerTypeList, getJobTypeList, createCustomerType } = require("../controller/customer.controller");
const { uploadFileCreateClient } = require("../middleware/upload");
const clientRouter = express.Router();

clientRouter.get("/search", searchCustomer);
clientRouter.get("/list", getCustomerList)
clientRouter.post("/create", uploadFileCreateClient(), createCustomer)
clientRouter.put("/update", updateCustomer)
clientRouter.get("/job-type-list", getJobTypeList)
// Customer Type
clientRouter.get("/type-list", getCustomerTypeList)
clientRouter.post("/create-type", createCustomerType)

clientRouter.get("/:client_id", getDetailCustomer)

module.exports = {
    clientRouter
}