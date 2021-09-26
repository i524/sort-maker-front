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
                <ImageFileInput label="タイトル画像"> </ImageFileInput>
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
    CustomAlert,
    CustomButton,
    ImageFileInput,
    CustomTextField,
    Layout,
} from '../components'
import { required, isValidTextLength } from '../common_functions/validation'
// import { transitionPage } from '../common_functions/common'

export default {
    components: {
        CustomAlert,
        CustomButton,
        ImageFileInput,
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
