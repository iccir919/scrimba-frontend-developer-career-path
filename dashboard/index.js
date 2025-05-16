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
            document.getElementById("weather-container").innerHTML += `
                <h3>${city}, ${state}</h3>
            `
            console.log(data)      
        })
}

getRandomBackground()
getCurrentTime()
getPositionProperties()