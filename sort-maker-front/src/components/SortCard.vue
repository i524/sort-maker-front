<template>
    <VCard :height="450" @click="clickCard">
        <VImg :src="src">
            <template v-if="icon">
                <VBtn @click="clickIcon" :color="color" icon>
                    <VIcon>{{ iconName }}</VIcon>
                </VBtn>
            </template>
        </VImg>
        <VCardTitle>{{ cardTitle }}</VCardTitle>
        <VCardText>{{ cardText }}</VCardText>
    </VCard>
</template>

<script>
export default {
    methods: {
        clickCard() {
            this.$emit('clickCard')
        },
        clickIcon() {
            this.$emit('clickIcon')
        },
    },
    name: 'SortCard',
    props: {
        cardTitle: {
            required: true,
        },
        cardText: {
            required: true,
        },
        color: {
            default: 'warning',
            required: false,
        },
        icon: {
            default: false,
            required: false,
        },
        iconName: {
            required: false,
        },
        src: {
            default: require('../assets/no_image.png'),
            required: false,
        },
    },
}
</script>
