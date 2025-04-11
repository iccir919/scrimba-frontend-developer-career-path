const urlParams = new URLSearchParams(window.location.hash.substring(1));
const accessToken = urlParams.get('access_token');

if (accessToken) {
  console.log('Access Token:', accessToken);
} else {
  console.log('Access token not found in URL');
}