<script setup lang="ts">
import ConnectionWidgets from "@/components/Home/ConnectionWidgets.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <section>
      <h1 v-if="isLoggedIn">Welcome to Your Haven, {{ currentUsername }}</h1>
      <h1 v-else>Welcome to Haven. Please login.</h1>
    </section>
    <ConnectionWidgets />
  </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Itim&display=swap");

h1 {
  font-family: "Fredoka", sans-serif;
  text-align: center;
  font-weight: 500;
  font-size: 2.5em;
}
</style>
