<template>
    <VAlert :color="color" dark dismissible :value="value" @input="sendInput">{{
        alertText
    }}</VAlert>
</template>

<script>
export default {
    methods: {
        sendInput: function (value) {
            this.$emit('input', value)
        },
    },
    name: 'CustomAlert',
    props: {
        alertText: {
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
