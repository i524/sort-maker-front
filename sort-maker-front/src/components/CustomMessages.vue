<template>
    <VMessages :class="classes" :color="color" :value="value"></VMessages>
</template>

<script>
export default {
    name: 'CustomMessages',
    props: {
        classes: {
            required: false,
        },
        color: {
            required: false,
        },
        value: {
            required: true,
        },
    },
}
</script>
