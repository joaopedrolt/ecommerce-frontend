<template >
    <v-navigation-drawer v-model="displayDrawer" width="320" style="top: 0; height: 100%;" absolute temporary>
        <div class="nav-mobile-header">
            <v-btn @click="hideNavigationDrawer()" elevation="0" icon :ripple="false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </div>
        <v-divider></v-divider>
        <v-list v-model:opened="open" style="padding: 0;">
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
import { ref, watch } from 'vue';
import { useDrawerStore } from "@/store/store.js";
import { storeToRefs } from 'pinia';

const drawerStore = useDrawerStore();
const { displayDrawer } = storeToRefs(drawerStore);

const open = ref([]);

watch(displayDrawer, (newValue) => {
    if (!newValue) {
        open.value = [];
    }
});

const hideNavigationDrawer = () => {
    drawerStore.hideNavigationDrawer();
};
</script>
   
<style lang="scss">
.nav-mobile-header {
    height: 50px;
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 0 4px;
}
</style>