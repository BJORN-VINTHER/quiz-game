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
  <Header title="Maersk Confessions" :ip="ip" />
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

@font-face {
  font-family: "Marsek";
  src: local("Marsek"), url(./assets/Marsek.ttf) format("truetype");
}

#app-container {
  margin: 50px;
  font-weight: normal;
}

body {
  font-family: "Comic";
  font-size: 18pt;
  color: white;
  background-color: #00243d;
}
</style>
