<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";
import { useRoute } from "vue-router";
import { onBeforeMount, ref } from "vue";
let history = ref([]);
let loaded = ref(false);

const route = useRoute();
const receiverName = route.params.receiverName.toString();
const receiverId = route.params.receiverId.toString();

async function displayHistory() {
  try {
    console.log(receiverId);
    history.value = await fetchy(`/api/connection/history/${receiverId}`, "GET");
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
</template>

<style scoped>
h1 {
  padding-top: 1em;
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
