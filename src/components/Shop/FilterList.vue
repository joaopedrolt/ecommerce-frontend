<template>
  <div class="filter-list-container">
    <v-expansion-panels class="pl-2 pr-3" eager multiple elevation="0">
      <v-expansion-panel v-for="(filter, index) in filterList" :key="index" elevation="0" style="margin: 0"
        variant="accordion">
        <v-expansion-panel-title eager>
          <div style="font-size: 0.8rem;">
            {{ filter.title }}
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text eager>
          <v-checkbox v-for="(item, idx) in filter.items" :key="idx" v-model="localFilters"
            :value="{ section: filter.title, filter: item }" density="compact"
            @change="updateFilters({ section: filter.title, filter: item })" hide-details>
            <template v-slot:label>
              <div style="font-size: 0.8rem; padding-bottom: 3px;">{{ item }}</div>
            </template>
          </v-checkbox>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="pl-1">
      <v-btn @click="handleClearFilters" class="text-subtitle-1 font-weight-regular mt-5 button-color button-light"
        height="35px" variant="flat" :ripple="false" style="width: 221px; font-size: 0.9rem !important;">
        Limpar Filtros
      </v-btn>
    </div>
  </div>

</template>

<script setup>
import { watch, ref } from 'vue';

const props = defineProps({
  activeFilters: Object,
  filterList: Array,
});

const emit = defineEmits(["update-filters"]);

const localFilters = ref([...props.activeFilters]);

const updateFilters = (item = null) => {
  if (item) {
    const found = localFilters.value.find(f => f.section == item.section && f.filter != item.filter);
    if (found) {
      const index = localFilters.value.indexOf(found);

      console.log(index)

      if (index !== -1) {
        localFilters.value.splice(index, 1);
      }
    }
  }

  emit("update-filters", localFilters.value);
}

const handleClearFilters = () => {
  localFilters.value = [];
  updateFilters();
}
</script>

<style lang="scss">
@import "@/styles/global.scss";

.filter-list-container {
  width: 90%;

  .v-expansion-panel-title {
    padding: 16px 24px 16px 0 !important;
  }

  .v-expansion-panel-title:hover>.v-expansion-panel-title__overlay {
    opacity: 0 !important;
  }

  .v-expansion-panel-title--active>.v-expansion-panel-title__overlay,
  .v-expansion-panel-title[aria-haspopup="menu"][aria-expanded="true"]>.v-expansion-panel-title__overlay {
    opacity: 0 !important;
  }

  .v-expansion-panel-text__wrapper {
    padding: 0 5px 8px !important;
  }

  .v-checkbox .v-selection-control {
    min-height: auto;
  }
}
</style>
