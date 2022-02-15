<script>
import { serviceMock } from "../utilities/serviceMock.js";

export default {
  data() {
    return {
      players: [],
    };
  },
  methods: {
    async startGame() {
      this.lobbyState = await serviceMock.startGame();
      this.$router.push({
        path: `/games/${this.$route.params.gameId}/overview`,
      });
    },
  },
  async mounted() {
    const io = serviceMock.connect();
    io.onPlayerJoined(player => {
      console.log("add player" + player.playerName)
      this.players.push(player);
    });
    io.simulateLobby();
  },
};
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <h1>Lobby</h1>

    <h4 style="margin-top: 50px">{{ players.length }} players joined</h4>
    <div
      class="d-flex flex-row flex-wrap justify-content-center player-container"
    >
      <span
        class="d-flex flex-1 player-name"
        v-for="player in players"
        :key="player.ip"
        >{{ player.playerName }}</span
      >
    </div>

    <button class="mt-5" @click="startGame">Start game</button>
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
