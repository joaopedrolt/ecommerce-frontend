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
            <div class="text-center text-overline" style="font-size: 0.9rem !important;">
              Endereços
            </div>

            <v-card elevation="0">
              <v-list class="addresses-card-list">
                <template v-for="(a, index) in addresses" :key="index">
                  <v-list-item>
                    <v-card-item class="px-0">
                      <div v-if="a.isDefaultAddress" class="v-card-subtitle" style="margin-top: 3px; padding: 0;">
                        <v-icon>mdi-home</v-icon> Endereço Principal
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

                      <div class="v-card-title" style="font-size: 1rem;">
                        {{ a.rua }}{{ a.numero.length > 0 ? `, ${a.numero}` : "" }}
                      </div>

                      <v-card-subtitle>
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
            <v-btn class="text-subtitle-1 font-weight-regular button-color button-black mb-4" height="37px" width="100%"
              variant="flat">
              Adicionar Endereço
            </v-btn>
          </div>
        </div>

        <!-- Direita -->
        <div style="flex: 1; padding: 0 !important; min-height: 420px;" elevation="0">
          <div>
            <div class="text-overline text-center" style="font-size: 0.9rem !important;">
              Histórico de Pedidos
            </div>

            <v-data-table :headers="headers" :items="orders" class="elevation-0" items-per-page="4">
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
  rua: "Rua Júlio Atlas",
  numero: "171",
  bairro: "Jardim Itapoan",
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
</style>
