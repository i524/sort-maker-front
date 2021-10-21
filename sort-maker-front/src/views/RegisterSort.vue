<template>
    <div>
        <Layout subTitle="ソートを作る">
            <VForm ref="registerSortForm" class="v-form">
                <h2 class="text-center">ソートのタイトル</h2>
                <p>{{ uid }}</p>
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
                    v-for="row in Math.floor(itemNames.length / 3) + 1"
                    :key="'row' + row"
                >
                    <!-- 列を一行に3列作り、行と列の値からitems配列中から表示する要素のindexを計算する -->
                    <VCol cols="4" v-for="col in 3" :key="'col' + col">
                        <SortItemInput
                            :blob="itemBlobs[(row - 1) * 3 + (col - 1)]"
                            :icon="true"
                            :initialImage="createInitialImage(col, row)"
                            v-if="itemNames[(row - 1) * 3 + (col - 1)]"
                            v-model="itemNames[(row - 1) * 3 + (col - 1)]"
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
import { mapGetters } from 'vuex'
import {
    CustomButton,
    Layout,
    SortCardInput,
    SortItemInput,
} from '../components'
// import { initializeApp } from '@/common_functions/common'
// import { registerSort } from '@/common_functions/common'

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
            itemNames: [],
            itemBlobs: [],
        }
    },
    methods: {
        addSortItem() {
            this.itemNames.push(this.itemName)
            this.itemBlobs.push(this.itemBlob)
        },
        createInitialImage(col, row) {
            const blob = this.itemBlobs[(row - 1) * 3 + (col - 1)]
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
            this.itemBlobs[index] = blob
        },
        sendBlob(blob) {
            this.blob = blob
        },
        registerSort: function () {
            // ソートとソートアイテムをデータベースに登録
            // const postData = {
            //     user_id: this.uid,
            //     name: this.name,
            //     description: this.description,
            //     itemNames: this.itemNames,
            // }
            //     const res = await registerSort(postData)
            //     if (!res) return
            //     // firebaseCloudStorageに画像を登録
            //     // 保存する画像の名前に使用するidをとってくる
            //     const sortId = res.sort_id
            //     const sortItemIds = res.sort_item_ids
            //     // ソートのタイトル画像の登録
            //     const firebase = initializeApp()
            //     const storage = firebase.storage()
            //     storage
            //         .ref(`/images/sort_titles/${this.uid}_${sortId}`)
            //         .put(this.blob)
            //     // ソートアイテムの画像の登録
            //     for (let i in sortItemIds) {
            //         storage
            //             .ref(
            //                 `/images/sort_items/${this.uid}_${sortId}_${sortItemIds[i]}`
            //             )
            //             .put(this.itemBlob[i])
            //     }
            // },
            // removeSortItem(index) {
            //     this.itemNames.splice(index, 1)
            //     this.itemBlobs.splice(index, 1)
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
