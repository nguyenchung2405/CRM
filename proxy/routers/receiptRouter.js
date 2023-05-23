const express = require("express");
const { createExportReceipt, cancelExportReceipt, completeExportReceipt, getAcceptaneListByContractID } = require("../controller/receipt.controller");
const receiptRouter = express.Router();

receiptRouter.post("/create", createExportReceipt)
receiptRouter.delete("/cancel", cancelExportReceipt)
receiptRouter.put("/complete", completeExportReceipt)
receiptRouter.get("/acc-list", getAcceptaneListByContractID)

module.exports = {
    receiptRouter
}