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
import {
    required,
    isValidEmailLength,
    isMatchedRegHalf,
    isMatchedEmail,
    isValidPasswordLength,
    isSamePassword,
} from '../common_functions/validation'

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
            required: required,
            isValidEmailLength: isValidEmailLength,
            isMatchedRegHalf: isMatchedRegHalf,
            isMatchedEmail: isMatchedEmail,
            isValidPasswordLength: isValidPasswordLength,
            isSamePassword: (value) => isSamePassword(value, this.password),
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
