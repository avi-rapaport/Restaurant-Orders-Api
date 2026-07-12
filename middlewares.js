import { z } from "zod";

const createOrderScheme = z
  .object({
    customer: z.string(),
    table: z.number(),
  })
  .strict();

const updateOrderSchema = z
  .object({
    customer: z.string().optional(),
    table: z.number().optional(),
  })
  .strict();

export function loggerMiddleware(req, res, next) {
  const time = new Date().toLocaleString();
  console.log(`${req.url} | ${req.method} | ${time}`);
  next();
}

export function validationMiddleware(req, res, next) {
  if (req.method === "POST") {
    try {
      req.body = createOrderScheme.parse(req.body);
      next();
    } catch (err) {
      const error = new Error("Invalid or missing fields!");
      error.statusCode = 400;
      throw error;
    }
  } else if (req.method === "PUT") {
    try {
      req.body = updateOrderSchema.parse(req.body);
      next();
    } catch (err) {
      const error = new Error("Invalid fields!");
      error.statusCode = 400;
      throw error;
    }
  }

  next();
}

export function checkIdMiddleware(req, res, next) {
  const { id } = req.params;
  if (!id || isNaN(id)) {
    const error = new Error("Invalid or missing ID!");
    error.statusCode = 400;
    throw error;
  }
  next();
}

export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const Message = err.statusCode ? err.message : "Internal server error";
  return res.status(statusCode).json({ Error: true, Message: Message });
}
