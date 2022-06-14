import { getSession, useSession } from "next-auth/react";
import ReactStars from "react-stars";
import SpotifyWebApi from "spotify-web-api-node"
var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});
import buttons from "../../styles/mainpage.module.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";
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





export async function getServerSideProps(ctx) {
    const session = await getSession({ ctx })
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    spotifyApi.setAccessToken(session.user.accessToken);
    const albumID = ctx.query.id
    const req = await spotifyApi.getAlbum(albumID).then(r => { return r.body })

    return {
        props: {
            albuminfo: await req

        }
    }


}


const Index = ({albuminfo}) => {
    const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
    return (
        <div>
            <div className="card mb-3 position-absolute top-50 start-50 translate-middle" >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={albuminfo.images[0].url} className="img-fluid card-img-left" alt="..."></img>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h3 className="card-title">{albuminfo.name}</h3>
                            <h5 className="card-text">{albuminfo.artists[0].name}</h5>
                            <div className="PublicRating">
                                <p>Public Voting: </p>
                                <ReactStars
                                    count={5}
                                    size={60}
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
                                            Review {albuminfo.name} by {albuminfo.artists[0].name}
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            <form action="/api/review/newReview" method="post">
                                                <label for="first">Review:</label>
                                                <textarea type="text" id="FIRSTNAME" name="reviewtext" />
                                                <ReactStars
                                                    count={5}
                                                    size={60}
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
                    {/* <button className={buttons.button56} onClick={() => redirect(albuminfo.album.external_urls.spotify)} role="button">Listen On Spotify! </button> */}
                </div>
            </div>
        </div>
    )
}


export default Index