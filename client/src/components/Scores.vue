<template>
  <div class="d-flex flex-row align-items-end">
    <ScoreBar color="red" :height="120" :isCorrect="true" :votes="8" />
    <ScoreBar color="orange" :height="40" :isCorrect="true" :votes="2" />
    <ScoreBar color="blue" :height="30" :isCorrect="false" :votes="1" />
    <ScoreBar color="green" :height="40" :isCorrect="true" :votes="2" />
  </div>
  <div class="d-flex flex-row justify-content-between">
    <img
      v-show="correctAnswer == 0"
      width="30"
      height="30"
      src="../assets/icons/star2.png"
    />
    <img
      v-show="correctAnswer == 1"
      width="30"
      height="30"
      src="../assets/icons/star2.png"
    />
    <img
      v-show="correctAnswer == 2"
      width="30"
      height="30"
      src="../assets/icons/star2.png"
    />
    <img
      v-show="correctAnswer == 3"
      width="30"
      height="30"
      src="../assets/icons/star2.png"
    />
  </div>
</template>

<script>
import ScoreBar from "./ScoreBar2.vue";

export default {
  props: ["answers", "correctAnswer"],
  components: {
    ScoreBar,
  },
};
</script>

<style scoped></style>
