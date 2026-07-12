import express from "express";
import { router } from "./orders_router.js";
import {
  loggerMiddleware,
  validationMiddleware,
  checkIdMiddleware,
} from "./middlewares.js";

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use("/orders", router);

app.use((req, res) => res.status(404).json({ Message: "Route not found!" }));
app.use(checkIdMiddleware);
app.use(validationMiddleware);

app.listen(3000, () => console.log("Server is running on port 3000..."));
