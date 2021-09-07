<template>
    <div>
        <VAppBar color="primary" class="white--text v-app-bar">
            <VToolbarTitle class="v-toolbar-title" @click="transitionPage('/')">
                ソートメーカー
            </VToolbarTitle>
            <VSpacer />
            <ul class="d-flex">
                <li @click="transitionPage('/register_user')">作る</li>
                <li @click="transitionPage('/')">遊ぶ</li>
                <li @click="transitionPage('/mypage')">マイページ</li>
                <li @click="transitionPage('/login')">ログイン</li>
                <li @click="transitionPage('/register_user')">ユーザー登録</li>
            </ul>
        </VAppBar>
    </div>
</template>

<script>
export default {
    name: 'Header',
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
}
</script>

<style scoped>
.v-app-bar{
    cursor: pointer;
}

.v-toolbar-title{
    font-family: 'Kaisei Decol';
    font-size: 30px;
}

ul{
    list-style-type: none;
}

li{
    margin-left: 20px;
}
</style>>
