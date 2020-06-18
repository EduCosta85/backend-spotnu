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

  async bandSignup(req: Request, res: Response) {
    try {
      const result = await UserController.UserBusiness.bandSignup(
        req.body.name,
        req.body.nickname,
        req.body.email,
        req.body.password,
        req.body.role,
        req.body.description
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

  public async login(req: Request, res: Response) {
    const login = req.body.login;
    const password = req.body.password;
    try {
      const result = await UserController.UserBusiness.login(login, password);
      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  async getAllBands(req: Request, res: Response) {
    try {
      const result = await UserController.UserBusiness.getAllBands(
        req.headers.auth as string
      );
      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  async bandApprove(req: Request, res: Response) {
    try {
      const result = await UserController.UserBusiness.bandApprove(
        req.headers.auth as string,
        req.params.id as string
      );
      res.sendStatus(200);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }
}
