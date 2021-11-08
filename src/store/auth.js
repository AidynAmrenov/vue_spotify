// auth.js
import {auth} from '../plugins/spotify'
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
        },
        clearToken(state) {
            state.token = null
        },
    },
    actions: {
        login({commit}, credentials) {

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password),
            }

            const query = qs.stringify({
                grant_type: 'client_credentials',
            })

            console.log(credentials, headers, query)

            return auth.post('token', query, { headers })
                .then(response => {
                    console.log(response.data)
                    commit('setToken', response.data.access_token)
                    return true
                })
                .catch(error => {
                    console.error(error)
                    return false
                })
        }
    },
}
