<template>
  <div v-if="render" class="h-100 w-100 checkout">
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
              <template v-slot:title="{ item }">
                <div @click="handleBreadcrumbClick(item.step)">
                  {{ item.title }}
                </div>
              </template>
            </v-breadcrumbs>
          </div>
        </div>

        <!-- SE FRETE / PAGAMENTO -->
        <div v-if="step == 1 || step == 2" class="mb-8">
          <div class="text-h5 font-weight-regular mb-5">
            Destinatário
          </div>

          <div>
            <div class="d-flex flex-column">
              <div class="shipping-sumery d-flex flex-column text-subtitle-2 font-weight-regular">
                <div class="d-flex justify-center-between w-100 pb-4">
                  <div class="d-flex flex-column w-100" style="gap: 8px">
                    <div class="d-flex align-center">
                      <v-icon class="mr-4">mdi-account</v-icon>
                      <div>João Pedro</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-icon class="mr-4">mdi-id-card</v-icon>
                      <div>571.421.538-90</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-icon class="mr-4">mdi-phone</v-icon>
                      <div>(11) 97694-1524</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-icon class="mr-4">mdi-email</v-icon>
                      <div>{{ shippingStore.email }}</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-icon class="mr-4">mdi-map-marker</v-icon>
                      <div>Rua Etore Cataruzzi 3, Jardin Rina, 09271-620</div>
                    </div>
                  </div>

                  <div class="d-flex align-center justify-end text-decoration-underline pb-7"
                    style="width: 100px; cursor: pointer;">
                    Alterar
                  </div>
                </div>

                <template v-if="step == 2">
                  <v-divider color="111111"></v-divider>

                  <div class="d-flex justify-center-between w-100 pt-4">
                    <div class="d-flex flex-column w-100" style="gap: 8px">
                      <div class="d-flex align-center" style="padding-left: 2px;">
                        <v-icon class="mr-4">mdi-truck</v-icon>
                        <div style="margin-left: -2px;">Sedex - <span>RS20,00</span>
                        </div>
                      </div>
                    </div>

                    <div class="d-flex align-center justify-end text-decoration-underline"
                      style="width: 100px; cursor: pointer;">
                      Alterar
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

        <v-window v-model="step">
          <v-window-item :value="0">
            <v-form ref="shippingForm" validate-on="layz" :disabled="isShippingFormLoading">
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
                <v-text-field id="email" :model="shipping.email" :rules="emailRules" label="E-mail" variant="outlined"
                  density="comfortable">
                </v-text-field>
                <validation-filler :active="shippingFormValidation.email" density="compact" />

                <v-text-field id="telefone" :model="shipping.telefone" v-maska:[telefoneMask] :rules="telefoneRules"
                  label="Telefone" variant="outlined" density="comfortable">
                </v-text-field>
                <validation-filler :active="shippingFormValidation.telefone" density="compact" />

                <div class="mb-1" style="font-size: 0.9rem !important;">
                  <div>
                    <v-checkbox id="newsletter" :model="shipping.newsletter" density="compact" hide-details>
                      <template v-slot:label>
                        <div class="d-flex text-subtitle-2 font-weight-regular mr-1 pl-1"
                          style="margin-top: 0.04rem; opacity: 1 !important;">
                          Enviar novidades e ofertas para mim por e-mail
                        </div>
                      </template>
                    </v-checkbox>
                  </div>
                  <div>
                    <v-checkbox id="wpp" :model="shipping.wpp" density="compact" hide-details>
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
                      <v-text-field id="nome" class="sibling-input" :model="shipping.nome" :rules="nomeRules"
                        label="Nome" variant="outlined" density="comfortable">
                      </v-text-field>
                      <validation-filler :active="shippingFormValidation.nome" density="compact" />
                    </div>

                    <div class="d-flex flex-column" style="flex: 1;">
                      <v-text-field id="sobrenome" class="sibling-input" :model="shipping.sobrenome"
                        :rules="sobrenomeRules" label="Sobrenome" variant="outlined" density="comfortable">
                      </v-text-field>
                      <validation-filler :active="shippingFormValidation.sobrenome" density="compact" />
                    </div>
                  </div>

                  <v-text-field id="cpf" :model="shipping.cpf" v-maska:[cpfMask] :rules="cpfRules" label="CPF"
                    variant="outlined" density="comfortable">
                  </v-text-field>
                  <validation-filler :active="shippingFormValidation.cpf" density="compact" />

                  <template v-if="displayAddressPartialForm">
                    <div class="parent-input-container">
                      <div class="d-flex flex-column" style="flex: 2;">
                        <v-text-field id="endereco" class="sibling-input" :model="shipping.endereco"
                          :rules="enderecoRules" label="Endereco" variant="outlined" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="shippingFormValidation.endereco" density="compact" />
                      </div>

                      <div class="d-flex flex-column" style="flex: 1;">
                        <v-text-field id="numero" class="sibling-input" :model="shipping.numero" :rules="numeroRules"
                          label="Número" variant="outlined" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="shippingFormValidation.numero" density="compact" />
                      </div>
                    </div>

                    <div class="parent-input-container">
                      <div class="d-flex flex-column" style="flex: 2;">
                        <v-text-field id="bairro" class="sibling-input" :model="shipping.bairro" label="Bairro"
                          :rules="bairroRules" variant="outlined" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="shippingFormValidation.bairro" density="compact" />
                      </div>

                      <div class="d-flex flex-column" style="flex: 1;">
                        <v-text-field id="complemento" class="sibling-input" :model="shipping.complemento"
                          label="Complemento" variant="outlined" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="shippingFormValidation.complemento" density="compact" />
                      </div>
                    </div>

                    <div class="parent-input-container">
                      <div class="d-flex flex-column" style="flex: 3;">
                        <v-text-field id="cidade" class="sibling-input" :model="shipping.cidade" label="Cidade"
                          :rules="cidadeRules" variant="outlined" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="shippingFormValidation.cidade" density="compact" />
                      </div>

                      <div class="d-flex flex-column" style="flex: 2;">
                        <v-autocomplete id="estado" class="sibling-input" item-title="nome" item-value="id"
                          :rules="estadoRules" return-object :model="shipping.estado" label="Estado" :items="estados"
                          variant="outlined" density="comfortable">
                        </v-autocomplete>
                        <validation-filler :active="shippingFormValidation.estado" density="compact" />
                      </div>
                    </div>
                  </template>

                  <v-text-field id="cep" :model="shipping.cep" v-maska:[cepMask] numberMask :rules="cepRules"
                    label="CEP" variant="outlined" density="comfortable">
                  </v-text-field>
                  <validation-filler :active="shippingFormValidation.cep" density="compact" />

                  <v-checkbox id="save" :model="shipping.save" density="compact" hide-details>
                    <template v-slot:label>
                      <div class="text-subtitle-2 font-weight-regular pl-1" style="margin-top: 0.04rem;">
                        Salvar minhas informações para a próxima vez
                      </div>
                    </template>
                  </v-checkbox>
                </div>
              </div>

              <div class="d-flex justify-space-between align-center">
                <v-btn v-if="!displayAddressPartialForm" @click="calculateShippingCost()"
                  class="text-subtitle-1 font-weight-regular button-color button-black" color="#111111" height="45px"
                  width="100%" variant="flat" :ripple="false" :loading="isShippingFormLoading">
                  Continuar
                </v-btn>
                <v-btn v-else @click="calculateShippingCost()"
                  class="text-subtitle-1 font-weight-regular button-color button-black" color="#111111" height="45px"
                  width="100%" variant="flat" :ripple="false" :loading="isShippingFormLoading">
                  Continuar
                </v-btn>
              </div>
            </v-form>
          </v-window-item>

          <v-window-item :value="1">
            <div>
              <!-- Destinatario -->
              <div>
                <div class="text-h5 font-weight-regular">
                  Escolha o Frete
                </div>

                <v-radio-group class="frete-ratio" hide-details v-model="freteOption" density="compact">
                  <v-radio value="one">
                    <template v-slot:label="{ items }">
                      <div class="d-flex flex-column w-100 h-100 ml-1">
                        <div class="w-100 d-flex justify-space-between font-weight-medium" style="font-size: 0.9rem;">
                          <div>Sedex</div>
                        </div>
                        <div class="w-100 text-subtitle-2 font-weight-regular">
                          7 dias úteis
                        </div>
                      </div>

                      <div class="d-flex text-subtitle-2 align-flex font-weight-regular" style="word-break: keep-all;">
                        GRATIS
                      </div>
                    </template>
                  </v-radio>
                  <v-radio value="2">
                    <template v-slot:label="{ items }">
                      <div class="d-flex flex-column w-100 h-100 ml-1">
                        <div class="w-100 d-flex justify-space-between font-weight-medium" style="font-size: 0.9rem;">
                          <div>Total Express</div>
                        </div>
                        <div class="w-100 text-subtitle-2 font-weight-regular">
                          7 dias úteis
                        </div>
                      </div>

                      <div class="d-flex text-subtitle-2 align-flex font-weight-regular"
                        style="word-break: keep-all; white-space: nowrap;">
                        R$ 16,00
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </div>
            </div>
          </v-window-item>

          <v-window-item :value="2">
            <!-- Destinatario -->
            <div class="text-h5 font-weight-regular">
              Forma de Pagamento
            </div>
            <div>
              <v-list class="frete-ratio" v-model:opened="paymentMethodRatio" open-strategy="single" eager>
                <v-list-group value="card">
                  <template v-slot:activator="{ isOpen, props }">
                    <v-list-item :ripple="false" v-bind="props">

                      <v-list-item-title>
                        <div class="d-flex align-center">
                          <div class="d-flex align-center" style="width: 28px; height: 28px; margin-top: 0.35rem;">
                            <v-radio :model-value="isOpen" density="compact"></v-radio>
                          </div>
                          <div class="d-flex align-center ml-2 font-weight-medium py-2" style="font-size: 0.9rem;
                            -webkit-user-select: none; 
                            -ms-user-select: none; 
                             user-select: none;">
                            Cartão de Crédito
                          </div>
                        </div>
                      </v-list-item-title>

                      <template v-slot:append="{ }">
                        <v-icon class="ml-2">mdi-credit-card-outline</v-icon>
                      </template>
                    </v-list-item>
                  </template>
                  <v-list-item>
                    <div class="w-100 h-100 d-flex flex-column justify-center align-center text-center px-2 py-9">
                      <img style="filter: grayscale(100%); margin-bottom: 1.7em; width: 195px; height: 150px;"
                        src="https://http2.mlstatic.com/storage/v1/plugins/spfy-midas-transparent/assets/6f2e6e1055c5e098ae20.png" />
                      <div class="text-subtitle-2 font-weight-regular" style="max-width: 500px">Depois de clicar em
                        "Finalizar a compra", você verá
                        o QR Code para fazer o pagamento instantâneo.
                      </div>
                    </div>
                  </v-list-item>
                </v-list-group>

                <v-divider color="111111"></v-divider>

                <v-list-group value="pix">
                  <template v-slot:activator="{ isOpen, props }">
                    <v-list-item :ripple="false" v-bind="props">

                      <v-list-item-title>
                        <div class="d-flex align-center">
                          <div class="d-flex align-center" style="width: 28px; height: 28px; margin-top: 0.4rem;">
                            <v-radio :model-value="isOpen" density="compact"></v-radio>
                          </div>
                          <div class="d-flex align-center ml-2 font-weight-medium py-2" style="font-size: 0.9rem;
                            -webkit-user-select: none; 
                            -ms-user-select: none; 
                             user-select: none;">
                            Pix
                          </div>
                        </div>
                      </v-list-item-title>

                      <template v-slot:append="{ }">
                        <v-icon class="ml-2">mdi-qrcode</v-icon>
                      </template>
                    </v-list-item>
                  </template>
                  <v-list-item>
                    <div class="w-100 h-100 d-flex flex-column justify-center align-center text-center px-2 py-9">
                      <img style="filter: grayscale(100%); margin-bottom: 1.7em; width: 195px; height: 150px;"
                        src="https://http2.mlstatic.com/storage/v1/plugins/spfy-midas-transparent/assets/6f2e6e1055c5e098ae20.png" />
                      <div class="text-subtitle-2 font-weight-regular" style="max-width: 500px">Depois de clicar em
                        "Finalizar a compra", você verá
                        o QR Code para fazer o pagamento instantâneo.
                      </div>
                    </div>
                  </v-list-item>
                </v-list-group>

                <v-divider color="111111"></v-divider>

                <v-list-group value="boleto">
                  <template v-slot:activator="{ isOpen, props }">
                    <v-list-item :ripple="false" v-bind="props">

                      <v-list-item-title>
                        <div class="d-flex align-center">
                          <div class="d-flex align-center" style="width: 28px; height: 28px; margin-top: 0.38rem;">
                            <v-radio :model-value="isOpen" density="compact"></v-radio>
                          </div>
                          <div class="d-flex align-center ml-2 font-weight-medium py-2" style="font-size: 0.9rem;
                            -webkit-user-select: none; 
                            -ms-user-select: none; 
                             user-select: none;">
                            Boleto
                          </div>
                        </div>
                      </v-list-item-title>

                      <template v-slot:append="{ }">
                        <v-icon class="ml-2">mdi-barcode</v-icon>
                      </template>
                    </v-list-item>
                  </template>
                  <v-list-item>
                    <div class="w-100 h-100 d-flex flex-column justify-center align-center text-center px-2 py-9">
                      <img style="filter: grayscale(100%); margin-bottom: 1.7em; width: 195px; height: 150px;"
                        src="https://http2.mlstatic.com/storage/v1/plugins/spfy-midas-transparent/assets/6f2e6e1055c5e098ae20.png" />
                      <div class="text-subtitle-2 font-weight-regular" style="max-width: 500px">Depois de clicar em
                        "Finalizar a compra", você verá
                        o QR Code para fazer o pagamento instantâneo.
                      </div>
                    </div>
                  </v-list-item>
                </v-list-group>
              </v-list>

              <div class="d-flex justify-space-between align-center mt-4">
                <v-btn @click="calculateShippingCost()"
                  class="text-subtitle-1 font-weight-regular button-color button-black" color="#111111" height="45px"
                  width="100%" variant="flat" :ripple="false" :loading="isShippingFormLoading">
                  Finalizar a compra
                </v-btn>
              </div>
            </div>
          </v-window-item>
        </v-window>

        <!-- Footer Left -->
        <div class="payment-footer mt-13">
          <v-divider color="#111111"></v-divider>
          <v-breadcrumbs class="text-caption text-center justify-center" style="justify-content: center !important;"
            :items="baseboardLinks" divider="-" />
        </div>
      </div>
    </div>

    <!-- Right Side -->
    <div class="right-side">
      <!-- Edit Cart - Top -->

      <div class="payment-header mobile mb-2">
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

      <div class="mobile-expansion-summary">
        <v-expansion-panels v-model="mobileSummeryPanel" :flat="true">
          <v-expansion-panel elevation="0" height="40">
            <v-expansion-panel-title>
              <div class="order-summery">
                <div class="text-h5 font-weight-regular">
                  Resumo do Pedido
                </div>

                <div class="edit-cart text-caption text-end font-weight-regular"
                  style="cursor: pointer; opacity: 0.5; padding-left: 1px;">
                  Clique para {{ mobileSummeryPanel != 0 ? 'exibir' : 'ocultar' }} todos os Detalhes
                </div>
              </div>

              <template v-slot:actions="{ expanded }">
                <div class="d-flex align-center" style="height: 45px;">
                  <div class="d-flex align-center">
                    <div class="text-h6 font-weight-regular mr-1">{{ expanded ? '' : 'R$ 3340,00' }}</div>
                    <v-icon> {{ expanded ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</v-icon>
                  </div>
                </div>
              </template>

            </v-expansion-panel-title>
            <v-expansion-panel-text style="margin-top: -8px;">
              <!-- Cart Itens -->
              <div class="cart-itens">
                <div class="d-flex justify-space-between w-100">
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

                <div class="d-flex justify-space-between w-100">
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

                <div class="d-flex justify-space-between w-100">
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

                <div class="d-flex justify-space-between w-100">
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

              <div class="d-flex align-center justify-space-between py-4">
                <div style="margin-top: 1px;">Total:</div>
                <div class="text-h6 font-weight-regular ">R$ 3340,00</div>
              </div>
            </v-expansion-panel-text>

            <div class="top-summary w-100">
              <div @click="handleCartEdit"
                class="edit-cart text-caption text-end text-decoration-underline font-weight-regular"
                style="cursor: pointer;">
                Editar carrinho
              </div>
            </div>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

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

              <template v-slot:title>
                <div>{{ items }}</div>
              </template>
            </v-breadcrumbs>
          </div>
        </div>

        <div class="top-summary w-100">
          <div class="order-summery text-h5 font-weight-regular mb-2">
            Resumo do Pedido
          </div>

          <div @click="handleCartEdit"
            class="edit-cart text-caption text-end text-decoration-underline font-weight-regular"
            style="cursor: pointer;">
            Editar carrinho
          </div>
        </div>

        <div class="cart-itens">
          <div class="d-flex justify-space-between w-100">
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

          <div class="d-flex justify-space-between w-100">
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

          <div class="d-flex justify-space-between w-100">
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

          <div class="d-flex justify-space-between w-100">
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from "pinia";
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
  estadoRules
} from "@/utils/rules";

import {
  cpfMask,
  cepMask,
  telefoneMask
} from "@/utils/masks";

import ValidationFiller from '@/components/ValidationFiller.vue';
import { useCartStore } from "@/store/store";

const cartStore = useCartStore();
const { shippingStore } = storeToRefs(cartStore);

const router = useRouter();
const route = useRoute();
const render = ref(false);

const step = ref(0);
const items = ref([
  {
    title: 'Carrinho',
    disabled: false,
    step: null
  },
  {
    title: 'Informações',
    disabled: false,
    step: 0
  },
  {
    title: 'Frete',
    disabled: true,
    step: 1
  },
  {
    title: 'Pagamento',
    disabled: true,
    step: 2
  },
]);

const freteBreadcrumbs = ref();
const paymentBreadcrumbs = ref();

const baseboardLinks = [
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

watch(() => route.query.step, (latestStep) => {
  let intParsedStep = parseInt(latestStep);
  let stepParam = items.value.find(item => item.step === parseInt(intParsedStep));
  if (stepParam) step.value = intParsedStep;
})

const handleBreadcrumbClick = (itemStep) => {
  if (itemStep == null) {
    router.push({
      name: "Home",
      query: { cart: true }
    });
    return;
  }

  router.push({
    name: "Checkout",
    query: { step: itemStep }
  });
}

const handleCartEdit = () => {
  router.push({
    name: "Home",
    query: { cart: true }
  });
}

onMounted(() => {
  freteBreadcrumbs.value = items.value.find(item => item.step === 1);
  let stepParam = items.value.find(item => item.step === parseInt(route.query.step));
  if (!stepParam) {
    router.push({
      name: "Checkout",
      query: { step: 0 }
    });
  } else {
    if (stepParam.step == 1 && freteBreadcrumbs.value.disabled) {
      router.push({
        name: "Checkout",
        query: { step: 0 }
      });
    }
  }

  setTimeout(() => {
    render.value = true;
  }, 100)
})

// Shipping Form
const shippingForm = ref();
const displayAddressPartialForm = ref(false);
const isShippingFormLoading = ref(false);
const mobileSummeryPanel = ref();
const estados = [
  { id: 1, nome: 'Acre' },
  { id: 2, nome: 'Alagoas' },
  { id: 3, nome: 'Amapá' },
  { id: 4, nome: 'Amazonas' },
  { id: 5, nome: 'Bahia' },
  { id: 6, nome: 'Ceará' },
  { id: 7, nome: 'Distrito Federal' },
  { id: 8, nome: 'Espírito Santo' },
  { id: 9, nome: 'Goiás' },
  { id: 10, nome: 'Maranhão' },
  { id: 11, nome: 'Mato Grosso' },
  { id: 12, nome: 'Mato Grosso do Sul' },
  { id: 13, nome: 'Minas Gerais' },
  { id: 14, nome: 'Pará' },
  { id: 15, nome: 'Paraíba' },
  { id: 16, nome: 'Paraná' },
  { id: 17, nome: 'Pernambuco' },
  { id: 18, nome: 'Piauí' },
  { id: 19, nome: 'Rio de Janeiro' },
  { id: 20, nome: 'Rio Grande do Norte' },
  { id: 21, nome: 'Rio Grande do Sul' },
  { id: 22, nome: 'Rondônia' },
  { id: 23, nome: 'Roraima' },
  { id: 24, nome: 'Santa Catarina' },
  { id: 25, nome: 'São Paulo' },
  { id: 26, nome: 'Sergipe' },
  { id: 27, nome: 'Tocantins' }
];

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
  email: false,
  telefone: false,
  newsletter: false,
  wpp: false,
  nome: false,
  sobrenome: false,
  cpf: false,
  endereco: false,
  numero: false,
  bairro: false,
  complemento: false,
  cidade: false,
  estado: false,
  cep: false,
  save: false
});

