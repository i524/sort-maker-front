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
    </div>
</template>

<script>
import { CustomButton, CustomTextField } from '../components';
import { transitionPage } from '../common_functions/common';

export default {
    components: {
        CustomButton,
        CustomTextField
    },
    data(){
        return {
            searchText: '',
        }
    },
    methods: {
        callTransitionPage(page){
            transitionPage(this,page);
        },
        searchSort(){
        }
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