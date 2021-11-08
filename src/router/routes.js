import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import AuthCallback from '../views/AuthCallback.vue'

export default [
    {
        path: '/login',
        name: 'auth.login',
        component: Login
    },
    {
        path: '/callback',
        name: 'auth.callback',
        component: AuthCallback,
    },
    {
        path: '/',
        name: 'home',
        component: Home
    },
]
