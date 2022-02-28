<script>
import { serviceMock } from "../service/serviceMock.js";
import { service } from "../service/service";
import { httpGet } from "../utilities/utilities";

export default {
  methods: {
    async onCreateGame() {
      const inviteCode = await service.createGame();
      this.$router.push({ path: `/games/${inviteCode}/lobby` });
    },
    async onCreateTestGame() {
      const inviteCode = await service.createTestGame();
      this.$router.push({ path: `/games/${inviteCode}/lobby` });
    }
  },
};
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <button @click="onCreateGame">Host new game</button>
    <button @click="onCreateTestGame">Host test game</button>
  </div>
</template>

<style></style>
