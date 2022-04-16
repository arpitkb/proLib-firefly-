const express = require("express");
const Project = require("../models/project");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.post(
  "/newProject",
  wrapAsync(async (req, res, next) => {
    console.log(req.body);
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(200).json({ msg: "Project added successfully!" });
  })
);

module.exports = router;
