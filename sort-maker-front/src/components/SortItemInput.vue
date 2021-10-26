<template>
    <VCard :width="width" :class="className + ' text-left'">
        <CroppingImageInput
            :blob="blob"
            :icon="icon"
            :initialImage="initialImage"
            @clickIcon="clickIcon"
            @sendBlob="sendBlob"
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
    },
    name: 'SortItemInput',
    props: {
        blob: {
            required: true,
        },
        className: {
            rquired: false,
        },
        icon: {
            required: false,
            default: false,
        },
        initialImage: {
            required: false,
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
