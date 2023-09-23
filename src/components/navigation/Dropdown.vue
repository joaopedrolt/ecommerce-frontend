<template>
    <v-card v-if="menu == '1'" min-width="300">
        1
    </v-card>

    <v-card v-if="menu == '2'" min-width="300">
        2
    </v-card>

    <v-card v-if="menu == '3'" min-width="300">
        3
    </v-card>
</template>
   
<script setup>
import { ref } from 'vue';

const props = defineProps({
    menu: String,
});

const menu = ref(props.menu);
</script>
   
<style lang="scss">

</style>