const User = require("../models/Users");

const adminMiddleware = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({ error: "Access denied. Admins only." });
};

module.exports = adminMiddleware;
