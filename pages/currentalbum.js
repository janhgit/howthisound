import { useSession, signIn, signOut, getSession } from "next-auth/react"
import Image from "next/image";
import { promisify } from "util";
import lfmAlbumInfo from "../misc/lfmAlbumInfo";
import Navbar from "../modules/navbar";
import styles from "../styles/currentalbum.module.css"
import buttons from "../styles/mainpage.module.css"
import SpotifyWebApi from 'spotify-web-api-node'
import lfmArtistInfo from "../misc/lfmArtistInfo";
import ReactStars from 'react-stars'
import dbConnect from "../util/dbConnect";
import Router from "next/router";
import spotifyicon from "../images/Spotify_Icon_RGB_Green.png"
import spotifylogo from "../images/Spotify_Logo_RGB_Green.png"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";




export async function getServerSideProps(ctx) {
    const session = await getSession({ ctx })
    dbConnect()
    var spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    spotifyApi.setAccessToken(session.user.accessToken);
    const request = spotifyApi.getMyCurrentPlayingTrack()
    const ret = request.then(async (data) => {
        return {
            artistname: data.body.item.artists[0].name,
            supa: data.body.item
        }
    })


    const artistName = (await ret).artistname
    const ArtistInfo = await lfmArtistInfo(artistName)
    console.log(ArtistInfo.artist.name)

    const albumInfo = await lfmAlbumInfo(artistName, (await ret).supa.album.name)
    const user = {
        name: session.user.name,
        image: session.user.image,
    }



    return {
        props: {
            info: (await ret).supa,
            user: user,
            albumInfo: (await albumInfo).album
        }
    }

}

const CurrentAlbum = ({ info, user, albumInfo }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height: 700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 50,
        p: 4,
    };
    let rating;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const redirect = (pushTo) => {
        Router.push(pushTo)
    }
    const width = 5400
    const hight = 5400
    console.log()
    const ratingChanged = (newRating) => {
        rating = newRating
        alert(`You Successfully rated this Album ${newRating} / 5`)
    }
    // const albumTracks = albumInfo.tracks.track
    // const albumLenght = albumTracks.length / 2
    // const roundedLenght = Math.round(albumLenght)

    const list = albumInfo.tracks.track
    const half = Math.ceil(list.length / 2);
    const firstHalf = list.slice(0, half)
    const secondHalf = list.slice(-half)
    const marginnnntop = 39.5;
    return (
        <div>
            <Navbar url={user.image}></Navbar>
            <div className="card mb-3 position-absolute top-50 start-50 translate-middle" >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={info.album.images[0].url} className="img-fluid card-img-left" alt="..."></img>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h3 className="card-title">{info.album.name}</h3>
                            <h5 className="card-text">{info.artists[0].name}</h5>
                            <p className="card-text"><small className="text-muted">This Album has: {albumInfo.playcount} Plays on <a>last.fm</a></small></p>
                            {/* <p>{albumInfo.wiki.summary}</p> */}

                            <div className="PublicRating">
                                <p>Public Voting: </p>
                                <ReactStars
                                    count={5}
                                    size={60}
                                    onChange={ratingChanged}
                                    half={true}
                                    value={4.5}
                                    edit={false}
                                    color2={'#ffd700'} />
                                <small className="text-muted" >Public Votes Get Refreshed Every 24H</small>
                                <Button onClick={handleOpen} className={buttons.button56}>Review This Album</Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Review {info.album.name} by {info.artists[0].name}
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            <form action="/api/review/newReview" method="post">
                                                <label for="first">Review:</label>
                                                <textarea type="text" id="FIRSTNAME" name="reviewtext" />
                                                <ReactStars
                                                    count={5}
                                                    size={60}
                                                    onChange={ratingChanged}
                                                    half={true}
                                                    value={4.5}
                                                    color2={'#ffd700'} />
                                                <br />
                                                <button type="submit" className={buttons.button56}>Submit</button>
                                            </form>
                                        </Typography>
                                    </Box>
                                </Modal>
                            </div>
                        </div>
                    </div>
                    <button className={buttons.button56} onClick={() => redirect(info.album.external_urls.spotify)} role="button">Listen On Spotify! </button>
                </div>
            </div>
            <div className="text-center">
                <ol>
                    <div className="text-left">
                        {albumInfo.tracks.track.map(function (d, idx) {
                            return (<li key={idx}>{d.name} </li>)
                        })}
                    </div>
                </ol>


            </div>
        </div>
    );
}




export default CurrentAlbum;