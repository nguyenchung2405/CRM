const express = require("express");
const { getProductTypeList, getProductList, getProductChannel, getProductLocation, getProductType, createProduct, deleteProduct, createProductType, createProductAttribute, deleteProductType, deleteProductAttribute } = require("../controller/product.controller");
const productRouter = express.Router();

productRouter.get("/type/list", getProductTypeList)
productRouter.get("/item/list", getProductList)
productRouter.get("/channel/list", getProductChannel)
productRouter.get("/location/list", getProductLocation)
productRouter.get("/attribute/list", getProductType)
productRouter.post("/create", createProduct)
productRouter.delete("/delete", deleteProduct)
// Product Type
productRouter.post("/type/create", createProductType)
productRouter.delete("/type/delete", deleteProductType)
// Product Attribute\
productRouter.post("/attribute/create", createProductAttribute)
productRouter.delete("/attribute/delete", deleteProductAttribute)

module.exports = {
    productRouter
}