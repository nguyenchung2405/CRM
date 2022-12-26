const express = require("express");
const { clientRouter } = require("./clientRouter");
const { contractRouter } = require("./contractRouter");
const rootRouter = express.Router();

rootRouter.use("/client", clientRouter);
rootRouter.use("/contract", contractRouter);

module.exports = {
    rootRouter
}