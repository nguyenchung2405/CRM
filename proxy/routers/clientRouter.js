const express = require("express");
const { getCustomerList, deleteCustomerType, createJobType , deleteJobType , createCustomer, searchCustomer, updateCustomer, getDetailCustomer, getCustomerTypeList, getJobTypeList, createCustomerType , getListTypeCustomer} = require("../controller/customer.controller");
const { uploadFileCreateClient } = require("../middleware/upload");
const clientRouter = express.Router();

clientRouter.get("/search", searchCustomer);
clientRouter.get("/list", getCustomerList)
clientRouter.post("/create", uploadFileCreateClient(), createCustomer)
clientRouter.put("/update", updateCustomer)

clientRouter.post("/create/job-type-list",createJobType)
clientRouter.post("/job-type-list", getJobTypeList)
clientRouter.post("/delete/job-type-list", deleteJobType)
// Customer Type
// clientRouter.get("/type-list", getCustomerTypeList)
clientRouter.post("/create-type", createCustomerType)
clientRouter.post("/delete-type", deleteCustomerType)
clientRouter.get("/:client_id", getDetailCustomer)

clientRouter.post("/type/customer", getListTypeCustomer )

module.exports = {
    clientRouter
}