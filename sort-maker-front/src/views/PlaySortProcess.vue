<template>
    <Layout subTitle="どっちを選ぶ？">
        <VRow>
            <VCol cols="6" v-for="(itemCard, index) in itemCards" :key="index">
                <SortItemCard
                    :cardTitle="itemCard.cardTitle"
                    :id="itemCard.id"
                    :src="itemCard.src"
                    @click="itemCard.clickCard"
                />
            </VCol>
        </VRow>
    </Layout>
</template>

<script>
import { Layout, SortItemCard } from '../components'
import { showAlert } from '../common_functions/common'
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
                    clickCard: () => {},
                },
                {
                    cardTitle: '',
                    src: '',
                    id: 0,
                    clickCard: () => {},
                },
            ],
            pivotId: 0,
            sortItems: [],
            startId: 0,
            endId: 0,
        }
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
        this.sortItems = res

        console.log(typeof this.sortItems)
        // sortItemsの真ん中の要素とその一個左の要素をitemCardsに入れる
        this.pivotId = Math.floor(this.sortItems.length / 2)

        this.itemCards[0]['cardTitle'] =
            this.sortItems[this.pivotId - 1]['name']
        this.itemCards[0]['src'] = this.sortItems[this.pivotId - 1]['src']
        this.itemCards[0]['id'] = this.pivotId - 1

        this.itemCards[1]['cardTitle'] = this.sortItems[this.pivotId]['name']
        this.itemCards[1]['src'] = this.sortItems[this.pivotId]['src']
        this.itemCards[1]['id'] = this.pivotId
    },
    name: 'PlaySortProcess',
}
</script>
