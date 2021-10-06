<template>
    <div>
        <Layout subTitle="ソートを作る">
            <VForm ref="registerSortForm" class="v-form">
                <CustomTextField
                    counter="255"
                    label="ソートの名前"
                    :rules="[required, isValidTextLength]"
                    v-model="name"
                >
                </CustomTextField>
                <CroppingImageInput @sendSrc="acceptSrc"> </CroppingImageInput>
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
    CustomButton,
    CustomTextField,
    Layout,
} from '../components'
import { required, isValidTextLength } from '../common_functions/validation'

export default {
    components: {
        CroppingImageInput,
        CustomButton,
        CustomTextField,
        Layout,
    },
    data() {
        return {
            name: '',
            required,
            src: 'hello',
            isValidTextLength,
        }
    },
    methods: {
        acceptSrc(src) {
            this.src = src
        },
        registerSort() {},
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
