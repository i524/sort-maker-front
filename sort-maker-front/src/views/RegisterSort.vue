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
                <!-- 行を一行に3列アイテムが置かれるときの行数だけ作成する -->
                <VRow
                    v-for="row in Math.floor(items.length / 3) + 1"
                    :key="'row' + row"
                >
                    <!-- 列を一行に3列作り、行と列の値からitems配列中から表示する要素のindexを計算する -->
                    <VCol cols="4" v-for="col in 3" :key="'col' + col">
                        <SortItemInput
                            :icon="true"
                            :initialImage="
                                items[(row - 1) * 3 + (col - 1)].itemSrc
                            "
                            :src="items[(row - 1) * 3 + (col - 1)].itemSrc"
                            v-if="items[(row - 1) * 3 + (col - 1)]"
                            v-model="items[(row - 1) * 3 + (col - 1)].itemName"
                            @clickIcon="
                                removeSortItem((row - 1) * 3 + (col - 1))
                            "
                            @sendSrc="
                                sendEditedItemSrc(
                                    (row - 1) * 3 + (col - 1),
                                    $event
                                )
                            "
                        ></SortItemInput>
                    </VCol>
                </VRow>
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
import { postTweet } from '../common_functions/request'
import {
    CustomButton,
    Layout,
    SortCardInput,
    SortItemInput,
} from '../components'
import { required, isValidTextLength } from '../common_functions/validation'

const noImage = require('../assets/no_image.png')

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
            initialImage: require('../assets/no_user_image.png'),
            name: '',
            required,
            src: noImage,
            itemName: '',
            itemSrc: noImage,
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
        sendEditedItemSrc(index, src) {
            this.items[index].itemSrc = src
        },
        sendItemSrc(src) {
            this.itemSrc = src
        },
        sendSrc(src) {
            this.src = src
        },
        registerSort: async () => {
            const res = await postTweet()
            console.log(res)
        },
        removeSortItem(index) {
            this.items.splice(index, 1)
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
