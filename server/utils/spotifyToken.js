const axios = require('axios');

let accessToken = null;

async function getSpotifyAccessToken() {
  if (accessToken) return accessToken;

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

  accessToken = response.data.access_token;
  setTimeout(() => accessToken = null, 1000 * 60 * 59); // expire in 59 minutes
  return accessToken;
}

module.exports = getSpotifyAccessToken;
