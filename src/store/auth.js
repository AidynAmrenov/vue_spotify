// auth.js
import {auth} from '../plugins/spotify'

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

            return auth.post('token', {
                grant_type: 'client_credentials',
            }, {headers})
                .then(response => {
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
