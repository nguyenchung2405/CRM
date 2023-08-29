const express = require("express");
const { getContractList, getContractTypeList, createContract, getContractDetail, uploadFileDetailResponse, getContractRequest, getOwnerList, updateContract, createRequest, deleteRequest, updateRequest, createDetail, updateDetail, createPayment, getFile, updatePayment, getExportFile, importFileExcel, getInforPayment, getContractType, createContractType, updateContractType, deleteContractType, createSubContract, getDetailSubContract, getSubContractRequest, getSubContractByMomContract, updateSubContract, importFileExcelSubContract, completedContract, deleteDetail } = require("../controller/contract.controller");
const { uploadFileDetail, uploadFileExcelContract, uploadFilesContract } = require("../middleware/upload");
const contractRouter = express.Router();

contractRouter.get("/list", getContractList)
contractRouter.post("/create", createContract)
contractRouter.get("/detail", getContractDetail)
contractRouter.get("/type/list", getContractTypeList)
contractRouter.get("/request/list", getContractRequest)
contractRouter.post("/upload/detail", uploadFileDetail(), uploadFileDetailResponse)
contractRouter.get("/owner/list", getOwnerList)
contractRouter.put("/update", updateContract)
contractRouter.post("/completed", completedContract)
contractRouter.post("/upload-files", uploadFilesContract().array("file", 10), async (req, res)=> res.send(req.files))
// Request
contractRouter.post("/create-request", createRequest)
contractRouter.delete("/delete-request", deleteRequest)
contractRouter.put("/update-request", updateRequest)
// Detail
contractRouter.post("/detail-create", createDetail)
contractRouter.put("/detail-update", updateDetail)
contractRouter.delete("/detail-delete", deleteDetail)
// Payment
contractRouter.post("/payment-add", createPayment)
contractRouter.put("/payment-update", updatePayment)
contractRouter.get("/payment-infor", getInforPayment)
// get file, import file
contractRouter.get("/get-file", getFile)
contractRouter.get("/request-get-file", getExportFile)
contractRouter.post("/import-file-excel", uploadFileExcelContract().single("file") , importFileExcel)
contractRouter.post("/import-file-excel-sub", uploadFileExcelContract().single("file") , importFileExcelSubContract)
// Contract Type
contractRouter.get("/type/get-list", getContractType)
contractRouter.post("/type/create", createContractType)
contractRouter.put("/type/update", updateContractType)
contractRouter.delete("/type/delete", deleteContractType)
// Sub Contract
contractRouter.post("/create-sub", createSubContract)
contractRouter.get("/get-sub", getDetailSubContract)
contractRouter.get("/request/sub-list", getSubContractRequest)
contractRouter.get("/get-sub-by-mom", getSubContractByMomContract)
contractRouter.put("/update-sub", updateSubContract)

module.exports = {
    contractRouter
}