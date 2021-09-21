<template>
    <VTextField
        color="accent"
        :counter="counter"
        :label="label"
        :rules="rules"
        :value="value"
        @input="inputValue"
    >
    </VTextField>
</template>

<script>
export default {
    methods: {
        inputValue: function (value) {
            this.$emit('input', value)
        },
    },
    name: 'CustomTextField',
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
