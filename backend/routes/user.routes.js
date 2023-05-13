const express = require("express");
const { getUser, postUser } = require("../controller/userController");

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.post("/", postUser);

module.exports = userRouter;
