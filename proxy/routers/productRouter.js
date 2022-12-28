const express = require("express");
const { getProductTypeList, getProductList } = require("../controller/product.controller");
const productRouter = express.Router();

productRouter.get("/type/list", getProductTypeList)
productRouter.get("/item/list", getProductList)

module.exports = {
    productRouter
}