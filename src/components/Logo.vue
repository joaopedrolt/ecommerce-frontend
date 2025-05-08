<template>
  <v-img @click="handleClick" class="logo" src="/logo.svg" :width="props.width" :height="props.height"></v-img>
</template>


<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  width: String,
  height: String,
});

const router = useRouter();

const handleClick = () => {
  router.push({
    name: "Home",
  });
};
</script>

<style lang="scss">
.logo {
  cursor: pointer !important;
}
</style>
