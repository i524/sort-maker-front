<template>
    <VCard :width="width" :class="className + ' text-left'">
        <CroppingImageInput
            :blob="blob"
            @sendBlob="sendBlob"
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

export default {
    components: {
        CroppingImageInput,
        CustomTextField,
        CustomTextArea,
    },
    data() {
        return {
            required: (value) => !!value || '必ず入力してください',
            isValidTextLength: (value) =>
                (value.length >= 1 && value.length <= 255) ||
                `1文字以上255文字以下で入力してください`,
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
        width: {
            required: false,
        },
    },
}
</script>
