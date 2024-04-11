require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
// const path = require("path");
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

// let authrization = 0;
// const User_schema = mongoose.model("user_details", {
//   name: String,
//   email: String,
//   password: String,
// });

// app.use(express.static("main"));
// app.use(express.static("public"));
// app.use(express.json());

// const secret = "AKST";
// async function isAuthFirst(req, res, next) {
//   console.log("isAuthFirst started::::");
//   const token = req.headers.authorization;
//   console.log("token is: ", token);
//   if (token) {
//     var decoded = jwt.verify(token, secret);
//     existingUser(decoded.email, decoded.password, decoded.name).then(
//       (answer) => {
//         if (answer) {
//           authrization = 1;
//           next();
//         } else {
//           next();
//         }
//       }
//     );
//   }
// }

// async function existingUser(email, password, name) {
//   const itExists = await User_schema.findOne({
//     name: name,
//     email: email,
//     password: password,
//   });
//   return itExists;
// }

// app.get("/", isAuthFirst, function (req, res) {
//   console.log("isAuthfirst is started");
//   if (authrization == 1) {
//     const token = req.headers.authorization;
//     var decoded = jwt.verify(token, secret);
//     authrization = 0;
//     res.sendFile(path.join(__dirname, "main", "index.html"), {
//       name: decoded.name,
//     });
//   }
//   res.sendFile("index.html", { root: path.join(__dirname, "main") });
// });

// // after clicking SUBMIT on signin

// app.get("/signup", (req, res) => {
//   res.sendFile("login.html", { root: path.join(__dirname, "public/login") });
// });

// app.post("/signup", (req, res) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   const password = req.body.password;
//   let userSignupDetails = {
//     name: name,
//     email: email,
//     password: password,
//   };
//   const userToken = jwt.sign(userSignupDetails, secret);
//   existingUser(email, password, name).then((answer) => {
//     if (answer) {
//       res.send("user already exists");
//     } else {
//       const user1 = new User_schema({
//         name: name,
//         email: email,
//         password: password,
//       });
//       user1.save();
//       res.json({
//         msg: `users name is ${name}`,
//         jwtToken: userToken,
//       });
//     }
//   });
// });

module.exports = app;
