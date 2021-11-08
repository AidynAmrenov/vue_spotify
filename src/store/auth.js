// auth.js
import spotify from '../plugins/spotify'
import qs from 'qs'

export default {
    namespaced: true,
    state: {
        token: null,
    },
    getters: {
        check(state) {
            return state.token !== null
        },
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            spotify.defaults.headers.Authorization = `Bearer ${token}`
            localStorage.setItem('spotify_token', JSON.stringify(token))
        },
        clearToken(state) {
            state.token = null
            spotify.defaults.headers.Authorization = null
            localStorage.removeItem('spotify_token')
        },
    },
    actions: {
        init({ commit }) {
            const token = localStorage.getItem('spotify_token')

            if (token) {
                commit('setToken', JSON.parse(token))
            }

        },
        login() {
            const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
            const url = 'https://accounts.spotify.com/authorize'
            const query = qs.stringify({
                response_type: 'code',
                client_id: clientId,
                redirect_uri: 'http://localhost:3000/callback'
            })

            window.location = `${url}?${query}`
        }
    },
}
