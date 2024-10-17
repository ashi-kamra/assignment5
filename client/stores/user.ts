import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { fetchy } from "@/utils/fetchy";

export const useUserStore = defineStore(
  "user",
  () => {
    const currentUsername = ref("");

    const isLoggedIn = computed(() => currentUsername.value !== "");

    const resetStore = () => {
      currentUsername.value = "";
    };

    const registerUser = async (username: string) => {
      await fetchy("/api/user/register", "POST", {
        body: { username },
      });
    };

    const loginUser = async (username: string, id: string) => {
      await fetchy("/api/login", "POST", {
        body: { username, id },
      });
    };

    const updateSession = async () => {
      try {
        const { username } = await fetchy("/api/session", "GET", { alert: false });
        currentUsername.value = username;
      } catch {
        currentUsername.value = "";
      }
    };

    const logoutUser = async () => {
      await fetchy("/api/logout", "POST");
      resetStore();
    };

    const updateUserUsername = async (username: string) => {
      await fetchy("/api/users/username", "PATCH", { body: { username } });
    };

    // const updateUserPassword = async (currentPassword: string, newPassword: string) => {
    //   await fetchy("/api/users/password", "PATCH", { body: { currentPassword, newPassword } });
    // };

    const deleteUser = async () => {
      await fetchy("/api/users", "DELETE");
      resetStore();
    };

    return {
      currentUsername,
      isLoggedIn,
      registerUser,
      loginUser,
      updateSession,
      logoutUser,
      updateUserUsername,
      // updateUserPassword,
      deleteUser,
    };
  },
  { persist: true },
);
