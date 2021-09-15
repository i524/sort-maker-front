<template>
    <div class="root">
        <h1 class="text-center">ソートを作る</h1>
        <CustomButton
        :block="true"
        buttonText="作る"
        color="secondary"
        @click="callTransitionPage('/register_sort')"
        ></CustomButton>
        <h1 class="text-center mt-10">ソートで遊ぶ</h1>
        <CustomTextField
        label="ソートを検索する"
        prependIcon="fas fa-search"
        v-model="searchText"
        ></CustomTextField>
        <CustomButton
        :block="true"
        buttonText="検索"
        color="secondary"
        @click="searchSort"
        >
        </CustomButton>
        <VRow>
            <VCol cols="6">
                <CustomButton
                buttonText="人気順"
                color="secondary"
                @click="sortByPopularity"
                ></CustomButton>
            </VCol>
            <VCol cols="6">
                <CustomButton
                buttonText="新着順"
                color="secondary"
                @click="sortByTime"
                ></CustomButton>
            </VCol>
        </VRow>
        <VRow>
            <VCol cols="4" v-for="(sortCard, index) in sortCards" :key="index">
                <SortCard
                :cardTitle="sortCard.cardTitle"
                :cardText="sortCard.cardText"
                :to="sortCard.to"
                >
                </SortCard>
            </VCol>
        </VRow>
    </div>
</template>

<script>
import { CustomButton, CustomTextField, SortCard } from '../components';
import { transitionPage } from '../common_functions/common';

export default {
    components: {
        CustomButton,
        CustomTextField,
        SortCard
    },
    data(){
        return {
            searchText: '',
            sortCards: [
                {
                    cardTitle: 'ソート1',
                    cardText: '面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。',
                    to: 'play_sort'
                },
                {
                    cardTitle: 'ソート2',
                    cardText: '面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。',
                    to: 'play_sort'
                },
                {
                    cardTitle: 'ソート3',
                    cardText: '面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。',
                    to: 'play_sort'
                },
            ],
        }
    },
    methods: {
        callTransitionPage(page){
            transitionPage(this,page);
        },
        searchSort(){
        },
        sortByPopularity(){
        },
        sortByTime(){
        },
    },
    name: 'Home',
}
</script>

<style lang="scss" scoped>
.root{
    & > *{
        margin-bottom: 20px;
    }
}
</style>