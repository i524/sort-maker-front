<template>
    <Layout subTitle="結果">
        <CustomDataTable :headers="headers" :items="items" />
    </Layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { CustomDataTable, Layout } from '../components'

export default {
    components: {
        CustomDataTable,
        Layout,
    },
    computed: mapGetters(['resultOfSort']),
    data: function () {
        return {
            headers: [
                { text: 'ランク', value: 'rank' },
                { text: '名前', value: 'name' },
            ],
            items: [],
        }
    },
    mounted() {
        // vuexからソートの結果を取得して、itemsに格納する
        for (let i in this.resultOfSort) {
            let rank = Number(i) + 1
            this.items.push({
                rank: rank + '位',
                name: this.resultOfSort[i]['name'],
            })
        }
    },
    name: 'PlaySortResult',
}
</script>
