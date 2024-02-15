<template>
  <div class="h-100 w-100 checkout">
    <!-- Left side -->
    <div class="left-side border-right">
      <div class="wrapper">
        <!-- Header Left -->
        <div class="payment-header desktop mb-6">
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

        <v-form ref="shippingForm" validate-on="layz" :disabled="isLoading">
          <div class="mb-6">
            <div class="mb-5">
              <div class="text-h5 font-weight-regular">
                Contato
              </div>
              <div style="word-break: break-word;">
                <span class="text-subtitle-2 font-weight-regular mr-1 mt-1" style="opacity: 0.6;">
                  Já é nosso cliente? Pule esta etapa!
                </span>
                <a class="font-weight-regular text-subtitle-2 text-decoration-underline mt-1">
                  Clique aqui para fazer login agora!
                </a>
              </div>
            </div>
            <v-text-field :model="shipping.email" :rules="emailRules" label="E-mail" variant="outlined"
              density="comfortable">
            </v-text-field>
            <validation-filler :active="!shippingFormValidation.email" density="compact" />

            <v-text-field :model="shipping.telefone" v-maska:[telefoneMask] :rules="telefoneRules" label="Telefone"
              variant="outlined" density="comfortable">
            </v-text-field>
            <validation-filler :active="!shippingFormValidation.telefone" density="compact" />

            <div class="mb-1" style="font-size: 0.9rem !important;">
              <div>
                <v-checkbox :model="shipping.newsletter" density="compact" hide-details>
                  <template v-slot:label>
                    <div class="d-flex text-subtitle-2 font-weight-regular mr-1 pl-1"
                      style="margin-top: 0.04rem; opacity: 1 !important;">
                      Enviar novidades e ofertas para mim por e-mail
                    </div>
                  </template>
                </v-checkbox>
              </div>
              <div>
                <v-checkbox :model="shipping.wpp" density="compact" hide-details>
                  <template v-slot:label>
                    <div class="text-subtitle-2 font-weight-regular pl-1" style="margin-top: 0.04rem;">
                      Quero receber descontos e novidades por WhatsApp
                    </div>
                  </template>
                </v-checkbox>
              </div>
            </div>
          </div>
          <div>
            <div class="text-h5 font-weight-regular mb-4">
              Endereço de Entrega
            </div>

            <div class="mb-5">
              <div class="parent-input-container">
                <div class="d-flex flex-column" style="flex: 1;">
                  <v-text-field class="sibling-input" :model="shipping.nome" :rules="nomeRules" label="Nome"
                    variant="outlined" density="comfortable">
                  </v-text-field>
                  <validation-filler :active="!shippingFormValidation.nome" density="compact" />
                </div>

                <div class="d-flex flex-column" style="flex: 1;">
                  <v-text-field class="sibling-input" :model="shipping.sobrenome" :rules="sobrenomeRules"
                    label="Sobrenome" variant="outlined" density="comfortable">
                  </v-text-field>
                  <validation-filler :active="!shippingFormValidation.sobrenome" density="compact" />
                </div>
              </div>

              <v-text-field :model="shipping.cpf" v-maska:[cpfMask] :rules="cpfRules" label="CPF" variant="outlined"
                density="comfortable">
              </v-text-field>
              <validation-filler :active="!shippingFormValidation.cpf" density="compact" />

              <template v-if="!displayAdressForm">
                <div class="parent-input-container">
                  <div class="d-flex flex-column" style="flex: 2;">
                    <v-text-field class="sibling-input" :model="shipping.endereco" :rules="enderecoRules" label="Endereco"
                      variant="outlined" density="comfortable">
                    </v-text-field>
                    <validation-filler :active="!shippingFormValidation.endereco" density="compact" />
                  </div>

                  <div class="d-flex flex-column" style="flex: 1;">
                    <v-text-field class="sibling-input" :model="shipping.numero" :rules="numeroRules" label="Número"
                      variant="outlined" density="comfortable">
                    </v-text-field>
                    <validation-filler :active="!shippingFormValidation.numero" density="compact" />
                  </div>
                </div>

                <div class="parent-input-container">
                  <div class="d-flex flex-column" style="flex: 2;">
                    <v-text-field class="sibling-input" :model="shipping.bairro" label="Bairro" :rules="bairroRules"
                      variant="outlined" density="comfortable">
                    </v-text-field>
                    <validation-filler :active="!shippingFormValidation.bairro" density="compact" />
                  </div>

                  <div class="d-flex flex-column" style="flex: 1;">
                    <v-text-field class="sibling-input" :model="shipping.complemento" label="Complemento"
                      variant="outlined" density="comfortable">
                    </v-text-field>
                    <validation-filler :active="!shippingFormValidation.complemento" density="compact" />
                  </div>
                </div>

                <div class="parent-input-container">
                  <div class="d-flex flex-column" style="flex: 3;">
                    <v-text-field class="sibling-input" :model="shipping.cidade" label="Cidade" :rules="cidadeRules"
                      variant="outlined" density="comfortable">
                    </v-text-field>
                    <validation-filler :active="!shippingFormValidation.cidade" density="compact" />
                  </div>

                  <div class="d-flex flex-column" style="flex: 2;">
                    <v-text-field class="sibling-input" :model="shipping.estado" label="Estado" variant="outlined"
                      density="comfortable">
                    </v-text-field>
                    <validation-filler :active="!shippingFormValidation.estado" density="compact" />
                  </div>
                </div>
              </template>

              <v-text-field :model="shipping.cep" v-maska:[cepMask] numberMask :rules="cepRules" label="CEP"
                variant="outlined" density="comfortable">
              </v-text-field>
              <validation-filler :active="!shippingFormValidation.cep" density="compact" />

              <v-checkbox :model="shipping.save" density="compact" hide-details>
                <template v-slot:label>
                  <div class="text-subtitle-2 font-weight-regular pl-1" style="margin-top: 0.04rem;">
                    Salvar minhas informações para a próxima vez
                  </div>
                </template>
              </v-checkbox>
            </div>
          </div>

          <div class="d-flex justify-space-between align-center">
            <v-btn @click="calculateShippingCost()" class="text-subtitle-1 font-weight-regular button-color button-black"
              color="#111111" height="45px" width="100%" variant="flat" :ripple="false" :loading="isLoading">
              Continuar com o frete
            </v-btn>
          </div>
        </v-form>

        <!-- Footer Left -->
        <div class="payment-footer mt-13">
          <v-divider color="#111111"></v-divider>
          <v-breadcrumbs class="text-caption text-center justify-center" style="justify-content: center !important;"
            :items="itemsBaseboardLinks" divider="-" />
        </div>
      </div>
    </div>

    <!-- Right Side -->
    <div class="right-side">
      <!-- Edit Cart - Top -->
      <div class="wrapper">
        <div class="payment-header mobile mb-7">
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

        <div class="top-summary w-100">
          <div class="order-summery text-h5 font-weight-regular mb-2">
            Resumo do Pedido
          </div>

          <div class="edit-cart text-caption text-end text-decoration-underline font-weight-regular">
            Editar carrinho
          </div>
        </div>

        <!-- Cart Itens -->
        <div class="cart-itens">
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

        <div class="order-sum d-flex flex-column" style="gap: 4px;">
          <div class="d-flex justify-space-between text-subtitle-2 font-weight-regular">
            <div>Subtotal:</div>
            <div class="font-weight-regular">R$3600</div>
          </div>

          <div class="d-flex justify-space-between text-subtitle-2 font-weight-regular">
            <div>Frete:</div>
            <div class="font-weight-regular">R$40</div>
          </div>

          <div class="d-flex justify-space-between text-subtitle-2 font-weight-regular">
            <div>Desconto:</div>
            <div class="font-weight-regular">-R$300</div>
          </div>
        </div>

        <v-divider color="#111111"></v-divider>

        <div class="d-flex align-center justify-space-between pt-4">
          <div style="margin-top: 1px;">Total:</div>
          <div class="text-h6 font-weight-regular ">R$ 3340,00</div>
        </div>

        <!--  <div class="payment-footer mobile" style="position: absolute; bottom: 0; right: 0; left: 0;">
          <v-divider color="#111111"></v-divider>

          <div class="text-caption justify-center text-center">
            <v-breadcrumbs style="justify-content: center !important;" :items="itemsBaseboardLinks" divider="-" />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { vMaska } from "maska"

