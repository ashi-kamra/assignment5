<script setup lang="ts">
import router from "@/router";
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
}

onBeforeMount(async () => {
  await makeWidgets();
  loaded.value = true;
});

async function enterMessaging(friend) {
  console.log("testing");
  void router.push(`/messaging/${friend._id}`);
}
</script>

<template>
  <section v-if="loaded && friends.length !== 0">
    <article v-for="friend in friends" :key="friend.user2">
      <FriendWidget @click="enterMessaging(friend)" :connection_name="friend.username" :connection_id="friend._id" />
    </article>
  </section>
  <section id="loading" v-else if="friends.length === 0">
    <p>Loading...</p>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 1em;
}

#loading {
  display: flex;
  align-items: center;
}
</style>
