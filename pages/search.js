import syles from "../styles/searchsite.module.css"
import SpotifyWebApi from "spotify-web-api-node"
import { getSession } from "next-auth/react"
import Navbar from "../modules/navbar"
import Router from "next/router"
import buttons from "../styles/mainpage.module.css"
export async function getServerSideProps(ctx) {
    const session = await getSession({ ctx })

    var spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });
    spotifyApi.setAccessToken(session.user.accessToken);
    if (ctx.query.album) {
        const req = await spotifyApi.searchAlbums(ctx.query.album).then(r => { return r.body.albums.items })
        console.log(await req)
        return {
            props: {
                searchResults: await req
            }
        }
    }

    return {
        props: { message: `No album :(` }
    }

    // spotifyApi.searchAlbums()
}
const Search = ({ searchResults, message }) => {
    const redirect = (r) => {
        Router.push(`/review?id=${r}`)
    }
    const Spotifyredirect = (r) => {
        Router.push(r)
    }
    if (!searchResults) {
        return (
            <div>
                <Navbar></Navbar>
                CMON SEARCH FOR SOMETHING!
                <form action="/search" method="get">
                    <label for="first">Search For An Album:</label>
                    <input type="text" id="FIRSTNAME" name="album" autoComplete={false} />
                    <br />
                    <button type="submit" >Submit</button>
                </form>

            </div>
        )
    }
    return (
        <div >
            <Navbar></Navbar>
            <form action="/search" method="get">
                <label for="first">Search For An Album:</label>
                <input type="text" id="FIRSTNAME" name="album" />
                <br />
                <button type="submit" >Submit</button>
            </form>

            <div>

                {searchResults.map(function (d, idx) {
                    const newLocal = 18;
                    return (<div>
                        <div className="card mb-3 " >
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={d.images[1].url} className="img-fluid card-img-left" alt="..."></img>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h3 className="card-title">{d.name}</h3>
                                        <h5 className="card-text">{d.artists[0].name}</h5>
                                        <button className={buttons.button56} onClick={() => redirect(d.id)}>Review This Album</button>
                                        
                                    </div>
                                </div>
                                <button className={buttons.button56} onClick={() => Spotifyredirect(d.external_urls.spotify)} role="button">Listen On Spotify! </button>
                            </div>
                        </div>
                    </div>)
                })}

            </div>
        </div>
    )

}

export default Search


{/* <div className="card mb-5">
                        <div className="row g-0">
                            <div className="cold md-4">
                                <img src={d.images[1].url}></img>
                            </div>
                            <div className="col-md-2">
                            <div className="card-body">

                                <div className="card-title">{d.name}</div>
                                <div className="card-test">{d.artists[0].name}</div>
                            </div>

                            </div>
                        </div>
                    </div>) */}