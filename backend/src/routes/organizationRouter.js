const express = require("express");
const organizationRouter = express.Router();

organizationRouter.post("/signup", (req, res) => {
  res.send({
    msg: "send some data: signup org",
  });
});
organizationRouter.post("/signin", (req, res) => {
  res.send({
    msg: "send some data: signin org",
  });
});

module.exports = organizationRouter;