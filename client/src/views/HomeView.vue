<script>
import { serviceMock } from "../utilities/serviceMock.js";
import { service } from "../utilities/service.js";

export default {
  methods: {
    async onCreateGame() {
      const gameId = await serviceMock.createGame();
      this.$router.push({ path: `/games/${gameId}/lobby` });
    },
    async onTestHttpClick() {
      service.httpTest();
    },
    async onTestSocketClick() {
      service.connect();
    },
  },
};
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <button @click="onCreateGame">Host new game</button>
    <button @click="onTestHttpClick">Http test</button>
    <button @click="onTestSocketClick">Socket test</button>
  </div>
</template>

<style>

</style>
