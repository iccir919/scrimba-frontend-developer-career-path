const urlParams = new URLSearchParams(window.location.hash.substring(1))
const fitbitAccessToken = urlParams.get('access_token')
const statusText = document.getElementById("connect-fitbit-status")

console.log("Content here")

if (fitbitAccessToken) {
    chrome.storage.sync.set({ "fitbitAccessToken": fitbitAccessToken })
      .then(() => {
      console.log("Fitbit access token is set");
      })
      .catch((e) => {
        console.log(e)
      })

} else {
  statusText.innerHTML = `<h2>
    Fitbit not connected. Please <a href="connect.html">try again</a>.
  </h2>`
}