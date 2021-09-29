<template>
    <croppa
        :width="200"
        :height="200"
        :show-remove-button="true"
        remove-button-color="black"
        :show-loading="true"
        :file-size-limit="2097152"
        accept="image/png"
    >
        ></croppa
    >
</template>

<script>
export default {
    methods: {},
    name: 'CroppingImageInput',
    props: {},
}
</script>
