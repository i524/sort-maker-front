import Vue from 'vue'
import VueRouter from 'vue-router'
import { Home, Login, MyPage, PlaySort, RegisterSort } from '../views'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/mypage', component: MyPage, meta: { requiresAuth: true } },
        { path: '/play_sort', component: PlaySort },
        {
            path: '/register_sort',
            component: RegisterSort,
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
        next({ path: '/login' })
    } else {
        next()
    }
})

export default router
