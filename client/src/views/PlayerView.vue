<template>
  <!-- join game -->
  <template v-if="!me">
    <div class="home">
      <h1>this is the player view</h1>
    </div>
  </template>

  <!-- vote -->
  <template v-else> You are signed up </template>
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
      me: null,
      io: null,
      question: null,
      answer: null,
      score: 0,
    };
  },
  async mounted() {
    const ip = await getIp();
    const { io, gameState } = await serviceMock.connect(this.$route.params.gameId);
    this.io = io;
    this.me = gameState.players.find((x) => x.ip === ip);

    this.io.onQuestionStart(async (question) => {
      this.question = question;
      this.correctAnswer = null;
      this.highlight = null;
      this.answers = null;
      this.showTimer = false;
      this.showOptions = false;

      await sleep(this.questionDelay);
      this.showTimer = true;
      this.showOptions = true;
    });

    this.io.onQuestionComplete(async ({ question, answers }) => {
      this.answers = answers;
      this.showTimer = false;
      const master = answers.find((x) => x.ip === this.question.player.ip);
      this.highlight = master.answer;
      this.correctAnswer =
        master.answer != null ? this.question.options[master.answer] : null;
    });

    this.simulateQuestion(0);
  },
};
</script>

<style></style>
