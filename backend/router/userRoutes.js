const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken, isAuth } = require("../util");

const userRouter = express.Router();

userRouter.get(
  "/createadmin",
  asyncHandler(async (req, res) => {
    try {
      const user = new User({
        name: "omid",
        email: "omid@gmail.com",
        password: "12345",
        isAdmin: true,
      });
      const createuser = await user.save();
      res.send(createuser);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);
userRouter.post(
  "/signin",
  asyncHandler(async (req, res) => {
    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!signinUser) {
      res.status(401).send({ message: "invalid email or password" });
    } else {
      res.send({
        _id: signinUser._id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: generateToken(signinUser),
      });
    }
  })
);

userRouter.post(
    "/register",
    asyncHandler(async (req, res) => {
      const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
      })
      const createdUser = await user.save()
      if (!createdUser) {
        res.status(401).send({ message: "invalid user data" });
      } else {
        res.send({
          _id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
          isAdmin: createdUser.isAdmin,
          token: generateToken(createdUser),
        });
      }
    })
);

userRouter.put(
  "/:id", isAuth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    
    if (!user) {
      res.status(401).send({ message: "user not found" });
    } else {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.password = req.body.password || user.password
      const updateUser = await user.save()
      res.send({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser),
      });
    }
  })
);
module.exports = userRouter;
