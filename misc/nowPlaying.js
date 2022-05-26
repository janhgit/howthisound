const SpotifyWebApi = require("spotify-web-api-node")
// import { spotifyApi } from "../pages/api/auth/[...nextauth]"

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });


const nowPlaying = (token) => {
    spotifyApi.setAccessToken(token);
    spotifyApi.getMyCurrentPlayingTrack()
    .then(function(data) {
      console.log('Now playing: ' + data.body.item.name);
    }, function(err) {
      console.log('Something went wrong!', err);
    });
}


export default nowPlaying;