const express = require("express");
const { getContractList, getContractTypeList, createContract, getContractDetail, uploadFileDetailResponse, getContractRequest, getOwnerList, updateContract, createRequest, deleteRequest, updateRequest, createDetail, updateDetail } = require("../controller/contract.controller");
const { uploadFileDetail } = require("../middleware/upload");
const contractRouter = express.Router();

contractRouter.get("/list", getContractList)
contractRouter.post("/create", createContract)
contractRouter.get("/detail", getContractDetail)
contractRouter.get("/type/list", getContractTypeList)
contractRouter.get("/request/list", getContractRequest)
contractRouter.post("/upload/detail", uploadFileDetail(), uploadFileDetailResponse)
contractRouter.get("/owner/list", getOwnerList)
contractRouter.put("/update", updateContract)
// Request
contractRouter.post("/create-request", createRequest)
contractRouter.delete("/delete-request", deleteRequest)
contractRouter.put("/update-request", updateRequest)
// Detail
contractRouter.post("/detail-create", createDetail)
contractRouter.put("/detail-update", updateDetail)

module.exports = {
    contractRouter
}