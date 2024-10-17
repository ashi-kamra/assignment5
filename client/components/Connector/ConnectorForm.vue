<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const connection_id = ref("");

const { makeConnection, updateSession } = useUserStore();

async function connection() {
  await makeConnection(connection_id.value);
  await updateSession();
  void router.push({ name: "Home" });
}
</script>
