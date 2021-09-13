<template>
    <VBtn
    :color="color" 
    :class="classObject"
    @click="sendClick"
    :block="block"
    >
        {{ buttonText }}
    </VBtn>
</template>

<script>
export default{
    methods: {
        sendClick(){
            this.$emit('click');
        }
    },
    name: 'CustomButton',
    props: {
        block: {
            default: true,
            required: false
        },
        buttonText: {
            required: true
        }, 
        classObject: {
            required: false
        },
        color: {
            default: 'secondary',
            required: true
        },
    }
}
</script>