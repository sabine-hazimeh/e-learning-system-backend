const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  fileType: { type: String, enum: ["PDF", "Document"], required: true },
  fileUrl: { type: String, required: true },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Enrollment", EnrollmentSchema);
