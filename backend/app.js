const express = require("express");
require("dotenv").config();
const cors = require("cors");

const userRouter = require("../backend/routes/user.routes.js");

const app = express();

app.use(express.json());

app.use("/api/v1/", userRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Aplicación escuchando");
});
