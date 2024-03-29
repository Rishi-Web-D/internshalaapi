require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();

//db connection
require("./models/database").connectDatabase();

// cors
const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

//logger
const logger = require("morgan");
app.use(logger("tiny"));
//bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//session and cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(cookieparser());
//Express fileupload
const fileupload = require("express-fileupload");
app.use(fileupload());

//routes
app.use("/user", require("./routes/indexRoutes"));
app.use("/resume", require("./routes/resumeRoutes"));
app.use("/employee", require("./routes/employeeRoutes"));

//Error Handling
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middlewares/errors");

app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested URL Not Found ${req.url}`, 404));
});
app.use(generatedErrors);
app.listen(
  process.env.PORT,
  console.log(`Server runnig on port ${process.env.PORT}`)
);
