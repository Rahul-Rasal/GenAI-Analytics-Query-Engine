export const config = {
  API_KEY: process.env.API_KEY || "dev-key-123",
  PORT: process.env.PORT || 3000,
  MOCK_DB: {
    sales: [
      { id: 1, product: "Widget A", amount: 1000, region: "North", year: 2023 },
      { id: 2, product: "Widget B", amount: 1500, region: "South", year: 2023 },
    ],
    users: [
      { id: 1, name: "Alice", department: "Marketing", access_level: 2 },
      { id: 2, name: "Bob", department: "Sales", access_level: 1 },
    ],
  },
};
