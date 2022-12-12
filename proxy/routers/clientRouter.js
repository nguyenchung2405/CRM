const express = require("express");
const { getCustomerList, createCustomer, searchCustomer } = require("../controller/customer.controller");
const clientRouter = express.Router();

clientRouter.get("/search", searchCustomer);
clientRouter.get("/list", getCustomerList)
clientRouter.post("/create", createCustomer)

module.exports = {
    clientRouter
}