const setShippingFormLoading = (load) => {
  isShippingFormLoading.value = load;
}

const calculateShippingCost = async () => {
  setShippingFormLoading(true);

  let valid = true;
  for (const field of shippingForm.value.items) {
    const mensagemErro = await field.validate();

    let fieldValidation = '';
    for (const key in shippingFormValidation) {
      if (key === field.id) {
        fieldValidation = key;
        break;
      }
    }

    if (mensagemErro.length > 0) {
      if (fieldValidation === "cep") {
        displayAddressPartialForm.value = false;
        ["endereco", "numero", "bairro", "complemento", "cidade", "estado"]
          .forEach(property => shippingFormValidation[property] = false);
      }

      shippingFormValidation[fieldValidation] = true;

      if (freteBreadcrumbs.value)
        freteBreadcrumbs.value.disabled = true;

      valid = false;
    } else {
      shippingFormValidation[fieldValidation] = false;
    }
  }

  if (valid) {
    if (displayAddressPartialForm.value) {
      if (freteBreadcrumbs.value)
        freteBreadcrumbs.value.disabled = false;

      router.push({
        name: "Checkout",
        query: { step: 1 }
      });

      cartStore.setShippingData(shipping.value);
    } else {
      displayAddressPartialForm.value = true;
      ["endereco", "numero", "bairro", "complemento", "cidade", "estado"]
        .forEach(property => shippingFormValidation[property] = false);
    }
  }

  setShippingFormLoading(false);
}

