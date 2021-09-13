<template>
    <VCard @click="sendClick">
        <VImg :src="src"></VImg>
        <VCardTitle>{{ cardTitle }}</VCardTitle>
        <VCardText>{{ cardText }}</VCardText>
    </VCard>
</template>

<script>
export default{
    methods: {
        sendClick(){
            this.$emit('click');
        }
    },
    name: 'SortCard',
    props: {
        cardTitle: {
            required: true,
        },
        cardText: {
            required: true
        }, 
        src: {
            default: require('../assets/no_image.png'),
            required: true,
        }
    }
}
</script>