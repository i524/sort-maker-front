<template>
    <div>
        <Layout subTitle="ソートを作る">
            <VForm ref="registerSortForm" class="v-form">
                <h2 class="text-center">ソートのタイトル</h2>
                <SortCardInput
                    className="justify-center"
                    :description="description"
                    :name="name"
                    :src="src"
                    :width="300"
                    @inputDescription="inputDescription"
                    @inputName="inputName"
                    @sendSrc="sendSrc"
                ></SortCardInput>
                <h2>ソートアイテム</h2>
                <SortItemInput
                    :src="itemSrc"
                    v-model="itemName"
                    :width="300"
                    @sendSrc="sendItemSrc"
                >
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
            items: [],
            isValidTextLength,
        }
    },
    methods: {
        addSortItem() {
            this.items.push({
                itemName: this.itemName,
                itemSrc: this.itemSrc,
            })
        },
        inputDescription(value) {
            this.description = value
        },
        inputName(value) {
            this.name = value
        },
        sendItemSrc(src) {
            this.itemSrc = src
        },
        sendSrc(src) {
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
