<template>
  <div class="container mt-4 mb-2 p-4 d-flex flex-column align-items-center">
    <!-- <div class="d-flex flex-column align-items-start" style="margin: 0px auto">  -->
    <!-- quote -->
    <div class="d-flex flex-row align-self-center">
      <img
        width="30"
        height="30"
        class="mb-1 align-self-start"
        src="../assets/icons/quote1.png"
      />
      <div class="question-text mx-3 my-2">
        {{ questionTextParts[0] }}
        <span :class="color" v-if="answer">{{ answer }}</span>
        <u v-else
          >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u
        >
        {{ questionTextParts[1] }}
      </div>
      <img
        width="30"
        height="30"
        class="mb-1 align-self-end"
        src="../assets/icons/quote2.png"
      />
    </div>
    </div>
  <!-- </div> -->
  <div class="small-text">
      - {{ question.currentTurnPlayerName }}
    </div>
</template>

<script>
export default {
  props: ["question", "answer", "color"],
  computed: {
    questionTextParts() {
      return this.question.questionText.split("_");
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
