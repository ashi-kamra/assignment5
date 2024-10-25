<script setup lang="ts">
const props = defineProps(["connection_name", "connection_id"]);
</script>

<template>
  <div class="friend-widget">
    <p>{{ props.connection_name }}</p>
  </div>
</template>

<style scoped>
.friend-widget {
  display: flex;
  margin: auto;
  justify-content: center;
  border-style: solid;
  border-radius: 1em;
  width: 150px;
}
</style>
