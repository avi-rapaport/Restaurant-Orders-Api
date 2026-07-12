import express from "express";
import { router } from "./orders_router.js";
import { loggerMiddleware, errorHandler } from "./middlewares.js";

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use("/orders", router);

app.use((req, res) => res.status(404).json({ Message: "Route not found!" }));
app.use(errorHandler);

app.listen(3000, () => console.log("Server is running on port 3000..."));
