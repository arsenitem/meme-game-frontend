import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import routeGuards from '../utils/routeGuards';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'UsernameInput',
        component: () => import('../components/UsernameInput.vue'),
    },
    {
        path: '/rooms',
        name: 'RoomsList',
        component: () => import('../components/RoomsList.vue'),
        beforeEnter: routeGuards.beforeEnter
    },
    {
        path: '/rooms/:id',
        name: 'Room',
        component: () => import('../components/Room.vue'),
        beforeEnter: routeGuards.beforeEnter
    },
    {
        path: '/rooms/:id/game',
        name: 'Game',
        component: () => import('../components/Game/Game.vue'),
        beforeEnter: routeGuards.beforeEnter
    }
]

export default createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})