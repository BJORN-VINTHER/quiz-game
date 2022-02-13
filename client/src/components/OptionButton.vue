<template>
  <div class="orange">{{text}}</div>
</template>

<script>
export default {
  props: {
    text: String,
    color: String,
    disabled: Boolean,
  },
  computed: {
      textSize() {
          if (this.text.length < 20) {
              return 25;
          } 
          else if (this.text.length < 30) {
              return 20
          } 
          else {
              return 15;
          }
      }
  }
};
</script>

<style scoped>
.red {
  background: red;
}
.orange {
  background: orange;
}
.blue {
  background: blue;
}
.green {
  background: green;
}
</style>
