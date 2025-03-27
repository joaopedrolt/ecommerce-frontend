<template>
  <template v-if="render">
    <!-- Left side -->
    <div class="left-side border-right">
      <div class="wrapper">

        <!-- Header Left -->
        <div class="splitted-header desktop mb-4">
          <header-top />
          <div>
            <v-breadcrumbs class="pl-0 text-subtitle-2 font-weight-regular" :items="items">
              <template v-slot:divider>
                <v-icon icon="mdi-chevron-right"></v-icon>
              </template>
              <template v-slot:title="{ item }">
                <div>
                  {{ item.title }} <v-icon class="pl-2" v-if="item.icon">{{ item.icon }}</v-icon>
                </div>
              </template>
            </v-breadcrumbs>
          </div>
        </div>

        <div class="d-flex flex-column justify-space-between mb-5">
          <div class="text-h5 font-weight-regular">
            Pagamento
          </div>

          <span class="text-subtitle-2 font-weight-regular mt-1" style="opacity: 0.6;">
            Todas as transações são seguras e criptografadas.
          </span>
        </div>


        <!--   <div class="border-outlined w-100 d-flex justify-space-between mb-10">
          <div>
            Boleto
          </div>
          <div>
            <v-icon>mdi-barcode</v-icon>
          </div>
        </div> -->

        <div class="w-100 d-flex flex-column text-subtitle-2 font-weight-regular mb-12" style="gap: 8px;">
          <div class="d-flex align-center">
            <v-icon class="mr-3">mdi-credit-card-outline</v-icon>
            <div>Método: Boleto Bancário</div>
          </div>
          <div class="d-flex align-center">
            <v-icon class="mr-3">mdi-ticket-confirmation-outline</v-icon>
            <div>Nº do Pedido: 0KSaHvjDmIVL7bMI4IFU</div>
          </div>
          <div class="d-flex align-center">
            <v-icon class="mr-3">mdi-calendar-month</v-icon>
            <div>Vencimento: 02/04/2002</div>
          </div>
          <div class="d-flex align-center">
            <v-icon class="mr-3">mdi-currency-usd</v-icon>
            <div>Valor: R$209.00</div>
          </div>

        </div>

        <div class="w-100 d-flex flex-column align-center mb-5">
          <div class="font-weight-medium text-overline">
            Clique para copiar o código de barras:
          </div>
          <div @click="handleCopyToClipboard(boletoCode)" class="payment-code-container border-outlined"
            style="background-color: black; color: white;">
            <div style="flex: 1;">
              {{ boletoCode }}
            </div>
            <div>
              <v-icon>mdi-content-copy</v-icon>
            </div>
          </div>
        </div>

        <div class="w-100">
          <v-img src="/barcode.png" />
        </div>

        <!-- Footer Left -->
        <footer-breadcrumb />
      </div>
    </div>

    <!-- Right Side -->
    <div class="right-side">
      <!-- Edit Cart - Top -->

      <div class="splitted-header mobile mb-2">
        <!--      <header-top /> -->
        <div>
          XXXXXX
        </div>
      </div>

      <div class="mobile-expansion-summary">
        xxxxx
      </div>

      <div class="wrapper">
        <div class="splitted-header mobile mb-7">
          <!--   <header-top /> -->
          <div>

          </div>
        </div>

        <div class="top-summary w-100 d-flex justify-space-between mb-2">
          <div class="text-h6 font-weight-regular">
            Dados e Contato
          </div>
        </div>



        <div>
          Email:
        </div>
        <div>
          CPF:
        </div>

        <div>
          Endereco:

          Rua Etore Cataruzzi, 3
        </div>

        <div>
          Bairro:

          Jardim Rina
        </div>

        <div>
          Cidade/Estado:

          Santo Andre, SP
        </div>

        <div>
          Cep:

          09271-620
        </div>

        <div>
          Total:
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { ref } from 'vue';
import HeaderTop from '@/components/Splitted/HeaderTop.vue';
import FooterBreadcrumb from '@/components/Splitted/FooterBreadcrumb.vue';
import generateBoletoCode from '@/utils/generateBoletoCode';

const render = ref(true);

const items = ref([
  {
    title: 'Pagamento',
    disabled: false,
    icon: null
  },
  {
    title: 'Boleto Bancario',
    disabled: false,
    icon: 'mdi-barcode'
  }
]);

const boletoCode = ref(generateBoletoCode());

const handleCopyToClipboard = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}
</script>

<style lang="scss">
@import "@/styles/global.scss";

.payment-code-container {
  width: 100%;
  display: flex;
  cursor: pointer;
  text-align: center;
}

.border-outlined {
  border: 1px solid $color-border;
  border-radius: 20px;
  padding: 5px 20px;
}
</style>