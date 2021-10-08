<template>
    <VBtn :block="block" :color="color" :class="classObject" @click="sendClick">
        <VIcon left>{{ icon }}</VIcon>
        {{ text }}
    </VBtn>
</template>

<script>
export default {
    methods: {
        sendClick() {
            this.$emit('click')
        },
    },
    name: 'CustomButton',
    props: {
        block: {
            default: false,
            required: false,
        },
        text: {
            required: true,
        },
        classObject: {
            required: false,
        },
        color: {
            default: 'secondary',
            required: false,
        },
        icon: {
            required: false,
        },
    },
}
</script>
