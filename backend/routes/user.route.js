const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { getProfile, updateProfile } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/profile", authMiddleware, getProfile);
userRouter.put("/profile", authMiddleware, updateProfile);

module.exports = userRouter;
