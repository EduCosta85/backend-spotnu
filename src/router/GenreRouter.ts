import express from "express";
import { GenreController } from "../controller/GenreController";

export const genreRouter = express.Router();

genreRouter.put("/create", new GenreController().createGenre);
genreRouter.get("/getall", new GenreController().getAllGenres);


