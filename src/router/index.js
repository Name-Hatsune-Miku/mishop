import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        redirect: '/register',
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
        redirect: '/about/configplay',
        children: [
            {
                path: 'index',
                name: 'index',
                component: () => import(/* webpackChunkName: "about" */ '../components/IndexPage')
            },
            {
                path: 'enterprise',
                name: 'enterprise',
                component: () => import(/* webpackChunkName: "about" */ '../components/EnterpriseParts')
            },
            {
                path: 'configplay',
                name: 'configplay',
                component: () => import(/* webpackChunkName: "about" */ '../components/ConfigPlay')
            },
            {
                path: 'configuser',
                name: 'configuser',
                component: () => import(/* webpackChunkName: "about" */ '../components/ConfigUser')
            },
            {
                path: 'teacher',
                name: 'teacher',
                component: () => import(/* webpackChunkName: "about" */ '../components/TeacherList')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
