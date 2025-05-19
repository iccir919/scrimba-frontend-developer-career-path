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
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us")
    setInterval(getCurrentTime, 1000)
}


function getPositionProperties() {
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
                <div class="weather-period-primary-row">
                    <img class="weather-period-icon" src="${period.icon}" />
                    <h4>${period.name}</h4>
                    <p class="weather-period-temperature-text">${period.temperature}</p>
                </div>
            </div>
        `).join('')


}

getRandomBackground()
getCurrentTime()
getPositionProperties()