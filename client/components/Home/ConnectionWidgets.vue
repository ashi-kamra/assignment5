<script setup lang="ts">
import FriendWidget from "@/components/Home/FriendWidget.vue";
import router from "@/router";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

interface FriendItem {
  _id: string;
  username: string;
  dateCreated: string;
}

const loaded = ref(false);
let friends = ref<FriendItem[]>([]);

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

async function enterMessaging(friendName: string, friendId: string) {
  console.log("friend name and id", friendName, friendId);
  void router.push(`/messaging/${friendName}/${friendId}`);
}
</script>

<template>
  <section v-if="loaded && friends.length !== 0">
    <article v-for="friend in friends" :key="friend.username">
      <FriendWidget @click="enterMessaging(friend.username, friend._id)" :connection_name="friend.username" :connection_id="friend._id" />
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
