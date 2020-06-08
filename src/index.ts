import express from "express";
import dotenv from "dotenv";
import statusMonitor from 'express-status-monitor'
import helmet from 'helmet'
import compression from "compression";
import cors from "cors";
import {AddressInfo} from "net";
import { userRouter } from "./router/UserRouter";
import { genreRouter } from "./router/GenreRouter";

dotenv.config();
const app = express();

app.use(helmet())
app.use(compression())
app.use(express.json());
app.use(cors());
app.use(statusMonitor({ path: '/monitor'}))

const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});

app.use("/users/", userRouter);
app.use("/genres/", genreRouter);