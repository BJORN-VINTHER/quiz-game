<script>
import { serviceMock } from "../utilities/serviceMock.js";
import { service } from "../utilities/service.js";

export default {
  methods: {
    async onCreateGame() {
      const gameId = await serviceMock.createGame();
      this.$router.push({ path: `/games/${gameId}/lobby` });
    },
    async onTestClick() {
      console.log('Calling service');
      service.serverTest(); // const socket = service.connect();
    },
  },
};
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <button @click="onCreateGame">Host new game</button>
    <button @click="onTestClick">Connection testing</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
