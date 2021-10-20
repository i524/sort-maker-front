<template>
    <div>
        <Layout subTitle="ソートを作る">
            <VForm ref="registerSortForm" class="v-form">
                <h2 class="text-center">ソートのタイトル</h2>
                <SortCardInput
                    className="justify-center"
                    :blob="blob"
                    :description="description"
                    :name="name"
                    :width="300"
                    @inputDescription="inputDescription"
                    @inputName="inputName"
                    @sendBlob="sendBlob"
                ></SortCardInput>
                <h2>ソートアイテム</h2>
                <SortItemInput
                    :blob="itemBlob"
                    v-model="itemName"
                    :width="300"
                    @sendBlob="sendItemBlob"
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
                            :blob="items[(row - 1) * 3 + (col - 1)].itemBlob"
                            :icon="true"
                            :initialImage="createInitialImage(col, row)"
                            v-if="items[(row - 1) * 3 + (col - 1)]"
                            v-model="items[(row - 1) * 3 + (col - 1)].itemName"
                            @clickIcon="
                                removeSortItem((row - 1) * 3 + (col - 1))
                            "
                            @sendBlob="
                                sendEditedItemBlob(
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
import {
    CustomButton,
    Layout,
    SortCardInput,
    SortItemInput,
} from '../components'
// import { initializeApp } from '@/common_functions/common'
import { registerSort } from '@/common_functions/common'

export default {
    components: {
        CustomButton,
        Layout,
        SortCardInput,
        SortItemInput,
    },
    computed: {
        ...mapGetters(['uid']),
    },
    data() {
        return {
            blob: null,
            description: '',
            initialImage: require('../assets/no_user_image.png'),
            name: '',
            itemName: '',
            itemBlob: null,
            items: [],
        }
    },
    methods: {
        addSortItem() {
            this.items.push({
                itemBlob: this.itemBlob,
                itemName: this.itemName,
            })
        },
        createInitialImage(col, row) {
            const blob = this.items[(row - 1) * 3 + (col - 1)].itemBlob
            if (blob !== null) {
                return URL.createObjectURL(blob)
            } else {
                return require('../assets/no_image.png')
            }
        },
        inputDescription(value) {
            this.description = value
        },
        inputName(value) {
            this.name = value
        },
        sendItemBlob(blob) {
            this.itemBlob = blob
        },
        sendEditedItemBlob(index, blob) {
            this.items[index].itemBlob = blob
        },
        sendBlob(blob) {
            this.blob = blob
        },
        registerSort() {
            // const firebase = initializeApp()
            // const storage = firebase.storage()
            // storage.ref('/images/sample.png').put(this.blob)

            // ポストデータを作成する
            const postData = {
                user_id: uid,
            }
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
