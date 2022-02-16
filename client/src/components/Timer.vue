<template>
  <div class="progress" style="width: 80%">
    <div
      class="progress-bar progress-bar-striped progress-bar-animated"
      role="progressbar"
      aria-valuenow="75"
      aria-valuemin="0"
      aria-valuemax="100"
      :style="{ width: percentWidth }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    durationMillis: Number,
  },
  data() {
    return {
      elapsedMillis: 0,
    };
  },
  computed: {
    percentWidth() {
      const percent = 100 * (this.elapsedMillis / this.durationMillis);
      return Math.floor(percent) + "%";
    },
  },
  mounted() {
    const interval = setInterval(() => {
        this.elapsedMillis += 20;

        if (this.elapsedMillis > 1000 * this.seconds) {
          clearInterval(interval);
        }
      }, 20);
  }
};
</script>
