<script>
import { serviceMock } from "../utilities/serviceMock.js";
import { sleep } from "../utilities/utilities.js";
import Timer from "../components/Timer.vue";
import OptionButtonGrid from "./../components/OptionButtonGrid.vue";

export default {
  components: {
    OptionButtonGrid,
    Timer,
  },
  data() {
    return {
      io: null,
      questionIndex: 0,
      totalQuestions: 3,
      question: null,
      answers: null,
      showQuestion: false,
      showOptions: false,
    };
  },
  async mounted() {
    this.io = serviceMock.connect();
    this.io.onQuestionStart(async (question) => {
      this.showOptions = false;
      this.question = question;
      this.showQuestion = true;
      await sleep(2000);
      this.showOptions = true;
      this.questionIndex++;
    });
    this.io.onQuestionComplete(async ({ question, answers }) => {
      this.answers = answers;
    });
  },
  methods: {
    async simulateQuestion() {
      this.io.simulateQuestion(this.questionIndex);
    },
  },
};
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <template v-if="showQuestion">
      <div>Confession {{ 0 }} / {{ totalQuestions }}</div>
      <Timer durationMillis="20000" />

      <div class="question-text">{{ question.text }}</div>

      <OptionButtonGrid v-if="showOptions" :options="this.question.options" />
    </template>
    <button @click="simulateQuestion">Next</button>
  </div>
</template>

<style scoped>
.question-text {
  margin: 40px 0px;
  font-size: 30pt;
}
</style>
