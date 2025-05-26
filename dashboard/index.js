// Background image

function getRandomBackground() {
      document.body.style.backgroundImage = generateRandomLinearGradient();
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateRandomLinearGradient() {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const gradient = `linear-gradient(to right, ${color1}, ${color2})`;
    return gradient;
}

// Current location section


function getLocationFromLocalStorage() {
    const storedZipCode = localStorage.getItem("zipCode")

    if (storedZipCode) getZipCodeProperties(storedZipCode)
}

// Zip code form


document.getElementById("zip-code-form").addEventListener("submit", handleZipCodeInput)

function handleZipCodeInput(e) {
    e.preventDefault()
    
    const zipCodeInput = document.getElementById("zipcode-input")
    const zipCode = zipCodeInput.value
    zipCode.value = ""
    getZipCodeProperties(zipCode)
}

function getZipCodeProperties(zipCode) {
    const currentLocationResultDiv = document.getElementById("current-location-result")
    currentLocationResultDiv.innerHTML = "<p>Loading location...</p>";

    fetch(`https://api.zippopotam.us/us/${zipCode}`)
        .then(res => {

            if(!res.ok) {
                if (res.status === 404) {
                    throw new Error(`Zip code ${zipCode} not found`)
                } else {
                    throw new Error(`Error: ${res.status}`)
                }
            }

            return res.json()
        })
        .then(data => {
            localStorage.setItem("zipCode", data["post code"])
            const place = data.places[0]
            currentLocationResultDiv.innerHTML = `<h2>${place["place name"]}, ${place["state abbreviation"]}</h2>`
            const { longitude, latitude }  = place
            getCurrentLocationWeatherProperties(latitude, longitude)
            getMoonIllumination(latitude, longitude)
        })
        .catch(err => {
            currentLocationResultDiv.innerHTML = `<p>${err.message}</p>`
        })
}

// Time section

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time-text").textContent = date.toLocaleTimeString("en-us")
    setInterval(() => {
        const now = new Date();
        const timeEl = document.getElementById("time-text");
        const formattedTime = now.toLocaleTimeString("en-us");
        if (timeEl.textContent !== formattedTime) timeEl.textContent = formattedTime;
    }, 1000)
}


// Weather section


function getCurrentLocationWeatherProperties(latitude, longitude) {
    fetch(`https://api.weather.gov/points/${latitude},${longitude}`)
        .then(res => res.json())
        .then(data => {
            get7DayWeatherForecast(data.properties.forecast)      
        })
}

function get7DayWeatherForecast(forecastUrl) {
    fetch(forecastUrl)
        .then(res => res.json())
        .then(data => {
            render7DayWeatherForecast(data.properties)
        })
}

function render7DayWeatherForecast(forecast) {
    const forecastGenerationDatetime = new Date(forecast.generatedAt)
    document.getElementById("weather-last-updated").innerText = `
        Forecast generated: ${forecastGenerationDatetime.toLocaleDateString()} at ${forecastGenerationDatetime.toLocaleTimeString()}
    `

    const [current, ...rest] = forecast.periods
    const displayedForecast = [current, ...rest.filter(period => period.isDaytime)]

    document.getElementById("forecast-container").innerHTML = displayedForecast.map(period => `
            <div class="weather-period-container">
                <img class="weather-period-icon" src="${period.icon}" />
                <h4 class="weather-period-name">${period.name}</h4>
                <p class="weather-period-temperature-text">${period.temperature}</p>
            </div>
        `).join('')
}

// Most frequently visited websites

function getBrowsingHistory() {
    const today = new Date()
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7)

    chrome.history.search({ text: "",  maxResults: 500, startTime: sevenDaysAgo.getTime() }, getMostVistedSites)
}

function getMostVistedSites(history) {
    const websiteVisitCounts = {}

    history.forEach(siteVisit => {
        const website = new URL(siteVisit.url).hostname

        websiteVisitCounts[website] = (websiteVisitCounts[website] || 0) + 1
    })

    const websiteVisitsSorted = Object.entries(websiteVisitCounts)
        .sort(([, countA], [, countB] ) => countB - countA)

    const top10VisitedWebsites = websiteVisitsSorted.slice(0, 10);

    renderMostVisitedSites(top10VisitedWebsites)
}

function renderMostVisitedSites(top10VisitedWebsites) {

    const frequentWebsitesList = document.getElementById("frequent-websites-container")
    frequentWebsitesList.innerHTML = ""

    for (let [websiteURL, count] of top10VisitedWebsites) {
        const listItem = document.createElement("li")
        listItem.className = "frequent-website-list-item"
        const link = document.createElement("a")
        link.href = `https://${websiteURL}`
        link.target = "_blank"
        link.className = "frequent-website-link"
        link.textContent = websiteURL
        listItem.appendChild(link)
        frequentWebsitesList.appendChild(listItem)
    }
}

// Moon phase

function getMoonIllumination(latitude, longitude) {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    const formattedDate = `${year}-${month}-${day}`

    const moonIlluminationUrl = `https://aa.usno.navy.mil/api/rstt/oneday?date=2025-5-28&coords=${latitude},${longitude}`


    fetch(moonIlluminationUrl)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            // const fracillum = parseFloat(json?.properties?.data?.fracillum)
            const fracillum = 50


            if( !isNaN(fracillum) ) {
                // const moonEl = document.getElementById("moon")
                // moonEl.style.setProperty("--illumination", fracillum)
            }
        })
}

function updateMoonIllumination() {

}

// Initialization

function initDashboard() {
    getLocationFromLocalStorage()
    getBrowsingHistory()
    getRandomBackground()
    getCurrentTime()
}

initDashboard()



