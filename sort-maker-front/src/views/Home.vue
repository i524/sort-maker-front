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
            <VCol cols="4" v-for="(sortCard, index) in sortCards" :key="index">
                <SortCard
                    :cardTitle="sortCard.cardTitle"
                    :cardText="sortCard.cardText"
                    :id="sortCard.id"
                    @clickCard="sortCard.clickCard"
                />
            </VCol>
        </VRow>
        <CustomPagenation v-model="page"></CustomPagenation>
        <h2>人気のソート</h2>
        <VRow>
            <VCol
                cols="4"
                v-for="(popularSortCard, index) in popularSortCards"
                :key="index"
            >
                <h2 class="mb-5">{{ index + 1 }}位</h2>
                <SortCard
                    :cardTitle="popularSortCard.cardTitle"
                    :cardText="popularSortCard.cardText"
                    :id="popularSortCard.id"
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
                    clickCard: () => {
                        this.callTransitionPage('play_sort')
                    },
                    id: 0,
                },
                {
                    cardTitle: 'ソート2',
                    cardText:
                        '面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。',
                    clickCard: () => {
                        this.callTransitionPage('play_sort')
                    },
                    id: 0,
                },
                {
                    cardTitle: 'ソート3',
                    cardText:
                        '面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。',
                    clickCard: () => {
                        this.callTransitionPage('PlaySort')
                    },
                    id: 0,
                },
            ],
            searchText: '',
            sortCards: [
                {
                    cardTitle: 'ソート1',
                    cardText:
                        '面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。',
                    clickCard: () => {
                        this.callTransitionPage('play_sort', { sortId: 103 })
                    },
                    id: 103,
                },
                {
                    cardTitle: 'ソート2',
                    cardText:
                        '面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。',
                    clickCard: () => {
                        this.callTransitionPage('play_sort')
                    },
                    id: 0,
                },
                {
                    cardTitle: 'ソート3',
                    cardText:
                        '面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。',
                    clickCard: () => {
                        this.callTransitionPage('play_sort')
                    },
                    id: 0,
                },
            ],
        }
    },
    methods: {
        callTransitionPage(name, params) {
            transitionPage(this, name, params)
        },
        searchSort() {},
        sortByPopularity() {},
        sortByTime() {},
    },
    name: 'Home',
}
</script>
