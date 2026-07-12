import express from "express";
import { getOrders, createOrder } from "./repo.js";
import { validationMiddleware, checkIdMiddleware } from "./middlewares.js";

export const router = express.Router();

router.post("/", validationMiddleware, async (req, res) => {
  const newOrder = req.body;
  console.log("Creating order with payload:", newOrder);

  const newId = await createOrder(newOrder);
  res.status(201).json({
    Success: true,
    Message: `Order created successfully | new id:${newId}`,
  });
});

router.get("/", async (req, res) => {
  const { status, customer, table } = req.query;
  const orders = await getOrders(status, customer, table);
  res.json({ success: true, data: orders });
});
