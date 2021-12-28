<template>
    <VCard class="text-left" @click="clickCard">
        <VImg :src="src" />
        <VCardTitle class="sort-item-card">{{ cardTitle }}</VCardTitle>
    </VCard>
</template>

<script>
export default {
    methods: {
        clickCard() {
            this.$emit('clickCard')
        },
    },
    name: 'SortItemCard',
    props: {
        cardTitle: {
            required: true,
        },
        className: {
            required: false,
        },
        src: {
            required: false,
            default: require('../assets/no_image.png'),
        },
    },
}
</script>

<style scoped>
@media screen and (max-width: 769px) {
    .sort-item-card {
        font-size: 10px;
        line-height: 1.2;
    }
}
</style>
