<template>
    <div>
        <VAppBar color="primary" class="white--text">
            <VToolbarTitle
                class="v-toolbar-title"
                @click="callTransitionPage('Home')"
            >
                <VIcon color="white">fas fa-random</VIcon>
                ソートメーカー
            </VToolbarTitle>
            <VSpacer />
            <ul class="d-flex">
                <li>
                    <CustomImage
                        :width="50"
                        :height="50"
                        :src="src"
                    ></CustomImage>
                </li>
                <li @click="callTransitionPage('RegisterSort')">作る</li>
                <li @click="callTransitionPage('Home')">遊ぶ</li>
                <li @click="callTransitionPage('MyPage')">マイページ</li>
                <template v-if="userId">
                    <li>ログアウト</li>
                </template>
                <template v-else>
                    <li @click="callTransitionPage('Login')">ログイン</li>
                </template>
            </ul>
        </VAppBar>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { CustomImage } from '../components'
import { loginAuth, transitionPage } from '../common_functions/common'

export default {
    components: {
        CustomImage,
    },
    data() {
        return {
            src: this.$store.getters.uid,
            userId: null,
        }
    },
    methods: {
        callTransitionPage(page) {
            transitionPage(this, page)
        },
    },
    mounted() {
        this.userId = loginAuth(this)
    },
    name: 'Header',
}
</script>

<style scoped>
.v-toolbar-title {
    font-family: 'Kaisei Decol';
    font-size: 30px;
    cursor: pointer;
}

ul {
    list-style-type: none;
}

li {
    margin-left: 20px;
    cursor: pointer;
}
</style>
