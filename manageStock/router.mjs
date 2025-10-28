import express from "express";
import {
  addProduct,
  productEntry,
  productExit,
  products,
} from "./controller.mjs";

const manageStockRouter = express.Router();

manageStockRouter
  .get("/products", products)
  .post("addProduct", addProduct)
  .post("/productEntry", productEntry)
  .post("/productExit", productExit);

export default manageStockRouter;
