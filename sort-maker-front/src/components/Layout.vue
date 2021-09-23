<template>
    <div class="root">
        <h1 class="text-center">{{ subTitle }}</h1>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Layout',
    props: {
        subTitle: {
            default: '',
            required: false,
        },
    },
}
</script>

<style lang="scss" scoped>
.root {
    & > * {
        margin-bottom: 20px;
    }
}
</style>
