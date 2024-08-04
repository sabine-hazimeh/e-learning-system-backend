const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  schedule: {
    startDate: { type: Date },
    endDate: { type: Date },
    timings: { type: String },
  },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Class", classSchema);
