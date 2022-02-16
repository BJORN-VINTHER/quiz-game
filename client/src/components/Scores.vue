<template>
  <div class="d-flex flex-row">
      <ScoreBar color="red" :height="120" :isCorrect="true" :votes="8" />
      <ScoreBar color="red" :height="40" :isCorrect="true" :votes="2" />
      <ScoreBar color="red" :height="30" :isCorrect="true" :votes="1" />
      <ScoreBar color="red" :height="40" :isCorrect="true" :votes="2" />
  </div>
</template>

<script>
import ScoreBar from "./ScoreBar2.vue";

export default {
  props: ["question", "answer", "color"],
  components: {
    ScoreBar,
  },
  computed: {
    questionTextParts() {
      return this.question.text.split("_");
    },
  },
};
</script>

<style scoped>
.container {
  border-top: 1px;
  border-bottom: 1px;
  border-left: 0px;
  border-right: 0px;
  border-color: white;
  border-style: solid;
}
.question-text {
  font-size: 25pt;
}
.red {
  color: #dc3545;
}
.orange {
  color: #ffb007;
}
.blue {
  color: #007bff;
}
.green {
  color: #28a745;
}
</style>
