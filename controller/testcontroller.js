//A testing controller for the testing route
module.exports = {
  testRoute: (req, res) => {
    res.send(200).json({
      message: "token verified successfully",
    });
  },
};
