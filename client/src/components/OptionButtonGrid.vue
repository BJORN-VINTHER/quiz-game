<template>
  <div class="container">
    <div class="row">
      <OptionButton class="col-sm" color="red" text="nej tak"></OptionButton>
      <OptionButton class="col-sm" color="orange" text="meget længere tekst som skal være mindre"></OptionButton>
    </div>
    <div class="row">
      <OptionButton class="col-sm" color="blue" text="Bare en pizza"></OptionButton>
      <OptionButton class="col-sm" color="green" text="meget længere tekst som skal være mindre. Måske endda meget mindre."></OptionButton>
    </div>
  </div>
</template>

<script>
import OptionButton from "./OptionButton.vue";

export default {
  components: {
    OptionButton,
  },
};
</script>

<style scoped>

</style>
