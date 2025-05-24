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
    fetch(`https://api.zippopotam.us/us/${zipCode}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
}

// Time section

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time-text").textContent = date.toLocaleTimeString("en-us")
    setInterval(getCurrentTime, 1000)
}

// Weather section

function getCurrentPositionProperties() {
    fetch(`https://api.weather.gov/points/${curentPositionLatitude},${currentPositionLongitude}`)
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
                <p class="weathter-period-temperature-text">${period.temperature}</p>
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
        link.href = `https:${websiteURL}`
        link.target = "_blank"
        link.className = "frequent-website-link"
        link.textContent = websiteURL
        listItem.appendChild(link)
        frequentWebsitesList.appendChild(listItem)
    }
}

getBrowsingHistory()
getRandomBackground()
getCurrentTime()

