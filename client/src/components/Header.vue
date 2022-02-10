<script setup>
import MaerskIcon from "./../assets/icons/IconMaersk.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div id="header" class="d-flex flex-row justify-content-center align-items-center">
    <MaerskIcon />
    <div id="title" class="ml-4">
      {{ title }}
      {{ ip }}
    </div>
  </div>
</template>

<style scoped>
#header {
  padding: 30px 20px;
  margin-bottom: 50px;
  font-size: 24pt;
  background-color: white;
  color: #222;
}
#logo {
  transform: scale(1.4);
  width: 40px;
  height: 40px;
}
</style>
