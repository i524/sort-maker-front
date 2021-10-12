<template>
    <VCard :width="width" class="className">
        <CroppingImageInput
            :blob="blob"
            :initialImage="initialImage"
            :src="src"
            @sendBlob="sendBlob"
            @sendSrc="sendSrc"
        ></CroppingImageInput>
        <VCardTitle
            ><CustomTextField
                counter="255"
                label="ソートの名前"
                :rules="[required, isValidTextLength]"
                :value="name"
                @input="inputName"
            >
            </CustomTextField
        ></VCardTitle>
        <VCardText
            ><CustomTextArea
                counter="255"
                label="ソートの説明"
                :rules="[required, isValidTextLength]"
                :value="description"
                @input="inputDescription"
            >
            </CustomTextArea
        ></VCardText>
    </VCard>
</template>

<script>
import {
    CroppingImageInput,
    CustomTextField,
    CustomTextArea,
} from '../components'
import { required, isValidTextLength } from '../common_functions/validation'

export default {
    components: {
        CroppingImageInput,
        CustomTextField,
        CustomTextArea,
    },
    data() {
        return {
            required,
            isValidTextLength,
        }
    },
    methods: {
        inputDescription(description) {
            this.$emit('inputDescription', description)
        },
        inputName(name) {
            this.$emit('inputName', name)
        },
        sendBlob(blob) {
            this.$emit('sendBlob', blob)
        },
        sendSrc(src) {
            this.$emit('sendSrc', src)
        },
    },
    name: 'SortCardInput',
    props: {
        blob: {
            required: true,
        },
        className: {
            rquired: false,
        },
        description: {
            required: true,
        },
        initialImage: {
            required: false,
        },
        name: {
            required: true,
        },
        src: {
            required: true,
        },
        width: {
            required: false,
        },
    },
}
</script>
