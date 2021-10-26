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
import { Layout, SortCard } from '../components'
import { initializeApp, showAlert } from '../common_functions/common'
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
            id: 0,
            name: '',
            playCount: 0,
            src: '',
            userName: '',
        }
    },
    methods: {
        clickCard() {},
    },
    async mounted() {
        // ソートidを渡してソートのデータを取ってくる
        this.id = this.$route.params.sortId

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

        // firebasecloudstorageから画像を取得
        // firebaseの初期設定
        const firebase = initializeApp()
        // 初期設定ができていなかったらエラーメッセージを出す
        if (!firebase) {
            showAlert('ソートの画像を表示できませんでした')
            return
        }

        const storageRef = firebase.storage().ref()

        storageRef
            .child(`/images/sort_titles/${res['image']}`)
            .getDownloadURL()
            .then((url) => {
                this.src = url
            })
            .catch(() => {
                showAlert('ソートの画像を表示できませんでした')
            })
    },
    name: 'PlaySort',
}
</script>
