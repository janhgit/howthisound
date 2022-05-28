import axios from "axios"

const lfmAArtistInfo =async (ar) => {
    // console.log(ar)
    const reqURL = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(ar)}&api_key=${process.env.LASTFM_API_KEY}&format=json`
    const req = axios.get(reqURL)
    const res = req.then(async (r) => { return await r.data}).catch(err => { console.error(err.data)})
    return await res
}

export default lfmAArtistInfo