const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");

const connectDB = require("./config/db");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const expenseRoutes = require("./routes/expenseRoutes");

dotenv.config();

const app = express();

const parseAllowedOrigins = () => {
  const fromEnv = process.env.CORS_ORIGIN || "";
  return fromEnv
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

const allowedOrigins = parseAllowedOrigins();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (e.g. health checks, curl, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.length === 0) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());
app.use(morgan("dev"));

// ROOT route
app.get("/", (_req, res) => {
  res.send("API Running...");
});

// Health route
app.get("/api/health", (_req, res) => {
  res.status(200).json({ message: "API is healthy" });
});

app.use("/api/expenses", expenseRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed.");
    process.exit(1);
  }
};

startServer();
