import { useSession, signIn, signOut, getSession } from "next-auth/react"
import styles from "../styles/mainpage.module.css"
import Image from 'next/image'
import Navbar from "../modules/navbar"
import nowPlaying from "../misc/nowPlaying"
import SpotifyWebApi from "spotify-web-api-node"
export async function getServerSideProps(ctx) {


  const session = await getSession({ctx})
  if(session){
    var spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });
  
  
    spotifyApi.setAccessToken(session.user.accessToken);
    const request = spotifyApi.getMyCurrentPlayingTrack()
    const ret =  request.then( async (data)  => {
      console.log(data.body.item)
      const Final = {
        trackName : await data.body.item.name,
        artistName: await data.body.item.artists[0].name 
      }
      console.log(Final)
      return Final  
    })

    
    console.log(await ret)
    return {
      props: {
        current : await ret
      }, 
    }

    
  }

  return{
      props: {
        message : "Please Log in!"
      }
  }
  
}



export default function Component({current}) {
 
  const { data: session } = useSession()
  if (session) {
    const myLoader = ({ src, width, quality }) => {
      return session.user.image || 75
    }
    console.log(current)

    return (
      <>
        <Navbar url={session.user.image}/>
        <div className={styles.main}>
          
          <h1>Welcome!</h1>
          Signed in as {session.user.name} <br />
          <div>Now Playing {current.trackName} by {current.artistName}</div>
          <button>Review This Album!</button>
          {/* <Image
            loader={myLoader}
            src={session.user.image}
            alt="Picture of the author"
            width={100}
            height={100}
          /> */}
          <center>
            <button className={styles.button56} onClick={() => signOut()} role="button">Sign out </button>
          </center>


          
        </div>
        <footer>THIS APPLICATION IS USING SPOTIFY DATA!</footer>
      </>
    )
  }
  return (
    <>
      <div className={styles.main}>
        <h1>Welcome to MusicBox!</h1>
        Not signed in <br />
        <center>
          <button className={styles.button56} onClick={() => signIn()} role="button">Sign In </button>
        </center>
      </div>
    </>
  )
}