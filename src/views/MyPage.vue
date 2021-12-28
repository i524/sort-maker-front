<template>
    <Layout subTitle="マイページ">
        <h2>お気に入りの編集</h2>
        <template v-if="$mq === 'lg'">
            <VRow>
                <VCol
                    cols="4"
                    v-for="(displayLikeSortCard, index) in displayLikeSortCards"
                    :key="index"
                >
                    <SortCard
                        :src="displayLikeSortCard.src"
                        :cardTitle="displayLikeSortCard.cardTitle"
                        :cardText="displayLikeSortCard.cardText"
                        :id="displayLikeSortCard.id"
                        @clickCard="displayLikeSortCard.clickCard"
                    />
                </VCol>
            </VRow>
        </template>
        <template v-if="$mq === 'md'">
            <VRow>
                <VCol
                    cols="12"
                    v-for="(displayLikeSortCard, index) in displayLikeSortCards"
                    :key="index"
                >
                    <SortCard
                        :src="displayLikeSortCard.src"
                        :cardTitle="displayLikeSortCard.cardTitle"
                        :cardText="displayLikeSortCard.cardText"
                        :id="displayLikeSortCard.id"
                        className="mx-auto"
                        @clickCard="displayLikeSortCard.clickCard"
                    />
                </VCol>
            </VRow>
        </template>
        <CustomPagenation
            :length="likeSortCardsPageLength"
            :value="likeSortCardsPage"
            :totalVisible="5"
            @input="inputLikeSortCardsPage"
        />
        <h2>作成したソートの編集</h2>
        <template v-if="$mq === 'lg'">
            <VRow>
                <VCol
                    cols="4"
                    v-for="(
                        displayRegisterSortCard, index
                    ) in displayRegisterSortCards"
                    :key="index"
                >
                    <SortCard
                        :src="displayRegisterSortCard.src"
                        :cardTitle="displayRegisterSortCard.cardTitle"
                        :cardText="displayRegisterSortCard.cardText"
                        :id="displayRegisterSortCard.id"
                        @clickCard="displayRegisterSortCard.clickCard"
                    />
                </VCol>
            </VRow>
        </template>
        <template v-if="$mq === 'md'">
            <VRow>
                <VCol
                    cols="12"
                    v-for="(
                        displayRegisterSortCard, index
                    ) in displayRegisterSortCards"
                    :key="index"
                >
                    <SortCard
                        :src="displayRegisterSortCard.src"
                        :cardTitle="displayRegisterSortCard.cardTitle"
                        :cardText="displayRegisterSortCard.cardText"
                        :id="displayRegisterSortCard.id"
                        className="mx-auto"
                        @clickCard="displayRegisterSortCard.clickCard"
                    />
                </VCol>
            </VRow>
        </template>
        <CustomPagenation
            :length="registerSortCardsPageLength"
            :value="registerSortCardsPage"
            :totalVisible="5"
            @input="inputRegisterSortCardsPage"
        />
    </Layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { Layout, CustomPagenation, SortCard } from '../components'
import {
    transitionPage,
    showAlert,
    getDownloadURL,
} from '../common_functions/common'
import {
    searchMultipleSorts,
    searchMultipleLikeSorts,
} from '../common_functions/request'
import { noImage } from '../assets/no_image.png'

