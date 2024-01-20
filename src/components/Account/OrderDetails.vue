<template>
    <div class="d-flex align-center" style="min-height: 100vh;">
        <div class="container-limit container-size-padding pt-12 pb-16">
            <div class="w-100" style="background-color: red; height: 80px;">
                Status do pedido GROWTH-1041668-00022
            </div>

            <div class="d-flex">

            </div>


            <div>
                Forma de pagamento
            </div>
            <div>
                Endereço de entrega
            </div>
            <div>
                Rastrear Pedido
            </div>
            <div>
                Faturamento
            </div>
            <div>
                Resumo do pedido
            </div>
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
    