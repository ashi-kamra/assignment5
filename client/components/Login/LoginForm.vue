<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const username = ref(""); //initially empty so it can be updated with user value later
const id = ref("");
const { loginUser, updateSession } = useUserStore(); //using functions from the store

async function login() {
  await loginUser(username.value, id.value);
  void updateSession();
  void router.push({ name: "Home" }); //redirecting to the home page after user logins!
}
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="login">
    <h2>Please Login</h2>
    <fieldset>
      <div class="pure-control-group">
        <label for="aligned-name">Username</label>
        <input v-model.trim="username" type="text" id="aligned-name" placeholder="Username" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-password">Id</label>
        <input type="password" v-model.trim="id" id="aligned-password" placeholder="Id" required />
      </div>
      <div class="pure-controls">
        <button type="submit" class="pure-button pure-button-primary">Submit</button>
      </div>
    </fieldset>
  </form>
</template>

<style>
h3 {
  display: flex;
  justify-content: center;
}
</style>
