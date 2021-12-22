<template>
    <Layout>
        <h2>ソートを作る</h2>
        <CustomButton
            :block="true"
            text="作る"
            @click="callTransitionPage('register_sort')"
        ></CustomButton>
        <h2 class="mt-10">ソートで遊ぶ</h2>
        <VTextField
            label="ソートを検索する"
            prependIcon="fas fa-search"
            v-model="searchText"
        />
        <CustomButton :block="true" text="検索" @click="searchSort">
        </CustomButton>
        <VRow>
            <VCol cols="6">
                <CustomButton
                    :block="true"
                    text="人気順"
                    @click="sortByPopularity"
                ></CustomButton>
            </VCol>
            <VCol cols="6">
                <CustomButton
                    :block="true"
                    text="新着順"
                    @click="sortByTime"
                ></CustomButton>
            </VCol>
        </VRow>
        <VRow>
            <VCol
                cols="4"
                v-for="(displaySortCard, index) in displaySortCards"
                :key="index"
            >
                <SortCard
                    :src="displaySortCard.src"
                    :cardTitle="displaySortCard.cardTitle"
                    :cardText="displaySortCard.cardText"
                    :id="displaySortCard.id"
                    @clickCard="displaySortCard.clickCard"
                />
            </VCol>
        </VRow>
        <CustomPagenation
            :length="sortCardsPageLength"
            :value="sortCardsPage"
            :totalVisible="5"
            @input="inputSortCardsPage"
        />
        <h2>人気のソート</h2>
        <VRow>
            <VCol
                cols="4"
                v-for="(
                    displayPopularSortCard, index
                ) in displayPopularSortCards"
                :key="index"
            >
                <h2 class="mb-5">
                    {{ (popularSortCardsPage - 1) * 3 + index + 1 }}位
                </h2>
                <SortCard
                    :src="displayPopularSortCard.src"
                    :cardTitle="displayPopularSortCard.cardTitle"
                    :cardText="displayPopularSortCard.cardText"
                    :id="displayPopularSortCard.id"
                    @clickCard="displayPopularSortCard.clickCard"
                >
                </SortCard>
            </VCol>
        </VRow>
        <CustomPagenation
            :length="popularSortCardsPageLength"
            :value="popularSortCardsPage"
            :totalVisible="5"
            @input="inputPopularSortCardsPage"
        />
    </Layout>
</template>

<script>
import { CustomButton, CustomPagenation, SortCard, Layout } from '../components'
import {
    transitionPage,
    showAlert,
    getDownloadURL,
} from '../common_functions/common'
import { searchMultipleSorts } from '../common_functions/request'
import { noImage } from '../assets/no_image.png'

