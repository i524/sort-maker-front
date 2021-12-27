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
            <VMenu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <img
                        class="img"
                        :src="src"
                        :height="48"
                        v-bind="attrs"
                        v-on="on"
                    />
                </template>
                <VList>
                    <VListItem
                        v-for="(item, index) in items"
                        :key="index"
                        class="v-list-item"
                    >
                        <VListItemTitle @click="item.clickTitle">{{
                            item.title
                        }}</VListItemTitle>
                    </VListItem>
                    <VListItem v-if="uid" :key="3" class="v-list-item">
                        <VListItemTitle @click="logout"
                            >ログアウト</VListItemTitle
                        >
                    </VListItem>
                    <VListItem v-else :key="3" class="v-list-item">
                        <VListItemTitle @click="callTransitionPage('login')">
                            ログイン
                        </VListItemTitle>
                    </VListItem>
                </VList>
            </VMenu>
        </VAppBar>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { CustomAlert } from '../components'
import {
    initializeApp,
    showAlert,
    transitionPage,
} from '../common_functions/common'

export default {
    components: {
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
    data() {
        return {
            items: [
                {
                    title: '作る',
                    clickTitle: () => {
                        this.callTransitionPage('register_sort')
                    },
                },
                {
                    title: '遊ぶ',
                    clickTitle: () => {
                        this.callTransitionPage('home')
                    },
                },
                {
                    title: 'マイページ',
                    clickTitle: () => {
                        this.callTransitionPage('mypage')
                    },
                },
            ],
        }
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

.img {
    border-radius: 50%;
}

.v-list-item {
    cursor: pointer;
}

@media screen and (max-width: 325px) {
    .v-toolbar-title {
        font-size: 25px;
    }
}
</style>
