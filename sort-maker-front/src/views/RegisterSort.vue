<template>
    <div>
        <CustomAlert :text="resErrorMessage" color="warning" v-model="alert">
        </CustomAlert>
        <Layout subTitle="ソートを作る">
            <VForm ref="registerSortForm" class="v-form">
                <CustomTextField
                    counter="255"
                    label="ソートの名前"
                    :rules="[required, isValidTextLength]"
                    v-model="name"
                >
                </CustomTextField>
                <CroppingImageInput> </CroppingImageInput>
                <CustomButton
                    :block="true"
                    text="ソート作成"
                    @click="registerSort"
                >
                </CustomButton>
            </VForm>
        </Layout>
    </div>
</template>

<script>
import {
    CroppingImageInput,
    CustomAlert,
    CustomButton,
    CustomTextField,
    Layout,
} from '../components'
import { required, isValidTextLength } from '../common_functions/validation'

export default {
    components: {
        CroppingImageInput,
        CustomAlert,
        CustomButton,
        CustomTextField,
        Layout,
    },
    data() {
        return {
            name: '',
            required,
            isValidTextLength,
        }
    },
    methods: {
        registerSort: async () => {
            // バリデーションチェック
            if (this.$refs.registerSortForm.validate()) {
                console.log('登録')
            }
        },
    },
    name: 'RegisterSort',
}
</script>

<style lang="scss" scoped>
.v-form {
    & > * {
        margin-bottom: 20px;
    }
}
</style>
