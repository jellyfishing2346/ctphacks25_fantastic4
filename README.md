# ctphacks25_fantastic4
For CUNY Tech Prep's Hackathon, we (The Fantastic Four) will create a project like no has ever seen before.

Our project shows the UV index of surrounding areas in New York City to determine whether or not an area
is fit for the installation of a solar panel for your house.

## Backend API Documentation

### Setup

1. **Install dependencies:**
    ```bash
    cd solar_housing_project/solar_backend
    npm install
    ```

2. **Environment variables:**
    - Copy `.env.example` to `.env` and fill in your API keys and config.

3. **Run the backend server:**
    ```bash
    npm start
    ```
    The backend will run on [http://localhost:3001](http://localhost:3001) by default.

---

### API Endpoints

#### Health Check

- **GET** `/health`
- **Returns:**  
  ```json
  {
    "status": "Server is running!",
    "timestamp": "2025-08-21T12:34:56.789Z"
  }
  ```

#### Solar Data by Coordinates

- **GET** `/api/solar/coordinates?lat={latitude}&lng={longitude}`
- **Query Parameters:**
    - `lat`: Latitude (required)
    - `lng`: Longitude (required)
- **Returns:**  
  ```json
  {
    "solarPotential": {
      "maxArrayPanelsCount": 20,
      "maxArrayAreaMeters2": 35.5,
      "maxSunshineHoursPerYear": 1450
      // ...other fields
    }
  }
  ```
- **Error Example:**  
  ```json
  {
    "error": "Invalid coordinates"
  }
  ```

---

### Notes

- All errors are returned as JSON.
- Make sure your API keys are kept secret and **never committed** to version control.
- The backend is CORS-enabled for local frontend development.

---

## Contributing

Feel free to open issues or pull requests for improvements or bug fixes!