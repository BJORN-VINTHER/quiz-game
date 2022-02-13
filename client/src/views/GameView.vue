<script>
import { serviceMock } from "../utilities/serviceMock.js";
import OptionButtonGrid from "./../components/OptionButtonGrid.vue";

export default {
  components: {
    OptionButtonGrid,
  },
  data() {
    return {
      gameState: null,
      question: null,
      showQuestion: false,
      showOptions: false,
    };
  },
  methods: {
    async simulateQuestion() {
      this.question = await serviceMock.nextQuestion(this.$route.params.gameId);
      this.showQuestion = true;
      await serviceMock.sleep(500);

      this.showOptions = true;
      await serviceMock.sleep(500);
    },
  },
  async mounted() {
    this.gameState = await serviceMock.getGameState(this.$route.params.gameId);
  },
};
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <template v-if="showQuestion">
      <div>Confession {{ 0 }} / {{ gameState.totalQuestions }}</div>
      <div class="question-text">{{ question.text }}</div>

      <OptionButtonGrid v-if="showOptions" />
    </template>
    <button @click="simulateQuestion">Continue</button>
  </div>
</template>

<style scoped>
.question-text {
  margin: 40px 0px;
  font-size: 30pt;
}
</style>
