<template>
    <VCard>
        <VCardTitle>{{ title }}</VCardTitle>
        <VCardText class="v-card-text text-left">{{ text }}</VCardText>
    </VCard>
</template>

<script>
export default {
    name: 'CustomCard',
    props: {
        title: {
            required: true,
        },
        text: {
            required: true,
        },
    },
}
</script>

<style scoped>
.v-card-text {
    white-space: pre-line;
}
</style>
