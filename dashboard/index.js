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
                console.log(data)
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

function handleBrowsingHistory(results) {

    const hostVisitCounts = {}

    results.map(site => {
        const url = new URL(site.url)
        return {
            host: url.host,
            visitCount: site.visitCount
        }
    })
    .forEach(site => {
        if ( hostVisitCounts[site.host] ) hostVisitCounts[site.host] += site.visitCount
        else hostVisitCounts[site.host] = site.visitCount
    }) 

    const top10Hosts = Object.entries(hostVisitCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)



    document.getElementById('history').innerHTML = `
        <table>
            <caption>Your 10 most visited sites in last 7 days</caption>
            <thead>
                <tr>
                    <th>Host name</th>
                    <th>Visit count</th>
                </tr>
            </thead>

            <tbody>
                ${top10Hosts.map(result => `
                    <tr>
                        <td>${result[0]}</td>
                        <td class="visit-count">${result[1]}</td>
                    </tr>
                `)}
            </tbody>
        </table>
    `
}

function getBrowsingHistory() {
    const today = Date.now()
    const sevenDaysAgo = Date.now() - (1 * 24 * 60 * 60 * 1000);
    chrome.history.search({ text: "", startTime: sevenDaysAgo, endTime: today }, handleBrowsingHistory);
}


function getMaxPushUps() {
    const userProfile = JSON.parse(localStorage.getItem("maxPushUpsUserProfile"))
    const maxPushUpsGoal = document.getElementById("max-push-ups-goal-amt")
    const maxTestPrevAttempts = document.getElementById("max-test-prev-attempts")


    if (userProfile) {
        maxPushUpsGoal.innerHTML = `
            <h3>Goal amount: ${userProfile.goal.amount}</h3>
            <p>Goal set on: ${new Date(userProfile.goal.dateSet).toLocaleDateString()}</p>
        `

        maxTestPrevAttempts.innerHTML = `
            <h3>Previous Maximum Test Attempts</h3>
            ${getPreviousTestsHTML(userProfile)}
            <h4>Maximum Push-Ups Test Entry Form</h4>
            <form id="max-test-entry-form">
                <label for="test-entry-date">Test date: </label>
                <input type="" id="test-entry-date" required />
                <label for="test-entry-amount">Maximum amount of consecutive push-ups:</label>
                <input type="number" id="test-entry-amount" required />
                <button type="submit">Submit test entry</button>
            </form>
        `

        const maxTestEntryForm = document.getElementById("max-test-entry-form")
        maxTestEntryForm.addEventListener("submit", handleMaxTestEntry)
    } else {
        maxPushUpsGoal.innerHTML = `
            <p>Set a goal for the maximum amount of consecutive push-up reps you are trying to reach</p>
            <form id="max-push-ups-goal-form">
                <label for="push-ups-goal-amount">Number of push-ups</label>
                <input type="number" id="push-ups-goal-amount" required />
                <button type="submit">Set goal amount</button>
            </form>
        `
        const maxPushUpsGoalForm = document.getElementById("max-push-ups-goal-form")

        maxPushUpsGoalForm.addEventListener("submit", handleGoalSubmission)
    }
}

function getPreviousTestsHTML(userProfile) {
    if (userProfile.previousAttempts.length === 0) {
        return `
            <p>You have not yet logged any previous maximum consecutive push-up attempts.</p>
            <p>Complete the test and log the result below.</p>
        `
    } else {
        return `
            <ul>
                ${userProfile.previousAttempts
                    .map(attempt => `
                        <li class="max-test-entry">
                            <p>Date: ${attempt.date}</p>
                            <p>Amount achieved: ${attempt.amount}</p>
                        </li>    
                    `)
                }
            </ul>
        `
    }
}

function handleMaxTestEntry(e) {
    e.preventDefault()
    console.log("Test entry submitted!")
}


function handleGoalSubmission(e) {
    e.preventDefault()
    const maxPushUpsGoalAmt = Number(document.getElementById("push-ups-goal-amount").value)
    console.log(maxPushUpsGoalAmt)
    const userProfile = {
        goal: {
            dateSet: new Date(),
            amount: maxPushUpsGoalAmt
        },
        previousAttempts: []
    }

    localStorage.setItem("maxPushUpsUserProfile", JSON.stringify(userProfile))
    getMaxPushUps()

}

getMaxPushUps()
getBrowsingHistory()
getRandomBackground()
getCurrentTime()
getLocalWeather()