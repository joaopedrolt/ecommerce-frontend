<template>
    <div class="d-flex align-center" style="min-height: 100vh;">
        <div v-if="loading" class="order-hist container-limit container-size-padding pt-7 pb-16 d-flex flex-column">
            <div class="w-100">
                <div class="d-flex">
                    <v-btn @click="handleGoBack" elevation="0" class="font-weight-regular button-color button-dark "
                        variant="flat" style="font-size: 0.72rem; padding-left: 0; padding-right: 8px;">
                        <v-icon style="font-size: 1.5rem !important;" icon="mdi-chevron-left"></v-icon>
                        Voltar
                    </v-btn>
                </div>

                <v-card-title class="text-center mb-9">FURVANA-1041668-00022</v-card-title>

                <div class="bg-white text--primary">
                    <div class="w-100 d-flex text-center mb-4">
                        <div class="d-flex flex-column align-center " style="flex: 1; gap: 5px;">
                            <v-icon>mdi-currency-usd</v-icon>
                            <div class="h-100 w-100 px-2 d-flex align-center justify-center"
                                style="line-height: 1.3; font-size: .9rem;">
                                Pedido<br>Efetuado
                            </div>
                        </div>

                        <div class="d-flex flex-column align-center " style="flex: 1; gap: 5px;">
                            <v-icon>mdi-truck-fast</v-icon>

                            <div class="h-100 w-100 d-flex align-center justify-center"
                                style="line-height: 1.3; font-size: .9rem;">
                                Pedido<br>Enviado
                            </div>
                        </div>

                        <div class="d-flex flex-column align-center " style="flex: 1; gap: 5px;">
                            <v-icon>mdi-package-variant</v-icon>
                            <div class="h-100 w-100 px-2 d-flex align-center justify-center"
                                style="line-height: 1.3; font-size: .9rem;">
                                Pedido<br>Recebido
                            </div>
                        </div>
                    </div>

                    <div class="battery-bar">
                        <v-progress-linear class="px-0 py-0" :model-value="orderProgress"></v-progress-linear>
                    </div>
                </div>
            </div>

            <div class="order-hist-container d-flex">
                <div class="products-container d-flex flex-column border-right" style="flex: 1;">
                    <div class="px-0 py-0 mb-6 font-weight-medium" style="font-size: 1.12rem;">RESUMO DO PEDIDO</div>
                    <v-data-iterator :items="order.products" :items-per-page="itemsPerPage">
                        <template v-slot:default="{ items }">
                            <div class="w-100 d-flex flex-column" style="gap: 20px;">
                                <div v-for="p in items" class="product-item w-100 d-flex flex-column">
                                    <div class="d-flex align-center py-1 pb-4 px-2">
                                        <div class="mr-5" style="height: 100px; width: 100px;">
                                            <v-img style="object-fit: contain;; height: 100%; width: 100%;"
                                                :src="p.raw.image" />
                                        </div>
                                        <div>
                                            <div class="font-weight-medium">{{ p.raw.title }}</div>
                                            <div class="text-subtitle-2 font-weight-regular">{{ formatPrice(p.raw.price)
                                            }} (Valor Unidade)
                                            </div>
                                        </div>
                                    </div>
                                    <v-divider color="#111111"></v-divider>
                                    <div class="d-flex justify-space-between pr-4 pl-1 py-3">
                                        <div class="text-subtitle-2 font-weight-regular">
                                            Quantidade: {{ p.raw.quantity }}
                                        </div>
                                        <div class="text-subtitle-2 font-weight-regular">
                                            {{ formatPrice(p.raw.price * p.raw.quantity) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-if="order.products && order.products.length > itemsPerPage"
                            v-slot:footer="{ page, pageCount, prevPage, nextPage }">
                            <div class="d-flex align-center justify-center pa-4">
                                <v-btn :disabled="page === 1" icon="mdi-arrow-left" density="comfortable"
                                    variant="tonal" rounded @click="prevPage"></v-btn>

                                <div class="mx-2 text-caption">
                                    Página {{ page }} de {{ pageCount }}
                                </div>

                                <v-btn :disabled="page >= pageCount" icon="mdi-arrow-right" density="comfortable"
                                    variant="tonal" rounded @click="nextPage"></v-btn>
                            </div>
                        </template>
                    </v-data-iterator>
                    <div class="mt-5">
                        <div class="d-flex justify-end text-subtitle-2 font-weight-regular px-5" style="gap: 20px;">
                            <div>Total Items: (+)</div>
                            <div class="font-weight-medium">{{ formatPrice(order.totalPrice - order.shipping.price) }}
                            </div>
                        </div>

                        <div class="d-flex justify-end text-subtitle-2 font-weight-regular px-5" style="gap: 20px;">
                            <div>Frete: (+)</div>
                            <div class="font-weight-medium">{{ formatPrice(order.shipping.price) }}</div>
                        </div>

                        <!--    <div class="d-flex justify-end text-subtitle-2 font-weight-regular px-5" style="gap: 20px;">
                            <div>Desconto: (--)</div>
                            <div class="font-weight-medium">R$300</div>
                        </div> -->

                        <div class="d-flex justify-end align-center text-subtitle-1 font-weight-medium px-5 mt-2 pb-2"
                            style="gap: 20px;">
                            <div>Valor Final do Pedido: </div>
                            <div>{{ formatPrice(order.totalPrice) }}</div>
                        </div>
                    </div>
                </div>

                <div class="overview-container d-flex flex-column" style="flex: 1;">
                    <div>
                        <div class="px-0 py-0 mb-1 font-weight-medium" style="font-size: 1.12rem;">FORMA DE PAGAMENTO
                        </div>
                        <div class="text-subtitle-2 font-weight-regular">
                            {{ paymentTextFormatted }}
                        </div>
                    </div>
                    <div>
                        <div class="px-0 py-0 mb-1 font-weight-medium" style="font-size: 1.12rem;">ENDEREÇO DE ENTREGA
                        </div>
                        <div class="text-subtitle-2 font-weight-regular">
                            Destinatário: {{ order.shipping.nome }} {{ order.shipping.sobrenome }}<br />
                            Endereço: {{ order.shipping.endereco }}, {{ order.shipping.numero }} -
                            {{ order.shipping.bairro }}, {{ order.shipping.cidade }}, {{ order.shipping.estado.sigla }}
                            - {{ order.shipping.cep }}
                        </div>
                    </div>
                    <div>
                        <div class="px-0 py-0 mb-1 font-weight-medium" style="font-size: 1.12rem;">RASTREAR PEDIDO</div>
                        <div class="text-subtitle-2 font-weight-regular">Rastreio indisponivel</div>
                    </div>
                    <div>
                        <div class="px-0 py-0 mb-1 font-weight-medium" style="font-size: 1.12rem;">FATURAMENTO</div>
                        <div class="text-subtitle-2 font-weight-regular">A nota fiscal será disponibilizada em breve.
                        </div>
                    </div>

                    <div>
                        <v-btn @click="handleConfirmDelivery(order.id)"
                            v-if="(order.status != null && order.status != 'Pedido Recebido')"
                            :loading="loadingConfirmDelivery"
                            class="text-subtitle-1 font-weight-regular button-color button-light mb-4" height="45px"
                            width="100%" variant="flat" :ripple="false">
                            Confirmar Entrega
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { getOrder, setOrderStatus } from '@/data/order';
import formatPrice from "@/utils/formatPrice";

const route = useRoute();
const router = useRouter();

const queryCheckout = computed(() => route.query.checkout)

const order = ref();
const orderId = ref();

const loading = ref(false);

const paymentTextFormatted = ref("");

const loadingConfirmDelivery = ref(false);

const orderProgress = ref(33);

const itemsPerPage = 4;

const loadUserOrder = async (orderId) => {
    order.value = await getOrder(orderId);

    const { method, installments } = order.value.payment;
    const totalPriceFormatted = formatPrice(order.value.totalPrice);

    const paymentMessages = {
        card: `Cartão de Crédito em ${installments?.formattedPrice || totalPriceFormatted}`,
        pix: `Pix em 1x de ${totalPriceFormatted}`,
        boleto: `Boleto Bancário em 1x de ${totalPriceFormatted}`,
    };

    paymentTextFormatted.value = paymentMessages[method] || '';

    /* ------------------------------------------------------- */

    switch (order.value.status.toLowerCase().trim()) {
        case 'pedido efetuado':
            orderProgress.value = 33;
            break;
        case 'pedido enviado':
            orderProgress.value = 66;
            break;
        case 'pedido recebido':
            orderProgress.value = 100;
            break;
        default:
            orderProgress.value = 0;
            break;
    }
};

const handleConfirmDelivery = async (orderId) => {
    loadingConfirmDelivery.value = true;
    await setOrderStatus(orderId, 'Pedido Recebido')
    await loadUserOrder(orderId)
    loadingConfirmDelivery.value = false;
}

const handleGoBack = () => {
    router.push({
        name: "AccountOverview",
        query: queryCheckout.value === 'true' ? { checkout: true } : {}
    });

    return;
}

onBeforeMount(async () => {
    orderId.value = route.params.orderId;

    loading.value = false;
    await loadUserOrder(orderId.value)
    loading.value = true;
})
</script>

<style lang="scss">
@import "@/styles/global.scss";

$section-gap: 38px;

.order-hist {
    gap: 55px;

    @media (max-width: $tablet) {
        gap: $section-gap;
    }
}

.products-container {
    .product-item {
        /*  border-left: 1px solid $color-border; */
    }
}

.border-left {
    border-left: 1px solid $color-border;
}

.border-right {
    border-right: 1px solid $color-border;
}

.overview-container {
    gap: 80px;

    @media (max-width: $tablet) {
        gap: $section-gap;
    }
}

.order-hist-container {
    flex-wrap: wrap;
    gap: 38px;

    @media (max-width: $tablet) {
        flex-direction: column-reverse;
        gap: $section-gap;
    }
}

.battery-bar {}
</style>