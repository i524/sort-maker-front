<template>
    <VAlert :color="color" dark dismissible :value="value" @input="sendInput">{{
        text
    }}</VAlert>
</template>

<script>
export default {
    methods: {
        sendInput(value) {
            this.$emit('input', value)
        },
    },
    name: 'CustomAlert',
    props: {
        text: {
            require: true,
        },
        color: {
            default: 'success',
            require: true,
        },
        value: {
            default: false,
            require: true,
        },
    },
}
</script>
