<template>
    <div>
        <CustomAlert
            :text="message"
            :color="color"
            v-bind:value="isShowAlert"
            @input="inputAlert"
        >
        </CustomAlert>
        <VAppBar color="primary" class="white--text">
            <VToolbarTitle
                class="v-toolbar-title"
                @click="callTransitionPage('home')"
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
                <li @click="callTransitionPage('register_sort')">作る</li>
                <li @click="callTransitionPage('home')">遊ぶ</li>
                <li @click="callTransitionPage('mypage')">マイページ</li>
                <template v-if="uid">
                    <li @click="logout">ログアウト</li>
                </template>
                <template v-else>
                    <li @click="callTransitionPage('login')">ログイン</li>
                </template>
            </ul>
        </VAppBar>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { CustomAlert, CustomUserIcon } from '../components'
import {
    initializeApp,
    showAlert,
    transitionPage,
} from '../common_functions/common'

export default {
    components: {
        CustomUserIcon,
        CustomAlert,
    },
    computed: {
        // ツイッターのアイコン画像のurlが無いときユーザーのアイコンの写真をno_user_imageにする処理
        src: function () {
            if (this.photoURL) {
                return this.photoURL
            } else {
                return require('../assets/no_user_image.png')
            }
        },
        ...mapGetters(['uid', 'photoURL', 'isShowAlert', 'message', 'color']),
    },
    methods: {
        inputAlert() {
            this.updateIsShowAlert(!this.isShowAlert)
        },
        callTransitionPage(name) {
            transitionPage(this, name)
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
                        this.callTransitionPage('home')
                    })
                    .catch(() => {
                        showAlert('ログアウトに失敗しました')
                    })
            } else {
                showAlert('ログアウトに失敗しました')
            }
        },
        ...mapActions(['deleteAuthInfo', 'updateIsShowAlert']),
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
