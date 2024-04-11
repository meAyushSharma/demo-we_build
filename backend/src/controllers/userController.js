const userSchema = require("./../models/userModel");
const bcrypt = require("bcrypt");
const jwtToken = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const path = require("path");
// const express = require("express");
// const app = express();

// const frontendPath = `/mnt/c/Users/ayush/OneDrive/code_related/Hackathons/demo-we_build/frontend/main`;
// const frontendPathSignin = `/mnt/c/Users/ayush/OneDrive/code_related/Hackathons/demo-we_build/frontend/public/SignIn`;
// app.use(express.static(frontendPath));
// app.use(express.static(frontendPathSignin));

const secretKey = "AKST";
const signin = async (req, res) => {
  // new user creation
  // token => body
  // findone({email, id})
  //res.send({welcome})

  console.log("here at signin");
  const token = req.cookies.token;
  if (token) {
    console.log("here token from auth, signin", token);
    const decoded = jwtToken.verify(token, secretKey);
    const email = decoded.email;
    const id = decoded.id;
    console.log("decoded here: ", decoded);
    const ifExists = await userSchema.findOne({ email: email, _id: id });
    console.log("ifexists here: ", ifExists);
    if (ifExists) {
      res.status(201).json({
        msg: "welcome back",
      });
    }
  } else {
    res.send("some error occured");
  }
};

const signup = async (req, res) => {
  // existing user
  // hashed password
  // create user
  // token generation
  console.log("i am here");
  const { username, email, password } = req.body;
  try {
    const existingUser = await userSchema.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({
        msg: "user already exists",
      });
    } else {
      const hashedPass = await bcrypt.hash(password, 10);

      console.log("i am here2");

      const resultUser = await userSchema({
        username: username,
        password: hashedPass,
        email: email,
      });
      await resultUser.save();

      const token = jwtToken.sign(
        { email: resultUser.email, id: resultUser._id },
        secretKey
      );
      console.log("setting cookie");
      res.cookie("token", token);
      res.send(resultUser);
    }
  } catch (error) {
    console.log("error is: ", error);
    res.status(500).json({
      msg: "some error has occured while creating user/ signup",
    });
  }
};

const signinget = (req, res) => {
  const indexPath = path.join(frontendPath, "index.html");
  res.sendFile(indexPath);
};

const signupget = (req, res) => {
  res.send;
};

module.exports = { signin, signup, signinget, signupget };
