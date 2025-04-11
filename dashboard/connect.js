const fitbitAccessToken = localStorage.getItem("fitbitAccessToken")
const fitbitStatusText = document.getElementById("fitbit-status")

if (fitbitAccessToken) {
    fitbitStatusText.innerText = "Connected!"
} else {
    fitbitStatusText.innerText = "Not connected!"
}

document.getElementById("fitbit-link").href = getFitbitAuthorizeUri()

function getFitbitAuthorizeUri() {
    const fitbitAuthorizeUri = new URL("https://www.fitbit.com/oauth2/authorize")
    const params = new URLSearchParams({
        client_id: "23QDPZ",
        response_type: "token",
        scope: "activity heartrate profile sleep",
        redirect_uri: "https://neil-scrimba-frontend-career-path.netlify.app/dashboard/connect-fitbit.html",
        expires_in: 31536000
    })
    fitbitAuthorizeUri.search = params
    return fitbitAuthorizeUri.toString() 
}

