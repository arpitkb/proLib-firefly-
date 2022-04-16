const mongoose = require("mongoose");
const User = require("./user");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project Name is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    college: {
      type: String,
      required: [true, "Add your college name"],
    },
    contributors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    domain: {
      type: String,
      enum: [
        "Agriculture,FoodTech & Rural Development",
        "Blockchain & Cybersecurity",
        "Clean & Green Technology",
        "Fitness & Sports",
        "Heritage & Culture",
        "MedTech / BioTech / HealthTech",
        "Renewable / Sustainable Energy",
        "Robotics and Drones",
        "Smart Automation",
        "Smart Vehicles",
        "Travel & Tourism",
        "Transportation & Logistics",
        "Disaster Management",
        "Smart Education",
        "Image Processing",
        "Embedded Systems",
        "Networking",
        "Miscellaneous",
      ],
      required: [true, "Domain is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
