<script setup lang="ts">
import SendMessageForm from "@/components/Messaging/SendMessageForm.vue";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { fetchy } from "../../utils/fetchy";

interface HistoryItem {
  _id: string;
  message: string;
  sender: string;
  receiver: string;
  dateCreated: string;
}

let history = ref<HistoryItem[]>([]);
let loaded = ref(false);

const route = useRoute();
const receiverName = route.params.receiverName.toString();
const receiverId = route.params.receiverId.toString();

async function displayHistory() {
  try {
    history.value = await fetchy(`/api/connection/history/${receiverName}`, "GET");
  } catch (_) {
    console.log("No messaging history found!");
    return;
  }
  return history;
}

onBeforeMount(async () => {
  await displayHistory();
  loaded.value = true;
});
</script>

<template>
  <h1>Messaging with {{ receiverName }}</h1>
  <div class="chat-container">
    <div v-for="(chat, index) in history" :key="index" :class="{ sent: chat.sender !== receiverId, received: chat.sender === receiverId }">
      <p>{{ chat.message }}</p>
    </div>
  </div>
  <SendMessageForm @refreshHistory="displayHistory" :connection_name="receiverName" />
</template>

<style scoped>
.chat-container {
  display: flex;
  width: 90%;
  flex-direction: column;
  padding: 20px;
  margin: 2em;
  background-color: #f0f0f0;
  border-radius: 10px;
}

.sent {
  background-color: #0f4c81 !important; /* Color for sent messages */
  color: white; /* Text color for sent messages */
  align-self: flex-end; /* Align sent messages to the right */
  border-radius: 10px;
  margin: 0.5em;
  padding-left: 10px;
  padding-right: 10px;
}

.received {
  background-color: #808080;
  color: white;
  align-self: flex-start;
  border-radius: 10px;
  margin: 0.5em;
  padding-left: 10px;
  padding-right: 10px;
}

p {
  font-size: 18px;
}

h1 {
  font-family: "Fredoka", sans-serif;
  font-weight: 500;
  padding-top: 1em;
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
