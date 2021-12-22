<template>
    <Layout subTitle="ソートで遊ぶ">
        <SortCard
            :cardTitle="cardTitle"
            :cardText="cardText"
            className="mx-auto"
            :id="id"
            :src="src"
            @clickCard="clickCard"
        />
        <p>作成者：{{ userName }}</p>
        <p>遊ばれた回数：{{ playCount }}</p>
    </Layout>
</template>

<script>
import { mapActions } from 'vuex'
import { Layout, SortCard } from '../components'
import {
    getDownloadURL,
    transitionPage,
    showAlert,
} from '../common_functions/common'
import { searchSort, updatePlayCount } from '../common_functions/request'
import { noImage } from '../assets/no_image.png'

export default {
    components: {
        Layout,
        SortCard,
    },
    data() {
        return {
            cardTitle: '',
            cardText: '',
            id: this.$route.params.sortId,
            name: '',
            playCount: 0,
            src: '',
            userName: '',
        }
    },
    methods: {
        async clickCard() {
            // ソートidを渡してソートの遊ばれた回数を更新する
            const postData = {
                sort_id: this.id,
            }

            const res = await updatePlayCount(postData)

            // 失敗したらアラートを出す
            if (!res) {
                showAlert('遊ばれた回数の更新に失敗しました')
            }

            transitionPage(this, 'play_sort_process', { sortId: this.id })
        },
        ...mapActions(['updateName']),
    },
    async mounted() {
        // ソートidを渡してソートのデータを取ってくる
        const postData = {
            id: this.id,
        }

        const res = await searchSort(postData)

        // 失敗したらアラートを出す
        if (!res) {
            showAlert('ソートの表示に失敗しました')
            return
        }

        // 成功したらソートのデータを表示
        this.cardTitle = res['name']
        this.cardText = res['description']
        this.name = res['user_name']
        this.playCount = res['play_count']
        this.userName = res['user_name']

        // vuexにソートの名前を保存
        this.updateName(res['name'])

        // firebasecloudstorageから画像を取得
        this.src =
            res['image'] === ''
                ? noImage
                : await getDownloadURL(`/images/sort_titles/${res['image']}`)
    },
    name: 'PlaySort',
}
</script>
