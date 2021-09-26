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
    </Layout>
</template>

<script>
import { CustomButton, CustomCard, Layout } from '../components'

export default {
    components: {
        CustomButton,
        CustomCard,
        Layout,
    },
    data() {
        return {}
    },
    methods: {
        login() {
            console.log('ログイン')
        },
    },
    name: 'Login',
}
</script>
