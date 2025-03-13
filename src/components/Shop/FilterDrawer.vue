<template>
  <v-navigation-drawer v-model="displayFilterDrawer" width="320" style="top: 0; height: 100%" absolute temporary>
    <div class="drawer-header d-flex justify-space-between">
      <div class="font-weight-bold" style="font-size: 1.1rem; margin-left: 14px;">Filtrar e Organizar</div>
      <v-btn @click="hideNavigationDrawer()" elevation="0" icon :ripple="false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <v-divider></v-divider>
    <v-list v-model:opened="open" style="padding: 0">
      <v-list-group v-for="(filter, index) in filterList" :key="index" value="Section 1" fluid>
        <template v-slot:activator="{ props }">
          <v-list-item :title="filter.title" v-bind="props"></v-list-item>
        </template>

        <v-list-item>
          <v-checkbox v-for="(item, idx) in filter.items" :key="idx" v-model="localFilters"
            :value="{ section: filter.title, filter: item }" density="compact"
            @change="updateFilters({ section: filter.title, filter: item })" hide-details>
            <template v-slot:label>
              <div style="font-size: 0.8rem; padding-bottom: 3px;">{{ item }}</div>
            </template>
          </v-checkbox>
        </v-list-item>
      </v-list-group>

      <div class="w-100 d-flex justify-center align-center px-3 mt-2">
        <v-btn @click="handleClearFilters" class="text-subtitle-1 font-weight-regular button-color button-light"
          height="35px" variant="flat" :ripple="false" style="flex: 1; font-size: 0.9rem !important;">
          Limpar Filtros
        </v-btn>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch } from "vue";
import { useDrawerStore } from "@/store/store.js";
import { storeToRefs } from "pinia";

const props = defineProps({
  activeFilters: Object,
  filterList: Array,
});

const emit = defineEmits(["update-filters"]);

const drawerStore = useDrawerStore();
const { displayFilterDrawer } = storeToRefs(drawerStore);

const open = ref([]);

/* watch(displayFilterDrawer, (newValue) => {
  if (!newValue) {
    open.value = [];
  }
});
 */

const hideNavigationDrawer = () => {
  displayFilterDrawer.value = false;
};

const localFilters = ref([...props.activeFilters]);

const updateFilters = (item = null) => {
  if (item) {
    const found = localFilters.value.find(f => f.section == item.section && f.filter != item.filter);
    if (found) {
      const index = localFilters.value.indexOf(found);

      if (index !== -1) {
        localFilters.value.splice(index, 1);
      }
    }
  }

  emit("update-filters", localFilters.value);
  hideNavigationDrawer();
}

const handleClearFilters = () => {
  localFilters.value = [];
  open.value = [];
  updateFilters();
}
</script>

<style></style>
