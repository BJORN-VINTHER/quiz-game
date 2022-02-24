<template>
  <div class="d-flex flex-column align-items-center">
    <span :class="[color]">{{ votes }}</span>
    <div
      :class="[color]"
      class="mx-2"
      :style="{ width: '80px', height: height + 'px' }"
      style="border-radius: 2px"
    >
      <!-- <img
        v-if="isCorrect"
        width="30"
        height="30"
        src="../assets/icons/star2.png"
      /> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["height", "votes", "isCorrect", "color"],
};
</script>

<style scoped>
div.red {
  background-color: #dc3545;
}
div.orange {
  background-color: #ffb007;
}
div.blue {
  background-color: #007bff;
}
div.green {
  background-color: #28a745;
}
span.red {
  color: #dc3545;
}
span.orange {
  color: #ffb007;
}
span.blue {
  color: #007bff;
}
span.green {
  color: #28a745;
}
</style>
