const express = require("express");
const { getContractList } = require("../controller/contract.controller");
const contractRouter = express.Router();

contractRouter.get("/list", getContractList)

module.exports = {
    contractRouter
}