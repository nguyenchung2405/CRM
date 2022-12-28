const express = require("express");
const { getContractList, getContractTypeList, createContract } = require("../controller/contract.controller");
const contractRouter = express.Router();

contractRouter.get("/list", getContractList)
contractRouter.post("/create", createContract)
contractRouter.get("/type/list", getContractTypeList)

module.exports = {
    contractRouter
}