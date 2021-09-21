<template>
    <div>
        <h1 class="text-center">ログイン</h1>
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
    </div>
</template>

<script>
import { CustomTextField, CustomButton } from '../components'

export default {
    components: {
        CustomButton,
        CustomTextField,
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
