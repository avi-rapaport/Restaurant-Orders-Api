import express from "express";

import { getOrders } from "./repo.js";

export const router = express.Router();

router.post("/");

router.get("/", async (req, res) => {
  const { status, customer, table } = req.query;
  const orders = await getOrders(status, customer, table);
  res.json({ success: true, data: orders });
});
