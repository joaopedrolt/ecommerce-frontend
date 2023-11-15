<template>
  <div class="signin-form-container">
    <div class="signin-content mb-15">
      <div class="text-h3 font-weight-light">Credenciais</div>
      <div class="text-h6 mb-4 font-weight-light">Digite sua senha</div>
      <v-text-field v-model="signInEmailInput" class="custom-disabled-input" variant="outlined" placeholder="E-mail"
        append-inner-icon="mdi-pencil" @click:append-inner="handleEditClick" readonly>
      </v-text-field>

      <v-text-field v-model="passwordInputValue" variant="outlined" placeholder="Senha"></v-text-field>

      <v-btn class="text-subtitle-1 font-weight-regular mb-4" color="primary" height="45px" width="100%" variant="flat"
        :ripple="false">
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
import { ref } from "vue";
import { useSignInStore } from "@/store/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

const signInStore = useSignInStore();
const { signInEmailInput } = storeToRefs(signInStore);

const passwordInputValue = ref("");

const handleEditClick = () => {
  router.push({
    name: "Identifier"
  });
}
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

.custom-disabled-input {
  input {
    cursor: default !important;
  }

  .v-field__outline {
    --v-field-border-opacity: 1 !important;
    --v-field-border-opacity: 0.38 !important;
  }
}
</style>
