# Mini Data Query Simulation Engine

A lightweight data query simulation engine built using Node.js and Express. This project processes natural language queries and simulates query execution against a mock in-memory database.


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

## Introduction

This project is a basic API for processing natural language queries. It detects tables and conditions from user input, validates queries, and returns simulated SQL statements along with matching results from a mock database. Designed to demonstrate simple query processing, it serves as a starting point for building more sophisticated data analytics engines.

## Features

- Process natural language queries
- Validate queries against a mock in-memory database
- Generate mock SQL statements based on query conditions
- Endpoints to process, explain, and validate queries
- Health check endpoint for monitoring
- API key-based authentication for secure access

## Technologies Used

- **Node.js**
- **Express.js**
- **body-parser** for parsing JSON request bodies
- **uuid** for generating unique request IDs

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Rahul-Rasal/rahul-rasal-genai-analytics-query-engine.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd rahul-rasal-genai-analytics-query-engine
    ```

3. **Install the dependencies:**

    ```bash
    npm install
    ```

## Configuration

- **API Key**: The API uses an API key for authentication. By default, it is set to `dev-key-123`. You can change this by setting the `API_KEY` environment variable.
- **Port**: The server runs on port `3000` by default. To use a different port, set the `PORT` environment variable.
- **Mock Database**: The engine includes a sample in-memory database with `sales` and `users` data. You can modify this data in `src/config/config.js`.

## Usage

1. **Start the server:**

    ```bash
    npm start
    ```

2. **Server Output:**

    You should see output similar to:
    
    ```
    Server running on port 3000
    API key: dev-key-123
    ```

3. **Health Check:**

    The API provides a health check endpoint at `GET /health` to verify that the server is running.

## API Endpoints

All endpoints (except `/health`) are prefixed with `/api` and require an `x-api-key` header set to the valid API key.

### Process Query

- **URL**: `/api/query`
- **Method**: `POST`
- **Body Example**:

    ```json
    {
      "query": "Show me all sales from North in 2023"
    }
    ```

- **Description**: Processes the natural language query, validates it, and returns matching results along with a generated SQL statement.

### Explain Query

- **URL**: `/api/explain`
- **Method**: `POST`
- **Body Example**:

    ```json
    {
      "query": "Explain sales data for North region"
    }
    ```

- **Description**: Provides an explanation of the detected elements in the query, including tables and filters.

### Validate Query

- **URL**: `/api/validate`
- **Method**: `POST`
- **Body Example**:

    ```json
    {
      "query": "List users from marketing department"
    }
    ```

- **Description**: Validates the natural language query and returns whether it is valid along with any error messages.

### Health Check

- **URL**: `/health`
- **Method**: `GET`
- **Description**: Returns the current status and timestamp of the server.

## Examples

- **Process a Query**:

    ```bash
    curl -X POST http://localhost:3000/api/query \
         -H "Content-Type: application/json" \
         -H "x-api-key: dev-key-123" \
         -d '{"query": "Show me all sales from North in 2023"}'
    ```

- **Explain a Query**:

    ```bash
    curl -X POST http://localhost:3000/api/explain \
         -H "Content-Type: application/json" \
         -H "x-api-key: dev-key-123" \
         -d '{"query": "Explain sales data for North region"}'
    ```

- **Validate a Query**:

    ```bash
    curl -X POST http://localhost:3000/api/validate \
         -H "Content-Type: application/json" \
         -H "x-api-key: dev-key-123" \
         -d '{"query": "List users from marketing department"}'
    ```

## Troubleshooting

- **Authentication Issues**:  
  Ensure you include the correct API key in the `x-api-key` header. The default key is `dev-key-123`.

- **Server Not Starting**:  
  Verify that Node.js is installed and that you have run `npm install` to install all dependencies.

- **Port Conflicts**:  
  If the default port `3000` is in use, change the port by setting the `PORT` environment variable.

## Contributors

- [Rahul Rasal](https://github.com/Rahul-Rasal)

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
