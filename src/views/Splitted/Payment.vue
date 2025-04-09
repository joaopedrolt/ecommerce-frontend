<template>
  <template v-if="render">
    <!-- Left side -->
    <div class="left-side border-right">
      <div class="wrapper">

        <!-- Header Left -->
        <div class="splitted-header desktop mb-4">
          <header-top />
          <div>
            <v-breadcrumbs class="pl-0 text-subtitle-2 font-weight-regular" :items="navBreadcrumbs">
              <template v-slot:divider>
                <v-icon icon="mdi-chevron-right"></v-icon>
              </template>
              <template v-slot:title="{ item }">
                <div>
                  {{ item.title }} <v-icon class="pl-2" style="transform: translateY(-1.2px);" v-if="item.icon">{{
                    item.icon }}</v-icon>
                </div>
              </template>
            </v-breadcrumbs>
          </div>
        </div>

        <div class="d-flex flex-column justify-space-between mb-6">
          <div class="text-h5 font-weight-regular mb-6">
            <v-icon style="transform: translateY(-2px); font-size: 2rem !important;">mdi-check-circle-outline</v-icon>
            {{ paymentMessageMap[order.payment.method].title || 'Pedido Confirmado!' }}
          </div>

          <ul style="list-style-position: inside; padding-left: 7px;">
            <li class="text-subtitle-2 font-weight-regular">
              <span class="text-subtitle-2 font-weight-regular mt-1">
                {{ paymentMessageMap[order.payment.method].subtitle || 'Recebemos seu pedido com sucesso e ele já está '
                  + ' sendo processado.' }}
              </span>
            </li>

            <li class="text-subtitle-2 font-weight-regular">
              <span class="text-subtitle-2 font-weight-regular mt-1">
                Verifique seu e-mail (inclusive a caixa de spam/lixo eletrônico) para acompanhar a situação do pedido.
              </span>
            </li>
          </ul>

        </div>

        <div class="d-flex flex-column justify-space-between mb-5">
          <div class="text-h5 font-weight-regular">
            Pagamento
          </div>

          <span class="text-subtitle-2 font-weight-regular mt-1" style="opacity: 0.6;">
            Todas as transações são seguras e criptografadas.
          </span>
        </div>

        <div class="w-100 d-flex flex-column text-subtitle-2 font-weight-regular mb-7" style="gap: 10px;">
          <div class="d-flex align-center">
            <v-icon class="mr-3">mdi-credit-card-outline</v-icon>
            <div class="d-flex align-center">
              <div class="font-weight-bold pr-2">Método:</div> {{ formattedMethod }}
            </div>
          </div>
          <div class="d-flex align-center">
            <v-icon class="mr-3">mdi-ticket-confirmation-outline</v-icon>
            <div class="d-flex align-center">
              <div class="font-weight-bold pr-2">Código do Pedido:</div> {{ order.id }}
            </div>
          </div>
          <div v-if="formattedMethod != 'Cartão de Crédito'" class="d-flex align-center">
            <v-icon class="mr-3">mdi-calendar-month</v-icon>
            <div class="d-flex align-center">
              <div class="font-weight-bold pr-2">Vencimento:</div> {{ expirationDate }}
            </div>
          </div>
        </div>

        <template v-if="formattedMethod == 'Boleto Bancário'">
          <v-tooltip close-on-content-click v-model="clipboardSuccess" location="end" :open-on-hover="false">
            <template v-slot:activator="{ props }">
              <div class="w-100 d-flex flex-column align-center mb-5">
                <div class="font-weight-medium text-overline">
                  Clique para copiar o código de barras:
                </div>
                <div @click="handleCopyToClipboard(boletoCode)" v-bind="props"
                  class="payment-code-container border-outlined" style="background-color: black; color: white;">
                  <div style="flex: 1;">
                    {{ boletoCode }}
                  </div>
                  <div>
                    <v-icon>mdi-content-copy</v-icon>
                  </div>
                </div>
              </div>
            </template>

            <span>Código Copiado!</span>
          </v-tooltip>

          <div class="w-100 mb-10">
            <v-img src="/barcode.png" />
          </div>
        </template>

        <template v-if="formattedMethod == 'Pix'">
          <div class="d-flex justify-center w-100">
            <div>
              <v-img :width="150" src="/qrcode.png" />
            </div>
          </div>

          <v-tooltip v-model="clipboardSuccess" location="end" :open-on-hover="false">
            <template v-slot:activator="{ props }">
              <div class="w-100 d-flex flex-column align-center mb-9">
                <div class="font-weight-medium text-overline">
                  Clique para copiar o código de barras:
                </div>
                <div @click="handleCopyToClipboard(pixCode)" v-bind="props"
                  class="payment-code-container border-outlined-dotted">
                  <div class="pr-2" style="flex: 1; overflow-wrap: anywhere;">
                    {{ pixCode }}
                  </div>
                  <div>
                    <v-icon>mdi-content-copy</v-icon>
                  </div>
                </div>
              </div>
            </template>

            <span>Código Copiado!</span>
          </v-tooltip>
        </template>

        <div class="checkout-navigation-container">
          <div class="previous-section-btn">
            <v-icon icon="mdi-chevron-left"></v-icon>
            <button @click="handlePageExit('Home')" class="d-flex align-center text-subtitle-2 font-weight-regular"
              style="opacity: 0.65; cursor: pointer">
              Voltar para Loja
            </button>
          </div>

          <v-btn @click="handlePageExit('AccountOverview')"
            class="next-section-btn text-subtitle-1 font-weight-regular button-color button-light" color="#111111"
            height="45px" width="100%" variant="flat" :ripple="false">
            {{ loggedIn == 'online' ? 'Acessar sua Conta' : 'Criar sua Própria Conta' }}
          </v-btn>
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
          XXXXXXxxxxxxxxx
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

        <v-divider color="#111111"></v-divider>

        <div class="d-flex w-100 flex-column my-6" style="gap: 13px;">

          <div class="d-flex align-center w-100">
            <div class="d-flex text-subtitle-2 font-weight-bold">
              <v-icon class="mr-2">mdi-id-card</v-icon>
              CPF:
            </div>

            <div class="ml-2 text-subtitle-2 font-weight-regular d-flex align-center">
              {{ order.shipping.cpf }}
            </div>
          </div>

          <div class="d-flex align-center w-100">
            <div class="d-flex text-subtitle-2 font-weight-bold">
              <v-icon class="mr-2">mdi-account</v-icon>
              Destinatario:
            </div>

            <div class="ml-2 text-subtitle-2 font-weight-regular d-flex align-center">
              {{ order.shipping.nome }}
            </div>
          </div>

          <div class="d-flex align-center w-100">
            <div class="d-flex text-subtitle-2 font-weight-bold">
              <v-icon class="mr-2">mdi-email</v-icon>
              Email:
            </div>

            <div class="ml-2 text-subtitle-2 font-weight-regular d-flex align-center">
              jpltgamer@gmail.com
            </div>
          </div>

          <div class="d-flex align-center w-100">
            <div class="d-flex text-subtitle-2 font-weight-bold">
              <v-icon class="mr-2">mdi-phone</v-icon>
              Telefone:
            </div>

            <div class="ml-2 text-subtitle-2 font-weight-regular d-flex align-center">
              {{ order.shipping.telefone }}
            </div>
          </div>

          <div class="d-flex align-start w-100">
            <div class="d-flex align-start text-subtitle-2 font-weight-bold">
              <v-icon class="mr-2">mdi-map-marker</v-icon>
              Endereço:
            </div>

            <div class="ml-2 text-subtitle-2 font-weight-regular d-flex align-center">
              {{ order.shipping.endereco }}, {{ order.shipping.numero }} -
              {{ order.shipping.bairro }}, {{ order.shipping.cidade }}, {{ order.shipping.estado.sigla
              }}
              - {{ order.shipping.cep }}
            </div>
          </div>
        </div>

        <v-divider color="#111111"></v-divider>

        <div class="d-flex align-center justify-space-between pt-4 pr-1 pl-2">
          <div style="margin-top: 1px;">Total:</div>
          <div class="text-h6 font-weight-regular ">RS 10,00</div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useAuthStore } from '@/store/store';

