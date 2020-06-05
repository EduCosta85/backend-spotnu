import { Request, Response } from "express";
import { TokenGenerator } from "../services/tokenGenerator";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";
import { GenreBusiness } from "../business/GenreBusiness";
import { GenreDatabase } from "../data/GenreDatabase";

export class GenreController {
  private static GenreBusiness = new GenreBusiness(
    new GenreDatabase(),
    new HashGenerator(),
    new TokenGenerator(),
    new IdGenerator()
  );

  async createGenre(req: Request, res: Response) {
    try {
      const result = await GenreController.GenreBusiness.createGenre(
        req.headers.auth as any,
        req.body.name
      );
      res.sendStatus(200);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

}
