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
                    <li @click="logout">ログアウト</li>
                </template>
                <template v-else>
                    <li @click="callTransitionPage('Login')">ログイン</li>
                </template>
            </ul>
        </VAppBar>
        <CustomAlert :text="errorMessage" color="warning" v-model="alert">
        </CustomAlert>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { CustomAlert, CustomUserIcon } from '../components'
import { initializeApp, transitionPage } from '../common_functions/common'

export default {
    components: {
        CustomUserIcon,
        CustomAlert,
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
            alert: false,
            errorMessage: '',
        }
    },
    methods: {
        callTransitionPage(page) {
            transitionPage(this, page)
        },
        logout() {
            // firebaseの初期設定
            const firebase = initializeApp()

            // 初期設定ができていたらログアウト処理、できていなかったらエラーメッセージを出す
            if (firebase) {
                // firebaseでのログアウト処理
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        // vuexの認証情報を削除
                        this.deleteAuthInfo()
                        this.callTransitionPage('Home')
                    })
                    .catch(() => {
                        this.errorMessage = 'ログアウトに失敗しました'
                        this.alert = true
                    })
            } else {
                this.errorMessage = 'ログアウトに失敗しました'
                this.alert = true
            }
        },
        ...mapActions(['deleteAuthInfo']),
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