import {
  nomeRules,
  sobrenomeRules,
  emailRules,
  cpfRules,
  cepRules,
  telefoneRules,
  bairroRules,
  cidadeRules,
  enderecoRules,
  numeroRules,
  complementoRules,
} from "@/utils/rules";

import {
  cpfMask,
  cepMask,
  telefoneMask
} from "@/utils/masks";

import ValidationFiller from '@/components/ValidationFiller.vue';

const isLoading = ref(false);
const shippingForm = ref();
const displayAdressForm = ref(false);

const shipping = reactive({
  email: "",
  telefone: "",
  newsletter: true,
  wpp: true,
  nome: "",
  sobrenome: "",
  cpf: "",
  endereco: "",
  numero: "",
  bairro: "",
  complemento: "",
  cidade: "",
  estado: "",
  cep: "",
  save: true
});

const shippingFormValidation = reactive({
  email: true,
  telefone: true,
  newsletter: true,
  wpp: true,
  nome: true,
  sobrenome: true,
  cpf: true,
  endereco: true,
  numero: true,
  bairro: true,
  complemento: true,
  cidade: true,
  estado: true,
  cep: true,
  save: true
});

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

const setLoading = (load) => {
  isLoading.value = load;
}

const calculateShippingCost = async () => {
  setLoading(true);

  let valid = true;
  let keys = Object.keys(shipping);

  console.log(shippingForm.value.items)

  for (let i = 0; i < shippingForm.value.items.length; i++) {
    let mensagemErro = await shippingForm.value.items[i].validate()

    if (mensagemErro.length > 0) {
      shippingFormValidation[keys[i]] = false;
      if (valid)
        valid = false;
    }
    else
      shippingFormValidation[keys[i]] = true;
  }

  if (valid)
    displayAdressForm.value = true;

  console.log(shippingFormValidation)

  setLoading(false);
}
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

