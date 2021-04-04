import Vue from 'vue'
import VueRouter from 'vue-router'
import {
    isLoggedIn
} from '../auth/utils'

Vue.use(VueRouter)

const routes = [{
        path: '/admin/login',
        name: 'login',
        component: () => import('../pages/admin/login'),
        meta: {
            layout: 'full'
        }
    }, {
        path: '/admin/',
        name: 'dashboard',
        component: () => import('../pages/admin/dashboard'),
        meta: {
            redirectIfLoggedIn: true,
            layout: 'not-full'
        }
    },
    {
        path: '/admin/products',
        name: 'products',
        component: () => import('../pages/admin/admin-product'),
        meta: {
            redirectIfLoggedIn: true,
            layout: 'not-full'
        }
    },
    {
        path: '/admin/product-type',
        name: 'product-type',
        component: () => import('../pages/admin/product-type'),
        meta: {
            redirectIfLoggedIn: true,
            layout: 'not-full'
        },
    },
    {
        path: '/admin/profile',
        name: 'profile',
        component: () => import('../pages/admin/profile'),
        meta: {
            redirectIfLoggedIn: true,
            layout: 'not-full'
        }
    },
    {
        path: '/admin/users',
        name: 'users',
        component: () => import('../pages/admin/users'),
        meta: {
            redirectIfLoggedIn: true,
            layout: 'not-full'
        }
    },
    {
        path: '/',
        name: 'home',
        component: () => import('../pages/client/home'),
        meta: {
            isHomePage: true
        }
    },
    {
        path: '/products',
        name: 'client-products',
        component: () => import('../pages/client/products'),
        meta:{
            isHomePage: true
        }
    },
    {
        path: '/products/categories/:pryp_id',
        name: 'client-products',
        component: () => import('../pages/client/products'),
        meta:{
            isHomePage: true
        }
    },
    {
        path: '/categories',
        name: 'client-categories',
        component: () => import('../pages/client/categories'),
        meta:{
            isHomePage: true
        }
    },
    {
        path: '/products/:id',
        name: 'client-product-details',
        component: () => import('../pages/client/product-details'),
        meta:{
            isHomePage: true
        }
    }
]
const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach((to, _, next) => {
    const loggedIn = isLoggedIn()
    if (to.meta.redirectIfLoggedIn && loggedIn) {
        return next();
    }
    if (!loggedIn && to.name !== 'login') return next({
        name: 'login'
    })
    if (to.name === 'login' && loggedIn) {
        return next({
            name: 'dashboard'
        })
    }
    return next();
})
export default router;
