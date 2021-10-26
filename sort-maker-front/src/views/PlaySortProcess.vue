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
            sortItems: [],
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
    },
    name: 'PlaySortProcess',
}
</script>
