<template>
  <div class="container my-4 p-4">
    <img width="30" height="30"  class="mb-1" src="../assets/icons/quote.png" />

    <div class="question-text mb-3">
      {{ questionTextParts[0] }}
      <span class="answer" v-if="answer">{{ answer }}</span>
      <u v-else
        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u
      >
      {{ questionTextParts[1] }}
    </div>
    <div class="align-self-center small-text">
      - {{ question.player.playerName }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["question", "answer"],
  computed: {
    questionTextParts() {
      return this.question.text.split("_");
    },
  },
};
</script>

<style scoped>
.container {
  border-top: 2px;
  border-bottom: 2px;
  border-left: 0px;
  border-right: 0px;
  border-color: white;
  border-style: solid;
}
.question-text {
  font-size: 25pt;
}
.answer {
  color: rgb(255, 186, 57);
}
</style>
