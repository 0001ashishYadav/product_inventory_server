const errorHandler = (err, req, res, next) => {
  if (err.isCustom) {
    return res.status(err.statusCode).json({ errorMessage: err.message });
  }
  console.error(err.stack);

  res.status(500).json({ errorMessage: "Something broke!" });
};

class ServerError extends Error {
  constructor(code, msg) {
    super(msg);
    this.statusCode = code || 500;
    this.isCustom = true;
  }
}

export { errorHandler, ServerError };
