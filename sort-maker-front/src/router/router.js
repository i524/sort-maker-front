import Vue from 'vue'
import VueRouter from 'vue-router'
import { Home, Login, MyPage, PlaySort, RegisterSort } from '../views'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/mypage', component: MyPage },
        { path: '/play_sort', component: PlaySort },
        { path: '/register_sort', component: RegisterSort },
    ],
})

export default router
