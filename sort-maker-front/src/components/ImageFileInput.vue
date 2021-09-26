<template>
    <VFileInput
        :label="label"
        prepend-icon="fas fa-camera"
        :rule="[]"
        :value="value"
        @input="inputValue"
    >
    </VFileInput>
</template>

<script>
export default {
    methods: {
        inputValue(value) {
            this.$emit('input', value)
        },
    },
    name: 'ImageFileInput',
    props: {
        label: {
            required: true,
        },
        value: {
            required: true,
        },
    },
}
</script>
