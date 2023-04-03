const express = require("express");
const { getContractList, getContractTypeList, createContract, getContractDetail, uploadFileDetailResponse, getContractRequest } = require("../controller/contract.controller");
const { uploadFileDetail } = require("../middleware/upload");
const contractRouter = express.Router();

contractRouter.get("/list", getContractList)
contractRouter.post("/create", createContract)
contractRouter.get("/detail", getContractDetail)
contractRouter.get("/type/list", getContractTypeList)
contractRouter.get("/request/list", getContractRequest)
contractRouter.post("/upload/detail" , uploadFileDetail(), uploadFileDetailResponse)

module.exports = {
    contractRouter
}