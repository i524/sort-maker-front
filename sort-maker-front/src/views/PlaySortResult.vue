<template>
    <Layout subTitle="結果">
        <CustomDataTable :headers="headers" :items="items" />
        <CustomButton
            :block="true"
            color="twitter"
            class="white--text"
            icon="fab fa-twitter"
            text="ツイッターで結果をシェアする"
            textColor="white"
            @click="openDialog"
        />
        <CustomButton :block="true" text="もう一度遊ぶ" @click="replay" />
    </Layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { CustomButton, CustomDataTable, Layout } from '../components'
import { postTweet } from '../common_functions/request'

export default {
    components: {
        CustomButton,
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
    methods: {
        replay() {},
        openDialog() {},
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