// Frete Form
const freteOption = ref('one');

// Payment Form
const paymentMethodRatio = ref([]);
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

.queryParamStep-ratio {
  .v-label {
    width: 100% !important;
    opacity: 1 !important;
    align-items: center !important;
    padding: 9px 0;
  }

  .v-selection-control {
    margin-bottom: 4px;
    border-bottom: 1px solid $color-border;

    &:last-child {
      border-bottom: none;
    }
  }

  .mdi-radiobox-blank,
  .mdi-radiobox-marked {
    font-size: 1.36rem;
  }

  .v-list-item__overlay {
    opacity: 0 !important;
  }

  .v-selection-control__input {
    transform: translateX(-1.8px);
  }

  .v-list-item {
    padding: 0 !important;
  }
}

.v-checkbox .v-selection-control {
  min-height: 31px !important;
  height: 31px !important;
}

.v-input {
  font-size: 0.9rem !important;
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

      .shipping-sumery {
        padding-left: 1px !important;
      }
    }

    .v-list-item {
      padding-left: 0;
      padding-right: 0;
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

    .mobile-expansion-summary {
      display: none;
    }

    .wrapper {
      height: 100%;
      width: 100%;
      max-width: 513px;
    }

    .cart-itens {
      display: flex;
      flex-direction: column;

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

  @media (max-width: $tablet) {
    flex-direction: column-reverse;

    .left-side {
      display: flex;
      width: 100%;
      justify-content: center;
      padding-left: 10px !important;
      padding-right: 10px !important;
      padding-top: 20px !important;

      .wrapper {
        max-width: none !important;

        .-sumery {}

        /*       .payment-footer {
          .v-breadcrumbs {
            padding-right: 12px !important;
          }
        } */
      }
    }

    .right-side {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: fit-content;
      width: 100%;
      position: relative;
      right: auto;
      top: auto;
      padding-bottom: 0 !important;
      padding-left: 10px !important;
      padding-right: 10px !important;

      .mobile-expansion-summary {
        display: block;
        width: 100%;

        .v-expansion-panel-title {
          padding-left: 0;
          padding-right: 0;
        }

        .v-expansion-panel-text__wrapper {
          padding: 2px 0 !important;
        }

        .v-expansion-panel-title__overlay {
          opacity: 0 !important;
        }
      }

      .wrapper {
        display: none;
        max-width: none !important;
      }

      .order-summery {
        display: block !important;
        margin-left: -2px;
      }

      .v-expansion-panel-title__icon {
        margin-right: -3px;
      }

      .order-sum {
        padding: 13px 0 !important;
      }

      /* .edit-cart {
        display: none !important;
      } */

      .cart-itens {
        padding-top: 0 !important;
        padding-bottom: 13px !important;
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