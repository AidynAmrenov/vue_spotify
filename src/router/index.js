import {createRouter, createWebHistory} from 'vue-router'
import routes from './routes'
import store from '../store'

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {

    const check = store.getters["auth/check"]
    const isAuthPage = to.name.startsWith('auth.')

    if (isAuthPage && check) {
        next({ name: 'home' })
    }
    else if (!isAuthPage && !check) {
        next({ name: 'auth.login' })
    }
    else {
        next()
    }

})

export default router
