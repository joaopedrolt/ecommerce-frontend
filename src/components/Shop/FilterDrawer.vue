<template>
  <v-navigation-drawer
    v-model="displayFilterDrawer"
    width="320"
    style="top: 0; height: 100%"
    absolute
    temporary
  >
    <div class="drawer-header">
      <v-btn @click="hideNavigationDrawer()" elevation="0" icon :ripple="false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <v-divider></v-divider>
    <v-list v-model:opened="open" style="padding: 0">
      <v-list-group value="Section 1" fluid>
        <template v-slot:activator="{ props }">
          <v-list-item title="Section 1" v-bind="props"></v-list-item>
        </template>

        <v-list-item title="1"></v-list-item>
      </v-list-group>
      <v-list-group value="Section 2" fluid>
        <template v-slot:activator="{ props }">
          <v-list-item title="Section 2" v-bind="props"></v-list-item>
        </template>

        <v-list-item title="2"></v-list-item>
      </v-list-group>
      <v-list-group value="Section 3" fluid>
        <template v-slot:activator="{ props }">
          <v-list-item title="Section 3" v-bind="props"></v-list-item>
        </template>

        <v-list-item title="3" fluid></v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch } from "vue";
import { useDrawerStore } from "@/store/store.js";
import { storeToRefs } from "pinia";

const drawerStore = useDrawerStore();
const { displayFilterDrawer } = storeToRefs(drawerStore);

const open = ref([]);

watch(displayFilterDrawer, (newValue) => {
  if (!newValue) {
    open.value = [];
  }
});

const hideNavigationDrawer = () => {
  displayFilterDrawer.value = false;
};
</script>

<style>

</style>
