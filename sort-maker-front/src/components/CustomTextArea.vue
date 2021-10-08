<template>
    <VTextarea
        color="accent"
        :counter="counter"
        :label="label"
        :rules="rules"
        :value="value"
        @input="inputValue"
    >
    </VTextarea>
</template>

<script>
export default {
    methods: {
        inputValue(value) {
            this.$emit('input', value)
        },
    },
    name: 'CustomTextArea',
    props: {
        counter: {
            required: true,
        },
        label: {
            required: true,
        },
        rules: {
            required: true,
        },
        value: {
            required: true,
        },
    },
}
</script>
