import axios from "axios"

const lfmAlbumInfo =async (ar,al) => {
    const reqURL = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${process.env.LASTFM_API_KEY}&artist=${ar}&album=${al}&format=json`
    const req = axios.get(reqURL)
    const res = req.then(async (r) => { return await r.data})
    return await res
}

export default lfmAlbumInfo