export default {
    components: {
        CustomPagenation,
        SortCard,
        Layout,
    },
    computed: mapGetters(['uid']),
    data() {
        return {
            likeSortCardsPage: 1,
            registerSortCardsPage: 1,
            likeSortCardsPageLength: 1,
            registerSortCardsPageLength: 1,
            likeSorts: [],
            registerSorts: [],
            displayLikeSortCards: [],
            displayRegisterSortCards: [],
        }
    },
    methods: {
        callTransitionPage(name, params) {
            transitionPage(this, name, params)
        },
        async inputLikeSortCardsPage(value) {
            this.likeSortCardsPage = value

            // 選択されたページから表示するソートのlikeSorts内での始めのインデックスを求める
            const index = (this.likeSortCardsPage - 1) * 3

            // 表示するlikeSortCardsを初期化する
            this.displayLikeSortCards = []

            // 表示するsortCardsを生成する
            for (let i = index; i < index + 3; i++) {
                if (!(i in this.likeSorts)) break

                this.displayLikeSortCards.push({
                    src:
                        this.likeSorts[i]['image'] === ''
                            ? noImage
                            : await getDownloadURL(
                                  `/images/sort_titles/${this.likeSorts[i]['image']}`
                              ),
                    cardTitle: this.likeSorts[i]['name'].substr(0, 18),
                    cardText: this.likeSorts[i]['description'].substr(0, 65),
                    clickCard: () => {
                        this.callTransitionPage('play_sort_title', {
                            sortId: this.likeSorts[i]['id'],
                        })
                    },
                    id: this.likeSorts[i]['id'],
                })
            }
        },
        async inputRegisterSortCardsPage(value) {
            this.registerSortCardsPage = value

            // 選択されたページから表示するソートのregisterSorts内での始めのインデックスを求める
            const index = (this.registerSortCardsPage - 1) * 3

            // 表示するregisterSortCardsを初期化する
            this.displayRegisterSortCards = []

            // 表示するregisterSortCardsを生成する
            for (let i = index; i < index + 3; i++) {
                if (!(i in this.registerSorts)) break

                this.displayRegisterSortCards.push({
                    src:
                        this.registerSorts[i]['image'] === ''
                            ? noImage
                            : await getDownloadURL(
                                  `/images/sort_titles/${this.registerSorts[i]['image']}`
                              ),
                    cardTitle: this.registerSorts[i]['name'].substr(0, 18),
                    cardText: this.registerSorts[i]['description'].substr(
                        0,
                        65
                    ),
                    clickCard: () => {
                        this.callTransitionPage('edit_sort', {
                            sortId: this.registerSorts[i]['id'],
                        })
                    },
                    id: this.registerSorts[i]['id'],
                })
            }
        },
    },
    async mounted() {
        // ソートの情報をlikeSortCardsに格納
        // ユーザーidを渡してお気に入りのデータを取ってくる
        let postData = {
            user_id: this.uid,
        }

        let res = await searchMultipleLikeSorts(postData)

        // 失敗したらアラートを出す
        if (!res) {
            showAlert('お気に入りのソートの表示に失敗しました')
            return
        } else {
            this.likeSorts = res['like_sorts']
        }

        // ページネーションの長さをlikeSortsの数から算出して変更する
        this.likeSortCardsPageLength =
            this.likeSorts.length % 3
                ? Math.floor(this.likeSorts.length / 3) + 1
                : this.likeSorts.length / 3

        // 初回レンダリング時の選択されたページは1なのでinputLikeSortCardsPageに1を渡して実行、1ページ目のお気に入りのソートを表示する
        this.inputLikeSortCardsPage(this.likeSortCardsPage)

        // 作成したソートの情報をregisterSortCardsに格納
        // 必要な情報を渡してソートのデータを取ってくる
        postData = {
            user_id: this.uid,
        }

        res = await searchMultipleSorts(postData)

        // 失敗したらアラートを出す
        if (!res) {
            showAlert('作成したソートの表示に失敗しました')
            return
        } else {
            this.registerSorts = res['sorts']
        }

        // ページネーションの長さをregisterSortsの数から算出して変更する
        this.registerSortCardsPageLength =
            this.registerSorts.length % 3
                ? Math.floor(this.registerSorts.length / 3) + 1
                : this.registerSorts.length / 3

        // 初回レンダリング時の選択されたページは1なのでinputRegisterrSortCardsPageに1を渡して実行、1ページ目の作成したソートを表示する
        this.inputRegisterSortCardsPage(this.registerSortCardsPage)
    },
    name: 'Home',
}
</script>
