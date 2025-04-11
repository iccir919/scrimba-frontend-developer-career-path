function getRandomBackground() {
    fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
        .then(res => res.json())
        .then(data => {
            document.body.style.backgroundImage = `url(${data.urls.regular})`
            document.getElementById("author").textContent = `By: ${data.user.name}`
        })
        .catch(err => {
            // Use a default background image/author
            document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
    )`
            document.getElementById("author").textContent = `By: Dodi Achmad`
        })
}


function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)

function getLocalWeather() {
    navigator.geolocation.getCurrentPosition(position => {
        fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
            .then(res => {
                if (!res.ok) {
                    throw Error("Weather data not available")
                }
                return res.json()
            })
            .then(data => {
                const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                document.getElementById("weather").innerHTML = `
                    <div class="row">
                        <img src=${iconUrl} />
                        <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                    </div> 
                    <p class="weather-city">${data.name}</p>
                `
            })
            .catch(err => console.error(err))
    });
}

function getFitbitInfo() {
    const fitbitAccessTokenLocalStorage = localStorage.getItem("fitbitAccessToken")
    chrome.storage.local.get(["fitbitAccessToken"]).then((result) => {
        console.log("Value is " + result.key);
    });

    console.log("Fitbit Access Token Local", fitbitAccessTokenLocalStorage)

    if (fitbitAccessToken === null) return

    console.log(fitbitAccessToken)
}


getRandomBackground()
getCurrentTime()
getLocalWeather()
getFitbitInfo()