import { config } from "./config/config.js";
import express from "express";
import bodyParser from "body-parser";
import apiRoutes from "./routes/apiRoutes.js";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use("/api", apiRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({
    error: "Unexpected server error",
    message: err.message,
  });
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
  console.log(`API key: ${config.API_KEY}`);
});
