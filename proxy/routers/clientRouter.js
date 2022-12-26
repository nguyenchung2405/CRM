const express = require("express");
const { getCustomerList, createCustomer, searchCustomer, updateCustomer } = require("../controller/customer.controller");
const clientRouter = express.Router();

clientRouter.get("/search", searchCustomer);
clientRouter.get("/list", getCustomerList)
clientRouter.post("/create", createCustomer)
clientRouter.put("/update", updateCustomer)

module.exports = {
    clientRouter
}