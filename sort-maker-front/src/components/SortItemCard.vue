<template>
    <VCard class="text-left" @click="clickCard">
        <VImg :src="src" />
        <VCardTitle>{{ cardTitle }}</VCardTitle>
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
        src: {
            required: false,
            default: require('../assets/no_image.png'),
        },
    },
}
</script>
