<template>
  <div id="app">
    <Header title="Maersk Employee Quiz" />
    <HelloWorld msg="Welcome to Your Vue.js App Bjørn Vinther" />
    <CreateGame/>
  </div>
</template>

<script>
import HelloWorld from "./pages/HelloWorld.vue";
import CreateGame from "./pages/CreateGame.vue";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    CreateGame,
    Header,
  },
};
</script>

<style>
@font-face {
  font-family: "Komikax";
  src: local("Komikax"), url(./assets/KOMIKAX.ttf) format("truetype");
}
@font-face {
  font-family: "Comic";
  src: local("Comic"), url(./assets/Comic.otf) format("opentype");
}

#app {
  font-family: "Comic";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: white;
  /* margin-top: 60px; */
}
</style>
