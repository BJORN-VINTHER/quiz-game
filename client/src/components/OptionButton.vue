<template>
  <button
    class="d-flex align-items-center justify-content-center"
    :class="[color, {faded: faded}]"
    :style="{ 'font-size': textSize }"
    :disabled="disabled"
    @click.once="$emit('click')"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: String,
    color: String,
    faded: Boolean,
    disabled: Boolean,
  },
  computed: {
    textSize() {
      if (this.text.length < 20) {
        return 25 + "pt";
      } else if (this.text.length < 40) {
        return 21 + "pt";
      } else {
        return 17 + "pt";
      }
    },
  },
};
</script>

<style scoped>
button {
  margin: 15px;
  padding: 10px 20px;
  text-align: center;
  float: center;
  border-radius: 5px;
  min-height: 180px;
  border: none;
  color: white;
}
.red {
  background: #dc3545;
}
.red:hover {
  background: #c82333;
}
.red:active {
  background: #881823;
}
.orange {
  background: #ffb007;
}
.orange:hover {
  background: #e09200;
}
.orange:active {
  background: #9b6500;
}
.blue {
  background: #007bff;
}
.blue:hover {
  background: #0069d9;
}
.blue:active {
  background: #004997;
}
.green {
  background: #28a745;
}
.green:hover {
  background: #218838;
}
.green:active {
  background: #165a25;
}
.faded {
  opacity: 0.3;
}
button:disabled {
  pointer-events: none;
}
</style>
