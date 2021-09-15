<template>
    <div class="root">
        <h1 class="text-center">ソートを作る</h1>
        <CustomButton
        :block="true"
        buttonText="作る"
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
        @click="searchSort"
        >
        </CustomButton>
        <VRow>
            <VCol cols="6">
                <CustomButton
                buttonText="人気順"
                @click="sortByPopularity"
                ></CustomButton>
            </VCol>
            <VCol cols="6">
                <CustomButton
                buttonText="新着順"
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
        <CustomPagenation
        v-model="page"
        >
        </CustomPagenation>
    </div>
</template>

<script>
import { CustomButton, CustomPagenation, CustomTextField, SortCard } from '../components';
import { transitionPage } from '../common_functions/common';

export default {
    components: {
        CustomButton,
        CustomPagenation,
        CustomTextField,
        SortCard
    },
    data(){
        return {
            page: 1,
            searchText: '',
            sortCards: [
                {
                    cardTitle: 'ソート1',
                    cardText: '面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。',
                    clickButton: () => { this.callTransitionPage('/play_sort'); },
                    clickIcon: () => { this.addFavorite(); }
                },
                {
                    cardTitle: 'ソート2',
                    cardText: '面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。',
                    clickButton: () => { this.callTransitionPage('/play_sort'); },
                    clickIcon: () => { this.addFavorite(); }
                },
                {
                    cardTitle: 'ソート3',
                    cardText: '面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。面白いソートです。',
                    clickButton: () => { this.callTransitionPage('/play_sort'); },
                    clickIcon: () => { this.addFavorite(); }
                },
            ],
        }
    },
    methods: {
        addFavorite(){
            console.log(this.page);
        },
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