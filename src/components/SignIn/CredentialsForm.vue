<template>
  <div class="signin-form-container">
    <div class="signin-content mb-15">
      <div class="text-h3 font-weight-light">Credenciais</div>
      <div class="text-h6 mb-4 font-weight-light">Digite sua senha</div>
      <v-text-field
        v-model="signInEmailInput"
        class="custom-disabled-input"
        label="E-mail"
        variant="outlined"
        append-inner-icon="mdi-pencil"
        @click:append-inner="handleEditClick"
        readonly
      >
      </v-text-field>

      <v-text-field
        v-model="passwordInputValue"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'text' : 'password'"
        label="Senha"
        variant="outlined"
        @click:append-inner="showPassword = !showPassword"
      ></v-text-field>

      <v-btn
        @click="handleLogInClick"
        class="text-subtitle-1 font-weight-regular mb-4"
        color="primary"
        height="45px"
        width="100%"
        variant="flat"
        :ripple="false"
      >
        Entrar
      </v-btn>

      <div class="d-flex flex-column">
        Esqueceu sua senha?
        <a class="text-decoration-none" href="" style="color: #0d47a1">
          Clique aqui para recuperar sua senha!
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
import { sha256 } from 'js-sha256';

const router = useRouter();

const signInStore = useSignInStore();
const { signInEmailInput } = storeToRefs(signInStore);

const passwordInputValue = ref("");
const showPassword = ref(false);

const handleEditClick = () => {
  router.push({
    name: "Identifier",
  });
};

const handleLogInClick = () => {
  console.log(sha256(passwordInputValue.value))
  /*  router.push({
    name: "Identifier",
  }); */
};
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
    --v-field-border-opacity: 0.38 !important;
    --v-field-border-width: 1px !important;
  }
}
</style>
