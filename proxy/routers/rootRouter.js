const express = require("express");
const { clientRouter } = require("./clientRouter");
const { contractRouter } = require("./contractRouter");
const { productRouter } = require("./productRouter");
const { channelRouter } = require("./channelRouter");
const { eventRouter } = require("./eventRouter");
// const { customerRouter } = require("./customerRouter")
const rootRouter = express.Router();

rootRouter.use("/client", clientRouter);
rootRouter.use("/contract", contractRouter);
rootRouter.use("/product", productRouter);
rootRouter.use("/event", eventRouter)
rootRouter.use("/", channelRouter);
// rootRouter.use("/customer", customerRouter )

module.exports = {
    rootRouter
}