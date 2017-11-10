const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const spotifyApi = new SpotifyWebApi({
 clientId : process.env.SPOTIFY_CLIENT_ID,
 clientSecret : process.env.SPOTIFY_CLIENT_SECRET,
 redirectUri : process.env.REDIRECT_URI,
});

module.exports = spotifyApi;