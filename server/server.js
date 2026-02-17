const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./config/db");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const expenseRoutes = require("./routes/expenseRoutes");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

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
