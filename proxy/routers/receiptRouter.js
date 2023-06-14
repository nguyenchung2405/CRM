const express = require("express");
const { createExportReceipt, cancelExportReceipt, completeExportReceipt, getAcceptaneListByContractID, getPaymentList, deletePayment } = require("../controller/receipt.controller");
const receiptRouter = express.Router();

receiptRouter.post("/create", createExportReceipt)
receiptRouter.delete("/cancel", cancelExportReceipt)
receiptRouter.put("/complete", completeExportReceipt)
receiptRouter.get("/acc-list", getAcceptaneListByContractID)
receiptRouter.get("/get-payment-list", getPaymentList)
receiptRouter.delete("/delete-payment", deletePayment)

module.exports = {
    receiptRouter
}