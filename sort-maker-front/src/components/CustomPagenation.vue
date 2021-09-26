<template>
    <VPagination :length="5" :value="value" @input="inputValue"> </VPagination>
</template>

<script>
export default {
    methods: {
        inputValue(value) {
            this.$emit('input', value)
        },
    },
    name: 'CustomPagenation',
    props: {
        value: {
            default: 1,
            required: true,
        },
    },
}
</script>
