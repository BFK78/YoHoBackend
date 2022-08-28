module.exports = function (req, res, next) {
  res.status(404).json({
    status: false,
    message: "Route not found",
  });
};
