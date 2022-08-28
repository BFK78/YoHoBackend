const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //Accessing token from header
  const token = req.header("auth-token");

  //Failed to get the token from the header
  if (!token) {
    res.status(401).json({
      status: false,
      message: "Access Denied",
    });
  }

  try {
    //verifying the token
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Invalid Token or Session expired.",
    });
  }
};
