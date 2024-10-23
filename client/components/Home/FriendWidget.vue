<script setup lang="ts">
const props = defineProps(["connection_name", "connection_id"]);
</script>

<template>
  <div class="friend-widget">
    <p>{{ props.connection_name.username }}</p>
  </div>
</template>

<style scoped>
.friend-widget {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
