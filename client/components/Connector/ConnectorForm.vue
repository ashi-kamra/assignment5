<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { fetchy } from "@/utils/fetchy";

const connection_id = ref("");

const { updateSession } = useUserStore();

async function connection() {
  await fetchy(`/api/connector/${connection_id.value}`, "POST");
  await updateSession();
  connection_id.value = ""; //clears form after submission
  void router.push({ name: "Home" });
}
</script>

<template>
  <h2>Build a new connection!</h2>
  <h3>Enter the unique id of the connection you'd like to build</h3>
  <p>Beware of potential predatory individuals when making connections. Be intentional!</p>
  <form @submit.prevent="connection">
    <input type="password" v-model.lazy="connection_id" placeholder="Enter an id" />
    <button type="submit">Make a Connection!</button>
  </form>
</template>
