import Vue from 'vue'
import VueRouter from 'vue-router'
import {
    EditSort,
    Home,
    Login,
    MyPage,
    PlaySortProcess,
    PlaySortTitle,
    PlaySortResult,
    RegisterSort,
    RegisterSortResult,
} from '../views'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { name: 'edit_sort', path: '/edit_sort/:sortId', component: EditSort },
        { name: 'home', path: '/', component: Home },
        { name: 'login', path: '/login', component: Login },
        {
            name: 'mypage',
            path: '/mypage',
            component: MyPage,
            meta: { requiresAuth: true },
        },
        {
            name: 'play_sort_title',
            path: '/play_sort/title/:sortId',
            component: PlaySortTitle,
        },
        {
            name: 'play_sort_process',
            path: '/play_sort/process/:sortId',
            component: PlaySortProcess,
        },
        {
            name: 'play_sort_result',
            path: '/play_sort/result/:sortId',
            component: PlaySortResult,
        },
        {
            name: 'register_sort',
            path: '/register_sort',
            component: RegisterSort,
            meta: { requiresAuth: true },
        },
        {
            name: 'register_sort_result',
            path: '/register_sort_result/:sortId',
            component: RegisterSortResult,
            meta: { requiresAuth: true },
        },
    ],
})

// 画面遷移の際の認証処理
router.beforeEach((to, from, next) => {
    // ローカルストレージにユーザーidが保管されていた場合のみ取ってくる
    let uid = ''
    if (localStorage.sortMaker) {
        const sortMaker = JSON.parse(localStorage.sortMaker)
        uid = sortMaker.auth.uid
    }

    // 画面遷移の際に認証が必要かつユーザーidが存在しない時ログイン画面に遷移
    if (to.matched.some((record) => record.meta.requiresAuth) && !uid) {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router
