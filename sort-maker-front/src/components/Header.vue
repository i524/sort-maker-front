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
                    <CustomUserIcon
                        :width="48"
                        :height="48"
                        :src="src"
                    ></CustomUserIcon>
                </li>
                <li @click="callTransitionPage('RegisterSort')">作る</li>
                <li @click="callTransitionPage('Home')">遊ぶ</li>
                <li @click="callTransitionPage('MyPage')">マイページ</li>
                <template v-if="uid">
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
import { mapGetters } from 'vuex'
import { CustomUserIcon } from '../components'
import { transitionPage } from '../common_functions/common'

export default {
    components: {
        CustomUserIcon,
    },
    computed: {
        src: function () {
            if (this.photoURL) {
                return this.photoURL
            } else {
                return require('../assets/no_user_image.png')
            }
        },
        ...mapGetters(['uid', 'photoURL']),
    },
    data() {
        return {
            userId: null,
        }
    },
    methods: {
        callTransitionPage(page) {
            transitionPage(this, page)
        },
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
    line-height: 48px;
}
</style>
