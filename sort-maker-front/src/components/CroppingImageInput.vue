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
            <h1>テスト</h1>
            <croppa
                accept="image/*"
                class="croppa"
                :file-size-limit="1677721"
                :height="216"
                @new-image-drawn="newImagedrawn"
                remove-button-color="#FEC81A"
                :show-loading="true"
                :show-remove-button="true"
                :width="216"
                v-model="croppa"
                @zoom="zoom"
                :zoom-speed="4"
            ></croppa>
            <VSlider
                class="v-slider"
                color="secondary"
                @input="sliderInput"
                :max="sliderMax"
                :min="sliderMin"
                :step="0.001"
                track-color="secondary"
                v-model="sliderValue"
            >
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
            croppa: {},
            dialog: false,
            sliderMax: 1,
            sliderMin: 0,
            sliderValue: 0,
            src: require('../assets/no_image.png'),
        }
    },
    methods: {
        newImagedrawn() {
            this.sliderValue = this.croppa.scaleRatio
            this.sliderMin = this.croppa.scaleRatio
            this.sliderMax = this.croppa.scaleRatio * 5
        },
        sliderInput(e) {
            this.croppa.scaleRatio = e
        },
        zoom() {
            // 画像をズームした時にスライダーの範囲外にscaleRatioが出ないようにする処理
            if (this.croppa.scaleRatio >= this.sliderMax) {
                this.croppa.scaleRatio = this.sliderMax
            } else if (this.croppa.scaleRatio <= this.sliderMin) {
                this.croppa.scaleRatio = this.sliderMin
            }

            this.sliderValue = this.croppa.scaleRatio
        },
    },
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
