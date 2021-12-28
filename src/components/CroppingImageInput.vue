<template>
    <div class="v-dialog-wrapper">
        <template v-if="icon">
            <VBtn @click="clickIcon" color="secondary" icon class="v-btn">
                <VIcon>fas fa-minus-circle</VIcon>
            </VBtn>
        </template>
        <VDialog @click:outside="sendBlob()" v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <VImg class="v-img" :src="src" v-bind="attrs" v-on="on" />
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
                    :initial-image="initialImage"
                    @new-image-drawn="newImagedrawn"
                    placeholder="NO IMAGE"
                    :placeholder-font-size="25"
                    placeholder-color="#FFF"
                    remove-button-color="#FEC81A"
                    :show-loading="true"
                    :show-remove-button="true"
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
                <p class="text-caption text--center primary--text">
                    {{ message }}
                </p>
            </VCard>
        </VDialog>
    </div>
</template>

<script>
export default {
    computed: {
        src() {
            if (
                !(this.blob === '') &&
                !(this.blob === require('../assets/no_image.png'))
            ) {
                // blobオブジェクトの時はurl化
                try {
                    return URL.createObjectURL(this.blob)
                } catch {
                    return this.blob
                }
            } else {
                return require('../assets/no_image.png')
            }
        },
    },
    data() {
        return {
            croppa: {},
            dialog: false,
            message: '',
            max: 1,
            min: 0,
            sliderValue: 0,
        }
    },
    methods: {
        clickIcon() {
            this.$emit('clickIcon')
        },
        fileSizeExceed() {
            this.message = 'ファイルのサイズが許容サイズを超えています'
        },
        fileTypeMismatch() {
            this.message = 'ファイルの拡張子が.png、.jpg、.jpegではありません'
        },
        newImagedrawn() {
            this.message = ''
            this.sliderValue = this.croppa.scaleRatio
            this.min = this.croppa.scaleRatio
            this.max = this.croppa.scaleRatio * 5
        },
        input(e) {
            this.croppa.scaleRatio = e
        },
        sendBlob() {
            // 画像がダイアログ上でアップロードされなかった時はBlobになにも渡さない処理
            if (this.croppa.hasImage()) {
                this.croppa.generateBlob(
                    (blob) => {
                        this.$emit('sendBlob', blob)
                    },
                    'image/jpeg',
                    0.8
                )
            } else {
                this.$emit('sendBlob', '')
            }
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
    props: {
        blob: {
            required: true,
        },
        icon: {
            required: false,
            default: false,
        },
        initialImage: {
            required: false,
        },
    },
}
</script>

<style scoped>
.v-dialog-wrapper {
    position: relative;
}

.v-btn {
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 1;
}

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
