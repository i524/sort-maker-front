<template>
    <VBtn
    :color="color" 
    :class="classObject"
    :block="block"
    >
        {{ buttonText }}
    </VBtn>
</template>

<script>
export default{
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