import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import SpotifyProvider from "next-auth/providers/spotify"

const SpotifyWebApi = require("spotify-web-api-node")
const LastfmAPI = require('lastfmapi');
var scopes = ['user-read-private', 'user-read-email', 'user-read-currently-playing', 'user-read-recently-played', "user-top-read", "user-library-read"]
var redirectUri = 'http://localhost:3000/api/auth/callback/spotify'
var clientId = process.env.SPOTIFY_CLIENT_ID
var state = null;
var spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId
});
var lfm = new LastfmAPI({
	'api_key' : process.env.LASTFM_API_KEY,
	'secret' : process.env.LASTFM_API_SECRET
});

var LfmauthUrl = lfm.getAuthenticationUrl({ 'cb' : 'http://localhost:3000/api/auth/callback/lastfm' });

var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
const SpotiyAuthUrl = authorizeURL

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

    console.log("refres token is" , refreshedToken)

    return{
      ...token,
      accessToken: refreshAccessToken.access_token,
      accessTokenExpires: Date.now() + refreshToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,

    }
  } catch (error) {
    return {

      ...token,
      error: "refrshotoken erroe"
    }
  }
}

console.log(LfmauthUrl)
export default NextAuth({

  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: SpotiyAuthUrl
    }),
    {
      id: "lastfm",
      name:"Last.fm",
      authorization: LfmauthUrl,
      type: 'oauth',
      clientId: process.env.LASTFM_API_KEY,
    }
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      // console.log(token,account,user, "JWT CALL!!!!!!!!!!!!!!!!!!!!!!!")
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000

        }
      }
      if (Date.now() < token.accessTokenExpires) {
        console.log("token valid")
        return token
      }
      return await refreshAccessToken(token)
    },

    async session({session , token}){
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username
      return session
    }
  }
})

