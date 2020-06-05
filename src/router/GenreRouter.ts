import express from "express";
import { GenreController } from "../controller/genreController";

export const genreRouter = express.Router();

genreRouter.put("/create", new GenreController().createGenre);


