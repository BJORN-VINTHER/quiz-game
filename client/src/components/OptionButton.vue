<template>
  <div class="d-flex align-items-center justify-content-center" :class="[color]">{{text}}</div>
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
div {
  /* display: flex;
  align-content: center;
  align-items: center; */
  margin: 10px;
  float: center;
}
.red {
  background: red;
}
.red:hover {
  background: rgb(138, 0, 0);
}
.orange {
  background: orange;
}
.orange:hover {
  background: rgb(165, 107, 0);
}
.blue {
  background: blue;
}
.blue:hover {
  background: rgb(0, 0, 172);
}
.green {
  background: green;
}
.green:hover {
  background: rgb(0, 78, 0);
}
</style>
