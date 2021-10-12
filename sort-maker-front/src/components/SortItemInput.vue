<template>
    <VCard :width="width">
        <CroppingImageInput
            :blob="blob"
            :icon="icon"
            :initialImage="initialImage"
            :src="src"
            @clickIcon="clickIcon"
            @sendBlob="sendBlob"
            @sendSrc="sendSrc"
        >
        </CroppingImageInput>
        <VCardTitle>
            <CustomTextField
                counter="255"
                label="アイテムの名前"
                :rules="[required, isValidTextLength]"
                :value="value"
                @input="inputItemName"
            ></CustomTextField
        ></VCardTitle>
    </VCard>
</template>

<script>
import { CroppingImageInput, CustomTextField } from '../components'
import { required, isValidTextLength } from '../common_functions/validation'

export default {
    components: {
        CroppingImageInput,
        CustomTextField,
    },
    data() {
        return {
            isValidTextLength,
            required,
        }
    },
    methods: {
        clickIcon() {
            this.$emit('clickIcon')
        },
        inputItemName(itemName) {
            this.$emit('input', itemName)
        },
        sendBlob(blob) {
            this.$emit('sendBlob', blob)
        },
        sendSrc(src) {
            this.$emit('sendSrc', src)
        },
    },
    name: 'SortItemInput',
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
        src: {
            required: true,
        },
        width: {
            required: false,
        },
        value: {
            required: true,
        },
    },
}
</script>
