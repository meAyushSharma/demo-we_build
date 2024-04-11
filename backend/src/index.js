require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRouter");
const organizationRouter = require("./routes/organizationRouter");
const sellerRouter = require("./routes/sellerRouter");
const { error } = require("console");

const app = express();
app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT || 5126;



app.use("/users", userRouter);
app.use("/organizations", organizationRouter);
app.use("/sellers", sellerRouter);

mongoose
  .connect(process.env.mongoose_string)
  .then(() => {
    app.listen(port, () => {
      console.log("port currently running on   : ", port);
    });
  })
  .catch((error) => {
    console.log("error: ", error);
  });

module.exports = app;
