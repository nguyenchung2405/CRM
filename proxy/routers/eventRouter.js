const express = require('express');
const { getEventList, createEvent, getEventInfor, updateEvent, createRequest, deleteRequest, searchEvent } = require('../controller/event.controller');
const eventRouter = express.Router();

eventRouter.get("/list", getEventList)
eventRouter.get("/detail/list", getEventInfor)
eventRouter.post("/create", createEvent)
eventRouter.put("/update", updateEvent)
eventRouter.get("/search", searchEvent)
// Request
eventRouter.post("/create-request", createRequest)
eventRouter.delete("/delete-request", deleteRequest)

module.exports = {
    eventRouter
}