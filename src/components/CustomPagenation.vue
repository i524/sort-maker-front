<template>
    <VPagination
        :length="length"
        :value="value"
        :total-visible="totalVisible"
        @input="inputValue"
    >
    </VPagination>
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
        length: {
            required: false,
        },
        totalVisible: {
            required: false,
        },
    },
}
</script>
