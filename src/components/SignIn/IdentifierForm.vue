<template>
  <v-form ref="identifierForm" validate-on="layz" class="signin-form-container">
    <div class="signin-content mb-15">
      <div class="text-h3 font-weight-light">Bem-vindo</div>
      <div class="text-h6 mb-7 font-weight-light">Digite seu e-mail</div>
      <v-text-field
        class="my-3"
        v-model="signInEmailInput"
        variant="outlined"
        label="E-mail"
        :rules="emailRules"
        @keyup.enter="handleContinueClick"
        @keydown.enter.prevent
      >
      </v-text-field>

      <v-btn
        @click="handleContinueClick"
        class="text-subtitle-1 font-weight-regular mb-4"
        color="primary"
        height="45px"
        width="100%"
        variant="flat"
        :ripple="false"
      >
        Continuar
      </v-btn>

      <div class="d-flex flex-column">
        É novo por aqui?
        <a class="text-decoration-none" href="" style="color: #0d47a1">
          Clique aqui para criar sua conta!
        </a>
      </div>
    </div>
  </v-form>
</template>

<script setup>
import { ref } from "vue";
import { useSignInStore } from "@/store/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

const signInStore = useSignInStore();
const { signInEmailInput } = storeToRefs(signInStore);

const identifierForm = ref();

const emailRules = [
  (value) => {
    if (value) return true;

    return "E-mail não pode ser vazio.";
  },
  (value) => {
    if (/.+@.+\..+/.test(value)) return true;

    return "E-mail must be valid.";
  },
];

const handleContinueClick = async () => {
  const { valid } = await identifierForm.value.validate();

  if (valid) {
    setTimeout(() => {
      router.push({ name: "Credentials" });
    }, 100);
  } else alert("invalido");
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
</style>
