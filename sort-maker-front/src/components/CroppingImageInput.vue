<template>
    <VDialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <VImg
                class="v-img"
                :src="src"
                :width="216"
                :height="216"
                v-bind="attrs"
                v-on="on"
            ></VImg>
        </template>
        <VCard class="v-card">
            <croppa
                class="croppa"
                :width="216"
                :height="216"
                :show-remove-button="true"
                remove-button-color="#FEC81A"
                :show-loading="true"
                :file-size-limit="1677721"
                accept="image/*"
            ></croppa>
            <VSlider class="v-slider" color="secondary" track-color="secondary">
                <template v-slot:prepend>
                    <VIcon color="secondary"> fas fa-minus-circle </VIcon>
                </template>

                <template v-slot:append>
                    <VIcon color="secondary"> fas fa-plus-circle </VIcon>
                </template>
            </VSlider>
        </VCard>
    </VDialog>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            src: require('../assets/no_image.png'),
        }
    },
    methods: {},
    name: 'CroppingImageInput',
    props: {},
}
</script>

<style scoped>
.v-card {
    padding: 16px;
    text-align: center;
}

.v-img:hover {
    opacity: 0.5;
}

.v-slider {
    margin: 0 auto;
    width: 350px;
}
</style>
