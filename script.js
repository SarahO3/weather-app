const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const errorP = document.querySelector("#errorP");
const weatherContainerontainer = document.querySelector("#weatherContainer");

const ICON_PATH = "./assets/icons/";

const apiKey = "AUGPP5EL4ZVA3QFA8QDQC9MAR";

const BASE_URL =
"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";


// const weatherColors = {

//     clear:"#FFD54F",
//     sunny:"#FFD54F",

//     rain:"#64B5F6",

//     cloudy:"#B0BEC5",

//     overcast:"#90A4AE",

//     snow:"#ECEFF1",

//     fog:"#CFD8DC",

//     wind:"#81D4FA",

//     storm:"#455A64",

//     thunder:"#37474F"

// };


// const weatherIcons = {

//     clear:"☀️",

//     sunny:"☀️",

//     rain:"🌧️",

//     cloudy:"☁️",

//     overcast:"☁️",

//     fog:"🌫️",

//     snow:"❄️",

//     wind:"💨",

//     storm:"🌩️",

//     thunder:"⛈️"

// };


const weatherTheme = {

    "clear-day": "#FFD54F",             // Warm sunshine

    "clear-night": "#263238",           // Dark blue night

    "partly-cloudy-day": "#90CAF9",     // Light sky blue

    "partly-cloudy-night": "#546E7A",   // Blue grey

    "cloudy": "#B0BEC5",                // Soft grey

    "fog": "#CFD8DC",                   // Misty grey

    "wind": "#81D4FA",                  // Breezy blue

    "rain": "#64B5F6",                  // Rain blue

    "showers-day": "#4FC3F7",           // Bright rainy blue

    "showers-night": "#5C6BC0",         // Night rain

    "thunder": "#616161",               // Dark storm

    "thunder-rain": "#455A64",          // Stormy grey

    "thunder-showers-day": "#546E7A",   // Thunder daytime

    "thunder-showers-night": "#37474F", // Thunder night

    "snow": "#ECEFF1",                  // Snow white

    "snow-showers-day": "#E1F5FE",      // Light icy blue

    "snow-showers-night": "#B0BEC5",    // Snowy evening

    "sleet": "#B3E5FC",                 // Ice blue

    "hail": "#B2EBF2",                  // Frozen cyan

    "rain-snow": "#90A4AE",             // Mixed weather

    "rain-snow-showers-day": "#81D4FA",

    "rain-snow-showers-night": "#78909C"
};



// 1. Show Error

function showError(message){

    errorP.textContent = message;

}



// 2. Fetch Weather

async function fetchWeather(location="lagos"){

    const url =
`${BASE_URL}${location}?unitGroup=metric&key=${apiKey}&contentType=json`;

    const response = await fetch(url);

    if(!response.ok){

        throw new Error(`HTTP Error: ${response.status}`);

    }

    const json = await response.json();

    console.dir(json);

    return json;

}



// 3. Process Weather

function processWeather(response){

    const{

        resolvedAddress,
        timezone,
        description,
        currentConditions

    } = response;


    const{

        temp,
        feelslike,
        humidity,
        conditions,
        icon

    } = currentConditions;


    return{

        city:resolvedAddress,
        timezone,
        description,
        temp,
        feelslike,
        humidity,
        conditions,
        icon

    };

}



// 4. Display Weather

function displayWeather(weather){

    const{

        city,
        timezone,
        description,
        temp,
        feelslike,
        humidity,
        conditions,
        icon

    } = weather;

    const iconPath = `${ICON_PATH}${icon}.svg`;
    const fallbackIcon = `${ICON_PATH}cloudy.svg`;
    weatherContainer.innerHTML = "";


    const weatherCard = document.createElement("div");
    weatherCard.classList.add("card");
  


    weatherCard.innerHTML = `

    <h2 class="city">
    ${city.charAt(0).toUpperCase() + city.slice(1)}
    </h2>

   <img
    class="weather-icon"
    src="${iconPath}"
    alt="${conditions}"
    onerror="this.src='${fallbackIcon}'"
>
        <p class="conditions"><strong>Conditions:</strong> ${conditions}</p>

        <p class="temp"><strong>Temperature:</strong> ${temp}°C</p>

        <p><strong>Feels Like:</strong> ${feelslike}°C</p>

        <p><strong>Humidity:</strong> ${humidity}%</p>

        <p><strong>Description:</strong> ${description}</p>

        <p><strong>Timezone:</strong> ${timezone}</p>

    `;


    weatherContainer.appendChild(weatherCard);

    return weatherCard;

}



// 5. Update Theme

function updateTheme(icon, weatherCard){

    weatherCard.style.backgroundColor =
        weatherTheme[icon] || "#ffffff";

}



// 6. Load Weather

async function loadWeather(location="lagos"){

    try{

        showError("");

        const response = await fetchWeather(location);

        const weather = processWeather(response);

        const weatherCard = displayWeather(weather);

        updateTheme(weather.icon, weatherCard);

    }

    catch(error){

        showError(error.message);

        console.error(error);

    }

}



// Events

searchBtn.addEventListener("click",()=>{

    loadWeather(searchInput.value);

});



// Initial Page Load

loadWeather();

