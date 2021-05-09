const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const boolParser = require("express-query-boolean");
const rateLimit = require("express-rate-limit");
const contactsRouter = require("./routes/contacts");
const userRouter = require("./routes/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.get("env") !== "test" && app.use(logger(formatsLogger));
app.use(express.static("public"));
const limiter = rateLimit({
  windowMs: 100 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    return res.status(429).json({
      status: "error",
      code: 429,
      message: "Too many requests",
    });
  },
});

app.use(limiter);
app.use(cors());

app.use(express.json({ limit: 100000 }));
app.use(boolParser());

app.use("/api/users", userRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    status: status === 500 ? "fail" : "error",
    code: status,
    message: err.message,
  });
});

module.exports = app;