export default {
    components: {
        CustomButton,
        CustomPagenation,
        SortCard,
        Layout,
    },
    data() {
        return {
            sortCardsPage: 1,
            popularSortCardsPage: 1,
            sortCardsPageLength: 1,
            popularSortCardsPageLength: 1,
            sorts: [],
            popularSorts: [],
            displaySortCards: [],
            displayPopularSortCards: [],
            searchText: '',
        }
    },
    methods: {
        callTransitionPage(name, params) {
            transitionPage(this, name, params)
        },
        async inputSortCardsPage(value) {
            this.sortCardsPage = value

            // 選択されたページから表示するソートのsorts内での始めのインデックスを求める
            const index = (this.sortCardsPage - 1) * 3

            // 表示するsortCardsを初期化する
            this.displaySortCards = []

            // 表示するsortCardsを生成する
            for (let i = index; i < index + 3; i++) {
                if (!(i in this.sorts)) break

                this.displaySortCards.push({
                    src:
                        this.sorts[i]['image'] === ''
                            ? noImage
                            : await getDownloadURL(
                                  `/images/sort_titles/${this.sorts[i]['image']}`
                              ),
                    cardTitle: this.sorts[i]['name'],
                    cardText: this.sorts[i]['description'],
                    clickCard: () => {
                        this.callTransitionPage('play_sort_title', {
                            sortId: this.sorts[i]['id'],
                        })
                    },
                    id: this.sorts[i]['id'],
                })
            }
        },
        async inputPopularSortCardsPage(value) {
            this.popularSortCardsPage = value

            // 選択されたページから表示するソートのpopularSorts内での始めのインデックスを求める
            const index = (this.popularSortCardsPage - 1) * 3

            // 表示するpopularSortCardsを初期化する
            this.displayPopularSortCards = []

            // 表示するpopularSortCardsを生成する
            for (let i = index; i < index + 3; i++) {
                if (!(i in this.popularSorts)) break

                this.displayPopularSortCards.push({
                    src:
                        this.popularSorts[i]['image'] === ''
                            ? noImage
                            : await getDownloadURL(
                                  `/images/sort_titles/${this.popularSorts[i]['image']}`
                              ),
                    cardTitle: this.popularSorts[i]['name'],
                    cardText: this.popularSorts[i]['description'],
                    clickCard: () => {
                        this.callTransitionPage('play_sort_title', {
                            sortId: this.popularSorts[i]['id'],
                        })
                    },
                    id: this.popularSorts[i]['id'],
                })
            }
        },
        async searchSort() {
            // 必要な情報を渡してソートのデータを取ってくる
            let postData = {
                part_of_sort_name: this.searchText,
            }

            let res = await searchMultipleSorts(postData)

            // 失敗したらアラートを出す
            if (!res) {
                showAlert('ソートの検索に失敗しました')
                return
            } else {
                this.sorts = res['sorts']
            }

            // ページネーションの長さをsortsの数から算出して変更する
            this.sortCardsPageLength =
                this.sorts.length % 3
                    ? Math.floor(this.sorts.length / 3) + 1
                    : this.sorts.length / 3

            // 表示するソートを1ページ目のソートにする
            this.inputSortCardsPage(1)
        },
        async sortByPopularity() {
            // 必要な情報を渡してソートのデータを取ってくる
            let postData = {
                part_of_sort_name: this.searchText,
                is_sort_by_popularity: true,
            }

            let res = await searchMultipleSorts(postData)

            // 失敗したらアラートを出す
            if (!res) {
                showAlert('ソートの検索に失敗しました')
                return
            } else {
                this.sorts = res['sorts']
            }

            // ページネーションの長さをsortsの数から算出して変更する
            this.popularSortCardsPageLength =
                this.popularSorts.length % 3
                    ? Math.floor(this.popularSorts.length / 3) + 1
                    : this.popularSorts.length / 3

            // 表示するソートを1ページ目のソートにする
            this.inputSortCardsPage(1)
        },
        async sortByTime() {
            // 必要な情報を渡してソートのデータを取ってくる
            let postData = {
                part_of_sort_name: this.searchText,
                is_sort_by_time: true,
            }

            let res = await searchMultipleSorts(postData)

            // 失敗したらアラートを出す
            if (!res) {
                showAlert('ソートの検索に失敗しました')
                return
            } else {
                this.sorts = res['sorts']
            }

            // ページネーションの長さをsortsの数から算出して変更する
            this.sortCardsPageLength =
                this.sorts.length % 3
                    ? Math.floor(this.sorts.length / 3) + 1
                    : this.sorts.length / 3

            // 表示するソートを1ページ目のソートにする
            this.inputSortCardsPage(1)
        },
    },
    async mounted() {
        // ソートの情報をsortCardsに格納
        // 必要な情報を渡してソートのデータを取ってくる
        let postData = {}

        let res = await searchMultipleSorts(postData)

        // 失敗したらアラートを出す
        if (!res) {
            showAlert('ソートの表示に失敗しました')
            return
        } else {
            this.sorts = res['sorts']
        }

        // ページネーションの長さをsortsの数から算出して変更する
        this.sortCardsPageLength =
            this.sorts.length % 3
                ? Math.floor(this.sorts.length / 3) + 1
                : this.sorts.length / 3

        // 初回レンダリング時の選択されたページは1なのでinputSortCardsPageに1を渡して実行、1ページ目のソートを表示する
        this.inputSortCardsPage(this.sortCardsPage)

        // 人気ソートの情報をpopularSortCardsに格納
        // 必要な情報を渡してソートのデータを取ってくる
        postData = {
            is_sort_by_popularity: true,
        }

        res = await searchMultipleSorts(postData)

        // 失敗したらアラートを出す
        if (!res) {
            showAlert('ソートの表示に失敗しました')
            return
        } else {
            this.popularSorts = res['sorts']
        }

        // ページネーションの長さをsortsの数から算出して変更する
        this.popularSortCardsPageLength =
            this.popularSorts.length % 3
                ? Math.floor(this.popularSorts.length / 3) + 1
                : this.popularSorts.length / 3

        // 初回レンダリング時の選択されたページは1なのでinputPopularSortCardsPageに1を渡して実行、1ページ目の人気ソートを表示する
        this.inputPopularSortCardsPage(this.popularSortCardsPage)
    },
    name: 'Home',
}
</script>
