<template>
    <VCard :width="width">
        <CroppingImageInput :src="src"> </CroppingImageInput>
        <VCardTitle>
            <CustomTextField
                counter="255"
                label="アイテムの名前"
                :rules="[required, isValidTextLength]"
                :value="name"
                @input="inputName"
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
        inputName(name) {
            this.$emit('input', name)
        },
    },
    name: 'SortItemInput',
    props: {
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
