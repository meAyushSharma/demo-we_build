const express = require("express");
const { signin, signup, signinGet } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/signin", signinGet);

module.exports = userRouter;
