import express from "express";
import { login } from "./controller.mjs";

const userRouter = express.Router();

userRouter.get("/", login);

export default userRouter;
