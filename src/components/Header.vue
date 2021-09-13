<template>
    <div>
        <VAppBar color="primary" class="white--text">
            <VToolbarTitle class="v-toolbar-title" @click="callTransitionPage('/')">
                <VIcon color="white">fas fa-random</VIcon>
                ソートメーカー
            </VToolbarTitle>
            <VSpacer />
            <ul class="d-flex">
                <li @click="callTransitionPage('/register_sort')">作る</li>
                <li @click="callTransitionPage('/')">遊ぶ</li>
                <li @click="callTransitionPage('/mypage')">マイページ</li>
                <template v-if="userId">
                    <li>ログアウト</li>
                </template>
                <template v-else>
                    <li @click="callTransitionPage('/login')">ログイン</li>
                    <li @click="callTransitionPage('/register_user')">ユーザー登録</li>
                </template>
            </ul>
        </VAppBar>
    </div>
</template>

<script>
import { loginAuth, transitionPage } from '../common_functions/common';

export default {
    data(){
        return{
            userId: null,
        }
    },
    methods: {
        callTransitionPage(page){
            transitionPage(this,page);
        }
    },
    mounted(){
        this.userId = loginAuth(this);
    },
    name: 'Header',
}
</script>

<style scoped>
.v-toolbar-title{
    font-family: 'Kaisei Decol';
    font-size: 30px;
    cursor: pointer;
}

ul{
    list-style-type: none;
}

li{
    margin-left: 20px;
    cursor: pointer;
}
</style>
