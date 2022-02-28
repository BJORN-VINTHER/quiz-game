<template>
  <Header title="Maersk Confessions" :ip="ip" />
  <div id="app-container">
    <router-view />
  </div>
</template>


<script>
import Header from "@/components/Header.vue";
import { getIp } from "@/utilities/utilities";

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


<style>
@font-face {
  font-family: "Comic";
  src: local("Comic"), url(./assets/Comic.otf) format("opentype");
}

#app-container {
  margin: 20px auto;
  max-width: 1200px;
  /* border: purple solid 10px; */
  font-weight: normal;
}

body {
  font-family: "Comic";
  font-size: 18pt;
  color: white;
  background-color: #00243d;
  min-height: 100vh;
  transition: color 0.5s, background-color 0.5s;
  line-height: 1.6;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.small-text {
  font-size: 15pt;
  color: rgb(168, 191, 226);
}

.medium-text {
  font-size: 20pt;
}

.large-text {
  font-size: 30pt;
}

button {
  font-size: 20pt;
  padding: 5px 20px;
  border-radius: 5px;
  color: #222222;
  transition: all 0.1s;
}

button:hover {
  background-color: rgb(186, 205, 226);
}

button:active {
  background-color: rgb(137, 149, 165);
}

button:focus {
  outline: none;
  box-shadow: none;
}
</style>
