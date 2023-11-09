<template>
  <div class="signin-form-component">
    <div class="signin-form-container container-limit">
      <div class="signin-content" style="padding: 0 15px">
        <div class="text-h4">Bem-vindo!</div>
        <div class="text-h5" style="margin-top: 8px; margin-bottom: 12px">
          Entrar
        </div>
        <v-text-field
          v-model="emailInputValue"
          @click:append="search"
          @keyup.enter="search"
          variant="outlined"
          placeholder="E-mail"
        >
        </v-text-field>

        <v-btn
          class="text-subtitle-1"
          color="primary"
          height="56px"
          width="100%"
          variant="flat"
          style="margin-bottom: 15px; 0"
        >
          Continuar
        </v-btn>

        <div class="">
          Novo por aqui?
          <a href="" style="color: #0d47a1; text-decoration: none">
            Criar uma nova conta
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emailInputValue = ref("");
</script>

<style lang="scss">
@import "@/styles/global.scss";

.signin-form-component {
  height: 100%;

  .signin-form-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .signin-content {
      width: 400px;
      text-align: center;
    }
  }
}
</style>
