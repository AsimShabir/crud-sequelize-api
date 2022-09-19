const express = require("express");
const router = express.Router();
const contact = require("../controler/contactControler");

router
  .get("/get", contact.getAllData)
  .post("/post", contact.insertData)
  .delete("/remove/:id", contact.removeData)
  .put("/update/:id", contact.updateData)
  .post("/register", contact.register);
// .post("/login", contact.login);
module.exports = router;
