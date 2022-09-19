const express = require("express");
const app = express();
const cors = require("cors");
const { Contact, Login } = require("../models");
app.use(cors());
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

const getAllData = async (req, res) => {
  try {
    Contact.findAll({ raw: true }).then((result) => {
      console.log({ result });
      res.status(200).send(result);
    });
  } catch (e) {
    res.send(e);
  }
};
// const auth = async (req, res) => {
//   try {
//     const token = req.header("x-auth-token");
//     if (!token)
//       return res.status(401).send("Access denied. No token provided.");
//     const decode = jwt.verify(token, "hhhhhh");
//     console.log(decode);
//     if (decode) return res.status(401).send(decode);
//     next();
//   } catch (e) {
//     console.log(e);
//     res.send(e);
//   }
// };
const insertData = async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    Contact.create({ name, email, contact }).then((error, result) => {
      res.send(result);
    });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};
const removeData = async (req, res) => {
  const { id } = req.params;
  Contact.destroy({
    where: {
      id,
    },
  }).then((error, result) => {
    res.send(result);
  });
};
const updateData = async (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  Contact.update(
    { name, email, contact },
    {
      where: {
        id,
      },
    }
  ).then((error, result) => {
    res.send(result);
  });
};

const register = async (req, res) => {
  const { uname, upassword } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(upassword, salt);
  try {
    await Login.create({
      uname: uname,
      upassword: hashPassword,
    });
    res.json({ msg: "Registration Successful" });
  } catch (error) {
    console.log(error);
  }
};
const login = async (req, res) => {
  const { uname, upassword } = req.body;
  console.log({ uname });
  try {
    const user = await Login.findOne({
      where: {
        uname,
      },
    });
    // console.log(result);
    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "Invalid user name." });
    const validPassword = await bcrypt.compare(
      req.body.upassword,
      user.upassword
    );
    if (!validPassword)
      return res
        .status(400)
        .send({ success: false, message: "Invalid password." });
    if (user) {
      let jwtSecretKey = "hhhhhh";
      const token = jwt.sign(user.uname, jwtSecretKey);
      console.log({ uname: user.uname, token });

      return res.status(200).send(token);
    }
  } catch (e) {
    res.send(e);
  }
};
module.exports = {
  getAllData,
  insertData,
  removeData,
  updateData,
  register,
  login,
  // auth,
};
