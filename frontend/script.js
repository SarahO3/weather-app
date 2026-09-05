const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const errorP = document.querySelector("#errorP");
const weatherContainer = document.querySelector("#weatherContainer");
const forecastContainer = document.querySelector("#forecastContainer");

const ICON_PATH = "./assets/icons/";

const weatherTheme = {
    "clear-day": "#FFD54F",
    "clear-night": "#263238",
    "partly-cloudy-day": "#90CAF9",
    "partly-cloudy-night": "#546E7A",
    cloudy: "#B0BEC5",
    fog: "#CFD8DC",
    wind: "#81D4FA",
    rain: "#64B5F6",
    "showers-day": "#4FC3F7",
    "showers-night": "#5C6BC0",
    thunder: "#616161",
    "thunder-rain": "#455A64",
    "thunder-showers-day": "#546E7A",
    "thunder-showers-night": "#37474F",
    snow: "#ECEFF1",
    "snow-showers-day": "#E1F5FE",
    "snow-showers-night": "#B0BEC5",
    sleet: "#B3E5FC",
    hail: "#B2EBF2",
    "rain-snow": "#90A4AE",
    "rain-snow-showers-day": "#81D4FA",
    "rain-snow-showers-night": "#78909C"
};


// 1. Show Error

function showError(message) {
    errorP.textContent = message;
}


function showLoading() {
    weatherContainer.innerHTML = "<p>Loading weather...</p>";
}


// 2. Fetch Weather

async function fetchWeather(location = "Lagos") {
    const response = await fetch(
        ` https://weather-app-hq08.onrender.com/api/weather/${encodeURIComponent(location)}`
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return await response.json();
}


// 3. Process Weather

function processWeather(response) {
    const {
        resolvedAddress,
        timezone,
        description,
        currentConditions,
        days
    } = response;

    const {
        temp,
        feelslike,
        humidity,
        conditions,
        icon
    } = currentConditions;

    const forecast = days.slice(0, 5).map(day => ({
        date: day.datetime,
        tempMax: day.tempmax,
        tempMin: day.tempmin,
        conditions: day.conditions,
        icon: day.icon
    }));

    return {
        city: resolvedAddress,
        timezone,
        description,
        temp,
        feelslike,
        humidity,
        conditions,
        icon,
        forecast
    };
}


// 4. Format Dates

function formatFullDate(date) {
    const [year, month, day] = date.split("-");

    return `${day}.${month}.${year}`;
}


function formatForecastDate(date) {
    return new Intl.DateTimeFormat("en-NG", {
        weekday: "short"
    }).format(new Date(`${date}T00:00:00`));
}


// 5. Display Weather

function displayWeather(weather) {
    const {
        city,
        timezone,
        description,
        temp,
        feelslike,
        humidity,
        conditions,
        icon,
        forecast
    } = weather;

    const iconPath = `${ICON_PATH}${icon}.svg`;
    const fallbackIcon = `${ICON_PATH}cloudy.svg`;

    weatherContainer.innerHTML = "";

    const formattedDate = formatFullDate(forecast[0].date);

    const weatherCard = document.createElement("div");
    weatherCard.classList.add("card");

    weatherCard.innerHTML = `
        <h2 class="city">
            ${city}
        </h2>

        <p class="today-date">
            Today's Weather — ${formattedDate}
        </p>

        <img
            class="weather-icon"
            src="${iconPath}"
            alt="${conditions}"
            onerror="this.src='${fallbackIcon}'"
        >

        <p class="conditions">
            <strong>Conditions:</strong> ${conditions}
        </p>

        <p class="temp">
            <strong>Temperature:</strong> ${temp}°C
        </p>

        <p>
            <strong>Feels Like:</strong> ${feelslike}°C
        </p>

        <p>
            <strong>Humidity:</strong> ${humidity}%
        </p>

        <p>
            <strong>Description:</strong> ${description}
        </p>

        <p>
            <strong>Timezone:</strong> ${timezone}
        </p>
    `;

    weatherContainer.appendChild(weatherCard);

    return weatherCard;
}


// 6. Display Forecast

function displayForecast(forecast) {
    forecastContainer.innerHTML = `
        <h2>5-Day Forecast</h2>
    `;

    const forecastGrid = document.createElement("div");
    forecastGrid.classList.add("forecast-grid");

    forecast.forEach((day, index) => {
        const forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-card");

        const iconPath = `${ICON_PATH}${day.icon}.svg`;
        const fallbackIcon = `${ICON_PATH}cloudy.svg`;

        forecastCard.innerHTML = `
            <h3>
                ${index === 0 ? "Today" : formatForecastDate(day.date)}
            </h3>

            <img
                class="forecast-icon"
                src="${iconPath}"
                alt="${day.conditions}"
                onerror="this.src='${fallbackIcon}'"
            >

            <p>${day.conditions}</p>

            <p>
                <strong>${day.tempMax}°C</strong> /
                ${day.tempMin}°C
            </p>
        `;

        forecastGrid.appendChild(forecastCard);
    });

    forecastContainer.appendChild(forecastGrid);
}


// 7. Update Theme

function updateTheme(icon, weatherCard) {
    weatherCard.style.backgroundColor =
        weatherTheme[icon] || "#ffffff";
}


// 8. Load Weather

async function loadWeather(location = "Lagos") {
    try {
        showError("");
        showLoading();

        const response = await fetchWeather(location);
        const weather = processWeather(response);

        const weatherCard = displayWeather(weather);

        updateTheme(weather.icon, weatherCard);

        displayForecast(weather.forecast);

    } catch (error) {
        showError(error.message);
        console.error(error);
    }
}


// 9. Search

function handleSearch() {
    const location = searchInput.value.trim();

    if (!location) {
        showError("Please enter a location.");
        return;
    }

    loadWeather(location);
}


searchBtn.addEventListener("click", handleSearch);


// Search when Enter is pressed

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        handleSearch();
    }
});


// 10. Initial Page Load

loadWeather();