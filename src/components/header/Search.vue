<template>
    <v-card>
        <div class="search-container">
            <div class="search-input-wrapper">
                <v-text-field v-model="searchInputValue" @click:append="search" @keyup.enter="search" clearable
                    hide-details="auto" variant="outlined" placeholder="O que deseja?" :append-icon="'mdi-magnify'">
                </v-text-field>
            </div>
        </div>
    </v-card>
</template>
   
<script setup>
import { ref } from 'vue';

const searchInputValue = ref('');

const search = () => {
    alert(searchInputValue);
};
</script>
   
<style lang="scss">
@import '@/styles/global.scss';

.search-container {
    height: 150px;
    width: 100dvw;
    display: flex;
    align-items: center;
    justify-content: center;

    .search-input-wrapper {
        width: 60%;

        @media (max-width: $breakpoint) {
            width: 90%;
        }
    }
}
</style>