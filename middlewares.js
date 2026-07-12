export function loggerMiddleware(req, res, next) {
  const time = new Date().toLocaleString();
  console.log(`${req.url} | ${req.method} | ${time}`);
  return next();
}

export function validationMiddleware(req, res, next) {
  if (req.method === "POST") {
    const { customer, table } = req.body;
    if (!customer || typeof customer !== "string") {
      const error = new Error("Invalid or missing customer field!");
      error.statusCode = 400;
      return next(error);
    }

    if (!table || typeof table !== "number") {
      const error = new Error("Invalid or missing table field!");
      error.statusCode = 400;
      return next(error);
    }
  }
  next();
}

export function checkIdMiddleware(req, res, next) {
  if (["GET", "PUT", "PATCH"].includes(req.method)) {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      const error = new Error("Invalid or missing ID!");
      error.statusCode = 400;
      return next(error);
    }
  }
}

export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const Message = err.statusCode ? err.message : "Internal server error";
  return res.status(statusCode).json({ Error: true, Message: Message });
}
