import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/user/home',
        name: 'UserHome',
        component: () => import('../views/UserHome.vue')
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('../views/test.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
