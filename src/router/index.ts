import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

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
    },
    {
        path: '/rooms/:id',
        name: 'Room',
        component: () => import('../components/Room.vue')
    }
]

export default createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})