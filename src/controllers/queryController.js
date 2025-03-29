import { v4 as uuidv4 } from "uuid";
import { config } from "../config/config.js";
import {
  processNaturalQuery,
  generateMockSQL,
  validateQuery,
} from "../utils/queryUtils.js";

export const processQuery = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query?.trim()) {
      return res.status(400).json({ error: "Empty query received" });
    }

    const parsedQuery = processNaturalQuery(query);
    const validation = validateQuery(parsedQuery);

    if (!validation.valid) {
      return res.status(400).json({
        error: "Invalid query",
        details: validation.errors,
      });
    }

    const results = config.MOCK_DB[parsedQuery.table].filter((item) =>
      Object.entries(parsedQuery.conditions).every(
        ([key, value]) => item[key] === value
      )
    );

    res.json({
      requestId: uuidv4(),
      results,
      generatedSQL: generateMockSQL(parsedQuery.table, parsedQuery.conditions),
      matchedConditions: parsedQuery.conditions,
    });
  } catch (error) {
    console.error("Query processing error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const explainQuery = async (req, res) => {
  try {
    const parsedQuery = processNaturalQuery(req.body.query);

    res.json({
      explanation: {
        detectedElements: {
          tables: parsedQuery.table ? [parsedQuery.table] : [],
          filters: Object.keys(parsedQuery.conditions),
        },
        processingSteps: [
          "Natural language parsing",
          "Entity recognition",
          "Query validation",
          "Execution plan generation",
        ],
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Explanation generation failed" });
  }
};

export const validateRequest = async (req, res) => {
  try {
    const parsedQuery = processNaturalQuery(req.body.query);
    const validation = validateQuery(parsedQuery);

    res.json({
      valid: validation.valid,
      errors: validation.errors,
      warnings: validation.valid ? [] : ["Query needs refinement"],
    });
  } catch (error) {
    res.status(500).json({ error: "Validation process failed" });
  }
};
