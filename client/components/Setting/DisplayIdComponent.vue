<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const { currentId } = useUserStore();
const show = ref(true);
</script>

<template>
  <main class="column">
    <button @click="show = !show">{{ currentId }}</button>
  </main>
</template>
