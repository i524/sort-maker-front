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
import { CustomAlert, CustomButton, CustomCard, Layout } from '../components'
import { transitionPage, initializeApp } from '../common_functions/common'

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
                    .then((res) => {
                        this.updateUid(res.user.uid)
                        this.updateDisplayName(res.user.displayName)
                        this.updatePhotoURL(res.user.photoURL)
                        // const credential = res.credential
                        // const token = credential.accessToken
                        // const secret = credential.secret
                        transitionPage(this, 'Home')
                    })
                    .catch(() => {
                        this.errorMessage =
                            'ツイッターでのログインに失敗しました'
                        this.alert = true
                    })
            } else {
                this.errorMessage = 'ツイッターでのログインに失敗しました'
                this.alert = true
            }
        },
        ...mapActions(['updateUid', 'updateDisplayName', 'updatePhotoURL']),
    },
    name: 'Login',
}
</script>
