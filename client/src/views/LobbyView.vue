<script>
import { service } from "../service/service";

export default {
  data() {
    return {
      players: [],
    };
  },
  methods: {
    async startGame() {
      this.$router.push({
        path: `/games/${this.$route.params.gameId}/overview`,
      });
    }
  },
  async mounted() {
    await service.connect(this.$route.params.gameId);

    service.io.onPlayerJoined((player) => {
      console.log("onPlayerJoined", player);
      this.players.push(player);
    });
  },
};
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <h1>Lobby</h1>

    <a class="small-text">{{
      `https://green-sand-0c2c0b503.1.azurestaticapps.net/game/${this.$route.params.gameId}/join`
    }}</a>

    <h4 style="margin-top: 50px">{{ players.length }} players joined</h4>
    <div
      class="d-flex flex-row flex-wrap justify-content-center align-items-start player-container"
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
  border: coral solid 4px;
  padding: 5px 20px;
  border-radius: 10px;
  background: white;
  margin: 10px 40px;
}
.player-container {
  max-width: 90%;
  width: 100%;
  min-height: 300px;
  margin: 20px;
  padding: 30px;
  background: #b3e3f3;
  color: #222;
  border-radius: 5px;
}
</style>
