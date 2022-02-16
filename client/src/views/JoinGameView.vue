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
import { serviceMock } from "../utilities/serviceMock";
import OptionButtonGrid from "../components/OptionButtonGrid.vue";
import { getIp } from "../utilities/utilities";

export default {
  components: {
    OptionButtonGrid,
  },
  data() {
    return {
      io: null,
      playerName: "",
    };
  },
  async mounted() {
    const ip = await getIp();
    const { io, gameState } = await serviceMock.connect(
      this.$route.params.gameId
    );
    this.io = io;
    if (gameState.players.some((x) => x.ip === ip)) {
      this.$router.push({ path: `/games/${this.$route.params.gameId}` });
    }
  },
  methods: {
    joinGame() {
      this.io.joinGame(this.playerName.trim());
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
