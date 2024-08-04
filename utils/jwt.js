const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "31d9bf23d0db50a6d724d009123b542bcc51fe88c595df75f16f948ababf362add3158351771fe965ad69d1fea47e4db6760274eeace3b72e5c681e82ea670f9"; // Replace with your secret key
const JWT_EXPIRATION = "1h";

function generateToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { generateToken, verifyToken };
