const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();
module.exports = (req, res, next) => {
   const token = req.cookies.accessToken;
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRETKEY);
    req.userData = { userId: decodedToken.userId, email: decodedToken.email , role: decodedToken.role};
    next();
  } catch (error) {
    return res.status(401).json({ message:error.message || "Authentication failed" });
  }
};
