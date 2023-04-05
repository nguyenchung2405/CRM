const express = require("express");
const { clientRouter } = require("./clientRouter");
const { contractRouter } = require("./contractRouter");
const { productRouter } = require("./productRouter");
const { channelRouter } = require("./channelRouter");
const rootRouter = express.Router();

rootRouter.use("/client", clientRouter);
rootRouter.use("/contract", contractRouter);
rootRouter.use("/product", productRouter);
rootRouter.use("/", channelRouter);

module.exports = {
    rootRouter
}