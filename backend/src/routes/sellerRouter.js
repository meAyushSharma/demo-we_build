const express = require("express");
const sellerRouter = express.Router();

sellerRouter.post("/signup", (req, res) => {
  res.send({
    msg: "send some data: signup seller",
  });
});
sellerRouter.post("/signin", (req, res) => {
  res.send({
    msg: "send some data: signin seller",
  });
});

module.exports = sellerRouter;
