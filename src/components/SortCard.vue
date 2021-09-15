<template>
    <VCard :to="to" height="406px">
        <VImg :src="src"></VImg>
        <VCardTitle>{{ cardTitle }}</VCardTitle>
        <VCardText class="v-card-text">{{ cardText }}</VCardText>
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
            required: false,
        },
        to: {
            required: true,
        }
    }
}
</script>

<style scoped>
.v-card-text{
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    padding-bottom: 0;
}
</style>