import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { TokenGenerator } from "../services/tokenGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";

export class UserController {
  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new HashGenerator(),
    new TokenGenerator(),
    new IdGenerator()
  );

  async userSignup(req: Request, res: Response) {
    try {
      const result = await UserController.UserBusiness.userSignup(
        req.body.name,
        req.body.nickname,
        req.body.email,
        req.body.password,
        req.body.role
      );
      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  async adminSignup(req: Request, res: Response) {
    try {
      const result = await UserController.UserBusiness.adminSignup(
        req.body.name,
        req.body.nickname,
        req.body.email,
        req.body.password,
        req.body.role,
        req.headers.auth as string
      );
      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }
}
