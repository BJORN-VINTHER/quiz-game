<template>
  <div
    id="header"
    class="d-flex flex-row justify-content-center align-items-center"
  >
    <MaerskIcon />
    <div id="title" class="ml-4">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">
import MaerskIcon from "../assets/icons/IconMaersk.vue";

export default {
  props: {
    title: String,
    ip: String,
  },
  components: {
    MaerskIcon
  }
}
</script>

<style scoped>
#header {
  padding: 30px 20px;
  font-size: 24pt;
  background-color: white;
  color: #222;
}
#logo {
  transform: scale(1.4);
  width: 40px;
  height: 40px;
}
#ip-text {
  font-family: "Calibri", "Times New Roman", Times, serif;
  color: #9aacb9;
  font-size: 1rem;
}
</style>
