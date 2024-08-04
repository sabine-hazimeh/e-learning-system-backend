const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const routes = require("./routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
