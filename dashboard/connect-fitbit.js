const urlParams = new URLSearchParams(window.location.hash.substring(1))
const fitbitAccessToken = urlParams.get('access_token')
const statusText = document.getElementById("connect-fitbit-status")

if (fitbitAccessToken) {
    localStorage.setItem('fitbitAccessToken', fitbitAccessToken)
    statusText.innerHTML = "<h2>Fitbit connected!</h2>"

} else {
  statusText.innerHTML = `<h2>
    Fitbit not connected. Please <a href="connect.html">try again</a>.
  </h2>`
}