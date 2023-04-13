const express = require("express");
const { getProductTypeList, getProductList, getProductChannel, getProductLocation, getProductType, createProduct, deleteProduct, createProductType, createProductAttribute, deleteProductType, deleteProductAttribute, updateProductType, updateProductAttribute, getProductSpecial, createProductSpecial } = require("../controller/product.controller");
const productRouter = express.Router();

productRouter.get("/item/list", getProductList)
productRouter.get("/channel/list", getProductChannel)
productRouter.get("/location/list", getProductLocation)
productRouter.post("/create", createProduct)
productRouter.delete("/delete", deleteProduct)
// Product Type
productRouter.get("/type/list", getProductTypeList)
productRouter.post("/type/create", createProductType)
productRouter.delete("/type/delete", deleteProductType)
productRouter.put("/type/update", updateProductType)
// Product Attribute\
productRouter.get("/attribute/list", getProductType)
productRouter.post("/attribute/create", createProductAttribute)
productRouter.delete("/attribute/delete", deleteProductAttribute)
productRouter.put("/attribute/update", updateProductAttribute)
// Product Special
productRouter.get("/special-discount", getProductSpecial)
productRouter.post("/special-discount/create", createProductSpecial)

module.exports = {
    productRouter
}