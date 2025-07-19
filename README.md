# Pathfinding Backend using D* Algorithm and Neo4j

This is the backend for a pathfinding application that leverages Neo4j graph database and exposes RESTful APIs to find the shortest path between two locations and update road weights dynamically. The backend is built with Node.js, Express, and uses Neo4j for graph operations.

## Features

- **Shortest Path Calculation:**  
  Uses the A* algorithm (with Neo4j APOC procedures) to find the shortest path between two cities based on latitude and longitude coordinates.
- **Dynamic Graph Updates:**  
  Allows updating the cost/weight of edges (roads) in the graph, simulating real-world changes like traffic or road conditions.
- **City Proximity:**  
  Converts latitude/longitude to the nearest city node in the graph for accurate pathfinding.

## Tech Stack

- Node.js
- Express
- Neo4j (with APOC plugin)
- dotenv (for environment variable management)
- CORS

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the `backend` directory with the following:
   ```
   NEO4J_URI=bolt://<your-neo4j-host>:7687
   NEO4J_USER=<your-username>
   NEO4J_PASSWORD=<your-password>
   PORT=5000
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000` by default.

## API Endpoints

### 1. Find Shortest Path

- **Endpoint:** `GET /api/find-path`
- **Query Parameters:**
  - `start`: `"lat,lon"` (e.g., `"40.7128,-74.0060"`)
  - `end`: `"lat,lon"` (e.g., `"34.0522,-118.2437"`)
- **Response:**
  ```json
  {
    "path": [
      { "name": "CityA", "latitude": 40.7, "longitude": -74.0 },
      { "name": "CityB", "latitude": 39.9, "longitude": -75.1 }
    ],
    "totalCost": 1234.56
  }
  ```

### 2. Update Road Weight

- **Endpoint:** `POST /api/update-road`
- **Body:**
  ```json
  {
    "start": "CityA",
    "end": "CityB",
    "factor": 1.2
  }
  ```
- **Response:**
  ```json
  {
    "message": "Edge weight updated",
    "newCost": 144.0
  }
  ```

## Project Structure

```
backend/
  ├── server.js
  ├── src/
  │   ├── app.js
  │   ├── config/
  │   │   └── db.js
  │   ├── routes/
  │   │   └── pathRoutes.js
  │   └── services/
  │       ├── pathfinder.js
  │       └── updateGraph.js
  ├── package.json
  └── .env (not committed)
```

## Notes

- Ensure your Neo4j instance is running and accessible.
- The backend expects a graph with `City` nodes and `Connects`/`CONNECTED_TO` relationships.
- The APOC plugin must be enabled in Neo4j for pathfinding algorithms. 