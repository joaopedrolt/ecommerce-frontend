<template>
  <div class="filter-list-container">
    <v-expansion-panels eager multiple elevation="0">
      <v-expansion-panel
        v-for="i in 3"
        :key="i"
        elevation="0"
        style="margin: 0"
      >
        <v-expansion-panel-title eager> Categorias </v-expansion-panel-title>
        <v-expansion-panel-text eager>
          <v-radio-group v-model="radios" hide-details>
            <v-radio label="Categoria 1" value="1"></v-radio>
            <v-radio label="Categoria 2" value="2"></v-radio>
            <v-radio label="Categoria 3" value="3"></v-radio>
          </v-radio-group>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="px-2">
      <v-btn
        class="text-subtitle-1 font-weight-regular mt-5"
        color="primary"
        height="45px"
        width="100%"
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
}

.v-expansion-panel-text__wrapper {
  padding-bottom: 8px !important;
}
</style>
