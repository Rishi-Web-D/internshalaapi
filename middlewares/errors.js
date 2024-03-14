exports.generatedErrors = (err, req, res, next) => {
  const statuscode = err.statuscode || 500;

  if (
    err.name === "MongoServerError" &&
    err.message.includes("E11000 duplicate key error")
  ) {
    err.message = "Student With This Email Address Already Exist";
  }

  res.status(statuscode).json({
    message: err.message,
    errName: err.name,
    stack: err.stack,
  });
};
