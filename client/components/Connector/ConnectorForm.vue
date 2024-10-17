<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const connection_id = ref("");

const { makeConnection } = useUserStore;
</script>
