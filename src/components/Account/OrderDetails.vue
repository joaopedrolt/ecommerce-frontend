<template>
    <div class="d-flex align-center" style="min-height: 100vh;">
        <div class="container-limit container-size-padding pt-12 pb-16 d-flex flex-column" style="gap: 45px;">
            <div class="w-100">
                <v-card-title class="text-center mb-7">GROWTH-1041668-00022</v-card-title>

                <div class="bg-white text--primary">
                    <div class="w-100 d-flex text-center mb-3">
                        <div class="d-flex flex-column align-center text-subtitle-1" style="flex: 1; gap: 5px;">
                            <v-icon>mdi-clock-time-eight-outline</v-icon>
                            Aguardando Pagamento
                        </div>

                        <div class="d-flex flex-column align-center text-subtitle-1" style="flex: 1; gap: 5px;">
                            <v-icon>mdi-currency-usd</v-icon>
                            Pago
                        </div>

                        <div class="d-flex flex-column align-center text-subtitle-1" style="flex: 1; gap: 5px;">
                            <v-icon>mdi-package-variant</v-icon>
                            Preparando
                        </div>

                        <div class="d-flex flex-column align-center text-subtitle-1" style="flex: 1; gap: 5px;">
                            <v-icon>mdi-truck-fast</v-icon>
                            Pedido Enviado
                        </div>
                    </div>
                    <v-progress-linear class="px-0 py-0" model-value="50"></v-progress-linear>
                </div>
            </div>

            <div class="d-flex" style="gap: 40px;">
                <div class="d-flex flex-column" style="flex: 1; gap: 20px;">
                    <v-data-iterator :items="products" :items-per-page="itemsPerPage" :search="search">
                        <template v-slot:default="{ items }">
                            <div class="w-100 d-flex flex-column" style="gap: 15px;">
                                <div v-for="p in items" class="w-100 d-flex flex-column">
                                    <div class="d-flex align-center py-4 px-2">
                                        <div class="mr-5" style="height: 100px; width: 100px;">
                                            <v-img style="object-fit: contain;; height: 100%; width: 100%;"
                                                :src="p.raw.img" />
                                        </div>
                                        <div>
                                            <div class="font-weight-medium">{{ p.raw.title }}</div>
                                            <div class="text-subtitle-2 font-weight-regular">{{ p.raw.price }}</div>
                                        </div>
                                    </div>
                                    <v-divider color="#111111"></v-divider>
                                    <div class="d-flex justify-space-between px-5 py-2">
                                        <div class="text-subtitle-2 font-weight-regular">
                                            Quantidade: {{ p.raw.amount }}
                                        </div>
                                        <div class="text-subtitle-2 font-weight-regular">
                                            {{ p.raw.total }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-if="products.length > itemsPerPage"
                            v-slot:footer="{ page, pageCount, prevPage, nextPage }">
                            <div class="d-flex align-center justify-center pa-4">
                                <v-btn :disabled="page === 1" icon="mdi-arrow-left" density="comfortable" variant="tonal"
                                    rounded @click="prevPage"></v-btn>

                                <div class="mx-2 text-caption">
                                    Página {{ page }} de {{ pageCount }}
                                </div>

                                <v-btn :disabled="page >= pageCount" icon="mdi-arrow-right" density="comfortable"
                                    variant="tonal" rounded @click="nextPage"></v-btn>
                            </div>
                        </template>
                    </v-data-iterator>
                    <div class="mt-10">
                        <div class="d-flex justify-end text-subtitle-2 font-weight-regular px-5" style="gap: 20px;">
                            <div>Total Items: (+)</div>
                            <div class="font-weight-medium">R$3600</div>
                        </div>

                        <div class="d-flex justify-end text-subtitle-2 font-weight-regular px-5" style="gap: 20px;">
                            <div>Frete: (+)</div>
                            <div class="font-weight-medium">R$40</div>
                        </div>

                        <div class="d-flex justify-end text-subtitle-2 font-weight-regular px-5" style="gap: 20px;">
                            <div>Desconto: (--)</div>
                            <div class="font-weight-medium">R$300</div>
                        </div>

                        <div class="d-flex justify-end align-center text-subtitle-1 font-weight-medium px-5 mt-2"
                            style="gap: 20px;">
                            <div>Valor Final do Pedido: </div>
                            <div>R$3340</div>
                        </div>
                    </div>
                </div>

                <div class="d-flex flex-column pt-5 px-2" style="flex: 1; gap: 53px;">
                    <div>
                        <div class="px-0 py-0 mb-1 font-weight-medium" style="font-size: 1.15rem;">Forma de pagamento</div>
                        <div class="text-subtitle-2 font-weight-regular"> Pix à vista em 1x de R$ 106,25</div>
                    </div>
                    <div>
                        <div class="px-0 py-0 mb-1 font-weight-medium" style="font-size: 1.15rem;">Endereço de entrega</div>
                        <div class="text-subtitle-2 font-weight-regular">
                            Destinatário: Paulo Sergio Teixeira<br />
                            Endereço: Rua Etore Cataruzzi, 3, Jardim Rina,
                            Casa amarela., Santo André-SP, CEP 09271620
                        </div>
                    </div>
                    <div>
                        <div class="px-0 py-0 mb-1 font-weight-medium" style="font-size: 1.15rem;">Rastrear Pedido</div>
                        <div class="text-subtitle-2 font-weight-regular">Rastreio indisponivel</div>
                    </div>
                    <div>
                        <div class="px-0 py-0 mb-1 font-weight-medium" style="font-size: 1.15rem;">Faturamento</div>
                        <div class="text-subtitle-2 font-weight-regular">A nota fiscal será disponibilizada em breve.</div>
                    </div>
                    <div>
                        <div class="px-0 py-0 mb-1 font-weight-medium" style="font-size: 1.15rem;">Resumo do pedido</div>
                        <div class="text-subtitle-2 font-weight-regular"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { reactive, ref } from "vue";


const address = reactive({
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: ""
});

const itemsPerPage = 4;

const products = ref([
    {
        img: 'https://www.gsuplementos.com.br/upload/produto/imagem/m_gal-o-preto-2-litros-growth-supplements-1.png',
        title: 'Galão de dois litros growth',
        price: 'R$99,00',
        amount: 1,
        total: 'R$99,00',
    },
    {
        img: 'https://www.gsuplementos.com.br/upload/produto/imagem/m_top-whey-protein-concentrado-1kg-growth-supplements-9.png',
        title: 'Whey Protein Concentrado 1kg',
        price: 'R$120,00',
        amount: 2,
        total: 'R$240,00',
    },
    {
        img: 'https://www.gsuplementos.com.br/upload/produto/imagem/m_albumina-1kg-growth-supplements-2.png',
        title: 'Albumina 1kg',
        price: 'R$77,00',
        amount: 1,
        total: 'R$77,00',
    },
    {
        img: 'https://www.gsuplementos.com.br/upload/produto/imagem/m_strap-com-munhequeira-growth-par-growth-supplements.jpeg',
        title: 'Strap com Munhequeira',
        price: 'R$77,00',
        amount: 1,
        total: 'R$77,00',
    },
    {
        img: 'https://www.gsuplementos.com.br/upload/produto/imagem/m_col-geno-verisol-1000mg-120comp-growth-supplements.png',
        title: 'COLÁGENO VERISOL 1000MG 120COMP',
        price: 'R$60,00',
        amount: 1,
        total: 'R$60,00',
    },
]);
</script>
  
<style lang="scss"></style>
    