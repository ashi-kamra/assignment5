<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

let message = ref("");
const props = defineProps(["connection_name"]);
const emit = defineEmits(["refreshHistory"]);

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
  emit("refreshHistory");
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
  display: flex;
  font-family: "Fredoka", sans-serif;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 1em;
}

button {
  margin: 1em;
  font-family: "Fredoka", sans-serif;
  justify-content: end;
}
</style>
