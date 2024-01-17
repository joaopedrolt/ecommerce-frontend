<template>
  <div style="min-height: 100vh;" class="d-flex align-center">
    <div class="container-limit container-size-padding pt-12 pb-16">
      <div class="d-flex align-center flex-column mb-10">
        <v-avatar class="mb-2" color="surface-variant">J.T</v-avatar>
        <div class="text-center text-overline" style="font-size: 0.91rem !important;">João Pedro Lima Teixeira</div>
      </div>
      <div class="d-flex flex-column" style="gap: 40px;">

        <!-- Esquerda -->
        <div style="flex: 1; padding: 0 !important;" elevation="0">
          <div>
            <div class="text-title text-center text-overline mb-5" style="font-size: 0.95rem !important;">
              <span>
                Endereços
              </span>
            </div>

            <v-card elevation="0">
              <v-list class="addresses-card-list">
                <template v-for="(a, index) in addresses" :key="index">
                  <v-list-item>
                    <v-card-item class="adress-card-item px-0">
                      <div v-if="a.isDefaultAddress" class="text-subtitle-2"
                        style="margin-top: 3px; margin-right: 3px; opacity: .65; transform: translateX(-2px);">
                        <v-icon style="transform: translateY(-2px);">mdi-home</v-icon> Endereço Principal
                      </div>

                      <template v-slot:append>
                        <div class="d-flex">
                          <v-btn elevation="0" icon size="small">
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                          <v-btn v-if="!a.isDefaultAddress" elevation="0" icon size="small">
                            <v-icon>mdi-home</v-icon>
                          </v-btn>
                          <v-btn elevation="0" icon size="small">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </div>
                      </template>

                      <div class="v-card-title"
                        style="font-size: 1rem; white-space: break-spaces; word-break: break-word;">
                        {{ a.rua }}{{ a.numero.length > 0 ? `, ${a.numero}` : "" }}
                      </div>

                      <v-card-subtitle style="white-space: break-spaces; word-break: break-word;">
                        {{ a.bairro }}, {{ a.cidade }}, {{ a.uf }} - {{ a.cep }}
                      </v-card-subtitle>
                    </v-card-item>
                  </v-list-item>
                  <v-divider v-if="index < addresses.length - 1"></v-divider>
                </template>
              </v-list>
            </v-card>
          </div>
          <div class="w-100 mt-2">
            <v-btn class="font-weight-regular button-color button-black mb-4" height="37px" width="100%" variant="flat"
              style="font-size: 0.8rem !important;">
              Adicionar Endereço
            </v-btn>
          </div>
        </div>

        <!-- Direita -->
        <div class="order-hist-container" style="flex: 1; padding: 0 !important;" elevation="0">
          <div>
            <div class="text-title text-overline text-center mb-5" style="font-size: 0.95rem !important;">
              <span>
                Histórico de Pedidos
              </span>
            </div>

            <v-data-table :class="{ 'keep-height': orders.length >= 4 }" :headers="headers" :items="orders"
              class="elevation-0" items-per-page="4">
              <template v-slot:headers="props">
                <tr>
                  <template v-for="(item, index) in props.headers[0]">
                    <th v-if="index === 0" class="pl-0">
                      {{ item.title }}
                    </th>
                    <th v-else-if="index === props.headers[0].length - 1" class="pr-0 text-end d-flex justify-end">
                      <v-menu v-model="showOrderByDropdown" offset="2">
                        <template v-slot:activator="{ props }">
                          <button
                            class="filter-desktop filter-button-container d-flex justify-end align-center w-100 h-100"
                            style="width: 150px; position: relative;">
                            <div class="filter-chevron-right-outwards" :class="{ 'active': showOrderByDropdown }">
                              <v-icon>mdi-chevron-left</v-icon>
                            </div>
                            Filtrar
                            <div class="h-100 w-100" style="position: absolute; left: 0;" v-bind="props"></div>
                          </button>
                        </template>

                        <v-list style="padding: 0 !important;" elevation="1" class="dropdown-orderby-list"
                          density="compact" :items="items">
                          <v-list-item :ripple="false" v-for="(item, index) in items" :key="index"
                            @click="selectedItem = index" :active="index == selectedItem">
                            <v-list-item-title>
                              <div class="w-100 h-100 text-end font-weight-regular" style="font-size: 0.8rem;">{{ item }}
                              </div>
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </th>
                    <th v-else class="text-center">
                      {{ item.title }}
                    </th>
                  </template>
                </tr>
              </template>

              <template v-slot:body="props" class="mobile-table">
                <tr v-for="item in props.items">
                  <template v-for="(field, index) in Object.keys(item)">
                    <td class="text-body-2" :class="{ 'pl-0': index === 0, 'text-center': index !== 0 }">
                      {{ item[field] }}
                    </td>
                  </template>

                  <td class="d-flex pr-0 td-last-item">
                    <!--  <v-btn elevation="0">
                      Ver Detalhes
                    </v-btn> -->
                    <v-btn elevation="0" class="font-weight-regular button-color button-black" variant="flat"
                      style="font-size: 0.72rem;">
                      Ver Detalhes
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const showOrderByDropdown = ref(false);
const selectedItem = ref(0);

const handleScroll = () => {
  showOrderByDropdown.value = false;
};

watch(showOrderByDropdown, (newValue) => {
  if (newValue) {
    window.addEventListener('scroll', handleScroll);
  }
  else {
    window.removeEventListener('scroll', handleScroll);
  }
});

