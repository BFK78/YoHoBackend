module.exports = {
  errorHandler: (err, req, res, next) => {
    console.log(err);
    res.status(400).json({
      status: false,
      message: "Error" + err,
    });
  },
};
