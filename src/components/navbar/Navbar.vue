<template>
    <v-app-bar class="nav-container" :elevation="1">
        <div class="fluid-spacing nav-spacing h-100 w-100 d-flex justify-space-between align-center">

            <!-- Desktop -->
            <div class="hidden-md-and-down nav-side-container h-100">
                <v-menu v-model="firstMenu" :close-on-content-click="false">
                    <template v-slot:activator="{ props }">
                        <v-btn class="h-100" v-bind="props">
                            section 1
                        </v-btn>
                    </template>

                    <dropdown menu="1" />
                </v-menu>

                <v-menu v-model="secondMenu" :close-on-content-click="false">
                    <template v-slot:activator="{ props }">
                        <v-btn class="h-100" v-bind="props">
                            section 2
                        </v-btn>
                    </template>

                    <dropdown menu="2" />
                </v-menu>

                <v-menu v-model="thirdMenu" :close-on-content-click="false">
                    <template v-slot:activator="{ props }">
                        <v-btn class="h-100" v-bind="props">
                            section 3
                        </v-btn>
                    </template>

                    <dropdown menu="3" />
                </v-menu>
            </div>

            <!-- Mobile -->
            <div class="d-lg-none nav-mobile-icon-container">
                <v-btn icon>
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
                <v-btn @click="showSearchOverlay" icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </div>

            <!-- Hybrid -->
            <div class="h-100">
                <v-btn class="h-100">
                    eSupplements
                </v-btn>
            </div>

            <!-- Desktop -->
            <div class="hidden-md-and-down nav-side-container h-100">
                <v-btn @click="showSearchOverlay" class="h-100">
                    Pesquisar
                    <v-icon style="margin: 0 0 0 4px;">mdi-magnify</v-icon>
                </v-btn>

                <v-btn class="h-100">
                    Entrar
                    <v-icon style="margin: 0 0 2px 3px;">mdi-account</v-icon>
                </v-btn>

                <v-btn class="h-100">
                    Carrinho
                    <v-icon style="margin: 0 0 2px 3px;">mdi-cart</v-icon>
                </v-btn>
            </div>

            <!-- Mobile -->
            <div class="d-lg-none nav-mobile-icon-container">
                <v-btn icon>
                    <v-icon>mdi-account</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-cart</v-icon>
                </v-btn>
            </div>

            <v-overlay v-model="displaySearch">
                <search />
            </v-overlay>
        </div>
    </v-app-bar>
</template>
  
<script setup>
import { ref } from 'vue';
import Search from './Search.vue';
import Dropdown from './Dropdown.vue';

const displaySearch = ref(false);

const firstMenu = ref(false);
const secondMenu = ref(false);
const thirdMenu = ref(false);

const showSearchOverlay = () => {
    displaySearch.value = true;
}
</script>

<style lang="scss">
.fluid-spacing {
    &.nav-spacing {
        /* Alteravel tamanho no futuro */
        padding: 0 12px !important;
    }
}

.nav-container {
    /* Alteravel tamanho no futuro */
    height: 64px;

    .nav-side-container {
        width: 390px;
    }

    .nav-mobile-icon-container {
        width: 96px;
    }
}
</style>
  