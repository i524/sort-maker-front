<template>
    <VTextField
    :label="label"
    :prepend-icon="prependIcon"
    :value="value"
    @input="updateValue"
    >
    </VTextField>
</template>

<script>
export default{
    name: 'CustomTextField',
    props: {
        label: {
            required: true
        }, 
        prependIcon: {
            required: false
        },
        value: {
            required: true
        },
    },
    methods: {
        updateValue: function(value){
            this.$emit('input', value);
        }
    }
}
</script>