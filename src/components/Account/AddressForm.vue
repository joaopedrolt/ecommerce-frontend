<template>
    <div class="d-flex align-center" style="min-height: 100vh;">
        <div class="container-limit container-size-padding pt-12 pb-16">
            <h1 class="text-center text-h5 mb-6">Novo Endereço</h1>
            <form>
                <v-text-field v-model="address.rua" label="Rua" variant="outlined">
                </v-text-field>
                <v-text-field v-model="address.numero" label="Numero" variant="outlined">
                </v-text-field>
                <v-text-field v-model="address.bairro" label="Bairro" variant="outlined"></v-text-field>
                <v-text-field v-model="address.cidade" label="Cidade" variant="outlined"></v-text-field>
                <v-text-field v-model="address.uf" label="Uf" variant="outlined"></v-text-field>

                <v-btn @click="handleValidationClick"
                    class="text-subtitle-1 font-weight-regular button-color button-black mb-4" height="45px" width="100%"
                    variant="flat" :ripple="false">
                    Confirmar
                </v-btn>
            </form>
        </div>
    </div>
</template>
  
<script setup>
import { reactive } from "vue";

const address = reactive({
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: ""
});
</script>
  
<style lang="scss"></style>
    