import {createRouter, createWebHistory, Router, RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('../components/main.vue')
    }, {
        path: '/HW',
        name: 'HW',
        component: () => import('../components/HelloWorld.vue')
    }, {
        path: '/map',
        name: 'map',
        component: () => import('../components/map.vue')
    }
]
const router: Router = createRouter({
    history: createWebHistory(),
    routes
})


export default router