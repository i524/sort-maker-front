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
    </Layout>
</template>

<script>
import { CustomButton, Layout } from '../components'

export default {
    components: {
        CustomButton,
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
