<template>
    <div>
        <Layout subTitle="ソートを作る">
            <VForm ref="form" class="v-form" v-model="valid">
                <h2>ソートのタイトル</h2>
                <SortCardInput
                    className="mx-auto"
                    :blob="blob"
                    :description="description"
                    :name="name"
                    :width="300"
                    @inputDescription="inputDescription"
                    @inputName="inputName"
                    @sendBlob="sendBlob"
                />
                <h2>ソートアイテム</h2>
                <VForm ref="itemForm" v-model="itemValid">
                    <SortItemInput
                        :blob="itemBlob"
                        className="mx-auto"
                        v-model="itemName"
                        :width="300"
                        @sendBlob="sendItemBlob"
                    />
                </VForm>
                <CustomButton :block="true" text="追加" @click="addSortItem" />
                <p class="primary--text text-caption">{{ message }}</p>
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
                            v-if="
                                itemNames[(row - 1) * 3 + (col - 1)] ||
                                itemNames[(row - 1) * 3 + (col - 1)] === ''
                            "
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
                        />
                    </VCol>
                </VRow>
                <CustomButton
                    :block="true"
                    text="ソート作成"
                    @click="registerSort"
                />
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
import {
    initializeApp,
    showAlert,
    transitionPage,
} from '@/common_functions/common'
import { registerSort, registerSortImage } from '@/common_functions/request'

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
            blob: require('../assets/no_image.png'),
            description: '',
            message: '',
            name: '',
            itemName: '',
            itemBlob: require('../assets/no_image.png'),
            itemNames: [],
            itemBlobs: [],
            itemValid: true,
            valid: true,
        }
    },
    methods: {
        addSortItem() {
            // バリデーション
            this.$refs.itemForm.validate()
            if (!this.itemValid) return

            // ソートアイテムの数が範囲外の時エラーメッセージをだす
            if (this.itemNames.length + 1 > 100) {
                this.message = '2個以上100個以下で設定してください'
                return
            }

            // ソートアイテムの名前と画像を追加
            this.itemNames.push(this.itemName)
            this.itemBlobs.push(this.itemBlob)
        },
        createInitialImage(col, row) {
            const blob = this.itemBlobs[(row - 1) * 3 + (col - 1)]
            if (
                !(blob === '') &&
                !(blob === require('../assets/no_image.png'))
            ) {
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
            // もしアップロードされた画像が空だったらno_imageを設定する
            if (!blob) {
                this.itemBlob = require('../assets/no_image.png')
                return
            }

            this.itemBlob = blob
        },
        sendEditedItemBlob(index, blob) {
            // もしアップロードされた画像が空だったらno_imageを設定する
            if (!blob) {
                this.itemBlobs[index] = require('../assets/no_image.png')

                // computedで値を見張っているためspliceで値を更新したかったができなかったのでpushとpopで更新
                this.itemBlobs.push('')
                this.itemBlobs.pop()
                return
            }

            this.itemBlobs[index] = blob

            // computedで値を見張っているためspliceで値を更新したかったができなかったのでpushとpopで更新
            this.itemBlobs.push('')
            this.itemBlobs.pop()
        },
        sendBlob(blob) {
            // もしアップロードされた画像が空だったらno_imageを設定する
            if (!blob) {
                this.blob = require('../assets/no_image.png')
                return
            }

            this.blob = blob
        },
        registerSort: async function () {
            // バリデーション
            this.$refs.form.validate()
            if (!this.valid) return

            // ソートアイテムの数が範囲外の時エラーメッセージをだす
            if (this.itemNames.length < 2 || this.itemNames.length > 100) {
                this.message = '2個以上100個以下で設定してください'
                return
            }

            // ソートとソートアイテムをデータベースに登録
            let postData = {
                user_id: this.uid,
                name: this.name,
                description: this.description,
                item_names: this.itemNames,
            }

            let res = await registerSort(postData)

            if (!res) {
                showAlert('ソートの登録に失敗しました')
                return
            }

            // firebaseCloudStorageに画像を登録(アップロードされた画像がno_image.pngで無かった時)
            // 保存する画像の名前に使用するidをとってくる
            const sortId = res.sort_id
            const sortItemIds = res.sort_item_ids

            // ソートのタイトル画像の登録
            const firebase = initializeApp()
            const storageRef = firebase.storage().ref()
            let metadata
            if (this.blob !== require('../assets/no_image.png')) {
                metadata = {
                    contentType: this.blob.type,
                }
            }

            // ファイルの末尾に記載する拡張子を設定
            let extension
            if (this.blob !== require('../assets/no_image.png')) {
                switch (this.blob.type) {
                    case 'image/jpeg':
                        extension = 'jpg'
                        break
                    case 'image/png':
                        extension = 'png'
                        break
                    default:
                        showAlert('画像の登録に失敗しました')
                        return
                }
            }

            // firebaseCloudStorageに画像を登録
            let image = ''
            if (this.blob !== require('../assets/no_image.png')) {
                image = `${sortId}.${extension}`

                await storageRef
                    .child(`/images/sort_titles/${image}`)
                    .put(this.blob, metadata)
                    .catch(() => {
                        showAlert('画像の登録に失敗しました')
                        return
                    })
            }

            // ソートアイテムの画像の登録
            let itemImages = []
            for (let i in sortItemIds) {
                if (this.itemBlobs[i] !== require('../assets/no_image.png')) {
                    metadata = {
                        contentType: this.itemBlobs[i].type,
                    }

                    extension
                    switch (this.itemBlobs[i].type) {
                        case 'image/jpeg':
                            extension = 'jpg'
                            break
                        case 'image/png':
                            extension = 'png'
                            break
                        default:
                            showAlert('画像の登録に失敗しました')
                            return
                    }

                    // firebaseCloudStorageに画像を登録して画像の名前を取得(アップロードされた画像がno_image.pngで無かった時)
                    itemImages[i] = `${sortId}_${sortItemIds[i]}.${extension}`
                    await storageRef
                        .child(`/images/sort_items/${itemImages[i]}`)
                        .put(this.itemBlobs[i], metadata)
                        .catch(() => {
                            showAlert('画像の登録に失敗しました')
                            return
                        })
                } else {
                    itemImages[i] = ''
                }
            }

            // 画像のURLをデータベースに登録
            postData = {
                user_id: this.uid,
                image: image,
                item_images: itemImages,
                sort_id: sortId,
                sort_item_ids: sortItemIds,
            }

            res = await registerSortImage(postData)

            if (!res) {
                showAlert('ソートの登録に失敗しました')
                return
            }

            transitionPage(this, 'register_sort_result', {
                sortId: sortId,
            })
        },
        removeSortItem(index) {
            // ソートアイテムの数が範囲外の時エラーメッセージをだす
            if (this.itemNames.length - 1 < 2) {
                this.message = '2個以上100個以下で設定してください'
                return
            }
            this.itemNames.splice(index, 1)
            this.itemBlobs.splice(index, 1)
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
