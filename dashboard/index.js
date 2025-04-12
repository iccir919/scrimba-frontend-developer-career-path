function getRandomBackground() {
    fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
        .then(res => res.json())
        .then(data => {
            document.body.style.backgroundImage = `url(${data.urls.regular})`
            document.getElementById("author").textContent = `Background photo by: ${data.user.name}`
        })
        .catch(err => {
            // Use a default background image/author
            document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
    )`
            document.getElementById("background-photo-author").textContent = `Background photo by: Dodi Achmad`
        })
}


function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
    setInterval(getCurrentTime, 1000)
}


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

function getBrowsingHistory() {
    const today = Date.now()
    const sevenDaysAgo = Date.now() - (1 * 24 * 60 * 60 * 1000);
    chrome.history.search({ text: "", startTime: sevenDaysAgo, endTime: today }, function(results) {
        results.forEach(function(page) {
          console.log(page.title + ': ' + page.url);
        });
    });
}

getBrowsingHistory()
getRandomBackground()
getCurrentTime()
getLocalWeather()