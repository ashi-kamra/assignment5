<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const { currentId } = useUserStore();
const show = ref(true);

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
    >
      Click to see your Id
    </button>
    <p v-if="show">
      {{ currentId }}
    </p>
  </main>
</template>
