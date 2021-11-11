// auth.js
import spotify from '../plugins/spotify'
import qs from 'qs'
import { encode } from 'js-base64'
import axios from "axios";

export default {
    namespaced: true,
    state: {
        token: null,
        expired_at: null,
    },
    getters: {
        check(state) {

            if (!state.expired_at) {
                return false
            }

            return state.token !== null && state.expired_at > Date.now()
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
        setExpiredAt(state, expired_at) {
            state.expired_at = expired_at
            localStorage.setItem('spotify_expired_at', JSON.stringify(expired_at))
        },
        clearExpiredAt(state) {
            state.expired_at = null
            localStorage.removeItem('spotify_expired_at')
        },
    },
    actions: {
        init({ state, commit, getters, dispatch }) {
            const token = localStorage.getItem('spotify_token')
            const expired_at = localStorage.getItem('spotify_expired_at')

            if (token) {
                commit('setToken', JSON.parse(token))
            }

            if (expired_at) {
                commit('setExpiredAt', JSON.parse(expired_at))
            }

            if (!getters.check) {
                commit('clearToken')
                commit('clearExpiredAt')
            } else {

                if (state.expired_at - Date.now() <= 1000 * 60 * 5) {
                    dispatch('refresh').then(success => {
                        if (!success) {
                            commit('clearToken')
                            commit('clearExpiredAt')
                        }
                    })
                }

                dispatch('startTimer')
            }

        },
        startTimer({ state, commit, dispatch }) {
            if (!state.expired_at) {
                return
            }

            const timer = setInterval(() => {
                const now = Date.now()
                const diff = state.expired_at - now

                if (diff <= 0) {
                    clearInterval(timer)
                    commit('clearToken')
                    commit('clearExpiredAt')
                } else if (diff <= 1000 * 60 * 5) {
                    dispatch('refresh').then(success => {

                        if (!success) {
                            commit('clearToken')
                            commit('clearExpiredAt')
                        }

                    })
                }

            }, 60000)

        },
        async refresh({ state, commit }) {
            const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID
            const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
            const url = 'https://accounts.spotify.com/api/token'

            const encoded_auth = encode(`${client_id}:${client_secret}`)

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${encoded_auth}`
            }

            const query = {
                grant_type: 'refresh_token',
                refresh_token: state.token,
            }

            return await axios.post(url, qs.stringify(query), {headers})
                .then(response => {
                    const { access_token, expired_in } = response.data
                    const expired_at = Date.now() + expired_in * 1000

                    commit('setToken', access_token)
                    commit('setExpiredAt', expired_at)

                    return true
                })
                .catch(() => false)
        },
        login() {
            const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
            const url = 'https://accounts.spotify.com/authorize'
            const query = qs.stringify({
                response_type: 'token',
                client_id: clientId,
                redirect_uri: 'http://localhost:3000/callback'
            })

            window.location = `${url}?${query}`
        }
    },
}
