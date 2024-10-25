<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

let username = ref("");

const { updateUserUsername, updateSession } = useUserStore();

async function updateUsername() {
  await updateUserUsername(username.value);
  await updateSession();
  username.value = "";
}
</script>

<template>
  <section id="all-items">
    <h2>Update user details</h2>
    <form @submit.prevent="updateUsername" class="pure-form">
      <fieldset>
        <legend>Change your username</legend>
        <input type="text" placeholder="New username" v-model="username" required />
        <button type="submit" class="pure-button pure-button-primary">Update username</button>
      </fieldset>
    </form>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Itim&display=swap");

all-items {
  font-family: "Fredoka", sans-serif;
  font-weight: 500;
}

h2 {
  font-size: 2em;
  text-align: center;
}
</style>
