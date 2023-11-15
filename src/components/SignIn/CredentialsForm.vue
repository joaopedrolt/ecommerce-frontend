<template>
  <div class="signin-form-container">
    <div class="signin-content mb-15">
      <div class="text-h3 font-weight-light">Credenciais</div>
      <div class="text-h6 mb-4 font-weight-light">Digite sua senha</div>
      <v-text-field
        v-model="signInEmail"
        variant="outlined"
        placeholder="E-mail"
        :disabled="true"
      >
      </v-text-field>

      <v-btn
        class="text-subtitle-1 font-weight-regular mb-4"
        color="primary"
        height="45px"
        width="100%"
        variant="flat"
        :ripple="false"
      >
        Entrar
      </v-btn>

      <div class="">
        Novo por aqui?
        <a class="text-decoration-none" href="" style="color: #0d47a1">
          Criar uma nova conta
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSignInStore } from "@/store/store";
import { storeToRefs } from "pinia";

const signInStore = useSignInStore();
const { signInEmail } = storeToRefs(signInStore);
</script>

<style lang="scss">
@import "@/styles/global.scss";

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
</style>
