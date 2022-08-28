const express = require("express");
const { testRoute } = require("../controller/testcontroller");
const verifyToken = require("../middlewares/verify-token");

const router = express.Router();

//For testing purpose
router.route("/test").post(verifyToken, testRoute).get(testRoute);

//Exporting the testing route
module.exports = router;
