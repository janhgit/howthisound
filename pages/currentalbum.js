import { useSession, signIn, signOut, getSession } from "next-auth/react"
import Image from "next/image";
import { promisify } from "util";
import lfmAlbumInfo from "../misc/lfmAlbumInfo";
import Navbar from "../modules/navbar";
import styles from "../styles/currentalbum.module.css"
export async function getServerSideProps(ctx) {
    const queryAlbum = decodeURIComponent(ctx.query.name)
    const queryArtist = decodeURIComponent(ctx.query.artist)
    const session = await getSession({ ctx })
    // var res = []
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    if (!queryAlbum) {
        return {
            redirect: {
                destination: '/search',
                permanent: false,
            },
        }
    }


console.log( await lfmAlbumInfo(queryArtist, queryArtist))
    return {
        props: {
            info: await lfmAlbumInfo(queryArtist, queryArtist),
            album: queryAlbum
        }
    }


}

const currentAlbum = ({ info, album }) => {
    const { data: session } = useSession()
    const width = 540
    console.log(info)
    return (
        <div>
            <div className="card mb-3 position-absolute top-50 start-50 translate-middle" style={{maxWidth: width + "px"}}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={info.album.image[3]['#text']} className="img-fluid rounded-start" alt="..."></img>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h3 className="card-title">{album}</h3>
                            <h5 className="card-text">{info.album.artist}</h5>
                            <p></p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}




export default currentAlbum;