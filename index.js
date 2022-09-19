const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const RouteIndex = require("./routes/index");
const midleware = require("./midelware/auth");
const contact = require("./controler/contactControler");
app.use("/api", midleware.auth, RouteIndex);

app.post("/login", contact.login);

app.listen(3000, () => {
  console.log("server is runing on port 3000");
});
