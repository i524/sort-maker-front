<template>
    <Layout subTitle="ログイン">
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
        <h1>{{ message }}</h1>
    </Layout>
</template>

<script>
import { CustomButton, CustomCard, Layout } from '../components'
import { initializeApp } from '../common_functions/common'

export default {
    components: {
        CustomButton,
        CustomCard,
        Layout,
    },
    data() {
        return {
            firebase: '',
            message: 'メッセージ',
        }
    },
    methods: {
        login() {
            // firebaseの初期設定
            const firebase = initializeApp()

            if (firebase) {
                const provider = new firebase.auth.TwitterAuthProvider()

                firebase.auth().signInWithRedirect(provider)
            } else {
                console.log('失敗b')
            }
        },
        mounted() {
            // firebaseの初期設定
            // const firebase = initializeApp()
            // firebase.auth().onAuthStateChanged((user) => {
            //     if (user) {
            //         console.log(user)
            //     } else {
            //         console.log('userなし')
            //     }
            // })
        },
    },
    name: 'Login',
}
</script>
