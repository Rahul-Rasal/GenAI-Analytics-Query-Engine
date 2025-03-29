import express from "express";
import {
  processQuery,
  explainQuery,
  validateRequest,
} from "../controllers/queryController.js";
import { config } from "../config/config.js";

const router = express.Router();

const authenticate = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey && apiKey === config.API_KEY) {
    next();
  } else {
    res.status(401).json({
      error: "Authentication failed",
      message: "Valid API key required",
    });
  }
};

router.post("/query", authenticate, processQuery);
router.post("/explain", authenticate, explainQuery);
router.post("/validate", authenticate, validateRequest);

export default router;
