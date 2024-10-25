<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

let message = ref("");
const props = defineProps(["connection_name"]);

const reset = () => {
  message.value = "";
};

async function sendMessage(message: string) {
  let sent;
  try {
    sent = await fetchy(`/api/connection/message/${props.connection_name}`, "POST", {
      body: { message },
    });
  } catch (_) {
    return;
  }
  console.log("sending this message", sent);
  reset();
}
</script>

<template>
  <div class="message-box">
    <textarea v-model.trim="message" placeholder="Message"></textarea>
    <button @click="sendMessage(message)">Send Message</button>
  </div>
</template>

<style scoped>
p {
  font-family: inherit;
}

.message-box {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}
</style>
