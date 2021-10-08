<template>
    <VCard :width="width">
        <CroppingImageInput :src="src"></CroppingImageInput>
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
            this.$emit('input', description)
        },
        inputName(name) {
            this.$emit('input', name)
        },
    },
    name: 'SortCardInput',
    props: {
        description: {
            required: true,
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
