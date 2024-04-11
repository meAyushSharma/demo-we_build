const express = require("express");
const {
  signin,
  signup,
  signinget,
  signupget,
} = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.get("/signupget", signupget);
userRouter.post("/signin", signin);
userRouter.get("/signinget", signinget);

module.exports = userRouter;
