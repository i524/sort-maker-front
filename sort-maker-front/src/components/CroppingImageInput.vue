<template>
    <VDialog
        @click:outside="
            generateDataUrl()
            sendSrc()
        "
        v-model="dialog"
        width="500"
    >
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
        <VCard class="text-center v-card">
            <h2 class="mb-5">画像編集</h2>
            <croppa
                accept=".png, .jpg, .jpeg"
                canvas-color="#CBCBCB"
                class="croppa"
                @file-size-exceed="fileSizeExceed"
                @file-type-mismatch="fileTypeMismatch"
                :file-size-limit="1677721"
                :height="216"
                @new-image-drawn="newImagedrawn"
                placeholder="NO IMAGE"
                :placeholder-font-size="25"
                placeholder-color="#FFF"
                remove-button-color="#FEC81A"
                :show-loading="true"
                :show-remove-button="true"
                :width="216"
                v-model="croppa"
                @zoom="zoom"
                :zoom-speed="15"
            ></croppa>
            <VSlider
                class="v-slider"
                color="secondary"
                @input="input"
                :max="max"
                :min="min"
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
            <VMessages
                class="text-center"
                color="primary"
                :value="message"
            ></VMessages>
        </VCard>
    </VDialog>
</template>

<script>
export default {
    data() {
        return {
            croppa: {},
            dialog: false,
            message: [],
            max: 1,
            min: 0,
            sliderValue: 0,
            src: require('../assets/no_image.png'),
        }
    },
    methods: {
        fileSizeExceed() {
            this.message = ['ファイルのサイズが許容サイズを超えています']
        },
        fileTypeMismatch() {
            this.message = ['ファイルの拡張子が.png、.jpg、.jpegではありません']
        },
        generateDataUrl() {
            if (this.croppa.hasImage()) {
                this.src = this.croppa.generateDataUrl()
            } else {
                this.src = require('../assets/no_image.png')
            }
        },
        newImagedrawn() {
            this.message = []
            this.sliderValue = this.croppa.scaleRatio
            this.min = this.croppa.scaleRatio
            this.max = this.croppa.scaleRatio * 5
        },
        input(e) {
            this.croppa.scaleRatio = e
        },
        sendSrc() {
            this.$emit('sendSrc', this.src)
        },
        zoom() {
            // 画像をズームした時にスライダーの範囲外にscaleRatioが出ないようにする処理
            if (this.croppa.scaleRatio >= this.max) {
                this.croppa.scaleRatio = this.max
            } else if (this.croppa.scaleRatio <= this.min) {
                this.croppa.scaleRatio = this.min
            }

            this.sliderValue = this.croppa.scaleRatio
        },
    },
    name: 'CroppingImageInput',
}
</script>

<style scoped>
.v-card {
    padding: 16px;
}

.v-img:hover {
    opacity: 0.5;
}

.v-slider {
    margin: 0 auto;
    width: 350px;
}
</style>
