<script>
import { serviceMock } from "../utilities/serviceMock.js";
import { sleep } from "../utilities/utilities.js";
import Timer from "../components/Timer.vue";
import Quote from "../components/Quote.vue";
import OptionButtonGrid from "./../components/OptionButtonGrid.vue";

export default {
  components: {
    OptionButtonGrid,
    Timer,
    Quote
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
      showTimer: false,
    };
  },

  async mounted() {
    this.io = serviceMock.connect();
    this.io.onQuestionStart(async (question) => {
      this.showTimer = false;
      this.showOptions = false;
      this.question = question;
      this.showQuestion = true;
      await sleep(2000);
      this.showTimer = true;
      this.showOptions = true;
      this.questionIndex++;
    });
    this.io.onQuestionComplete(async ({ question, answers }) => {
      this.answers = answers;
    });
    this.simulateQuestion();
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
      <Timer v-if="showTimer" class="mt-2" durationMillis="20000" />
      <Quote :question="question" :answer="'hejsa'"/>

      <OptionButtonGrid
        style="margin-top: 50px; height: 450px"
        :options="this.question.options"
      />
    </template>
    <button class="align-self-end" @click="simulateQuestion">Next</button>
  </div>
</template>

<style scoped>

</style>
