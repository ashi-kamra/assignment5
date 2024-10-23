<script setup lang="ts">
import ConnectionWidgets from "@/components/Home/ConnectionWidgets.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>Home Page</h1>
    <section>
      <h1 v-if="isLoggedIn">Welcome to Your Haven, {{ currentUsername }}</h1>
      <h1 v-else>Please login!</h1>
    </section>
    <ConnectionWidgets />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
