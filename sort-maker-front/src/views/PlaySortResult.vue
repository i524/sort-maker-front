<template>
    <Layout subTitle="結果">
        <CustomDataTable :headers="headers" :items="items" />
        <TwitterTextInput
            :block="true"
            :dialog="dialog"
            text="ツイッターで結果をシェアする"
            :postText="postText"
            :buttonBlock="true"
            @inputDialog="inputDialog"
            @input="inputPostText"
            @click="postTweet"
        />
        <CustomButton
            :block="true"
            classObject="mt-5"
            text="もう一度遊ぶ"
            @click="replay"
        />
    </Layout>
</template>

<script>
import { mapGetters } from 'vuex'
import {
    TwitterTextInput,
    CustomButton,
    CustomDataTable,
    Layout,
} from '../components'
import { showAlert, transitionPage } from '@/common_functions/common'
import { postTweet } from '../common_functions/request'

export default {
    components: {
        CustomButton,
        CustomDataTable,
        Layout,
        TwitterTextInput,
    },
    computed: mapGetters(['resultOfSort', 'name', 'uid']),
    data: function () {
        return {
            dialog: false,
            headers: [
                { text: 'ランク', value: 'rank' },
                { text: '名前', value: 'name' },
            ],
            items: [],
            postText: '',
        }
    },
    methods: {
        inputPostText(value) {
            this.postText = value
        },
        inputDialog(dialog) {
            this.dialog = dialog
        },
        postTweet: async function () {
            const postData = {
                user_id: this.uid,
                text: this.postText,
            }

            const res = await postTweet(postData)

            // ダイアログを閉じる
            this.dialog = false

            if (res) {
                showAlert('結果をシェアしました', 'success')
            } else {
                showAlert('結果のシェアに失敗しました')
            }
        },
        replay() {
            transitionPage(this, 'play_sort_title', {
                sortId: this.$route.params.sortId,
            })
        },
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

        // vuexからソートの結果を取得して、ツイッターに投稿する文章を成形する
        let moldedText = `${this.name}のソート結果\n`

        for (let i = 0; i < 5; i++) {
            let rank = i + 1
            moldedText += `${rank}位：${this.resultOfSort[i]['name']}\n`
        }

        moldedText += '#ソートメーカー\nhttp://localhost:8080'
        this.postText = moldedText
    },
    name: 'PlaySortResult',
}
</script>
