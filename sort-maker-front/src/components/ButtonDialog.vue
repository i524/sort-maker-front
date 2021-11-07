<template>
    <VDialog width="500" :value="dialog" @input="inputDialog">
        <template v-slot:activator="{ on, attrs }">
            <VBtn
                :block="block"
                :color="color"
                :class="classObject"
                v-on="on"
                v-bind="attrs"
            >
                <VIcon left>{{ icon }}</VIcon>
                {{ text }}
            </VBtn>
        </template>
        <slot name="content" />
    </VDialog>
</template>

<script>
export default {
    methods: {
        inputDialog(dialog) {
            this.$emit('inputDialog', dialog)
        },
    },
    name: 'ButtonDialog',
    props: {
        block: {
            default: false,
            required: false,
        },
        dialog: {
            default: false,
            required: true,
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
