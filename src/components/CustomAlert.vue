<template>
    <VAlert
        :color="color"
        class="v-alert"
        dark
        dismissible
        :value="value"
        @input="sendInput"
        >{{ text }}</VAlert
    >
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
            default: 'warning',
            require: true,
        },
        value: {
            default: false,
            require: true,
        },
    },
}
</script>

<style scoped>
.v-alert {
    width: 100%;
    position: fixed;
    z-index: 2;
}
</style>
