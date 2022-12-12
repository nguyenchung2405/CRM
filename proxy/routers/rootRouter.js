const express = require("express");
const { clientRouter } = require("./clientRouter");
const rootRouter = express.Router();

rootRouter.use("/client", clientRouter)

module.exports = {
    rootRouter
}