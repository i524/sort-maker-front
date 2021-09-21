<template>
    <div class="root">
        <h1 class="text-center">ユーザー登録</h1>
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
    </div>
</template>

<script>
import { CustomTextField, CustomButton } from '../components'

const regHalf = new RegExp(/^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/)
const regEmail = new RegExp(
    /^([a-zA-Z0-9])+([a-zA-Z0-9._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9._-]+)+$/
)

export default {
    components: {
        CustomButton,
        CustomTextField,
    },
    data() {
        return {
            email: '',
            password: '',
            rePassword: '',
            required: (value) => !!value || '必ず入力してください',
            isValidEmailLength: (value) =>
                (1 <= value.length && value.length <= 255) ||
                '1文字以上255文字以下で入力してください',
            isMatchedRegHalf: (value) =>
                regHalf.test(value) || '半角数字記号で入力してください',
            isMatchedEmail: (value) =>
                regEmail.test(value) ||
                'メールアドレスの形式で入力してください',
            isValidPasswordLength: (value) =>
                (6 <= value.length && value.length <= 255) ||
                '6文字以上255文字以下で入力してください',
            isSamePassword: (value) =>
                value === this.password ||
                '再入力したパスワードがパスワードと一致していません',
        }
    },
    methods: {
        userRegister() {
            if (this.$refs.userRegisterForm.validate()) {
                console.log('成功')
            } else {
                console.log('失敗')
            }
        },
    },
    name: 'RegisterUser',
}
</script>

<style lang="scss" scoped>
.root {
    & > * {
        margin-bottom: 20px;
    }
}
</style>
