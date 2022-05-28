import { useSession, signIn, signOut, getSession } from "next-auth/react"
import styles from "../styles/mainpage.module.css"
import Image from 'next/image'
import Navbar from "../modules/navbar"
import SpotifyWebApi from "spotify-web-api-node"
import Router from 'next/router'
import { useEffect } from "react";
import spotifylogo from "../images/Spotify_Logo_RGB_Green.png"
export async function getServerSideProps(ctx) {


  const session = await getSession({ ctx })
  if (session) {
    var spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });


    spotifyApi.setAccessToken(session.user.accessToken);
    const request = spotifyApi.getMyCurrentPlayingTrack()
    const ret = request.then(async (data) => {
      console.log(data.body.item)
      const Final = {
        trackName: await data.body.item.name,
        artistName: await data.body.item.artists[0].name,
        albumName: await encodeURIComponent(data.body.item.album.name),
        albumCover: await data.body.item.album.images[2].url
      }
      console.log(Final)
      return Final
    })


    console.log(await ret)
    return {
      props: {
        current: await ret,

      },
    }


  }

  return {
    props: {
      message: "Please Log in!"
    }
  }

}

const redirect = async (album, artist) => {
  Router.push(`/currentalbum`)
}
const redWhat = () => {
  Router.push("/about")
}

export default function Component({ current }) {

  const { data: session } = useSession();
  // console.log(session)


  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  if (session) {

    const album = encodeURIComponent(current.albumName)
    const artist = encodeURIComponent(current.artistName)
    console.log(artist)
    return (
      <>
        <Navbar url={session.user.image} />
        <div className={styles.wrapper}>
          <div className={styles.main}>

            <h1 className={styles.welcome}>Welcome!</h1>
            Signed in as {session.user.name} <br />
            <div>Now Playing {current.trackName} by {current.artistName}</div>
            {/* <img src={current.albumCover}></img> */}
            <button onClick={() => redirect(album, encodeURIComponent(current.artistName))}>Review This Album!</button>

            <br />
            <br />
            <br />
            <center>
              <button className={styles.button56} onClick={() => signOut()} role="button">Sign out </button>
            </center>
            <div className={styles.logo}>
              <Image
                src={spotifylogo}
                alt="Spotify Logo"
              // 2
              />
            </div>
            <div>this application is using spotify data. Read more <a href="/policy/tos">here</a></div>

          </div>

        </div>
      </>
    )
  }
  return (
    <>
      <div className={styles.main}>
        <h1>Welcome to ThisSoundGood?</h1>
        Not signed in <br />
        <center>
          <br></br>
          <button className={styles.button56} onClick={() => signIn("lastfm")} role="button">Sign In </button>

          <br></br>
          <br></br>
          <button className={styles.button56} onClick={() => redWhat()} role="button">What is this?</button>
          <div className={styles.logo}>
              <Image
                src={spotifylogo}
                alt="Spotify Logo"
              // 2
              />
            </div>
            <div>this application is using spotify data. Read more <a href="/policy/tos">here</a></div>

        </center>
      </div>
    </>
  )
}