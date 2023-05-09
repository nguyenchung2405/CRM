const express = require('express');
const { getEventList, createEvent, getEventInfor, updateEvent, createRequest, deleteRequest, searchEvent, getUnsetContract, addUnserContractToEvent } = require('../controller/event.controller');
const eventRouter = express.Router();

eventRouter.get("/list", getEventList)
eventRouter.get("/detail/list", getEventInfor)
eventRouter.post("/create", createEvent)
eventRouter.put("/update", updateEvent)
eventRouter.get("/search", searchEvent)
eventRouter.get("/unset_contract", getUnsetContract)
eventRouter.put("/add-unset-contract", addUnserContractToEvent)
// Request
eventRouter.post("/create-request", createRequest)
eventRouter.delete("/delete-request", deleteRequest)

module.exports = {
    eventRouter
}