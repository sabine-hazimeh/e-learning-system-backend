const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const path = require("path");
const db = require("./db");
const routes = require("./routes");
// const multer = require("multer");
const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = ["http://localhost:3001", "http://localhost:3002"];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// const FileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "--" + file.originalname);
//   },
// });
// const upload = multer({ storage: FileStorageEngine });
// app.post("/file", upload.single("file"), (req, res) => {
//   console.log(req.file);
//   res.send("single file upload success");
// });
app.use(bodyParser.json());

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
