function getRandomBackground() {
    fetch("https://picsum.photos/1920/1080", {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            console.log(res)
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

getRandomBackground()
getCurrentTime()