<template>
  <div class="container" style="max-width: 900px">
    <div class="row">
      <OptionButton
        class="col-sm"
        color="red"
        :disabled="disabled"
        :faded="fade && fade.includes(0)"
        :text="choices[0]"
        @click="onClick(0)"
      ></OptionButton>
      <OptionButton
        class="col-sm"
        color="orange"
        :disabled="disabled"
        :faded="fade && fade.includes(1)"
        :text="choices[1]"
        @click="onClick(1)"
      ></OptionButton>
    </div>
    <div class="row">
      <OptionButton
        class="col-sm"
        color="blue"
        :disabled="disabled"
        :faded="fade && fade.includes(2)"
        :text="choices[2]"
        @click="onClick(2)"
      ></OptionButton>
      <OptionButton
        class="col-sm"
        color="green"
        :disabled="disabled"
        :faded="fade && fade.includes(3)"
        :text="choices[3]"
        @click="onClick(3)"
      ></OptionButton>
    </div>
  </div>
</template>

<script>
import OptionButton from "./OptionButton.vue";

export default {
  props: ["choices", "fade", "disabled"],
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
