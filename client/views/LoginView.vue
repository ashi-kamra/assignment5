<script setup lang="ts">
import LoginForm from "@/components/Login/LoginForm.vue";
import RegisterForm from "@/components/Login/RegisterForm.vue";
</script>

<template>
  <main class="column">
    <h1>Please login or register!</h1>
    <RegisterForm />
    <LoginForm />
  </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Itim&display=swap");

h1 {
  font-family: "Fredoka", sans-serif;
  font-weight: 500;
  font-size: 2.5em;
}
</style>
