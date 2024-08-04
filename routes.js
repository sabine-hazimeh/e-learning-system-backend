const express = require("express");
const router = express.Router();
const User = require("./models/Users");
const Class = require("./models/Class");
const File = require("./models/File");
const Enrollment = require("./models/Enrollment");
const Withdrawal = require("./models/Withdrawal");
const { generateToken } = require("./utils/jwt");

// User registration
router.post("/register", async (req, res) => {
  try {
    const { username, password, email, role, fullName } = req.body;
    const user = new User({ username, password, email, role, fullName });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a user by ID
router.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new class
router.post("/classes", async (req, res) => {
  try {
    const classData = new Class(req.body);
    await classData.save();
    res.status(201).json(classData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all classes
router.get("/classes", async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("instructor")
      .populate("enrolledStudents")
      .populate("files");
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a class by ID
router.put("/classes/:id", async (req, res) => {
  try {
    const classData = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!classData) return res.status(404).json({ error: "Class not found" });
    res.json(classData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a class by ID
router.delete("/classes/:id", async (req, res) => {
  try {
    const classData = await Class.findByIdAndDelete(req.params.id);
    if (!classData) return res.status(404).json({ error: "Class not found" });
    res.json({ message: "Class deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Create a new file
router.post("/files", async (req, res) => {
  try {
    const file = new File(req.body);
    await file.save();
    res.status(201).json(file);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all files
router.get("/files", async (req, res) => {
  try {
    const files = await File.find().populate("uploadedBy").populate("classId");
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a file by ID
router.put("/files/:id", async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!file) return res.status(404).json({ error: "File not found" });
    res.json(file);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a file by ID
router.delete("/files/:id", async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id);
    if (!file) return res.status(404).json({ error: "File not found" });
    res.json({ message: "File deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
