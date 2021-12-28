<template>
    <Layout subTitle="ソートを作成しました">
        <SortCard
            :cardTitle="cardTitle"
            :cardText="cardText"
            className="mx-auto"
            :id="id"
            :src="src"
            @clickCard="clickCard"
        />
        <TwitterTextInput
            :block="true"
            :dialog="dialog"
            text="ソートをシェアする"
            :postText="postText"
            :buttonBlock="true"
            @inputDialog="inputDialog"
            @input="inputPostText"
            @click="postTweet"
        />
        <CustomButton
            :block="true"
            classObject="mt-5"
            text="もう一度作る"
            @click="reRegister"
        />
    </Layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Layout, SortCard, TwitterTextInput, CustomButton } from '../components'
import {
    getDownloadURL,
    showAlert,
    transitionPage,
} from '../common_functions/common'
import { searchSort, postTweet } from '../common_functions/request'
import { noImage } from '../assets/no_image.png'

export default {
    components: {
        CustomButton,
        Layout,
        SortCard,
        TwitterTextInput,
    },
    computed: mapGetters(['uid']),
    data() {
        return {
            cardTitle: '',
            cardText: '',
            id: this.$route.params.sortId,
            name: '',
            src: '',
            dialog: false,
            postText: '',
        }
    },
    methods: {
        ...mapActions(['updateIsProgress']),
        clickCard() {
            transitionPage(this, 'play_sort_title', { sortId: this.id })
        },
        inputPostText(value) {
            this.postText = value
        },
        inputDialog(dialog) {
            this.dialog = dialog
        },
        postTweet: async function () {
            // ローディングを開始する
            this.updateIsProgress(true)

            const postData = {
                user_id: this.uid,
                text: this.postText,
            }

            const res = await postTweet(postData)

            // ダイアログを閉じる
            this.dialog = false

            if (res) {
                showAlert('ソートをシェアしました', 'success')
            } else {
                showAlert('ソートのシェアに失敗しました')
            }
            this.updateIsProgress(false)
        },
        reRegister() {
            transitionPage(this, 'register_sort')
        },
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
        this.cardTitle = res['name'].substr(0, 18)
        this.cardText = res['description'].substr(0, 65)

        // firebasecloudstorageから画像を取得
        this.src =
            res['image'] === ''
                ? noImage
                : await getDownloadURL(`/images/sort_titles/${res['image']}`)

        // ツイッターに投稿する文章を成形する
        this.postText = `${res['name']}を作成しました！\nソートして遊んでみてね。\nhttp://localhost:8080/play_sort/title/${this.id}\n#ソートメーカー\nhttp://localhost:8080`
    },
    name: 'RegisterSortResult',
}
</script>
