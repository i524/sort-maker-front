<template>
    <div>
        <VAppBar color="primary" class="white--text">
            <VToolbarTitle class="v-toolbar-title" @click="transitionPage('/')">
                <VIcon color="white">fas fa-random</VIcon>
                ソートメーカー
            </VToolbarTitle>
            <VSpacer />
            <ul class="d-flex">
                <li @click="transitionPage('/register_user')">作る</li>
                <li @click="transitionPage('/')">遊ぶ</li>
                <li @click="transitionPage('/mypage')">マイページ</li>
                <template v-if="userId">
                    <li>ログアウト</li>
                </template>
                <template v-else>
                    <li @click="transitionPage('/login')">ログイン</li>
                    <li @click="transitionPage('/register_user')">ユーザー登録</li>
                </template>
            </ul>
        </VAppBar>
    </div>
</template>

<script>
import { loginAuth } from '../common_functions/common';

export default {
    data(){
        return{
            userId: null,
        }
    },
    methods: {
        // RouterLinkを使用するとリンクがヘッダーの下にもぐってしまうため、クリックイベントで遷移する
        transitionPage(page){
            if(page === this.$router.currentRoute.path){
                // 同じページに遷移する場合はリロード
                this.$router.go({ path: this.$router.currentRoute.path });
            }else{
                // 違うページに遷移する場合はページ遷移
                this.$router.push(page);
            }
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
