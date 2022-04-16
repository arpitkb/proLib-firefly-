const wrapAsync = require("../utils/wrapAsync");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");

router.post(
  "/signUp",
  wrapAsync(async (req, res, next) => {
    console.log(req.body);
    const user = req.body;
    const salt = bcrypt.genSaltSync(8);
    const hash_password = bcrypt.hashSync(req.body.password, salt);
    user.password = hash_password;
    const newUser = new User(user);
    const userExist = await User.findOne({ email: newUser.email });

    if (userExist) {
      return next(new ErrorResponse("User already exits!", 400));
    }

    const savedUser = await newUser.save();
    console.log(savedUser);
    const { password, ...others } = savedUser._doc;
    // console.log("OTHERS ARE ", others);
    const accessToken = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
    res.status(200).json({ ...others, accessToken });
  })
);

router.post(
  "/login",
  wrapAsync(async (req, res, next) => {
    const { email, password } = req.body;
    // console.log(req.body);

    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    console.log(password, user.password);
    bcrypt.compare(password, user.password, function (err, correct) {
      if (err) {
        return next(new ErrorResponse("Internal Server Error", 500));
      }
      if (correct) {
        const accessToken = jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          }
        );
        console.log("login");
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    });
  })
);
module.exports = router;
