<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const connection_id = ref("");

const { makeConnection } = useUserStore();

async function connection() {
  await makeConnection(connection_id);
  await updateSession();
  void router.push({ name: "Home" });
}
</script>
