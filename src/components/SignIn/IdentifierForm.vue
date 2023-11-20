<template>
  <v-form ref="identifierForm" validate-on="layz" class="signin-form-container">
    <div class="signin-content mb-15">
      <div class="text-h3 font-weight-light">Bem-vindo</div>
      <div class="text-h6 mb-7 font-weight-light">Digite seu e-mail</div>

      <v-text-field
        class="mt-4"
        v-model="signInEmailInput"
        variant="outlined"
        label="E-mail"
        :rules="emailRules"
        @keyup.enter="handleContinueClick"
        @keydown.enter.prevent
      >
      </v-text-field>

      <validation-filler :active="emailValidationState" />

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

import ValidationFiller from "../ValidationFiller.vue";
import { emailRules } from "@/utils/rules";

const router = useRouter();

const signInStore = useSignInStore();
const { signInEmailInput } = storeToRefs(signInStore);

const identifierForm = ref();
const emailValidationState = ref(false);

const handleContinueClick = async () => {
  const { valid } = await identifierForm.value.validate();

  if (valid) {
    emailValidationState.value = false;
    router.push({ name: "Credentials" });
  } else emailValidationState.value = true;
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
