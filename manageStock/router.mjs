import express from "express";
import {
  addProduct,
  getAllEntries,
  getAllExits,
  getAllInventory,
  getProducts,
  productEntry,
  productExit,
} from "./controller.mjs";

const manageStockRouter = express.Router();

manageStockRouter
  .get("/getProducts", getProducts)
  .get("/getAllInventory", getAllInventory)
  .get("/getAllEntries", getAllEntries)
  .get("/getAllExits", getAllExits)
  .post("/addProduct", addProduct)
  .post("/productEntry", productEntry)
  .post("/productExit", productExit);

export default manageStockRouter;
