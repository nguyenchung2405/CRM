const express = require("express");
const { getContractList, getContractTypeList, createContract, getContractDetail } = require("../controller/contract.controller");
const contractRouter = express.Router();

contractRouter.get("/list", getContractList)
contractRouter.post("/create", createContract)
contractRouter.get("/detail", getContractDetail)
contractRouter.get("/type/list", getContractTypeList)

module.exports = {
    contractRouter
}