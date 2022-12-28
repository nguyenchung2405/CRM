const express = require("express");
const { clientRouter } = require("./clientRouter");
const { contractRouter } = require("./contractRouter");
const { productRouter } = require("./productRouter");
const rootRouter = express.Router();

rootRouter.use("/client", clientRouter);
rootRouter.use("/contract", contractRouter);
rootRouter.use("/product", productRouter);

module.exports = {
    rootRouter
}