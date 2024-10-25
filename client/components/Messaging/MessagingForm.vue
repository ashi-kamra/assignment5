<script setup lang="ts">
import SendMessageForm from "@/components/Messaging/SendMessageForm.vue";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { fetchy } from "../../utils/fetchy";
let history = ref([]);
let loaded = ref(false);

const route = useRoute();
const receiverName = route.params.receiverName.toString();
const receiverId = route.params.receiverId.toString();

async function displayHistory() {
  try {
    history.value = await fetchy(`/api/connection/history/${receiverId}`, "GET");
  } catch (_) {
    console.log("No messaging history found!");
    return;
  }
  console.log("message history", history.value);
  return history;
}

onBeforeMount(async () => {
  await displayHistory();
  loaded.value = true;
});
</script>

<template>
  <h1>Messaging with {{ receiverName }}</h1>
  <SendMessageForm :connection_name="receiverName" />
</template>

<style scoped>
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
