<template>
    <VDialog v-model="dialog" width="500">
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
        <VCard class="v-card">
            <h1>テスト</h1>
            <croppa
                accept="image/*"
                class="croppa"
                :file-size-limit="1677721"
                :height="216"
                remove-button-color="#FEC81A"
                :show-loading="true"
                :show-remove-button="true"
                :width="216"
                v-model="croppa"
            ></croppa>
            <VBtn @click="clickIcon" :color="color" icon>
                <VIcon>{{ iconName }}</VIcon>
            </VBtn>
            <VBtn @click="clickIcon" :color="color" icon>
                <VIcon>{{ iconName }}</VIcon>
            </VBtn>
        </VCard>
    </VDialog>
</template>

<script>
export default {
    data() {
        return {
            croppa: {},
            dialog: false,
            src: require('../assets/no_image.png'),
        }
    },
    methods: {},
    name: 'CroppingImageInput',
    props: {},
}
</script>

<style scoped>
.v-card {
    padding: 16px;
    text-align: center;
}

.v-img:hover {
    opacity: 0.5;
}

.v-slider {
    margin: 0 auto;
    width: 350px;
}
</style>
