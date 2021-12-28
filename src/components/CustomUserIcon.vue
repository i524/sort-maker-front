<template>
    <VImg class="v-img" :src="src" :width="width" :height="height" />
</template>

<script>
export default {
    name: 'CustomUserIcon',
    props: {
        height: {
            required: true,
        },
        src: {
            required: true,
        },
        width: {
            required: true,
        },
    },
}
</script>

<style scoped>
.v-img {
    border-radius: 50%;
}
</style>
