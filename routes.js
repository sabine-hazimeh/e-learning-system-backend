const express = require("express");
const router = express.Router();
const User = require("./models/Users");
const Class = require("./models/Class");
const File = require("./models/File");
const Enrollment = require("./models/Enrollment");
const Withdrawal = require("./models/Withdrawal");
const { generateToken } = require("./utils/jwt");
const authMiddleware = require("./utils/authMiddleware");
const adminMiddleware = require("./utils/adminMiddleware");
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

router.post("/classes", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const classData = new Class(req.body);
    await classData.save();
    res.status(201).json(classData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/enrollment", authMiddleware, async (req, res) => {
  try {
    const { classId } = req.body;
    const userId = req.user.id;

    if (!classId) {
      return res.status(400).json({ error: "Class ID is required" });
    }

    const existingEnrollment = await Enrollment.findOne({ userId, classId });
    if (existingEnrollment) {
      return res.status(400).json({ error: "Already enrolled in this class" });
    }

    const enrollmentData = new Enrollment({ userId, classId });
    await enrollmentData.save();
    res.status(201).json(enrollmentData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/enrollment", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const enrollments = await Enrollment.find({ userId }).populate("classId");
    res.status(200).json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/files", async (req, res) => {
  try {
    const file = new File(req.body);
    await file.save();
    res.status(201).json(file);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/files/:classId", async (req, res) => {
  try {
    const { classId } = req.params;
    const files = await File.find({ classId }).populate(
      "uploadedBy",
      "username"
    );
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/withdrawals", authMiddleware, async (req, res) => {
  try {
    const { classId } = req.body;
    const userId = req.user.id;

    if (!classId) {
      return res.status(400).json({ error: "Class ID is required" });
    }

    const withdrawal = new Withdrawal({
      userId,
      classId,
      status: "pending",
    });

    await withdrawal.save();
    res.status(201).json({ message: "Withdrawal requested successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get(
  "/withdrawals",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const withdrawals = await Withdrawal.find()
        .populate("userId", "username email")
        .populate("classId", "title");

      res.status(200).json(withdrawals);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.get("/classes", async (req, res) => {
  try {
    const classes = await Class.find();

    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get(
  "/all-enrollments",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const enrollments = await Enrollment.find()
        .populate("userId", "username email")
        .populate("classId", "title");

      res.status(200).json(enrollments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
