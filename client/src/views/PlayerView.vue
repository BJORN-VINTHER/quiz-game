<template>
  <div class="d-flex flex-column align-items-center">
    <template v-if="question">
      <h4 v-if="question.playerIP === '123'">"Choose your answer"</h4>
      <h4 v-else>
        Guess what <span style="color: rgb(168, 191, 226)">{{ question.currentTurnPlayerName }}</span> answered
      </h4>
      <Timer
        v-if="showTimer"
        ref="timerComponent"
        class="mt-3"
        :durationMillis="questionTime"
      />
      <div v-else style="height: 32px; width: 10px"></div>
      <Quote :question="question" :answer="null" :color="null" />

      <OptionButtonGrid
        style="margin-top: 50px; height: 450px"
        :choices="this.question.choices"
        :disabled="fade.length > 0"
        :fade="fade"
        @clickTest="onOptionClick"
      />
    </template>
  </div>
</template>

<script>
import { service } from '@/service/service';
import OptionButtonGrid from "../components/OptionButtonGrid.vue";
import Quote from "../components/Quote.vue";
import Timer from "../components/Timer.vue";
// import { sleep } from "../utilities/utilities";

export default {
  components: {
    OptionButtonGrid,
    Quote,
    Timer,
  },
  data() {
    return {
      debug: true,
      questionDelay: 4000,
      questionTime: 20000,
      showTimer: false,
      showOptions: false,
      fade: [],
      // me: null,
      io: null,
      question: null,
      score: 0,
    };
  },
  async mounted() {
    if (this.debug) {
      this.questionDelay = 500;
      this.questionTime = 6000;
    }

    // const ip = await getIp();
     await service.joinGame(this.$route.params.gameId, "Test user", service.ip);
     this.io = await service.connect(this.$route.params.gameId);
    // this.me = gameState.players.find((x) => x.ip === ip);

    this.io.onQuestionStart((question) => {
      console.log("Question start", question);
      this.question = question;
      this.highlight = null;
      this.fade = [];
      this.showTimer = false;
      this.showOptions = false;

      // await sleep(this.questionDelay);
      this.showTimer = true;
      this.showOptions = true;
    });

    this.io.onQuestionComplete((questionResult) => {
      console.log("Question complete", questionResult);
      this.showTimer = false;
      this.disable;
      if (this.fade.length === 0) {
        this.fade = [0, 1, 2, 3];
      }
    });
  },
  methods: {
    async onOptionClick(index) {
      this.answer = index;
      this.fade = [0, 1, 2, 3].filter((x) => x !== index);
      this.io.submitAnswer(index);
    },
  },
};
</script>

<style></style>
