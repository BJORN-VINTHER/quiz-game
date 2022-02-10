<script>
import { httpPost, httpGet } from "./../utilities/utilities.js";

export default {
  methods: {
    async createGame() {
      const result = post();
    },
    async onCreateGame() {
      const result1 = await httpGet("https://jsonplaceholder.typicode.com/todos/1");
      console.log("Success 1");

      const item = {
        title: "foo",
        body: "bar",
        userId: 1,
      };
      const result2 = await httpPost("https://jsonplaceholder.typicode.com/posts", item);
      console.log("Success 2");
    },
  },
};
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <h1>Create new game</h1>
    <button @click="onCreateGame">Create game</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
