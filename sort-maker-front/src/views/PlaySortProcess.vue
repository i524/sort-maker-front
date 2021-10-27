<template>
    <Layout subTitle="どっちを選ぶ？">
        <VRow>
            <VCol cols="6" v-for="(itemCard, index) in itemCards" :key="index">
                <SortItemCard
                    :cardTitle="itemCard.cardTitle"
                    :id="itemCard.id"
                    :src="itemCard.src"
                    @clickCard="clickCard(itemCard.id)"
                />
            </VCol>
        </VRow>
    </Layout>
</template>

<script>
import { mapActions } from 'vuex'
import { Layout, SortItemCard } from '../components'
import {
    getDownloadURL,
    transitionPage,
    showAlert,
} from '../common_functions/common'
import { searchSortItems } from '../common_functions/request'

export default {
    components: {
        Layout,
        SortItemCard,
    },
    data() {
        return {
            id: this.$route.params.sortId,
            itemCards: [
                {
                    cardTitle: '',
                    src: '',
                    id: 0,
                },
                {
                    cardTitle: '',
                    src: '',
                    id: 0,
                },
            ],
            topIndex: 0,
            leftIndex: 0,
            sortItems: [],
        }
    },
    methods: {
        clickCard: async function (choosedIndex) {
            // もし右に位置する要素がユーザーに選ばれた要素だったら入れ替えを行う
            if (!(this.leftIndex === choosedIndex)) {
                let temp = this.sortItems[this.leftIndex]
                this.sortItems[this.leftIndex] =
                    this.sortItems[this.leftIndex + 1]
                this.sortItems[this.leftIndex + 1] = temp
            }

            // もし左に位置する要素が基点の要素だったら左に一する要素を最後の要素に戻し、基点の要素を右に一つずらす
            if (this.leftIndex === this.topIndex) {
                this.leftIndex = this.sortItems.length - 2
                this.topIndex++

                // もし基点の要素が最後の要素だったら並び替えは終了
                if (this.topIndex === this.sortItems.length - 1) {
                    // vuexに結果を格納する
                    this.updateResultOfSort(this.sortItems)

                    // 結果ページに遷移する
                    transitionPage(this, 'play_sort_result')
                }
            } else {
                // もし左に位置する要素が基点の要素でなかったら左に位置する要素を一つ左にずらす
                this.leftIndex--
            }

            // 表示する要素を変更する
            this.itemCards[0]['cardTitle'] =
                this.sortItems[this.leftIndex]['name']
            this.itemCards[0]['src'] = await getDownloadURL(
                `/images/sort_items/${this.sortItems[this.leftIndex]['image']}`
            )
            this.itemCards[0]['id'] = this.leftIndex

            this.itemCards[1]['cardTitle'] =
                this.sortItems[this.leftIndex + 1]['name']
            this.itemCards[1]['src'] = await getDownloadURL(
                `/images/sort_items/${
                    this.sortItems[this.leftIndex + 1]['image']
                }`
            )
            this.itemCards[1]['id'] = this.leftIndex + 1
        },
        ...mapActions(['updateResultOfSort']),
    },
    async mounted() {
        // ソートidを渡してソートアイテムのデータを取得する
        const postData = {
            id: this.id,
        }

        const res = await searchSortItems(postData)

        if (!res) {
            showAlert('ソートアイテムの取得に失敗しました')
            return
        }

        // ソートアイテムの一覧を変数に格納する
        this.sortItems = res['sort_items']

        // 基点にする要素と選択される際に左に位置する要素のインデックスを格納する
        this.topIndex = 0
        this.leftIndex = this.sortItems.length - 2

        // sortItemsの最後の要素とその一個前の要素をitemCardsに格納する
        this.itemCards[0]['cardTitle'] =
            this.sortItems[this.sortItems.length - 2]['name']
        this.itemCards[0]['src'] = await getDownloadURL(
            `/images/sort_items/${
                this.sortItems[this.sortItems.length - 2]['image']
            }`
        )
        this.itemCards[0]['id'] = this.sortItems.length - 2

        this.itemCards[1]['cardTitle'] =
            this.sortItems[this.sortItems.length - 1]['name']
        this.itemCards[1]['src'] = await getDownloadURL(
            `/images/sort_items/${
                this.sortItems[this.sortItems.length - 1]['image']
            }`
        )
        this.itemCards[1]['id'] = this.sortItems.length - 1
    },
    name: 'PlaySortProcess',
}
</script>
