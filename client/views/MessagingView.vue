<script setup lang="ts">
// import { useRoute } from "vue-router";
// import { fetchy } from "../utils/fetchy";
import MessagingForm from "@/components/Messaging/MessagingForm.vue";

// const route = useRoute();
// const receiverId = route.params.receiver.toString();

// async function displayHistory() {
//   console.log(receiverId);
//   try {
//     history.value = await fetchy(`/api/connection/history/${receiverId}`, "GET");
//   } catch (_) {
//     return;
//   }
//   return history;
// }
</script>

<template>
  <div>
    <p>TESTING</p>
    <MessagingForm />
    <!-- <RouterLink :to="{ name: 'MessagingForm', params: { receiver: receiverId } }"> </RouterLink>

    <RouterView /> -->
  </div>
</template>
