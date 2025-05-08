<template>
  <div class="d-flex align-center justify-center container-size-padding container-limit">
    <div class="d-flex flex-column align-center justify-center text-center floating-form">
      <div class="font-weight-bold text-uppercase" style="font-size: 1.9rem;">OOPS...</div>
      <div class="text-overline" style="font-size: 0.8rem !important;">A página que você estava buscando não foi
        encontrada.</div>

      <v-btn to="/" class="text-subtitle-2 text-uppercase font-weight-regular button-color button-light mt-4" height="45px"
        width="100%" variant="flat" :ripple="false">
        Voltar a página inicial
      </v-btn>
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.floating-form {
  padding-bottom: 60px;

  @media (max-width: $phone) {
    min-height: 370px;
    padding-top: 20px;
    padding-bottom: 50px !important;
  }
}
</style>