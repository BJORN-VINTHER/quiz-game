<script>
import { serviceMock } from "../utilities/serviceMock.js";
import { service } from "../utilities/service.js";
import { httpGet } from "../utilities/utilities.js";

export default {
  methods: {
    async onCreateGame() {
      const inviteCode = await service.createGame();
      this.$router.push({ path: `/games/${inviteCode}/lobby` });
    },
    async onTestHttpClick() {
      await httpGet(service.baseUrl + "/test");
    },
    async onTestSocketClick() {
      await service.connect("123");

      service.io.io.on("testMessageReceived", (message) => {
        console.log("received message from socket: ", message);
      });

      service.io.io.emit("socketAPITest", "My farm is big!");
    },
  },
};
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <button @click="onCreateGame">Host new game</button>
    <button @click="onTestHttpClick">Http test</button>
    <button @click="onTestSocketClick">Socket test</button>
  </div>
</template>

<style></style>
