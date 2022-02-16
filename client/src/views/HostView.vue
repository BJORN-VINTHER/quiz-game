<script>
import { serviceMock } from "../utilities/serviceMock.js";
import { sleep } from "../utilities/utilities.js";
import Timer from "../components/Timer.vue";
import Quote from "../components/Quote.vue";
import OptionButtonGrid from "../components/OptionButtonGrid.vue";

export default {
  components: {
    OptionButtonGrid,
    Timer,
    Quote,
  },
  data() {
    return {
      debug: true,
      questionDelay: 4000,
      questionTime: 20000,
      io: null,
      totalQuestions: 0,
      question: null,
      correctAnswer: null,
      answers: null,
      showTimer: false,
      highlight: null,
      showOptions: false,
    };
  },

  async mounted() {
    if (this.debug) {
      this.questionDelay = 500;
      this.questionTime = 3000;
    }

    const { io, gameState } = await serviceMock.connect(this.$route.params.gameId);
    this.io = io;
    this.totalQuestions = gameState.totalQuestions;

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
  methods: {
    async simulateQuestion(index) {
      this.io.simulateQuestion(
        index,
        this.questionTime + this.questionDelay + 1000
      );
    },
  },
  computed: {
    answerColor() {
      if (!this.question) {
        return null;
      }
      if (this.correctAnswer == this.question.options[0]) {
        return "red";
      }
      if (this.correctAnswer == this.question.options[1]) {
        return "orange";
      }
      if (this.correctAnswer == this.question.options[2]) {
        return "blue";
      }
      if (this.correctAnswer == this.question.options[3]) {
        return "green";
      }
      return null;
    },
    confessionText() {
      if (this.question && this.question.index > 0) {
        return `Confession ${this.question.index} / ${this.totalQuestions}`;
      } else {
        return "Introduction";
      }
    },
  },
};
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <template v-if="question">
      <div>{{ confessionText }}</div>
      <Timer
        v-if="showTimer"
        ref="timerComponent"
        class="mt-3"
        :durationMillis="questionTime"
      />
      <div v-else style="height: 32px; width: 10px"></div>
      <Quote
        :question="question"
        :answer="correctAnswer"
        :color="answerColor"
      />

      <OptionButtonGrid
        v-if="showOptions"
        style="margin-top: 50px; height: 450px"
        :options="this.question.options"
        :disabled="true"
        :highlight="highlight"
      />
    </template>

    <button v-if="correctAnswer" @click="simulateQuestion(question.index + 1)">
      Next
    </button>
  </div>
</template>

<style scoped></style>
