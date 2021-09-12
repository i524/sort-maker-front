<template>
    <div class="root">
        <h1 class="text-center">ソートを作る</h1>
        <CustomButton
        :block="true"
        buttonText="ソートを作る"
        :classObject="classObject"
        color="secondary"
        >
        </CustomButton>
    </div>
</template>

<script>
import { CustomButton } from '../components';

export default {
    components: {
        CustomButton
    },
    data(){
        return {
            classObject: {
                "custom-button": true
            }
        }
    },
    name: 'Home',
}
</script>

<style lang="scss" scoped>
.root{
    & > *{
        margin-bottom: 20px;
    }
}

.custom-button{
    margin: 0 auto;
}
</style>