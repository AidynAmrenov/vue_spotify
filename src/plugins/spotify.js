// plugins/spotify.js
import axios from 'axios'

const headers = {
    Accept: 'application/json',
}

export const auth = axios.create({
    baseURL: 'https://accounts.spotify.com/api',
    headers,
})

export default axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers,
})
