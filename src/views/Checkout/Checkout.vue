<template>
  <div v-if="render" class="h-100 w-100 checkout">
    <!-- Left side -->
    <div class="left-side border-right">
      <div class="wrapper">
        <!-- Header Left -->
        <div class="payment-header desktop mb-4">
          <div style="height: 33px; width: 160px;">
            <v-img class="h-100 w-100" src="/logo.svg"></v-img>
          </div>
          <div>
            <v-breadcrumbs class="pl-0 text-subtitle-2 font-weight-regular" :items="items">
              <template v-slot:divider>
                <v-icon icon="mdi-chevron-right"></v-icon>
              </template>
              <template v-slot:title="{ item }">
                <div @click="updateStep(item.step)">
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
                      <div>{{ shippingData.nome }} {{ shippingData.sobrenome }}</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-icon class="mr-4">mdi-id-card</v-icon>
                      <div>{{ shippingData.cpf }}</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-icon class="mr-4">mdi-phone</v-icon>
                      <div>{{ shippingData.telefone }}</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-icon class="mr-4">mdi-email</v-icon>
                      <div>{{ shippingData.email }}</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-icon class="mr-4">mdi-map-marker</v-icon>
                      <div>
                        {{ shippingData.endereco }}, {{ shippingData.numero }} -
                        {{ shippingData.bairro }}, {{ shippingData.cidade }}, {{ shippingData.estado.sigla }}
                        - {{ shippingData.cep }}
                      </div>
                    </div>
                  </div>

                  <div @click="updateStep(0)" class="d-flex align-center justify-end text-decoration-underline pb-8"
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

                    <div @click="updateStep(1)" class="d-flex align-center justify-end text-decoration-underline"
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
                    <a @click="handleLogin()"
                      class="font-weight-regular text-subtitle-2 text-decoration-underline mt-1">
                      Clique aqui para fazer login agora!
                    </a>
                  </div>
                </div>
                <v-text-field id="email" v-model="shipping.email" :rules="emailRules" label="E-mail" variant="outlined"
                  density="comfortable">
                </v-text-field>
                <validation-filler :active="shippingFormValidation.email" density="compact" />

                <v-text-field id="telefone" v-model="shipping.telefone" v-maska:[telefoneMask] :rules="telefoneRules"
                  label="Telefone" variant="outlined" density="comfortable">
                </v-text-field>
                <validation-filler :active="shippingFormValidation.telefone" density="compact" />

                <div class="mb-1" style="font-size: 0.9rem !important;">
                  <div>
                    <v-checkbox id="newsletter" v-model="shipping.newsletter" density="compact" hide-details>
                      <template v-slot:label>
                        <div class="d-flex text-subtitle-2 font-weight-regular mr-1 pl-1"
                          style="margin-top: 0.04rem; opacity: 1 !important;">
                          Enviar novidades e ofertas para mim por e-mail
                        </div>
                      </template>
                    </v-checkbox>
                  </div>
                  <div>
                    <v-checkbox id="wpp" v-model="shipping.wpp" density="compact" hide-details>
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

                <div>

                  <div class="parent-input-container">
                    <div class="d-flex flex-column" style="flex: 1;">
                      <v-text-field id="nome" class="sibling-input" v-model="shipping.nome" :rules="nomeRules"
                        label="Nome" variant="outlined" density="comfortable">
                      </v-text-field>
                      <validation-filler :active="shippingFormValidation.nome" density="compact" />
                    </div>

                    <div class="d-flex flex-column" style="flex: 1;">
                      <v-text-field id="sobrenome" class="sibling-input" v-model="shipping.sobrenome"
                        :rules="sobrenomeRules" label="Sobrenome" variant="outlined" density="comfortable">
                      </v-text-field>
                      <validation-filler :active="shippingFormValidation.sobrenome" density="compact" />
                    </div>
                  </div>

                  <v-text-field id="cpf" v-model="shipping.cpf" v-maska:[cpfMask] :rules="cpfRules" label="CPF"
                    variant="outlined" density="comfortable">
                  </v-text-field>
                  <validation-filler :active="shippingFormValidation.cpf" density="compact" />

                  <template v-if="displayAddressPartialForm">
                    <div class="parent-input-container">
                      <div class="d-flex flex-column" style="flex: 2;">
                        <v-text-field id="endereco" class="sibling-input" v-model="shipping.endereco"
                          :rules="enderecoRules" label="Endereco" variant="outlined" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="shippingFormValidation.endereco" density="compact" />
                      </div>

                      <div class="d-flex flex-column" style="flex: 1;">
                        <v-text-field id="numero" class="sibling-input" v-model="shipping.numero" :rules="numeroRules"
                          label="Número" variant="outlined" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="shippingFormValidation.numero" density="compact" />
                      </div>
                    </div>

                    <div class="parent-input-container">
                      <div class="d-flex flex-column" style="flex: 2;">
                        <v-text-field id="bairro" class="sibling-input" v-model="shipping.bairro" label="Bairro"
                          :rules="bairroRules" variant="outlined" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="shippingFormValidation.bairro" density="compact" />
                      </div>

                      <div class="d-flex flex-column" style="flex: 1;">
                        <v-text-field id="complemento" class="sibling-input" v-model="shipping.complemento"
                          label="Complemento" variant="outlined" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="shippingFormValidation.complemento" density="compact" />
                      </div>
                    </div>

                    <div class="parent-input-container">
                      <div class="d-flex flex-column" style="flex: 3;">
                        <v-text-field id="cidade" class="sibling-input" v-model="shipping.cidade" label="Cidade"
                          :rules="cidadeRules" variant="outlined" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="shippingFormValidation.cidade" density="compact" />
                      </div>

                      <div class="d-flex flex-column" style="flex: 2;">
                        <v-autocomplete id="estado" class="sibling-input" item-title="nome" item-value="sigla"
                          :rules="estadoRules" return-object v-model="shipping.estado" label="Estado" :items="estados"
                          variant="outlined" density="comfortable">
                        </v-autocomplete>
                        <validation-filler :active="shippingFormValidation.estado" density="compact" />
                      </div>
                    </div>
                  </template>

                  <v-text-field id="cep" v-model="shipping.cep" v-maska:[cepMask] :rules="cepRules" label="CEP"
                    variant="outlined" density="comfortable" @blur="handleCepBlur">
                  </v-text-field>
                  <validation-filler :active="shippingFormValidation.cep" density="compact" />

                  <v-checkbox id="save" v-model="shipping.save" density="compact" hide-details>
                    <template v-slot:label>
                      <div class="text-subtitle-2 font-weight-regular pl-1" style="margin-top: 0.04rem;">
                        Salvar minhas informações para a próxima vez
                      </div>
                    </template>
                  </v-checkbox>
                </div>
              </div>

              <!-- <div class="d-flex justify-space-between align-center">
                <v-btn v-if="step == 0" @click="calculateShippingCost()"
                  class="text-subtitle-1 font-weight-regular button-color button-dark" color="#111111" height="45px"
                  width="100%" variant="flat" :ripple="false" :loading="isShippingFormLoading">
                  Continuar aaa
                </v-btn>
                <v-btn v-else @click="calculateShippingCost()"
                  class="text-subtitle-1 font-weight-regular button-color button-dark" color="#111111" height="45px"
                  width="100%" variant="flat" :ripple="false" :loading="isShippingFormLoading">
                  Continuar bbb
                </v-btn>
              </div> -->
            </v-form>
          </v-window-item>

          <v-window-item :value="1">
            <div>
              <!-- Destinatario -->
              <div>
                <div class="text-h5 font-weight-regular mb-3">
                  Escolha o Frete
                </div>

                <v-radio-group class="frete-ratio" hide-details v-model="freteMethod" density="compact">
                  <v-radio :value="0">
                    <template v-slot:label="{ items }">
                      <div class="d-flex flex-column w-100 h-100 ml-2">
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
                  <v-radio :value="1">
                    <template v-slot:label="{ items }">
                      <div class="d-flex flex-column w-100 h-100 ml-2">
                        <div class="w-100 d-flex justify-space-between font-weight-medium" style="font-size: 0.9rem;">
                          <div>Total Express</div>
                        </div>
                        <div class="w-100 text-subtitle-2 font-weight-regular">
                          3 dias úteis
                        </div>
                      </div>

                      <div class="d-flex text-subtitle-2 align-flex font-weight-regular"
                        style="word-break: keep-all; white-space: nowrap;">
                        {{ formatPrice(shippingData.price) }}
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </div>
            </div>
          </v-window-item>

          <v-window-item :value="2">
            <!-- Destinatario -->
            <v-form ref="paymentForm" validate-on="layz">
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

                        <template v-slot:append="{}">
                          <v-icon class="ml-2">mdi-credit-card-outline</v-icon>
                        </template>
                      </v-list-item>
                    </template>
                    <v-list-item>
                      <div class="w-100 h-100 d-flex flex-column text-center px-2 pt-5 pb-1">

                        <v-text-field id="cardNumber" v-model="payment.cardNumber" v-maska:[cardNumberMask]
                          label="Número do Cartão" :rules="cardNumberRules" variant="outlined" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="paymentFormValidation.cardNumber" density="compact" />

                        <div class="parent-input-container d-flex w-100">
                          <div class="d-flex flex-column" style="flex: 3;">
                            <v-text-field id="cardExpirationDate" v-model="payment.cardExpirationDate"
                              v-maska:[cardExpirationDateMask] label="Data de Vencimento (MM/AAAA)"
                              :rules="expirationDateRules" variant="outlined" class="sibling-input"
                              density="comfortable">
                            </v-text-field>
                            <validation-filler :active="paymentFormValidation.cardExpirationDate" density="compact" />
                          </div>

                          <div class="d-flex flex-column" style="flex: 2;">
                            <v-text-field id="cvc" v-model="payment.cvc" v-maska:[cardCvcMask]
                              label="Codigo de Segurança" class="sibling-input" :rules="cardCvcRules" variant="outlined"
                              density="comfortable">
                            </v-text-field>
                            <validation-filler :active="paymentFormValidation.cvc" density="compact" />
                          </div>
                        </div>

                        <v-text-field id="nameOnCard" v-model="payment.nameOnCard" label="Nome no Cartão"
                          :rules="cardNameRules" variant="outlined" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="paymentFormValidation.nameOnCard" density="compact" />

                        <v-autocomplete id="installments" v-model="payment.installments" item-title="formattedPrice"
                          item-value="number" return-object label="Parcelas" :rules="installmentsRules"
                          :items="installments" variant="outlined" density="comfortable">
                        </v-autocomplete>
                        <validation-filler :active="paymentFormValidation.installments" density="compact" />
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

                        <template v-slot:append="{}">
                          <v-icon class="ml-2">mdi-qrcode</v-icon>
                        </template>
                      </v-list-item>
                    </template>
                    <v-list-item>
                      <div
                        class="w-100 h-100 d-flex flex-column justify-center align-center text-center px-2 pb-6 mb-2">
                        <img style="filter: grayscale(100%); width: 195px; height: 150px;" src="/payment.svg" />
                        <div class="text-subtitle-2 font-weight-regular" style="max-width: 500px">Depois de clicar
                          em
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

                        <template v-slot:append="{}">
                          <v-icon class="ml-2">mdi-barcode</v-icon>
                        </template>
                      </v-list-item>
                    </template>
                    <v-list-item>
                      <div
                        class="w-100 h-100 d-flex flex-column justify-center align-center text-center px-2 pb-7 mb-2">
                        <img style="filter: grayscale(100%); width: 175px; height: 150px;" src="/boleto.svg" />
                        <div class="text-subtitle-2 font-weight-regular" style="max-width: 500px">Depois de clicar
                          em
                          "Finalizar a compra", o boleto será gerado para efetuar o pagamento.
                        </div>
                      </div>
                    </v-list-item>
                  </v-list-group>
                </v-list>
              </div>
            </v-form>
          </v-window-item>
        </v-window>

        <div class="checkout-navigation-container mt-7">
          <div class="previous-section-btn" @click="handlePreviousStep()">
            <v-icon icon="mdi-chevron-left"></v-icon>
            <button class="d-flex align-center text-subtitle-2 font-weight-regular"
              style="opacity: 0.65; cursor: pointer">
              <template v-if="step == 0">
                Voltar ao Carrinho
              </template>
              <template v-if="step == 1">
                Voltar para a Entrega
              </template>
              <template v-if="step == 2">
                Voltar para o Frete
              </template>
            </button>
          </div>

          <v-btn @click="handleNextStep()"
            class="next-section-btn text-subtitle-1 font-weight-regular button-color button-light" color="#111111"
            height="45px" width="100%" variant="flat" :ripple="false" :loading="isShippingFormLoading">
            <template v-if="step == 0">Continuar com o Frete</template>
            <template v-if="step == 1">Continuar Pagamento</template>
            <template v-if="step == 2">Finalizar a compra</template>
          </v-btn>
        </div>

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
            <template v-slot:title="{ item }">
              <div @click="updateStep(item.step)">
                {{ item.title }}
              </div>
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
                    <div class="text-h6 font-weight-regular mr-1">{{ expanded ? '' : step > 0 ? formatPrice(totalPrice)
                      :
                      formatPrice(totalPriceWithoutShipping) }}</div>
                    <v-icon> {{ expanded ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</v-icon>
                  </div>
                </div>
              </template>

            </v-expansion-panel-title>
            <v-expansion-panel-text style="margin-top: -8px;">
              <!-- Cart Itens -->
              <v-divider color="#111111"></v-divider>

              <div class="cart-itens">
                <div v-for="p in products" class="d-flex justify-space-between w-100">
                  <div style="height: 90px; width: 90px;">
                    <v-img class="h-100 w-100" style="border-radius: 10px;" :src="p.image"></v-img>
                  </div>

                  <div class="d-flex w-100 justify-space-between">
                    <div class="d-flex flex-column justify-center ml-4">
                      <div class="font-weight-bold">
                        {{ p.title }}
                      </div>
                      <div class="text-subtitle-2 font-weight-light">
                        Quantidade: {{ p.quantity }}
                      </div>
                    </div>

                    <div class="text-subtitle-2 font-weight-regular d-flex align-center">
                      {{ formatPrice(p.price) }}
                    </div>
                  </div>
                </div>

                <!-- <div class="d-flex justify-space-between w-100">
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
                </div> -->
              </div>

              <template v-if="shippingData.price && shippingData.price > 0 && step > 0">
                <v-divider color="#111111"></v-divider>

                <div class="order-sum d-flex flex-column" style="gap: 4px;">
                  <div class="d-flex justify-space-between text-subtitle-2 font-weight-regular">
                    <div>Subtotal:</div>
                    <div class="font-weight-regular">{{ formatPrice(totalPriceWithoutShipping) }}</div>
                  </div>

                  <div class="d-flex justify-space-between text-subtitle-2 font-weight-regular">
                    <div>Frete:</div>
                    <div class="font-weight-regular">{{ formatPrice(shippingData.price) }}</div>
                  </div>

                  <!-- <div class="d-flex justify-space-between text-subtitle-2 font-weight-regular">
                  <div>Desconto:</div>
                  <div class="font-weight-regular">-R$300</div>
                  </div> -->
                </div>
              </template>

              <v-divider color="#111111"></v-divider>

              <div class="d-flex align-center justify-space-between py-4">
                <div style="margin-top: 1px;">Total:</div>
                <div class="text-h6 font-weight-regular ">{{ step > 0 ? formatPrice(totalPrice) :
                  formatPrice(totalPriceWithoutShipping) }}</div>
              </div>
            </v-expansion-panel-text>

            <div class="top-summary w-100 mb-1">
              <div @click="handleCartEdit()"
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

        <div class="top-summary w-100 d-flex justify-space-between mb-2">
          <div class="text-h6 font-weight-regular">
            Resumo do Pedido
          </div>

          <div @click="handleCartEdit()"
            class="edit-cart text-caption text-end font-weight-regular mt-1 mr-1 d-flex align-center"
            style="cursor: pointer;">
            <v-icon style="margin-bottom: 5px;" class="mr-1">mdi-cart</v-icon>
            Editar carrinho
          </div>
        </div>

        <v-divider color="#111111"></v-divider>

        <div class="cart-itens pr-1">
          <div v-for="p in products" class="d-flex justify-space-between w-100">
            <div class="mr-2" style="height: 90px; width: 90px;">
              <v-img class="h-100 w-100" style="border-radius: 10px;" :src="p.image"></v-img>
            </div>

            <div class="d-flex w-100 justify-space-between">
              <div class="d-flex flex-column justify-center ml-4 pr-10">
                <div class="font-weight-bold">
                  {{ p.title }}
                </div>
                <div class="text-subtitle-2 font-weight-light">
                  Quantidade: {{ p.quantity }}
                </div>
              </div>

              <div class="text-subtitle-2 font-weight-regular d-flex align-center">
                {{ formatPrice(p.price) }}
              </div>
            </div>
          </div>

          <!-- <div class="d-flex justify-space-between w-100">
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
          </div> -->
        </div>

        <template v-if="shippingData.price && shippingData.price > 0 && step > 0">
          <v-divider color="#111111"></v-divider>

          <div class="order-sum d-flex flex-column pr-2 pl-2" style="gap: 4px;">
            <div class="d-flex justify-space-between text-subtitle-2 font-weight-regular">
              <div>Subtotal:</div>
              <div class="font-weight-regular">{{ formatPrice(totalPriceWithoutShipping) }}</div>
            </div>

            <div class="d-flex justify-space-between text-subtitle-2 font-weight-regular">
              <div>Frete:</div>
              <div class="font-weight-regular"> {{ formatPrice(shippingData.price) }}</div>
            </div>

            <!-- <div class="d-flex justify-space-between text-subtitle-2 font-weight-regular">
            <div>Desconto:</div>
            <div class="font-weight-regular">-R$300</div>
          </div> -->
          </div>
        </template>

        <v-divider color="#111111"></v-divider>

        <div class="d-flex align-center justify-space-between pt-4 pr-1 pl-2">
          <div style="margin-top: 1px;">Total:</div>
          <div class="text-h6 font-weight-regular ">{{ step > 0 ? formatPrice(totalPrice) :
            formatPrice(totalPriceWithoutShipping) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onBeforeMount } from 'vue';
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
  estadoRules,
  cardNumberRules,
  cardCvcRules,
  expirationDateRules,
  cardNameRules,
  installmentsRules
} from "@/utils/rules";

import {
  cpfMask,
  cepMask,
  telefoneMask,
  cardExpirationDateMask,
  cardNumberMask,
  cardCvcMask,
} from "@/utils/masks";

import ValidationFiller from '@/components/ValidationFiller.vue';
import { useCartStore } from "@/store/store";

import { getUserCart } from "@/data/cart"
import { createOrder } from "@/data/order"

import formatPrice from "@/utils/formatPrice";
import generateShippingPrice from "@/utils/generateShippingPrice";

import { cepValidation, searchAdressByCEP } from "@/utils/cep.js";

import CircularLoading from "@/components/CircularLoading.vue";

const cartStore = useCartStore();
const { shippingData, isShippingDataValid,
  freteData, isFreteDataValid } = storeToRefs(cartStore);

const router = useRouter();
const route = useRoute();
const render = ref(false);

const userId = ref("rXiNPm5lXTExkVtmPcy0");
const products = ref([]);
const lastShippingCep = ref("");

// const totalPrice = computed(() => {
//   if (!products.value.length) {
//     return 0;
//   }

//   const productTotal = products.value.reduce((sum, product) => {
//     const price = Number(product.price) || 0;
//     const quantity = Number(product.quantity) || 0;
//     return sum + price * quantity;
//   }, 0);

//   const shipping = Number(shippingPrice.value) > 0 ? Number(shippingPrice.value) : 0;

//   const total = productTotal + shipping;
//   return Math.round(total * 100) / 100;
// });

const totalPriceWithoutShipping = computed(() => {
  if (!products.value.length) {
    return 0;
  }

  // Calculate total for products only
  return products.value.reduce((sum, product) => {
    const price = parseFloat(product.price) || 0;
    const quantity = parseFloat(product.quantity) || 0;
    return sum + price * quantity;
  }, 0);
});

const totalPrice = computed(() => {
  const shipping = parseFloat(shippingData.value.price) > 0 ? parseFloat(shippingData.value.price) : 0;
  const total = totalPriceWithoutShipping.value + shipping;

  return Math.round(total * 100) / 100;
});

const step = ref(0);
const items = ref([
  {
    title: 'Carrinho',
    disabled: false,
    step: null,
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

const freteBreadcrumbs = ref(items.value.find(item => item.step === 1));
const paymentBreadcrumbs = ref(items.value.find(item => item.step === 2));

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

const updateStep = (itemStep) => {
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

const setFreteSection = (isLocked) => {
  if (isLocked) setPaymentSection(isLocked)
  freteBreadcrumbs.value.disabled = isLocked;
}

const setPaymentSection = (isLocked) => {
  paymentBreadcrumbs.value.disabled = isLocked;
}

const handleNextStep = () => {
  switch (step.value) {
    case 0:
      calculateShippingCost();
      break;
    case 1:
      paymenteee(freteMethod.value);
      break;
    case 2:
      processPayment();
      break;
  }
}

const loadUserCart = async (userId) => {
  products.value = await getUserCart(userId);
};

const handleCartEdit = () => {
  router.push({
    name: "Home",
    query: { cart: true }
  });
}

const handlePreviousStep = () => {
  switch (step.value) {
    case 0:
      handleCartEdit();
      break;
    case 1:
      updateStep(0);
      break;
    case 2:
      updateStep(1);
      break;
  }
}

onBeforeMount(async () => {
  await loadUserCart(userId.value);

  if (isShippingDataValid.value) {
    Object.assign(shipping, shippingData.value);
    displayAddressPartialForm.value = true;

    if (shipping.cep && shipping.cep.length > 0) {
      lastShippingCep.value = shipping.cep
    }

    setFreteSection(false);
  }

  if (isFreteDataValid.value && isShippingDataValid.value) {
    freteMethod.value = freteData.value.method;
    setPaymentSection(false);
  } else cartStore.setFreteDataStatus(false);

  let stepParam = items.value.find(item => item.step === parseInt(route.query.step));
  if (
    !stepParam ||
    (stepParam.step == 1 && !isShippingDataValid.value) ||
    (stepParam.step == 2 && !isShippingDataValid.value)
  ) {
    router.push({
      name: "Checkout",
      query: { step: 0 }
    });
  } else if (stepParam.step == 2 && !isFreteDataValid.value) {
    router.push({
      name: "Checkout",
      query: { step: 1 }
    });
  } else step.value = stepParam.step;

  setTimeout(() => {
    render.value = true;
  }, 100);
})

// Shipping Form
const shippingForm = ref();
const displayAddressPartialForm = ref(false);
const isShippingFormLoading = ref(false);
const mobileSummeryPanel = ref();
const estados = [
  { nome: 'Acre', sigla: "AC" },
  { nome: 'Alagoas', sigla: "AL" },
  { nome: 'Amapá', sigla: "AP" },
  { nome: 'Amazonas', sigla: "AM" },
  { nome: 'Bahia', sigla: "BA" },
  { nome: 'Ceará', sigla: "CE" },
  { nome: 'Distrito Federal', sigla: "DF" },
  { nome: 'Espírito Santo', sigla: "ES" },
  { nome: 'Goiás', sigla: "GO" },
  { nome: 'Maranhão', sigla: "MA" },
  { nome: 'Mato Grosso', sigla: "MT" },
  { nome: 'Mato Grosso do Sul', sigla: "MS" },
  { nome: 'Minas Gerais', sigla: "MG" },
  { nome: 'Pará', sigla: "PA" },
  { nome: 'Paraíba', sigla: "PB" },
  { nome: 'Paraná', sigla: "PR" },
  { nome: 'Pernambuco', sigla: "PE" },
  { nome: 'Piauí', sigla: "PI" },
  { nome: 'Rio de Janeiro', sigla: "RJ" },
  { nome: 'Rio Grande do Norte', sigla: "RN" },
  { nome: 'Rio Grande do Sul', sigla: "RS" },
  { nome: 'Rondônia', sigla: "RO" },
  { nome: 'Roraima', sigla: "RR" },
  { nome: 'Santa Catarina', sigla: "SC" },
  { nome: 'São Paulo', sigla: "SP" },
  { nome: 'Sergipe', sigla: "SE" },
  { nome: 'Tocantins', sigla: "TO" }
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
  estado: null,
  cep: "",
  save: true,
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
  save: false,
});

const setShippingFormLoading = (load) => {
  isShippingFormLoading.value = load;
}

const calculateShippingCost = async () => {
  if (!displayAddressPartialForm.value)
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
        setFreteSection(true)

      valid = false;
    } else {
      shippingFormValidation[fieldValidation] = false;
    }
  }

  if (valid) {
    if (displayAddressPartialForm.value) {
      if (freteBreadcrumbs.value)
        setFreteSection(false);

      shipping.price = generateShippingPrice();

      cartStore.setShippingData(JSON.parse(JSON.stringify(shipping)));

      router.push({
        name: "Checkout",
        query: { step: 1 }
      });
    } else {
      await loadAdressDetails();

      displayAddressPartialForm.value = true;

      ["endereco", "numero", "bairro", "complemento", "cidade", "estado"]
        .forEach(property => shippingFormValidation[property] = false);
    }
  } else {
    cartStore.setShippingDataStatus(false);
  }

  setShippingFormLoading(false);
}

const handleCepBlur = async () => {
  if (step.value == 0 && displayAddressPartialForm.value) {
    setShippingFormLoading(true);
    await loadAdressDetails();
    setShippingFormLoading(false);
  }
}

const loadAdressDetails = async () => {
  try {
    const valid = cepValidation(shipping.cep);

    if (valid) {
      const returnedAdress = await searchAdressByCEP(shipping.cep);

      if (lastShippingCep.value != shipping.cep)
        shipping.numero = "";

      lastShippingCep.value = shipping.cep;

      Object.assign(shipping, {
        endereco: returnedAdress.logradouro,
        bairro: returnedAdress.bairro,
        cidade: returnedAdress.cidade,
        estado: estados.find(e => e.sigla.toLowerCase() == returnedAdress.uf.toLowerCase())
      });

      cartStore.setShippingData(JSON.parse(JSON.stringify(shipping)));

      return { valid: true };
    } else {
      lastShippingCep.value = shipping.cep;
      return { valid: false, reason: "Formato inválido!" };
    }
  } catch (error) {
    return { valid: false, reason: "CEP não encontrado!" };
  }
}

const handleLogin = () => {
  router.push({
    name: "EmailValidation",
    query: { checkout: true }
  });
}

// Frete Form
const freteMethod = ref(null);

const paymenteee = (method) => {
  if (method == null && isShippingDataValid.value) return;

  if (freteBreadcrumbs.value)
    setPaymentSection(false);

  cartStore.setFreteData({ method });

  router.push({
    name: "Checkout",
    query: { step: 2 }
  });
}

// Payment Form
const maxInstallments = 3;

const paymentMethodRatio = ref([]);
const installments = ref([]);

const paymentForm = ref();

const paymentFormValidation = reactive({
  cardNumber: false,
  cardExpirationDate: false,
  cvc: false,
  nameOnCard: false,
  installments: false
});

const payment = reactive({
  cardNumber: '',
  cardExpirationDate: '',
  cvc: '',
  nameOnCard: '',
  installments: null
});

const loadingPix = ref(false);

const processPayment = async () => {
  let valid = true;

  const paymentMethod = paymentMethodRatio.value ? paymentMethodRatio.value[0] : null;

  if (paymentMethod == 'card') {
    for (const field of paymentForm.value.items) {
      const mensagemErro = await field.validate();

      let fieldValidation = '';
      for (const key in paymentFormValidation) {
        if (key === field.id) {
          fieldValidation = key;
          break;
        }
      }

      if (mensagemErro.length > 0) {
        paymentFormValidation[fieldValidation] = true;
        valid = false;
      } else {
        paymentFormValidation[fieldValidation] = false;
      }
    }
  }

  if (paymentMethod != 'boleto' && paymentMethod != 'pix' && paymentMethod != 'card') {
    valid = false;
  }

  if (valid) {
    const order = {
      payment: {
        method: paymentMethod,
        installments: paymentMethod == 'card' ? payment.installments : null
      },
      shipping: {
        email: shippingData.value.email,
        telefone: shippingData.value.telefone,
        nome: shippingData.value.nome,
        sobrenome: shippingData.value.sobrenome,
        cpf: shippingData.value.cpf,
        endereco: shippingData.value.endereco,
        numero: shippingData.value.numero,
        bairro: shippingData.value.bairro,
        complemento: shippingData.value.complemento,
        cidade: shippingData.value.cidade,
        estado: shippingData.value.estado,
        cep: shippingData.value.cep,
      },
      products: products.value.length >= 0 ?
        products.value.map((product) => ({
          productId: product.id,
          price: product.price,
          quantity: product.quantity
        })) : [],
      totalPrice: totalPrice.value,
      userId: userId.value,
      createdAt: new Date()
    }

    const response = await createOrder(order);
    alert(response)
  }
}

const loadInstallments = () => {
  var listInstallments = installments.value = [];

  for (let i = 1; i <= maxInstallments; i++) {
    const calculatedPrice = totalPrice.value / i;
    const formattedPrice = `${i}x de ${formatPrice(Number(calculatedPrice))} sem juros`;

    listInstallments.push({ number: i, price: calculatedPrice, formattedPrice });
  }

  installments.value = listInstallments;
}

watch(paymentMethodRatio, (newMethod) => {
  if (newMethod == "card") {
    Object.assign(payment, {
      cardNumber: '',
      cardExpirationDate: '',
      cvc: '',
      nameOnCard: '',
      installments: null
    });

    loadInstallments();
  }

  if (newMethod == "pix") {
    loadingPix.value = true;

    setTimeout(() => {
      loadingPix.value = false;
    }, 3000);
  }
});
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

.frete-ratio {
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
      gap: 15px;

      padding-top: 20px;
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
        padding-top: 25px !important;
        padding-bottom: 19px !important;
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

.checkout-navigation-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .previous-section-btn {
    display: flex;
    justify-content: start;
    flex: 3;
  }

  .next-section-btn {
    flex: 4;
  }

  @media (max-width: $tablet) {
    flex-direction: column-reverse;
    gap: 15px;

    .previous-section-btn {
      justify-content: center;
      align-items: center;
      flex: auto;
    }

    .next-section-btn {
      flex: auto;
    }
  }
}
</style>