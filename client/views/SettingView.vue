<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import UpdateUserForm from "../components/Setting/UpdateUserForm.vue";
import DisplayIdComponent from "../components/Setting/DisplayIdComponent.vue";

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();

async function logout() {
  await logoutUser();
  void router.push({ name: "Home" });
}

async function delete_() {
  await deleteUser();
  void router.push({ name: "Home" });
}
</script>

<template>
  <main class="column">
    <h1>Settings for {{ currentUsername }}</h1>
    <UpdateUserForm />
    <DisplayIdComponent />
    <h2>Login/Delete Account</h2>
    <button class="pure-button pure-button-primary" @click="logout">Logout</button>
    <button class="button-error pure-button" @click="delete_">Delete User</button>
  </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Itim&display=swap");

h1,
h2,
button {
  font-family: "Fredoka", sans-serif;
  font-weight: 500;
}

h1 {
  font-size: 3em;
}

h2 {
  font-size: 2em;
}
</style>
