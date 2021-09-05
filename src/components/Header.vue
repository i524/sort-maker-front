<template>
    <div>
        <VAppBar color="primary">
            <VToolbarTitle @click="transitionPage('/')">
                ソートメーカー
            </VToolbarTitle>
            <VSpacer />
            <ul class="d-flex">
                <li>作る</li>
                <li>遊ぶ</li>
                <li>マイページ</li>
                <li>ログイン</li>
                <li>ユーザー登録</li>
            </ul>
        </VAppBar>
    </div>
</template>

<script>
export default {
    name: 'Header',
    methods: {
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
ul{
    list-style-type: none;
}

li{
    margin-left: 20px;
}
</style>>
