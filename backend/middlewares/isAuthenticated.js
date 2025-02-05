const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("token=>", token);
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized user!",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid Token!",
        success: false,
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log("error in middleware for authentication!");
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

module.exports = isAuthenticated;
