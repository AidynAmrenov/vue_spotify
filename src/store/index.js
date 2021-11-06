import {createStore} from 'vuex'
import app from './app'
import auth from './auth'

export default createStore({
    ... app,
    modules: { auth }
})
