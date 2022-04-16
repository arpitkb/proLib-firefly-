const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  // console.log(authHeader);
  const token = authHeader.split(" ")[1];
  // console.log("TOKEN ", token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        console.log("TOKEN ERRORRRR    ", err);
        res.status(403).json("Token not valid!");
      }
      req.user = data;
      // console.log("GOT THE USER   ", req.user);
      next();
    });
  } else {
    return res.status(401).json("SORRY You don't have any token");
  }
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json("You don't have permission to proceed this operation");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json("You don't have permission to proceed this operation");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };
