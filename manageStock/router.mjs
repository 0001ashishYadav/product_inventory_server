import express from "express";
import {
  addProduct,
  getAllInventory,
  getAllUsers,
  getProducts,
  productEntry,
  productExit,
} from "./controller.mjs";

const manageStockRouter = express.Router();

manageStockRouter
  .get("/getProducts", getProducts)
  .get("/getAllInventory", getAllInventory)
  .get("/getAllUsers", getAllUsers)
  .post("/addProduct", addProduct)
  .post("/productEntry", productEntry)
  .post("/productExit", productExit);

export default manageStockRouter;
