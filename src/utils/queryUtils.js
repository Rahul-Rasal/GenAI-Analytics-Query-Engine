import { config } from "../config/config.js";
export const processNaturalQuery = (queryText) => {
  const query = queryText.toLowerCase();
  const result = {
    table: null,
    conditions: {},
  };

  if (query.includes("sales")) result.table = "sales";
  if (query.includes("user")) result.table = "users";

  const conditionMap = {
    north: { field: "region", value: "North" },
    south: { field: "region", value: "South" },
    2023: { field: "year", value: 2023 },
    marketing: { field: "department", value: "Marketing" },
    sales: { field: "department", value: "Sales" },
  };

  Object.entries(conditionMap).forEach(([keyword, condition]) => {
    if (query.includes(keyword)) {
      result.conditions[condition.field] = condition.value;
    }
  });

  return result;
};

export const generateMockSQL = (table, conditions) => {
  if (!table) return "Invalid query - no table detected";

  const whereClause =
    Object.keys(conditions).length > 0
      ? `WHERE ${Object.entries(conditions)
          .map(([k, v]) => `${k} = '${v}'`)
          .join(" AND ")}`
      : "";

  return `SELECT * FROM ${table} ${whereClause}`.trim();
};

export const validateQuery = (parsedQuery) => {
  const errors = [];

  if (!parsedQuery.table) {
    errors.push("No valid table specified");
  } else if (!config.MOCK_DB[parsedQuery.table]) {
    errors.push(`Table '${parsedQuery.table}' doesn't exist`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
