const express = require("express");
const { createAcceptance, createDetailInAcceptance, getAcceptanceContractList } = require("../controller/acceptance.controller");
const { uploadFileDetailAcceptance, uploadFileAcceptance } = require("../middleware/upload");
const acceptanceRouter = express.Router();

acceptanceRouter.post("/detail-create", uploadFileDetailAcceptance().single("fileDetail"), createDetailInAcceptance)
acceptanceRouter.post("/create", uploadFileAcceptance().array("files", 10), createAcceptance)
acceptanceRouter.get("/request-list", getAcceptanceContractList)

module.exports = {
    acceptanceRouter
}