<template>
    <Layout subTitle="ログイン">
        <CustomAlert :text="errorMessage" color="warning" v-model="alert">
        </CustomAlert>
        <CustomButton
            :block="true"
            color="#1D9BF0"
            class="white--text"
            icon="fab fa-twitter"
            text="ツイッターでログインする"
            textColor="white"
            @click="login"
        ></CustomButton>
        <CustomCard
            title="ソートメーカーでツイッターログインすると下記のことができます"
            text="・ソートを作成する
            ・ソートのお気に入り登録をする"
        >
        </CustomCard>
    </Layout>
</template>

<script>
import { mapActions } from 'vuex'
import { createHash } from 'crypto'
import { CustomAlert, CustomButton, CustomCard, Layout } from '../components'
import {
    showAlert,
    transitionPage,
    initializeApp,
} from '../common_functions/common'
import { registerUser } from '../common_functions/request'

export default {
    components: {
        CustomAlert,
        CustomButton,
        CustomCard,
        Layout,
    },
    data() {
        return {
            alert: false,
            errorMessage: '',
        }
    },
    methods: {
        login() {
            // firebaseの初期設定
            const firebase = initializeApp()
            // 初期設定ができていたらツイッターでログイン処理、できていなかったらエラーメッセージを出す
            if (firebase) {
                const provider = new firebase.auth.TwitterAuthProvider()
                // ログイン処理が終了したらvuexに認証情報を保管後、Homeに画面遷移
                firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then(async (res) => {
                        // uidをハッシュ化
                        const hash = createHash('sha256')
                        hash.update(res.user.uid)
                        const hashedUid = hash.digest('hex')

                        // ユーザーを登録
                        const postData = {
                            id: hashedUid,
                        }
                        const resOfRegisterUser = await registerUser(postData)
                        if (!resOfRegisterUser) {
                            showAlert('ツイッターでのログインに失敗しました')
                            return
                        }

                        // vuexに認証情報を保管
                        this.updateUid(hashedUid)
                        this.updateDisplayName(res.user.displayName)
                        this.updatePhotoURL(res.user.photoURL)
                        // const credential = res.credential
                        // const token = credential.accessToken
                        // const secret = credential.secret
                        // home画面に遷移
                        transitionPage(this, 'home')
                    })
                    .catch(() => {
                        showAlert('ツイッターでのログインに失敗しました')
                    })
            } else {
                showAlert('ツイッターでのログインに失敗しました')
            }
        },
        ...mapActions(['updateUid', 'updateDisplayName', 'updatePhotoURL']),
    },
    name: 'Login',
}
</script>
