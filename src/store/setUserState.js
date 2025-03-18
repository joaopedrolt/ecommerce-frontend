import { useAuthStore } from "./store";

export default (user) => {
    const authStore = useAuthStore();
    authStore.setUserState(user);
}