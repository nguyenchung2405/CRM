const express = require("express");
const { getProductTypeList, getProductList, getProductChannel, getProductLocation, getProductType } = require("../controller/product.controller");
const productRouter = express.Router();

productRouter.get("/type/list", getProductTypeList)
productRouter.get("/item/list", getProductList)
productRouter.get("/channel/list", getProductChannel)
productRouter.get("/location/list", getProductLocation)
productRouter.get("/attribute/list", getProductType)

module.exports = {
    productRouter
}