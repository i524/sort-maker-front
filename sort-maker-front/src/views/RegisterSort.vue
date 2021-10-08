<template>
    <div>
        <Layout subTitle="ソートを作る">
            <VForm ref="registerSortForm" class="v-form">
                <h2>ソートのタイトル</h2>
                <SortCardInput
                    :description="description"
                    :name="name"
                    :src="src"
                    :width="300"
                ></SortCardInput>
                <h2>ソートアイテム</h2>
                <SortItemInput :src="itemSrc" v-model="itemName" :width="300">
                </SortItemInput>
                <CustomButton :block="true" text="追加" @click="addSortItem">
                </CustomButton>
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
    CustomButton,
    Layout,
    SortCardInput,
    SortItemInput,
} from '../components'
import { required, isValidTextLength } from '../common_functions/validation'

export default {
    components: {
        CustomButton,
        Layout,
        SortCardInput,
        SortItemInput,
    },
    data() {
        return {
            description: '',
            name: '',
            required,
            src: '',
            itemName: '',
            itemSrc: '',
            isValidTextLength,
        }
    },
    methods: {
        acceptSrc(src) {
            this.src = src
        },
        addSortItem() {},
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
