<script setup lang="ts">
import { onBeforeMounted, ref } from "vue";
import FriendWidget from "@/components/Home/FriendWidget.vue";

const loaded = ref(false);
let friends = ref([]);

async function makeWidgets() {
  let connections;
  try {
    connections = await fetchy("/api/homepage", "GET");
  } catch (_) {
    return;
  }
  friends.value = connections;
}

onBeforeMounted(async () => {
  await makeWidgets();
  loaded.value = true;
});
</script>

<template>
  <section v-if="loaded && friends.length !== 0">
    <article v-for="friend in friends" :key="friend.userId">
      <FriendWidget :connection_name="friend.username" :connection_id="friend.userId" />
    </article>
  </section>
  <section v-else>
    <p>Loading...</p>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
