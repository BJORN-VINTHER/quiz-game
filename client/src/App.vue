<script>
import { RouterLink, RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import { getIp } from "@/utilities/utilities.js";

export default {
  components: {
    Header
  },
  data() {
    return {
      ip: "hejsa"
    }
  },
  async mounted() {
    this.ip = await getIp()
  }
}
</script>

<template>
  <Header title="Maersk Employee Quiz" :ip="ip" />
  <div id="app-container">
    <RouterView />
  </div>
</template>



<style>
@import "@/assets/base.css";

@font-face {
  font-family: "Comic";
  src: local("Comic"), url(./assets/Comic.otf) format("opentype");
}

#app-container {
  margin: 50px;
  font-weight: normal;
  font-family: "Comic";
}

body {
  font-family: "Comic";
  color: white;
  background-color: #00243d;
}
</style>
