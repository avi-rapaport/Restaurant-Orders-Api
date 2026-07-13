import express from "express";
import {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  changeOrderStatus,
} from "./repo.js";
import { validationMiddleware, checkIdMiddleware } from "./middlewares.js";
import { success } from "zod";

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

router.get("/:id", checkIdMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const order = await getOrderById(id);
  res.json({ Success: true, data: order });
});

router.put(
  "/:id",
  checkIdMiddleware,
  validationMiddleware,
  async (req, res) => {
    const id = Number(req.params.id);
    const updatedData = req.body;
    await updateOrder(id, updatedData);
    res.json({ success: true, message: "order updated successfully" });
  },
);

router.delete("/:id", checkIdMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  await deleteOrder(id);
  res.json({ Message: "Order deleted successfully" });
});

router.patch("/:id/status", checkIdMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const status = req.body.status;
  await changeOrderStatus(id, status);
  res.json({ Message: `Order status changed successfully to ${status}` });
});
