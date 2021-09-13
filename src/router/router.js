import Vue from 'vue';
import VueRouter from 'vue-router';
import { Home, MyPage, RegisterSort, Login, RegisterUser } from '../views';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/register_sort', component: RegisterSort },
        { path: '/mypage', component: MyPage },
        { path: '/login', component: Login },
        { path: '/register_user', component: RegisterUser },
    ]
});

export default router;