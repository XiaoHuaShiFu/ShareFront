import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/**
 * 路由
 */
const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: '分享-随时随地发现好玩事',
        },
        component: () => import('../views/Home.vue')
    },
    {
        path: '/user/home',
        name: 'UserHome',
        meta: {
            title: '我的首页 分享-随时随地发现好玩事',
        },
        component: () => import('../views/UserHome.vue')
    },
    {
        path: '/share',
        name: 'Share',
        meta: {
            title: '分享-随时随地发现好玩事',
        },
        component: () => import('../views/Share.vue')
    },
    {
        path: '/user/home/collection',
        name: 'UserHomeCollection',
        meta: {
            title: '我的收藏 分享-随时随地发现好玩事',
        },
        component: () => import('../views/UserHomeCollection.vue')
    },
    {
        path: '/user/home/myshare',
        name: 'UserHomeMyShare',
        meta: {
            title: '我的分享 分享-随时随地发现好玩事',
        },
        component: () => import('../views/UserHomeMyShare.vue')
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

/**
 * 给页面加上标题
 */
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router
