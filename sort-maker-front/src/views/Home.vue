<template>
    <Layout>
        <h2 class="text-center">ソートを作る</h2>
        <CustomButton
            :block="true"
            text="作る"
            @click="callTransitionPage('RegisterSort')"
        ></CustomButton>
        <h2 class="text-center mt-10">ソートで遊ぶ</h2>
        <VTextField
            label="ソートを検索する"
            prependIcon="fas fa-search"
            v-model="searchText"
        ></VTextField>
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
            <VCol cols="4" v-for="(sortCard, index) in sortCards" :key="index">
                <SortCard
                    buttonText="遊ぶ"
                    :cardTitle="sortCard.cardTitle"
                    :cardText="sortCard.cardText"
                    @clickButton="sortCard.clickButton"
                    @clickIcon="sortCard.clickIcon"
                    :icon="true"
                    iconName="fas fa-heart"
                >
                </SortCard>
            </VCol>
        </VRow>
        <CustomPagenation v-model="page"></CustomPagenation>
        <h2 class="text-center">人気のソート</h2>
        <VRow>
            <VCol
                cols="4"
                v-for="(popularSortCard, index) in popularSortCards"
                :key="index"
            >
                <h2 class="mb-5 text-center">{{ index + 1 }}位</h2>
                <SortCard
                    buttonText="遊ぶ"
                    :cardTitle="popularSortCard.cardTitle"
                    :cardText="popularSortCard.cardText"
                    @clickButton="popularSortCard.clickButton"
                    @clickIcon="popularSortCard.clickIcon"
                    :icon="true"
                    iconName="fas fa-heart"
                >
                </SortCard>
            </VCol>
        </VRow>
    </Layout>
</template>

<script>
import { CustomButton, CustomPagenation, SortCard, Layout } from '../components'
import { transitionPage } from '../common_functions/common'

export default {
    components: {
        CustomButton,
        CustomPagenation,
        SortCard,
        Layout,
    },
    data() {
        return {
            page: 1,
            popularSortCards: [
                {
                    cardTitle: 'ソート1',
                    cardText:
                        '面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。',
                    clickButton: () => {
                        this.callTransitionPage('PlaySort')
                    },
                    clickIcon: () => {
                        this.addFavorite()
                    },
                },
                {
                    cardTitle: 'ソート2',
                    cardText:
                        '面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。',
                    clickButton: () => {
                        this.callTransitionPage('PlaySort')
                    },
                    clickIcon: () => {
                        this.addFavorite()
                    },
                },
                {
                    cardTitle: 'ソート3',
                    cardText:
                        '面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。',
                    clickButton: () => {
                        this.callTransitionPage('PlaySort')
                    },
                    clickIcon: () => {
                        this.addFavorite()
                    },
                },
            ],
            searchText: '',
            sortCards: [
                {
                    cardTitle: 'ソート1',
                    cardText:
                        '面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。',
                    clickButton: () => {
                        this.callTransitionPage('PlaySort')
                    },
                    clickIcon: () => {
                        this.addFavorite()
                    },
                },
                {
                    cardTitle: 'ソート2',
                    cardText:
                        '面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。',
                    clickButton: () => {
                        this.callTransitionPage('PlaySort')
                    },
                    clickIcon: () => {
                        this.addFavorite()
                    },
                },
                {
                    cardTitle: 'ソート3',
                    cardText:
                        '面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。',
                    clickButton: () => {
                        this.callTransitionPage('PlaySort')
                    },
                    clickIcon: () => {
                        this.addFavorite()
                    },
                },
            ],
        }
    },
    methods: {
        addFavorite() {
            console.log(this.page)
        },
        callTransitionPage(page) {
            transitionPage(this, page)
        },
        searchSort() {},
        sortByPopularity() {},
        sortByTime() {},
    },
    name: 'Home',
}
</script>
