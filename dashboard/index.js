const curentPositionLatitude = 37.81262421636472
const currentPositionLongitude = -122.24471522191392

function getRandomBackground() {
    fetch("https://picsum.photos/1920/1080")
        .then(res => {
            document.body.style.backgroundImage = `url(${res.url})`
        })
        .catch(err => {
            document.body.style.backgroundImage = 
                "linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)"
        })
}

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time-text").textContent = date.toLocaleTimeString("en-us")
    setInterval(getCurrentTime, 1000)
}


function getCurrentPositionProperties() {
    fetch(`https://api.weather.gov/points/${curentPositionLatitude},${currentPositionLongitude}`)
        .then(res => res.json())
        .then(data => {
            const { city, state } = data.properties.relativeLocation.properties
            document.getElementById("weather-location").innerText = `${city}, ${state}`
            const positionWeatherForecastUrl = data.properties.forecast
            get7DayWeatherForecast(positionWeatherForecastUrl)      
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
                <div class="space-between-row">
                    <img class="weather-period-icon" src="${period.icon}" />
                    <h4 class="weather-period-name">${period.name}</h4>
                    <p class="weathter-period-temperature-text">${period.temperature}</p>
                </div>
            </div>
        `).join('')


}

function getBrowsingHistory() {
    const today = new Date()
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7)

    chrome.history.search({ text: "",  maxResults: 500, startTime: sevenDaysAgo.getTime() }, getMostVistedSites)
}

function getMostVistedSites(history) {
    const websiteVisitCounts = {}

    history.forEach(siteVisit => {
        console.log(siteVisit)
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
getCurrentPositionProperties()
