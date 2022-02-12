<script>
import { serviceMock } from "../utilities/serviceMock.js";

export default {
  methods: {
    async onCreateGame() {
      const result1 = serviceMock.createGame();
    },
  },
};
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <h1>this is the game overview</h1>
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
