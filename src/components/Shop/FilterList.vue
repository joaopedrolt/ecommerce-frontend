<template>
  <div class="filter-list-container">
    <v-expansion-panels eager multiple elevation="0">
      <v-expansion-panel
        v-for="i in 3"
        :key="i"
        elevation="0"
        style="margin: 0"
        variant="accordion"
      >
        <v-expansion-panel-title eager> Categorias </v-expansion-panel-title>
        <v-expansion-panel-text eager>
          <v-checkbox density="compact" hide-details>
            <template v-slot:label>
              <div class="text-subtitle-2">Roupa</div>
            </template>
          </v-checkbox>
          <v-checkbox density="compact" hide-details>
            <template v-slot:label>
              <div class="text-subtitle-2">Caderno</div>
            </template>
          </v-checkbox>
          <v-checkbox density="compact" hide-details>
            <template v-slot:label>
              <div class="text-subtitle-2">Garrafinha</div>
            </template>
          </v-checkbox>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="pr-2">
      <v-btn
        class="text-subtitle-1 font-weight-regular mt-5 button-color button-black"
        width="100%"
        height="35px"
        variant="flat"
        :ripple="false"
      >
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
  border-right: $border-small-line;
  width: 240px;

  .v-expansion-panel-title {
    padding: 16px 24px 16px 0 !important;
  }

  .v-expansion-panel-title:hover > .v-expansion-panel-title__overlay {
    opacity: 0 !important;
  }

  .v-expansion-panel-title--active > .v-expansion-panel-title__overlay,
  .v-expansion-panel-title[aria-haspopup="menu"][aria-expanded="true"]
    > .v-expansion-panel-title__overlay {
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
