import express from "express";
import { getAllUsers, login, signup } from "./controller.mjs";

const userRouter = express.Router();

userRouter
  .post("/login", login)
  .post("/signup", signup)
  .get("/getAllUsers", getAllUsers);

export default userRouter;
