<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { fetchy } from "@/utils/fetchy";

const connection_id = ref("");
const mutuals = ref([]);

const { updateSession } = useUserStore();

async function connection() {
  await fetchy(`/api/connector/${connection_id.value}`, "POST");
  await updateSession();
  connection_id.value = ""; //clears form after submission
  void router.push({ name: "Home" });
}
</script>

<template>
  <section id="disclaimer">
    <h2>Build a new connection!</h2>
    <h3>Enter the unique id of the connection you'd like to build</h3>
    <p>Beware of potential predatory individuals when making connections. Be intentional!</p>
    <form id="form" @submit.prevent="connection">
      <input type="password" v-model.lazy="connection_id" placeholder="Enter an id" />
      <button type="submit">Make a Connection!</button>
    </form>
  </section>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Itim&display=swap");

h2,
p,
h3,
form {
  font-family: "Fredoka", sans-serif;
  font-weight: 500;
}

p {
  font-size: 1.25em;
  font-weight: 400;
}

h2 {
  font-size: 3em;
}

h3 {
  font-size: 2em;
}

#disclaimer {
  text-align: center;
}
</style>
