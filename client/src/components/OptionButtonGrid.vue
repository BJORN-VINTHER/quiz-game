<template>
  <div class="container" style="max-width: 900px">
    <div class="row">
      <OptionButton
        class="col-sm"
        color="red"
        :disabled="disabled"
        :faded="highlight != null && highlight !== 0"
        :text="options[0]"
      ></OptionButton>
      <OptionButton
        class="col-sm"
        color="orange"
        :disabled="disabled"
        :faded="highlight != null && highlight !== 1"
        :text="options[1]"
      ></OptionButton>
    </div>
    <div class="row">
      <OptionButton
        class="col-sm"
        color="blue"
        :disabled="disabled"
        :faded="highlight != null && highlight !== 2"
        :text="options[2]"
      ></OptionButton>
      <OptionButton
        class="col-sm"
        color="green"
        :disabled="disabled"
        :faded="highlight != null && highlight !== 3"
        :text="options[3]"
      ></OptionButton>
    </div>
  </div>
</template>

<script>
import OptionButton from "./OptionButton.vue";

export default {
  props: ["options", "highlight", "disabled"],
  components: {
    OptionButton,
  },
  methods: {
    onClick() {
      console.log("hejsa");
    },
  },
};
</script>

<style scoped></style>
