<template>
    <div class="root">
        <h1>{{ subTitle }}</h1>
        <slot />
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
    text-align: center;
}
</style>
