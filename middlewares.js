export function loggerMiddleware(req, res, next) {
  const time = new Date().toLocaleTimeString;
  console.log(`${req.url} | ${req.method} | ${time}`);
  next();
}

export function validationMiddleware(err, req, res, next) {
  const statusCode = err.status || 500;
  res
    .status(statusCode)
    .json({ Error: true, Message: err.message || "Internal server error" });
}

export function checkIdMiddleware(req, res, next) {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    res.status(400).json("Invalid or missing ID!");
  }
}
