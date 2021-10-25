<template>
    <Layout subTitle="ソートで遊ぶ">
        <SortCard
            :cardTitle="cardTitle"
            :cardText="cardText"
            className="mx-auto"
            @clickCard="clickCard"
            @clickIcon="clickIcon"
            :icon="true"
            iconName="fas fa-heart"
        />
    </Layout>
</template>

<script>
import { Layout, SortCard } from '../components'
import { showAlert } from '../common_functions/common'
import { searchSort } from '../common_functions/request'

export default {
    components: {
        Layout,
        SortCard,
    },
    data() {
        return {
            cardTitle: '',
            cardText: '',
        }
    },
    async mounted() {
        // ソートidを渡してソートのデータを取ってくる
        const postData = {
            id: this.$route.params.sortId,
        }

        const res = await searchSort(postData)

        console.log(res)

        if (!res) {
            showAlert('ソートの表示に失敗しました')
            return
        }
    },
    name: 'PlaySort',
}
</script>
