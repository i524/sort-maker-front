<template>
  <VCard height="442">
    <VImg :src="src">
      <template v-if="icon">
        <VBtn @click="clickIcon" :color="color" icon>
          <VIcon>{{ iconName }}</VIcon>
        </VBtn>
      </template>
    </VImg>
    <VCardTitle>{{ cardTitle }}</VCardTitle>
    <VCardText class="v-card-text">{{ cardText }}</VCardText>
    <VCardActions>
      <CustomButton @click="clickButton" :buttonText="buttonText">
      </CustomButton>
    </VCardActions>
  </VCard>
</template>

<script>
import { CustomButton } from "../components";

export default {
  components: {
    CustomButton,
  },
  methods: {
    clickButton() {
      this.$emit("clickButton");
    },
    clickIcon() {
      this.$emit("clickIcon");
    },
  },
  name: "SortCard",
  props: {
    buttonText: {
      required: true,
    },
    cardTitle: {
      required: true,
    },
    cardText: {
      required: true,
    },
    color: {
      default: "warning",
      required: false,
    },
    icon: {
      default: false,
      required: false,
    },
    iconName: {
      required: false,
    },
    src: {
      default: require("../assets/no_image.png"),
      required: false,
    },
  },
};
</script>

<style scoped>
.v-card-text {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  padding-bottom: 0;
}
</style>