const addresses = [{
  cep: "09271-620",
  rua: "Rua Etore Cataruzzi",
  numero: "3",
  bairro: "Capuava",
  cidade: "Santo André",
  uf: "SP",
  isDefaultAddress: true
},
{
  cep: "09260-840",
  rua: "Rua Júlio Atlas",
  numero: "171",
  bairro: "Jardim Itapoan",
  cidade: "Santo André",
  uf: "SP",
  isDefaultAddress: false
},
{
  cep: "09260-840",
  rua: "Rua Júlio Atlas",
  numero: "171",
  bairro: "Jardim Itapoan",
  cidade: "Santo André",
  uf: "SP",
  isDefaultAddress: false
},
{
  cep: "09260-840",
  rua: "Rua Júlio Atlas",
  numero: "171",
  bairro: "Jardim Itapoan",
  cidade: "Santo André",
  uf: "SP",
  isDefaultAddress: false
},
{
  cep: "09260-840",
  rua: "Rua Júlio AtlasRua Júlio AtlasRua Júlio AtlasRua Júlio AtlasRua Júlio AtlasRua Júlio AtlasRua Júlio AtlasRua J",
  numero: "171",
  bairro: "Jardim Itapoancccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
  cidade: "Santo André",
  uf: "SP",
  isDefaultAddress: false
}
];

const orders = [{
  orderId: "GROWTH-1041668-00022",
  date: "09/10/2023 00:20:00",
  price: "R$130,00",
  status: "Pedido enviado",
},
{
  orderId: "GROWTH-1041668-00022",
  date: "09/10/2023 00:20:00",
  price: "R$140,00",
  status: "Pedido recebido",
},
{
  orderId: "GROWTH-1041668-00022",
  date: "09/10/2023 00:20:00",
  price: "R$120,00",
  status: "Pedido recebido",
},
{
  orderId: "GROWTH-1041668-00022",
  date: "09/10/2023 00:20:00",
  price: "R$110,00",
  status: "Pedido recebido",
},
{
  orderId: "GROWTH-1041668-00022",
  date: "09/10/2023 00:20:00",
  price: "R$100,00",
  status: "Pedido recebido",
},
{
  orderId: "GROWTH-1041668-00022",
  date: "09/10/2023 00:20:00",
  price: "R$100,00",
  status: "Pedido recebido",
},
{
  orderId: "GROWTH-1041668-00022",
  date: "09/10/2023 00:20:00",
  price: "R$100,00",
  status: "Pedido recebido",
}];

const headers = [
  {
    title: 'Código do Pedido',
    align: 'start',
    sortable: false,
    key: 'orderId',
  },
  { title: 'Data Compra', align: 'center', key: 'date', sortable: false },
  { title: 'Valor', align: 'center', key: 'price', sortable: false },
  { title: 'Status', align: 'center', key: 'status', sortable: false },
  { title: 'Item', align: 'end', key: 'actions', sortable: false },
];

const items = [`Maior Preço`, `Menor Preço`, `Nossa Seleção`];

</script>

<style lang="scss">
@import "@/styles/global.scss";

.addresses-card-list {
  padding: 0 !important;

  .v-list-item {
    padding: 0 !important;
  }
}

.v-data-table-footer__items-per-page {
  display: none !important;
}

.v-data-table-column--align-start {
  padding-left: 0 !important;
  text-align: start !important;
}

.v-data-table-column--align-end {
  padding-right: 0 !important;
  text-align: end !important;
}

thead {
  font-size: 0.8rem;
}

.v-data-table-footer__info {
  font-size: 0.8rem;
  opacity: 0.8;
}

.v-data-table-header__content {
  i {
    opacity: 1 !important;
  }
}

.filter-chevron-right-outwards {
  transform: rotate(0) translateY(-0.5px);
  transition: transform 0.3s ease-in-out;

  &.active {
    transform: rotate(-90deg) translateX(-1px);
  }
}

table {
  padding: 10px 0;

  th {
    height: 50px !important;
  }

  tbody {
    tr {
      .td-last-item {
        display: flex;
        align-items: center;
        justify-content: end;
      }
    }
  }

  @media (max-width: $tablet) {
    padding: 0 !important;

    tbody {
      tr {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding-top: 14px;
        padding-bottom: 25px;
        border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));

        td {
          display: flex;
          padding: 0 !important;
          border-bottom: 0 !important;
          text-align: start !important;
          justify-content: center !important;
          align-items: center !important;
          height: 28px !important;
        }

        .td-last-item {
          margin-top: 15px;
          justify-content: center;
          height: 35px !important;
        }

        &:last-child {
          border-bottom: 0 !important;
        }
      }
    }
  }
}

thead {
  @media (max-width: $tablet) {
    display: none;
  }
}

.mobile-table {
  @media (max-width: $tablet) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
}

.adress-card-item {
  @media (max-width: $tablet) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    text-align: center !important;
    padding-top: 14px !important;

    .v-card-subtitle {
      transform: translateY(-4px);
      padding: 0 !important;
    }

    .v-card-item__append {
      padding: 0 !important;
    }
  }
}

.order-hist-container {}

.keep-height {
  min-height: 327px;

  @media (max-width: $tablet) {
    min-height: 856px !important;
  }
}

.text-title {
  width: 100%;
  border-bottom: 1px solid #111111;
  line-height: 0.1em;
  margin: 10px 0 20px;

  span {
    background: #fff;
    padding: 0 10px;
  }
}
</style>
