<script>
import { serviceMock } from "../utilities/serviceMock.js";
import { sleep } from "../utilities/utilities.js";
import Timer from "../components/Timer.vue";
import Quote from "../components/Quote.vue";
import Scores from "../components/Scores.vue";
import OptionButtonGrid from "../components/OptionButtonGrid.vue";
import { service } from "../utilities/service.js";

export default {
  components: {
    OptionButtonGrid,
    Timer,
    Quote,
    Scores,
  },
  data() {
    return {
      debug: true,
      questionDelay: 4000,
      questionTime: 20000,
      totalQuestions: 0,
      question: null,
      correctAnswer: null,
      answers: null,
      showTimer: false,
      fade: [],
      showchoices: false,
    };
  },

  async mounted() {
    if (this.debug) {
      this.questionDelay = 500;
      this.questionTime = 3000;
    }

    const gameState = await service.getGameState(this.$route.params.gameId);
    await service.connect(this.$route.params.gameId);
    this.totalQuestions = gameState.totalQuestions;

    service.io.onQuestionStart(async (question) => {
      console.log("Started question: ", question);
      this.question = question;
      this.correctAnswer = null;
      this.fade = [];
      this.answers = null;
      this.showTimer = false;
      this.showchoices = false;

      await sleep(this.questionDelay);
      this.showTimer = true;
      this.showchoices = true;
    });

    service.io.onQuestionComplete(async (question) => {
      console.log("Completed question: ", question);
      this.answers = question.answers;
      this.showTimer = false;
      this.question = question;
      this.correctAnswer = question.choices[question.correctAnswerIndex];
      this.fade = [0, 1, 2, 3].filter((x) => x !== question.correctAnswerIndex);
    });

    this.startNextQuestion();
  },
  methods: {
    async startNextQuestion() {
      service.io.nextQuestion(this.questionTime);
    }
  },
  computed: {
    answerColor() {
      if (!this.question) {
        return null;
      }
      if (this.correctAnswer == this.question.choices[0]) {
        return "red";
      }
      if (this.correctAnswer == this.question.choices[1]) {
        return "orange";
      }
      if (this.correctAnswer == this.question.choices[2]) {
        return "blue";
      }
      if (this.correctAnswer == this.question.choices[3]) {
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
        :durationMillis="questionTime - questionDelay"
      />
      <div v-else style="height: 32px; width: 10px"></div>
      <Quote
        :question="question"
        :answer="correctAnswer"
        :color="answerColor"
      />

      <Scores
        v-if="true || fade.length > 0"
        :correctAnswer="question.correctAnswerIndex"
      />

      <OptionButtonGrid
        v-if="showchoices"
        style="margin-top: 50px; height: 450px"
        :choices="this.question.choices"
        :disabled="true"
        :fade="fade"
      />
    </template>

    <button v-if="correctAnswer" @click="startNextQuestion()">
      Next
    </button>
  </div>
</template>

<style scoped></style>
