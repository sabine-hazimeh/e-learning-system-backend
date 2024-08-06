const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  size: Number,
  mimetype: String,
  uploadDate: { type: Date, default: Date.now },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  fileUrl: String, // Add this field to store the URL of the file
});

module.exports = mongoose.model("File", fileSchema);
