<template>
  <VTextField
    :label="label"
    :prepend-icon="prependIcon"
    :value="value"
    @input="inputValue"
  >
  </VTextField>
</template>

<script>
export default {
  methods: {
    inputValue: function (value) {
      this.$emit("input", value);
    },
  },
  name: "CustomTextField",
  props: {
    label: {
      required: true,
    },
    prependIcon: {
      required: false,
    },
    value: {
      required: true,
    },
  },
};
</script>
