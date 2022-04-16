const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please add a email"],
      match: [
        /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    college: {
      type: String,
      required: [true, "Add your college name"],
    },
    github: {
      type: String,
      required: [true, "Add your github account"],
    },
    linkedIn: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
