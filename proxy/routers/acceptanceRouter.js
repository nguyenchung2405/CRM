const express = require("express");
const { createAcceptance, createDetailInAcceptance, getAcceptanceContractList, getAcceptanceEventList, createDetailInEventAcceptance, createEventAcceptance, updateAcceptance } = require("../controller/acceptance.controller");
const { uploadFileDetailAcceptance, uploadFileAcceptance } = require("../middleware/upload");
const acceptanceRouter = express.Router();

// tạo nghiệm thu hợp đồng
acceptanceRouter.post("/detail-create", uploadFileDetailAcceptance().single("fileDetail"), createDetailInAcceptance)
acceptanceRouter.post("/create", uploadFileAcceptance().array("files", 10), createAcceptance)
acceptanceRouter.put("/update", uploadFileAcceptance().array("files", 10), updateAcceptance)
// tạo nghiệm thu event
acceptanceRouter.post("/event-detail-create", uploadFileDetailAcceptance().single("fileDetail"), createDetailInEventAcceptance)
acceptanceRouter.post("/event-create", uploadFileAcceptance().array("files", 10), createEventAcceptance)

acceptanceRouter.get("/request-list", getAcceptanceContractList)
acceptanceRouter.get("/event-list", getAcceptanceEventList)

module.exports = {
    acceptanceRouter
}