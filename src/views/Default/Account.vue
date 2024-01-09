<template>
  <div style="min-height: 100vh;">
    <div class="container-limit container-size-padding">
      <div class="d-flex align-center flex-column mb-6" style="margin-top: 150px;">
        <v-avatar class="mb-2" color="surface-variant">J.T</v-avatar>
        <div class="text-center">João Pedro Lima Teixeira</div>
      </div>
      <div class="d-flex" style="gap: 60px;">

        <!-- Esquerda -->
        <div style="flex: 1; padding: 0 !important;" elevation="0">
          <div>
            <div class="py-2">
              Endereços
            </div>

            <v-divider></v-divider>

            <v-card elevation="0">
              <v-list class="addresses-card-list">
                <template v-for="(a, index) in addresses" :key="index">
                  <v-list-item>
                    <v-card-item class="px-0">
                      <div v-if="a.isDefaultAddress" class="v-card-subtitle" style="margin-top: 3px; padding: 0;">
                        Endereço Principal
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

                      <v-card-title>
                        {{ a.rua }}{{ a.numero.length > 0 ? `, ${a.numero}` : "" }}
                      </v-card-title>

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
              variant="flat" :ripple="false">
              Adicionar Endereço
            </v-btn>
          </div>
        </div>

        <!-- Direita -->
        <div style="flex: 1; padding: 0 !important;" elevation="0">
          <div>
            <div class="py-2">
              Histórico de Pedidos
            </div>

            <v-divider></v-divider>

            <v-card elevation="0">
              <v-list class="addresses-card-list">
                <template v-for="(a, index) in addresses" :key="index">
                  <v-list-item>
                    <v-card-item class="px-0">
                      <div class="v-card-subtitle" style="margin-top: 3px; padding: 0;">
                        Pedido a caminho
                      </div>

                      <template v-slot:append>
                        <div class="d-flex">
                          <v-btn elevation="0">
                            Detalhes
                          </v-btn>
                        </div>
                      </template>

                      <v-card-title>
                        Furvana-2444-123
                      </v-card-title>

                      <v-card-subtitle>
                        20/02/2024<br>
                        R$3000.00
                      </v-card-subtitle>
                    </v-card-item>
                  </v-list-item>
                  <v-divider v-if="index < addresses.length - 1"></v-divider>
                </template>
              </v-list>
            </v-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
}];
</script>

<style lang="scss">
.addresses-card-list {
  padding: 0 !important;

  .v-list-item {
    padding: 0 !important;
  }
}
</style>
