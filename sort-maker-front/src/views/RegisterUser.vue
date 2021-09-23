<template>
    <Layout subTitle="ユーザー登録">
        <VForm ref="userRegisterForm">
            <CustomTextField
                :counter="255"
                label="email"
                :rules="[
                    required,
                    isValidEmailLength,
                    isMatchedRegHalf,
                    isMatchedEmail,
                ]"
                v-model="email"
            ></CustomTextField>
            <CustomTextField
                :counter="255"
                label="パスワード"
                :rules="[required, isValidPasswordLength, isMatchedRegHalf]"
                v-model="password"
            ></CustomTextField>
            <CustomTextField
                :counter="255"
                label="パスワード再入力"
                :rules="[
                    required,
                    isValidPasswordLength,
                    isMatchedRegHalf,
                    isSamePassword,
                ]"
                v-model="rePassword"
            ></CustomTextField>
        </VForm>
        <CustomButton
            :block="true"
            buttonText="ユーザー登録"
            @click="userRegister"
        ></CustomButton>
    </Layout>
</template>

<script>
import { CustomTextField, CustomButton, Layout } from '../components'
import {
    required,
    isValidEmailLength,
    isMatchedRegHalf,
    isMatchedEmail,
    isValidPasswordLength,
    isSamePassword,
} from '../common_functions/validation'
import { registerUser } from '../common_functions/request'

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
            rePassword: '',
            required: required,
            isValidEmailLength: isValidEmailLength,
            isMatchedRegHalf: isMatchedRegHalf,
            isMatchedEmail: isMatchedEmail,
            isValidPasswordLength: isValidPasswordLength,
            isSamePassword: (value) => isSamePassword(value, this.password),
        }
    },
    methods: {
        userRegister: async function () {
            // バリデーションチェック
            if (this.$refs.userRegisterForm.validate()) {
                // バリデーション通ったらユーザー登録
                const res = await registerUser({
                    email: this.email,
                    password: this.password,
                })
                console.log(res)
            } else {
                console.log('失敗')
            }
        },
    },
    name: 'RegisterUser',
}
</script>
