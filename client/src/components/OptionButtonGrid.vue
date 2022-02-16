<template>
  <div class="container" style="max-width: 900px">
    <div class="row">
      <OptionButton
        class="col-sm"
        color="red"
        :disabled="disabled"
        :faded="fade && fade.includes(0)"
        :text="options[0]"
        @click="onClick(0)"
      ></OptionButton>
      <OptionButton
        class="col-sm"
        color="orange"
        :disabled="disabled"
        :faded="fade && fade.includes(1)"
        :text="options[1]"
        @click="onClick(1)"
      ></OptionButton>
    </div>
    <div class="row">
      <OptionButton
        class="col-sm"
        color="blue"
        :disabled="disabled"
        :faded="fade && fade.includes(2)"
        :text="options[2]"
        @click="onClick(2)"
      ></OptionButton>
      <OptionButton
        class="col-sm"
        color="green"
        :disabled="disabled"
        :faded="fade && fade.includes(3)"
        :text="options[3]"
        @click="onClick(3)"
      ></OptionButton>
    </div>
  </div>
</template>

<script>
import OptionButton from "./OptionButton.vue";

export default {
  props: ["options", "fade", "disabled"],
  components: {
    OptionButton,
  },
  methods: {
    onClick(i) {
      this.$emit("clickTest", i);
    },
  },
};
</script>

<style scoped></style>
