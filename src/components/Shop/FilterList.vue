<template>
  <div class="filter-list-container">
    <v-expansion-panels eager multiple elevation="0">
      <v-expansion-panel v-for="i in 3" :key="i" elevation="0" style="margin: 0" variant="accordion">
        <v-expansion-panel-title eager>
          <div style="font-size: 0.8rem;">
            Categorias
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text eager>
          <v-checkbox density="compact" hide-details>
            <template v-slot:label>
              <div style="font-size: 0.8rem; padding-bottom: 3px;">Roupa</div>
            </template>
          </v-checkbox>
          <v-checkbox density="compact" hide-details>
            <template v-slot:label>
              <div style="font-size: 0.8rem; padding-bottom: 3px;">Caderno</div>
            </template>
          </v-checkbox>
          <v-checkbox density="compact" hide-details>
            <template v-slot:label>
              <div style="font-size: 0.8rem; padding-bottom: 3px;">Garrafinha</div>
            </template>
          </v-checkbox>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div>
      <v-btn class="text-subtitle-1 font-weight-regular mt-5 button-color button-black" height="35px" variant="flat"
        :ripple="false" style="width: 221px; font-size: 0.9rem !important;">
        Limpar Filtros
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const radios = ref("1");
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
