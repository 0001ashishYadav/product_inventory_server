import express from "express";
import { login, signup } from "./controller.mjs";

const userRouter = express.Router();

userRouter.post("/login", login).post("/signup", signup);

export default userRouter;
