// db.js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/elearning", {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
