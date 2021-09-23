<template>
    <Layout subTitle="ユーザー登録">
        <VForm ref="userRegisterForm" class="v-form">
            <CustomAlert
                :alertText="resErrorMessage"
                color="warning"
                v-model="alert"
            >
            </CustomAlert>
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
import {
    CustomButton,
    CustomAlert,
    CustomTextField,
    Layout,
} from '../components'
import {
    required,
    isValidEmailLength,
    isMatchedRegHalf,
    isMatchedEmail,
    isValidPasswordLength,
    isSamePassword,
} from '../common_functions/validation'
import { transitionPage } from '../common_functions/common'
import { registerUser } from '../common_functions/request'

export default {
    components: {
        CustomButton,
        CustomAlert,
        CustomTextField,
        Layout,
    },
    data() {
        return {
            alert: false,
            email: '',
            password: '',
            rePassword: '',
            required: required,
            resErrorMessage: '',
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

                // レスポンスが返ってきてるか判定
                if (res) {
                    if (res.code === 0) {
                        // ユーザー登録が成功したらホーム画面に遷移
                        transitionPage(this, 'Home')
                    } else {
                        // 失敗したらエラーメッセージを表示
                        this.resErrorMessage = res.message
                        this.alert = true
                    }
                } else {
                    this.resErrorMessage = 'ユーザー登録に失敗しました'
                    this.alert = true
                }
            }
        },
    },
    name: 'RegisterUser',
}
</script>

<style lang="scss" scoped>
.v-form {
    & > * {
        margin-bottom: 20px;
    }
}
</style>
