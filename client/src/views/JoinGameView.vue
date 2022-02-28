<template>
  <div class="d-flex flex-column align-items-center">
    <h1>Join game</h1>

    <div class="d-flex flex-row m-5">
      Player name:
      <input v-model="playerName" class="ml-3" type="text" maxlength="25" />
    </div>

    <button :disabled="!isValidName" @click="joinGame">Join</button>
  </div>
</template>

<script>
import { service } from "../service/service";

export default {
  data() {
    return {
      playerName: "",
    };
  },
  async mounted() {
    const gameState = await service.getGameState(this.$route.params.gameId);
    if (gameState.players.some((x) => x.ip === service.ip)) {
      this.$router.push({ path: `/games/${this.$route.params.gameId}` });
    }
  },
  methods: {
    async joinGame() {
      await service.joinGame(this.$route.params.gameId, this.playerName.trim(), service.ip);
      this.$router.push({ path: `/games/${this.$route.params.gameId}` });
    },
  },
  computed: {
    isValidName() {
      return this.playerName.trim().length >= 2;
    },
  },
};
</script>

<style></style>
