<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const { currentId } = useUserStore();
const show = ref(false);

async function logMessage() {
  console.log("Id", currentId);
}
</script>

<template>
  <main class="column">
    <button
      @click="
        show = !show;
        logMessage();
      "
      class="blue-button"
    >
      Click to see your Id
    </button>
    <p v-if="show">
      {{ currentId }}
    </p>
  </main>
</template>

<style scoped>
.blue-button {
  background-color: #0f4c81;
  border-radius: 5px;
  color: white;
  font-family: "Fredoka", sans-serif;
}
</style>
