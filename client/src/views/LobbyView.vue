<script>
import { serviceMock } from "../utilities/serviceMock.js";

export default {
  data() {
    return {
      lobbyState: null,
    };
  },
  methods: {
    async startGame() {

    },
  },
  async mounted() {
    console.log("called");
    this.lobbyState = await serviceMock.getLobby(this.$route.params.gameId);
  },
};
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <h1>Lobby</h1>

    <template v-if="lobbyState">
      <h4 style="margin-top: 50px">{{ lobbyState.players.length }} players joined</h4>
      <div
        class="d-flex flex-row flex-wrap justify-content-center player-container"
      >
        <span
          class="d-flex flex-1 player-name"
          v-for="player in lobbyState.players"
          :key="player.ip"
          >{{ player.playerName }}</span
        >
      </div>
    </template>
  </div>
</template>

<style>
.player-name {
  margin: 10px 40px;
}
.player-container {
  max-width: 1000px;
  margin: 20px;
  padding: 30px;
  background: #b3e3f3;
  color: #222;
  border-radius: 5px;
}
</style>
