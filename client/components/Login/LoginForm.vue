<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const username = ref(""); //initially empty so it can be updated with user value later
const login_id = ref("");
const { loginUser, updateSession } = useUserStore(); //using functions from the store

async function login() {
  await loginUser(username.value, login_id.value);
  void updateSession();
  void router.push({ name: "Home" }); //redirecting to the home page after user logins!
}
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="login">
    <h3>Please Login</h3>
    <fieldset>
      <div class="pure-control-group">
        <label for="aligned-name">Username</label>
        <input v-model.trim="username" type="text" class="aligned-name" placeholder="Username" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-password">Id</label>
        <input type="password" v-model.trim="login_id" id="aligned-password" placeholder="Id" required />
      </div>
      <div class="pure-controls">
        <button type="submit" class="blue-button">Submit</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
h3 {
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
</style>
