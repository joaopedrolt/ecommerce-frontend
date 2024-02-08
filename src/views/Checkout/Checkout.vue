<template>
  <div class="h-100 w-100">
    <!-- Left side -->
    <div class="d-flex justify-end h-100 pt-12 pb-1 px-9 border-right" style="width: 55%;">
      <div class="d-flex flex-column w-100" style="max-width: 700px;">
        <div>
          <!-- Header Left -->
          <div class="mb-6">
            <div style="height: 33px; width: 160px;">
              <v-img class="h-100 w-100" src="/logo.svg"></v-img>
            </div>
            <div>
              <v-breadcrumbs class="pl-0 text-subtitle-2 font-weight-regular" :items="items">
                <template v-slot:divider>
                  <v-icon icon="mdi-chevron-right"></v-icon>
                </template>
              </v-breadcrumbs>
            </div>
          </div>

          <!-- Form -->
          <v-form>
            <!-- Form Top -->
            <div class="mb-5">
              <!-- Form Top - Top -->
              <div class="mb-5">
                <div class="text-h6 font-weight-regular">
                  Informações para Contato
                </div>
                <div class="d-flex align-center">
                  <div class="text-subtitle-2 font-weight-regular mr-1 mt-1" style="opacity: 0.6;">
                    Já é nosso cliente? Pule esta etapa!
                  </div>
                  <a class="font-weight-regular text-subtitle-2 text-decoration-underline mt-1">
                    Clique aqui para fazer login agora!
                  </a>
                </div>
              </div>
              <!-- class="mb-3" hide-details-->
              <v-text-field label="E-mail" variant="outlined" density="comfortable">
              </v-text-field>
              <!-- class="mb-5" hide-details-->
              <v-text-field label="Telefone" variant="outlined" density="comfortable">
              </v-text-field>

              <!-- Form Top - Bottom  -->
              <div class="mb-1" style="font-size: 0.9rem !important;">
                <div>
                  <v-checkbox density="compact" hide-details>
                    <template v-slot:label>
                      <div class="d-flex text-subtitle-2 font-weight-regular mr-1 pl-1" style="margin-top: 0.04rem; opacity: 1 !important;">
                        Enviar novidades e ofertas para mim por e-mail
                      </div>
                    </template>
                  </v-checkbox>
                </div>
                <div>
                  <v-checkbox density="compact" hide-details>
                    <template v-slot:label>
                      <div class="text-subtitle-2 font-weight-regular pl-1" style="margin-top: 0.04rem;">
                        Quero receber descontos e novidades por WhatsApp
                      </div>
                    </template>
                  </v-checkbox>
                </div>
              </div>
            </div>

            <!-- Form mid -->
            <div>
              <div class="text-h6 font-weight-regular mb-4">
                Endereço de Entrega
              </div>

              <div class="mb-5">
                <div class="d-flex" style="gap: 15px">
                  <v-text-field label="Nome" variant="outlined" density="comfortable">
                  </v-text-field>

                  <v-text-field label="Sobrenome" variant="outlined" density="comfortable">
                  </v-text-field>
                </div>

                <v-text-field label="CPF" variant="outlined" density="comfortable">
                </v-text-field>

                <template v-if="displayAddress">

                  <div class="d-flex" style="gap: 15px">
                    <v-text-field style="flex: 2" label="Rua" variant="outlined" density="comfortable">
                    </v-text-field>

                    <v-text-field style="flex: 1" label="Número" variant="outlined" density="comfortable">
                    </v-text-field>
                  </div>

                  <div class="d-flex" style="gap: 15px">
                    <v-text-field label="Bairro" variant="outlined" density="comfortable">
                    </v-text-field>

                    <v-text-field label="Complemento" variant="outlined" density="comfortable">
                    </v-text-field>
                  </div>

                  <div class="d-flex" style="gap: 15px">
                    <v-text-field style="flex: 3" label="Cidade" variant="outlined" density="comfortable">
                    </v-text-field>

                    <v-text-field style="flex: 2" label="Estado" variant="outlined" density="comfortable">
                    </v-text-field>
                  </div>
                </template>

                <v-text-field label="CEP" variant="outlined" density="comfortable">
                </v-text-field>

                <v-checkbox density="compact" hide-details>
                  <template v-slot:label>
                    <div class="text-subtitle-2 font-weight-regular pl-1" style="margin-top: 0.04rem;">
                      Salvar minhas informações para a próxima vez
                    </div>
                  </template>
                </v-checkbox>
              </div>
            </div>

            <!-- Form Bottom -->
            <div class="d-flex justify-space-between align-center">
              <!-- <div><v-icon icon="mdi-chevron-left"></v-icon>Voltar ao carrinho</div> -->
              <!--  <div>Continuar com o frete</div> -->

              <v-btn @click="displayAddress = true" class="text-subtitle-1 font-weight-regular button-color button-black"
                color="#111111" height="45px" width="100%" variant="flat" :ripple="false">
                Continuar com o frete
              </v-btn>
            </div>
          </v-form>

          <!-- Footer Left -->
          <div class="mt-15">
            <v-divider color="#111111"></v-divider>

            <div class="text-caption pr-10 justify-center">
              <v-breadcrumbs style="justify-content: center !important;" :items="itemsBaseboardLinks" divider="-" />
            </div>
          </div>
        </div>


      </div>
    </div>

    <!-- Right Side -->
    <div class="d-flex justify-start px-9 h-100 py-12" style="position: fixed; width: 45%; right: 0; top: 0;">
      <!-- Edit Cart - Top -->
      <div class="h-100 w-100" style="max-width: 513px;">
        <div class="w-100 d-flex justify-end">
          <div class="text-caption text-end text-decoration-underline font-weight-regular">
            Editar carrinho
          </div>
        </div>

        <!-- Cart Itens -->
        <div class="d-flex pb-4 pt-3">
          <div style="height: 90px; width: 90px;">
            <v-img class="h-100 w-100" style="border-radius: 10px;"
              src="https://cdn.shopify.com/s/files/1/0526/4123/5093/files/1_d99de45e-9f94-4fbb-a3bf-13cdf2a7373e_small.jpg?v=1700691687"></v-img>
          </div>

          <div class="d-flex w-100 justify-space-between">
            <div class="d-flex flex-column justify-center ml-4">
              <div class="font-weight-bold">
                Tech T-Shirt
              </div>
              <div class="text-subtitle-2 font-weight-light">
                Preta / PP
              </div>
            </div>

            <div class="text-subtitle-2 font-weight-regular d-flex align-center">
              R$ 159,00
            </div>
          </div>
        </div>

        <v-divider color="#111111"></v-divider>

        <div class="d-flex flex-column py-6" style="gap: 4px;">
          <div class="d-flex justify-space-between text-subtitle-2 font-weight-regular px-1">
            <div>Subtotal:</div>
            <div class="font-weight-regular">R$3600</div>
          </div>

          <div class="d-flex justify-space-between text-subtitle-2 font-weight-regular px-1">
            <div>Frete:</div>
            <div class="font-weight-regular">R$40</div>
          </div>

          <div class="d-flex justify-space-between text-subtitle-2 font-weight-regular px-1">
            <div>Desconto:</div>
            <div class="font-weight-regular">-- R$300</div>
          </div>
        </div>

        <v-divider color="#111111"></v-divider>

        <div class="d-flex align-center justify-space-between px-1 pt-4">
          <div style="margin-top: 1px;">Total:</div>
          <div class="text-h6 font-weight-regular ">R$ 3340,00</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = [
  {
    title: 'Carrinho',
    disabled: false,
    href: 'breadcrumbs_dashboard',
  },
  {
    title: 'Informações',
    disabled: false,
    href: 'breadcrumbs_link_1',
  },
  {
    title: 'Frete',
    disabled: true,
    href: 'breadcrumbs_link_2',
  },
  {
    title: 'Pagamento',
    disabled: true,
    href: 'breadcrumbs_link_2',
  },
]

const itemsBaseboardLinks = [
  {
    title: "Política de reembolso",
    disabled: false,
    href: "breadcrumbs_dashboard",
  },
  {
    title: "Política de frete",
    disabled: false,
    href: "breadcrumbs_dashboard",
  },
  {
    title: "Política de privacidade",
    disabled: false,
    href: "breadcrumbs_dashboard",
  },
  {
    title: "Termos de serviço",
    disabled: false,
    href: "breadcrumbs_dashboard",
  }
];

const displayAddress = ref(false);
</script>

<style lang="scss">
@import "@/styles/global.scss";

/* .v-label .v-field-label .v-field-label--floating {
  font-size: 0.9rem !important;
} */

/* .v-field__field {
  .v-label.v-field-label {
    font-size: 0.9rem !important;
  }
} */

.v-checkbox .v-selection-control {
  min-height: 31px !important;
  height: 31px !important;
}

.v-text-field input {
  font-size: 0.9rem;
}

.v-breadcrumbs-item {
  padding-left: 0 !important;
}

.border-right {
  border-right: 1px solid $color-border;
}
</style>
  