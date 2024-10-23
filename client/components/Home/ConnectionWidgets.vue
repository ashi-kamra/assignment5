<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";
import { onBeforeMount, ref } from "vue";
import FriendWidget from "@/components/Home/FriendWidget.vue";

const loaded = ref(false);
let friends = ref([]);

async function makeWidgets() {
  let connectionList;
  try {
    connectionList = await fetchy("/api/homepage", "GET");
  } catch (_) {
    return;
  }
  friends.value = connectionList;
  console.log("friends", friends.value);
}

onBeforeMount(async () => {
  await makeWidgets();
  loaded.value = true;
});
</script>

<template>
  <p>testing</p>
  <section v-if="loaded && friends.length !== 0">
    <article v-for="friend in friends" :key="friend.user2">
      <FriendWidget :connection_name="friend.user2" :connection_id="friend._id" />
    </article>
  </section>
  <section v-else if="friends.length === 0">
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
