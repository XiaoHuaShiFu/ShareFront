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
        path: '/search',
        name: 'Search',
        meta: {
            title: '分享搜素 分享-随时随地发现好玩事',
        },
        component: () => import('../views/Search.vue')
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
        path: '/user/home/mymessage',
        name: 'UserHomeMyMessage',
        meta: {
            title: '我的消息 分享-随时随地发现好玩事',
        },
        component: () => import('../views/UserHomeMyMessage.vue')
    },
    {
        path: '/admin/login',
        name: 'AdminLogin',
        meta: {
            title: '登录 分享-管理端',
        },
        component: () => import('../views/admin/Login.vue')
    },
    {
        path: '/admin/user',
        name: 'AdminUser',
        meta: {
            title: '用户管理 分享-管理端',
        },
        component: () => import('../views/admin/User.vue')
    },
    {
        path: '/admin/sensitive',
        name: 'AdminSensitive',
        meta: {
            title: '敏感词管理 分享-管理端',
        },
        component: () => import('../views/admin/Sensitive.vue')
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
