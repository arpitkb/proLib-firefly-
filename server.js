const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const errorhandler = require("./middlewares/error");
// const path = require("path");
const cors = require("cors");
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Mongoose Connected!"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);
// app.use("/api/users", userRoute);
// app.use("/api/auth", authRoute);
// app.use("/api/products", productRoute);
// app.use("/api/orders", orderRoute);
// app.use("/api/checkout", stripeRoute);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client_admin/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, "client_admin", "build", "index.html")
//     );
//   });
// }

app.use(errorhandler);

app.listen(process.env.PORT || 5000, () => {
  console.log("listing port 5000");
});
