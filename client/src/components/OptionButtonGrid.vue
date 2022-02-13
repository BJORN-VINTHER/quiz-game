<template>
  <div class="container">
    <div class="row">
      <OptionButton class="col-sm" text="nej tak"></OptionButton>
      <OptionButton class="col-sm" text="meget længere tekst som skal være mindre"></OptionButton>
    </div>
    <div class="row">
      <OptionButton class="col-sm" text="Bare en pizza"></OptionButton>
      <OptionButton class="col-sm" text="meget længere tekst som skal være mindre. Måske endda meget mindre."></OptionButton>
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
