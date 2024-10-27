<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const { registerUser, updateSession, currentId, loginUser } = useUserStore();

const username = ref("");
const id = currentId; //getting the currentId from the store, does this work?

async function register() {
  await registerUser(username.value);
  await loginUser(username.value, id); //would this work??
  await updateSession();
  void router.push({ name: "Home" });
}
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="register">
    <h3>Enter a username to register</h3>
    <fieldset>
      <div class="pure-control-group">
        <label for="aligned-name">Username</label>
        <input v-model.trim="username" type="text" class="aligned-name" placeholder="Username" required />
      </div>
      <div class="pure-controls">
        <button type="submit" class="blue-button">Register</button>
      </div>
      <p>You will be given a unique private id to login and make connections with</p>
    </fieldset>
  </form>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Itim&display=swap");

h3 {
  font-family: "Fredoka", sans-serif;
  display: flex;
  justify-content: center;
}

.blue-button {
  background-color: #0f4c81;
  border-radius: 5px;
  color: white;
  width: 80px;
  height: 40px;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
