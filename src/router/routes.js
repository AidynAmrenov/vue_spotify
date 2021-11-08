import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

export default [
    {
        path: '/login',
        name: 'auth.login',
        component: Login
    },
    {
        path: '/',
        name: 'home',
        component: Home
    },
]
