import express from "express";
import { UserController } from "../controller/UserController";
export const userRouter = express.Router();

userRouter.post("/usersignup", new UserController().userSignup);
userRouter.post("/adminsignup", new UserController().adminSignup);

