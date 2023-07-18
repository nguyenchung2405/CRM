const express = require("express");
const { getCustomerList, deleteCustomerType, updateJobType ,updateCustomerType ,createJobType , deleteJobType , createCustomer, searchCustomer, updateCustomer, getDetailCustomer, getCustomerTypeList, getJobTypeList, createCustomerType , getListTypeCustomer} = require("../controller/customer.controller");
const { uploadResourceClientToServer } = require("../middleware/client.middleware");
const { uploadFileCreateClient, uploadFileUpdateClient } = require("../middleware/upload");
const clientRouter = express.Router();

clientRouter.get("/search", searchCustomer);
clientRouter.get("/list", getCustomerList)
clientRouter.post("/create", uploadFileCreateClient(), createCustomer)
// clientRouter.post("/create", uploadFileCreateClient(), uploadResourceClientToServer, createCustomer)
clientRouter.put("/update", uploadFileUpdateClient().array("filesUpdate", 10), updateCustomer)

clientRouter.post("/create/job-type-list",createJobType)
clientRouter.post("/job-type-list", getJobTypeList)
clientRouter.post("/delete/job-type-list", deleteJobType)
clientRouter.put("/update/job-type-list",updateJobType)
// Customer Type
// clientRouter.get("/type-list", getCustomerTypeList)
clientRouter.post("/create-type", createCustomerType)
clientRouter.post("/delete-type", deleteCustomerType)
clientRouter.get("/:client_id", getDetailCustomer)
clientRouter.put("/update/customer-type-list", updateCustomerType)


clientRouter.get("/type/customer", getListTypeCustomer )

module.exports = {
    clientRouter
}