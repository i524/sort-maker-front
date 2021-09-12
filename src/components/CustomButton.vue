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
    props: [
        'block',
        'buttonText', 
        'classObject',
        'color'
    ]
}
</script>


<style scoped>
</style>