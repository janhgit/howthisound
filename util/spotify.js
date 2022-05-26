const SpotifyWebApi = require("spotify-web-api-node")



    var scopes = ['user-read-private', 'user-read-email', 'user-read-currently-playing','user-read-recently-played', "user-top-read", "user-library-read"],
    redirectUri = 'http://localhost:3000/api/auth/callback/spotify'
    clientId = process.env.SPOTIFY_CLIENT_ID
    state = null;
  
  // Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
  var spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId
  });
  
  // Create the authorization URL
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  
  // https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
  const SpotiyAuthUrl = authorizeURL