.checkout {
  display: flex;

  .left-side {
    display: flex;
    width: 55%;
    justify-content: end;
    height: 100%;
    padding-top: 40px;
    padding-right: 36px;
    padding-left: 36px;
    padding-bottom: 4px;

    .wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      max-width: 700px;

      .parent-input-container {
        display: flex;
        gap: 10px;

        .sibling-input {
          max-height: 70px !important;
          min-width: 223px !important;
        }

        @media (max-width: $phone) {
          flex-direction: column;
          gap: 0 !important;
        }
      }
    }
  }

  .right-side {
    display: flex;
    justify-content: start;
    height: 100%;
    position: fixed;
    width: 45%;
    right: 0;
    top: 0;
    padding-top: 40px;
    padding-bottom: 36px;
    padding-right: 36px;
    padding-left: 36px;

    .wrapper {
      height: 100%;
      width: 100%;
      max-width: 513px;

      .cart-itens {
        display: flex;
        padding-top: 13px;
        padding-bottom: 16px;
      }

      .order-sum {
        padding: 18px 0;
      }

      .order-summery {
        display: none;
      }
    }
  }

  @media (max-width: $tablet) {
    flex-direction: column-reverse;

    .left-side {
      display: flex;
      width: 100%;
      justify-content: center;
      padding-left: 10px !important;
      padding-right: 10px !important;
      padding-top: 32px !important;

      .wrapper {
        max-width: none !important;

        /*       .payment-footer {
          .v-breadcrumbs {
            padding-right: 12px !important;
          }
        } */
      }
    }

    .right-side {
      display: flex;
      justify-content: center;
      height: 100%;
      width: 100%;
      position: relative;
      right: auto;
      top: auto;
      padding-bottom: 0 !important;
      padding-left: 10px !important;
      padding-right: 10px !important;

      .wrapper {
        max-width: none !important;

        .order-summery {
          display: block !important;
        }

        .order-sum {
          padding: 13px 0 !important;
        }

        .edit-cart {
          display: none !important;
        }

        .cart-itens {
          padding-top: 0 !important;
          padding-bottom: 13px !important;
        }
      }
    }
  }

  .payment-header {
    &.desktop {
      display: block !important;

      @media (max-width: $tablet) {
        display: none !important;
      }
    }

    &.mobile {
      display: block !important;

      @media (min-width: $tablet) {
        display: none !important;
      }
    }
  }
}
</style>
  