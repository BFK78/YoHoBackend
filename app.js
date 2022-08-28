// Requiring modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

//Requireing Routes
const authRoute = require("./routes/authentication");
const profileRoute = require("./routes/profile");
const meetingRoute = require("./routes/meeting");
const testingRoute = require("./routes/testingroute");
const notFound = require("./middlewares/not-found");

//Requireing custom middleware
const { errorHandler } = require("./middlewares/error-handler");

require("dotenv").config({
  path: __dirname + "/.env",
});

//Global variables
const app = express();
const PORT = process.env.PORT || 4000;

// Connnecting to the Database
mongoose.connect(process.env.MONGO_URL_CONNECT, () => {
  console.log("Connected to Database Successfully");
});

//Middlewares
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json(), cors());
//Assigning route to express
app.use("/api/users", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/meeting", meetingRoute);
app.use("/api/testing", testingRoute);

//Assingning not found and error handler to express
app.use(notFound);
app.use(errorHandler);

//Listening to the port
app.listen(PORT, () => {
  console.log("Heyy the server is ready to rock and roll on the port " + PORT);
});
