<template>
  <div class="h-100 w-100">
    <div class="h-100 w-100 d-flex">

      <!-- Left side -->
      <div class="h-100 w-100 py-10 px-10" style="flex: 3; background-color: #f1f1f1;">

        <!-- Header Left -->
        <div class="mb-7">
          <div style="height: 29px; width: 160px;">
            <v-img class="h-100 w-100"
              src="//cdn.shopify.com/s/files/1/0526/4123/5093/files/Insider_Logotipo.png?90413"></v-img>
          </div>
          <div>
            <v-breadcrumbs class="pl-0" :items="items">
              <template v-slot:divider>
                <v-icon icon="mdi-chevron-right"></v-icon>
              </template>
            </v-breadcrumbs>
          </div>
        </div>

        <!-- Form -->
        <v-form style="padding-bottom: 70px;">
          <!-- Form Top -->
          <div class="mb-7">
            <!-- Form Top - Top -->
            <div class="d-flex justify-space-between mb-5">
              <div>
                Conta
              </div>
              <div>
                Tem uma conta? Fazer login!
              </div>
            </div>

            <v-text-field label="E-mail" variant="outlined" density="comfortable">
            </v-text-field>

            <!-- Form Top - Bottom  -->
            <div>
              <div>
                <v-checkbox label="Enviar novidades e ofertas para mim por e-mail" density="compact" hide-details>
                </v-checkbox>
              </div>
              <div>
                <v-checkbox label="Quero receber descontos e novidades por WhatsApp" density="compact" hide-details>
                </v-checkbox>
              </div>
            </div>
          </div>

          <!-- Form mid -->
          <div>
            <div class="mb-5">
              Endereço de entrega
            </div>

            <div class="mb-6">
              <div class="d-flex" style="gap: 15px">
                <v-text-field style="flex 1" label="Nome" variant="outlined" density="comfortable">
                </v-text-field>

                <v-text-field style="flex 1" label="Sobrenome" variant="outlined" density="comfortable">
                </v-text-field>
              </div>

              <v-text-field label="CPF" variant="outlined" density="comfortable">
              </v-text-field>

              <v-text-field label="Telefone" variant="outlined" density="comfortable">
              </v-text-field>

              <v-text-field label="CEP" variant="outlined" density="comfortable">
              </v-text-field>

              <v-checkbox label="Salvar minhas informações para a próxima vez" density="compact" hide-details>
              </v-checkbox>
            </div>
          </div>

          <!-- Form Bottom -->
          <div class="d-flex justify-space-between">
            <div><v-icon icon="mdi-chevron-left"></v-icon>Voltar ao carrinho</div>
            <div>Continuar com o frete</div>
          </div>
        </v-form>

        <v-divider color="#111111"></v-divider>

        <!-- Footer Left -->
        <div>
          <div class="text-caption">
            <v-breadcrumbs class="footer-breadcrumbs" :items="itemsBaseboardLinks" divider="-" />
          </div>
        </div>

      </div>

      <!-- Right Side -->
      <div class="h-100 w-100 py-10 px-10" style="flex: 2;">

        <!-- Edit Cart - Top -->
        <div class="w-100 d-flex justify-end mb-5">
          <div>
            Editar carrinho
          </div>
        </div>

        <!-- Cart Itens -->
        <div class="d-flex" style="padding-bottom: 24px;">
          <div style="height: 90px; width: 90px;">
            <v-img class="h-100 w-100" style="border-radius: 8px;"
              src="https://cdn.shopify.com/s/files/1/0526/4123/5093/files/1_d99de45e-9f94-4fbb-a3bf-13cdf2a7373e_small.jpg?v=1700691687"></v-img>
          </div>

          <div class="d-flex w-100 justify-space-between">
            <div class="d-flex align-center ml-4">
              Tech T-Shirt<br>
              Preta / PP
            </div>

            <div class="d-flex align-center">
              R$ 159,00
            </div>
          </div>
        </div>

        <v-divider color="#111111"></v-divider>

        <div class="mt-5">
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

          <div class="d-flex justify-end align-center text-subtitle-1 font-weight-medium px-5 mt-2 pb-2"
            style="gap: 20px;">
            <div>Valor Final do Pedido: </div>
            <div>R$3340</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
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
</script>

<style lang="scss">
.v-breadcrumbs-item {
  padding-left: 0 !important;
}
</style>
  