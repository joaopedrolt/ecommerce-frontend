<template>
  <div class="footer-bottom-side-container">
    <div class="text-caption">
      <v-breadcrumbs class="footer-breadcrumbs" :items="itemsBaseboardLinks" divider="-" />
    </div>

    <div class="text-caption footer-copyright">Copyright © 1999-2023 Ebazar.com.br LTDA.</div>
    <div class="text-caption footer-copyright">
      CNPJ n.º 03.007.331/0001-41 / Av. das Nações Unidas, nº 3.003, Bonfim,
      Osasco/SP - CEP 06233-903 - empresa do grupo Mercado Livre.
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const itemsBaseboardLinks = [
  {
    title: "Termos e condições",
    disabled: false,
    href: "breadcrumbs_dashboard",
  },
  {
    title: "Contato",
    disabled: false,
    href: "breadcrumbs_dashboard",
  },
  {
    title: "Política de privacidade",
    disabled: false,
    href: "breadcrumbs_dashboard",
  },
];
</script>

<style lang="scss">
@import "@/styles/global.scss";

.footer-bottom-side-container {
  text-align: center;
  color: $color-gray;
  padding: 20px 0 10px 0;

  .footer-breadcrumbs {
    justify-content: center !important;
    padding: 0px 0 9px 0 !important;
    color: $color-white !important;
  }

  .footer-copyright {
    font-size: 0.6rem !important;
  }
}
</style>
