import express from "express";
import { UserController } from "../controller/UserController";
export const userRouter = express.Router();

userRouter.post("/usersignup", new UserController().userSignup);
userRouter.post("/adminsignup", new UserController().adminSignup);
userRouter.post("/bandsignup", new UserController().bandSignup);
userRouter.get("/login", new UserController().login);
userRouter.get("/bands/getall", new UserController().getAllBands);
userRouter.post("/bands/approve/:id", new UserController().bandApprove);

