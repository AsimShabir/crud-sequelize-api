const express = require("express");
const app = express();
const cors = require("cors");
const { Contact, Login } = require("../models");
app.use(cors());
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).send("Access denied. No token provided.");
    const decode = jwt.verify(token, "hhhhhh");
    next();
    // decode ? next() : res.status(401).send("Access denied. No token provided.");
  } catch (e) {
    return res.status(401).send("Access denied. No token provided.");
  }
};
module.exports = {
  auth,
};
