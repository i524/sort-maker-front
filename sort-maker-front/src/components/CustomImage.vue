<template>
    <VImg :src="src" :width="width" :height="height"></VImg>
</template>

<script>
export default {
    name: 'CustomImage',
    props: {
        height: {
            required: true,
        },
        src: {
            required: true,
        },
        width: {
            required: true,
        },
    },
}
</script>
