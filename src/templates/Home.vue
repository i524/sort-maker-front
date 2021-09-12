<template>
    <div class="root">
        <h1 class="text-center">ソートを作る</h1>
        <CustomButton
        :block="true"
        buttonText="ソートを作る"
        color="secondary"
        ></CustomButton>
        <h1 class="text-center">ソートで遊ぶ</h1>
        <CustomTextField
        label="ソートを検索する"
        prependIcon="fas fa-search"
        v-model="searchText"
        ></CustomTextField>
    </div>
</template>

<script>
import { CustomButton, CustomTextField } from '../components';

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