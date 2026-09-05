# Weather App

A responsive full-stack weather application that allows users to search for a location and view current weather conditions and a five-day forecast.

The application uses a vanilla JavaScript frontend, a Node.js/Express backend, and the Visual Crossing Weather API. The backend acts as a secure intermediary so the API key is not exposed in the frontend.

## Live Demo

**Live Application:**
https://weather-app-frontend-o17d.onrender.com



## Features

* Search weather by city or location
* Load Lagos weather by default
* Search using the Search button or Enter key
* Display current temperature
* Display feels-like temperature
* Display humidity
* Display weather conditions and description
* Display timezone
* Display weather icons
* Weather-based visual themes
* Five-day weather forecast
* Loading state while fetching data
* Error handling for invalid locations and failed requests
* Responsive design for mobile and desktop screens
* Fallback icon for unavailable weather icons

---

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6+)

### Backend

* Node.js
* Express
* CORS
* dotenv

### API

* Visual Crossing Weather API

### Deployment

* GitHub
* Render

---

## Architecture

The application is divided into a frontend and backend.

```text
User
  │
  ▼
Frontend (Render Static Site)
  │
  │ HTTP request
  ▼
Express Backend (Render Web Service)
  │
  │ API request
  ▼
Visual Crossing Weather API
  │
  ▼
Weather data returned to backend
  │
  ▼
Frontend displays weather
```

The backend acts as an intermediary between the browser and the weather API.

This keeps the Visual Crossing API key on the server rather than exposing it in frontend JavaScript.

---

## Project Structure

```text
weather-app/
│
├── .gitignore
├── README.md
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
└── frontend/
    ├── index.html
    ├── style.css
    ├── script.js
    │
    └── assets/
        └── icons/
```

### Frontend

The `frontend` directory contains the user interface, styling, application logic, and weather icons.

### Backend

The `backend` directory contains the Express server responsible for communicating with the Visual Crossing API.

---

## How It Works

When a user searches for a location, the frontend sends a request to the backend:

```text
GET /api/weather/:location
```

For example:

```text
/api/weather/Lagos
```

The backend:

1. Receives the requested location.
2. Retrieves the API key from an environment variable.
3. Sends a request to the Visual Crossing Weather API.
4. Receives the weather data.
5. Returns the response to the frontend.

The frontend then processes the response and displays the current weather and five-day forecast.

---

## API Endpoint

The backend exposes the following endpoint:

```text
GET /api/weather/:location
```

### Example

```text
/api/weather/Lagos
```

The location is URL-encoded before being sent to the backend, allowing locations containing spaces or special characters to be handled correctly.

---

## Environment Variables

The Visual Crossing API key is stored as an environment variable on the backend.

Create a `.env` file inside the `backend` directory:

```env
WEATHER_API_KEY=your_api_key_here
```

The API key should **never be committed to GitHub**.

The project's `.gitignore` excludes environment files:

```text
.env
node_modules/
```

When deployed to Render, the API key is added through the service's environment variables rather than being stored in the source code.

---

## Getting Started

### Prerequisites

You will need:

* Node.js installed
* A Visual Crossing Weather API key
* Git

### Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd weather-app
```

### Install backend dependencies

```bash
cd backend
npm install
```

### Configure the environment variable

Create:

```text
backend/.env
```

and add:

```env
WEATHER_API_KEY=your_api_key_here
```

### Start the backend

```bash
node server.js
```

The backend uses the `PORT` environment variable when available and falls back to port `5000` for local development.

### Run the frontend

Serve the `frontend` directory using a local development server and open the application in your browser.

The frontend should be configured to communicate with the appropriate backend URL for the environment being used.

---

## Deployment

The application is deployed to Render as two separate services.

### Backend

The backend is deployed as a **Render Web Service**.

```text
Root Directory: backend
Build Command: npm install
Start Command: node server.js
```

The Visual Crossing API key is stored in the backend's Render environment variables.

### Frontend

The frontend is deployed as a **Render Static Site**.

```text
Root Directory: frontend
Build Command: none
Publish Directory: .
```

The `.` publish directory tells Render to publish the contents of the `frontend` directory directly because the project does not require a build process.

---

## Security

The application keeps the Visual Crossing API key on the backend.

The frontend communicates with the backend rather than directly with the weather API.

CORS is configured to allow requests from the deployed frontend origin.

This provides a clear separation between:

```text
Public frontend
      ↓
Backend
      ↓
Protected API credentials
      ↓
External weather API
```

---

## Responsive Design

The application is designed to work across desktop and mobile screen sizes.

The layout adjusts at smaller screen widths, including:

* Search controls
* Weather card spacing
* Temperature sizing
* Forecast layout

The five-day forecast changes to a single-column layout on smaller screens for improved readability.

---

## Future Improvements

Potential improvements for future versions include:

* Hourly weather forecasts
* Weather alerts
* Geolocation-based weather
* Celsius/Fahrenheit unit switching
* Sunrise and sunset information
* Wind information
* Precipitation information
* Search history
* Improved loading animations
* Automated tests
* More detailed accessibility improvements
* Custom domain

---

## Author

**Sarah Eja**

This project was built as part of my continued practice in frontend and backend web development, with a focus on JavaScript, API integration, server-side development, and deployment.
