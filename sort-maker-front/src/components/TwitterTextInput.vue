<template>
    <ButtonDialog
        :block="block"
        color="twitter"
        classObject="white--text"
        icon="fab fa-twitter"
        :text="text"
        textColor="white"
        :dialog="dialog"
        @inputDialog="inputDialog"
    >
        <template v-slot:content>
            <VCard>
                <VCardText class="pt-5"
                    ><CustomTextArea
                        counter="128"
                        label="ツイッターへの投稿文"
                        :rules="[required, isValidPostTextLength]"
                        :value="postText"
                        @input="inputPostText"
                /></VCardText>
                <VCardActions>
                    <CustomButton
                        :block="buttonBlock"
                        color="twitter"
                        classObject="white--text"
                        icon="fab fa-twitter"
                        :text="text"
                        @click="sendClick"
                    />
                </VCardActions>
            </VCard>
        </template>
    </ButtonDialog>
</template>

<script>
import { ButtonDialog, CustomButton, CustomTextArea } from '../components'
import { required, isValidPostTextLength } from '../common_functions/validation'

export default {
    components: {
        ButtonDialog,
        CustomButton,
        CustomTextArea,
    },
    data() {
        return {
            required,
            isValidPostTextLength,
        }
    },
    methods: {
        inputDialog(dialog) {
            this.$emit('inputDialog', dialog)
        },
        inputPostText(value) {
            this.$emit('input', value)
        },
        sendClick() {
            this.$emit('click')
        },
    },
    name: 'TwitterTextInput',
    props: {
        block: {
            default: false,
            required: false,
        },
        dialog: {
            default: false,
            required: true,
        },
        text: {
            required: true,
        },
        postText: {
            required: true,
        },
        buttonBlock: {
            default: false,
            required: false,
        },
    },
}
</script>
