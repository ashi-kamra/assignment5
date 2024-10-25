<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";
import { useRoute } from "vue-router";
import { onBeforeMount, ref } from "vue";
let history = ref([]);
let loaded = ref(false);

const route = useRoute();
const receiverId = route.params.id.toString();

async function displayHistory() {
  console.log(receiverId);
  try {
    history.value = await fetchy(`/api/connection/history/${receiverId}`, "GET");
  } catch (_) {
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
  <p>Messaging with {{ receiverId }}</p>
</template>
