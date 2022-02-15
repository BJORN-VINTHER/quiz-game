<template>
  <div class="container" style="max-width: 900px">
    <div class="row">
      <OptionButton class="col-sm" color="red" :text="options[0]"></OptionButton>
      <OptionButton class="col-sm" color="orange" :text="options[1]"></OptionButton>
    </div>
    <div class="row">
      <OptionButton class="col-sm" color="blue" :text="options[2]"></OptionButton>
      <OptionButton class="col-sm" color="green" :text="options[3]"></OptionButton>
    </div>
  </div>
</template>

<script>
import OptionButton from "./OptionButton.vue";

export default {
  props: ["options"],
  components: {
    OptionButton,
  },
};
</script>

<style scoped>

</style>
