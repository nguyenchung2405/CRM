const express = require('express');
const { getEventList, createEvent, getEventInfor } = require('../controller/event.controller');
const eventRouter = express.Router();

eventRouter.get("/list", getEventList)
eventRouter.get("/detail/list", getEventInfor)
eventRouter.post("/create", createEvent)

module.exports = {
    eventRouter
}