import { getOrder } from '@/data/order';

import HeaderTop from '@/components/Splitted/HeaderTop.vue';
import FooterBreadcrumb from '@/components/Splitted/FooterBreadcrumb.vue';

import generateBoletoCode from '@/utils/generateBoletoCode';
import generatePixCode from '@/utils/generatePixCode';
import formatDate from "@/utils/formatDate";

import { convertToFirebaseTimestamp } from '@/firebase';

const route = useRoute();
const router = useRouter();

const render = ref(false);

const authStore = useAuthStore();

const order = ref();

const paymentMessageMap = {
  boleto: { title: 'Pedido Reservado!', subtitle: 'Assim que o banco confirmar o pagamento, daremos continuidade no preparo do seu pedido! 😊' },
  pix: { title: 'Pedido Reservado!', subtitle: 'Assim que o banco confirmar o pagamento, daremos continuidade no preparo do seu pedido! 😊' },
  card: { title: 'Pedido Confirmado!', subtitle: 'Recebemos seu pedido com sucesso e ele já está sendo processado. 😊' },
}

const loggedIn = computed(() => {
  return authStore.getUserId() ? 'online' : 'local'
});

const navBreadcrumbs = computed(() => {
  if (!order?.value?.payment?.method) return [];

  const methodIconMap = {
    pix: "mdi-qrcode",
    boleto: "mdi-barcode",
    card: "mdi-credit-card-outline"
  };

  return [
    {
      title: 'Pagamento',
      disabled: false,
      icon: null
    },
    {
      title: formattedMethod.value,
      disabled: false,
      icon: methodIconMap[order.value.payment.method]
    }
  ]
});

const formattedMethod = computed(() => {
  if (!order?.value?.payment?.method) return "";

  const methodMap = {
    pix: "Pix",
    boleto: "Boleto Bancário",
    card: "Cartão de Crédito"
  };

  return methodMap[order.value.payment.method] || "";
});

const expirationDate = computed(() => {
  const date = new Date();

  const timeMap = {
    pix: 15,
    boleto: 4320,
    card: 0
  };

  date.setMinutes(date.getMinutes() + timeMap[order.value.payment.method] || 0);
  return formatDate(convertToFirebaseTimestamp(date));
});

const boletoCode = ref(generateBoletoCode());
const pixCode = ref(generatePixCode());

const clipboardSuccess = ref(false)

const handleCopyToClipboard = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
    clipboardSuccess.value = true;

    setTimeout(() => {
      clipboardSuccess.value = false;
    }, 1500);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}

const handlePageExit = (route) => {
  router.push({
    name: route,
  });
}

onBeforeMount(async () => {
  const orderId = route.query.o;

  order.value = await getOrder(orderId);

  render.value = true;
});
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

.border-outlined-dotted {
  border: 1px dotted $color-black;
  border-radius: 10px;
  padding: 5px 20px;
}
</style>