<template>
    <Layout subTitle="ログイン">
        <CustomTextField
            :counter="255"
            label="email"
            v-model="email"
        ></CustomTextField>
        <CustomTextField
            :counter="255"
            label="パスワード"
            v-model="password"
        ></CustomTextField>
        <CustomButton
            :block="true"
            buttonText="ログイン"
            @click="login"
        ></CustomButton>
    </Layout>
</template>

<script>
import { CustomTextField, CustomButton, Layout } from '../components'

export default {
    components: {
        CustomButton,
        CustomTextField,
        Layout,
    },
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        login() {
            console.log('ログイン')
        },
    },
    name: 'Login',
}
</script>
