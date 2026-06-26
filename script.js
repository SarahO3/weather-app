const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const errorP = document.querySelector("#errorP");
const container = document.querySelector("#weatherContainer");

const apiKey = "AUGPP5EL4ZVA3QFA8QDQC9MAR";

const BASE_URL =
"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";


const weatherColors = {

    clear:"#FFD54F",
    sunny:"#FFD54F",

    rain:"#64B5F6",

    cloudy:"#B0BEC5",

    overcast:"#90A4AE",

    snow:"#ECEFF1",

    fog:"#CFD8DC",

    wind:"#81D4FA",

    storm:"#455A64",

    thunder:"#37474F"

};


const weatherIcons = {

    clear:"☀️",

    sunny:"☀️",

    rain:"🌧️",

    cloudy:"☁️",

    overcast:"☁️",

    fog:"🌫️",

    snow:"❄️",

    wind:"💨",

    storm:"🌩️",

    thunder:"⛈️"

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


    container.innerHTML = "";


    const weatherCard = document.createElement("div");

    weatherCard.classList.add("card");


    weatherCard.innerHTML = `

        <h2>${city}</h2>

        <h1>${weatherIcons[icon] || "🌍"}</h1>

        <p><strong>Conditions:</strong> ${conditions}</p>

        <p><strong>Temperature:</strong> ${temp}°C</p>

        <p><strong>Feels Like:</strong> ${feelslike}°C</p>

        <p><strong>Humidity:</strong> ${humidity}%</p>

        <p><strong>Description:</strong> ${description}</p>

        <p><strong>Timezone:</strong> ${timezone}</p>

    `;


    container.appendChild(weatherCard);

    return weatherCard;

}



// 5. Update Theme

function updateTheme(icon, weatherCard){

    weatherCard.style.backgroundColor =
        weatherColors[icon] || "#ffffff";

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

