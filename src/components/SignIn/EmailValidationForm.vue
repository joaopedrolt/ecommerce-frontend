<template>
  <Presence>
    <Motion
      v-show="showForm"
      :initial="{ opacity: 0, scale: 0 }"
      :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0.6 }"
      :transition="{ duration: 0.35, easing: 'ease-in-out' }"
    >
      <v-form
        ref="emailValidationForm"
        validate-on="layz"
        class="signin-form-container"
      >
        <div class="signin-content mb-16">
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

          <validation-filler :active="!isValidEmail" />

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

          <div class="d-flex flex-column text-subtitle-1 font-weight-regular">
            É novo por aqui?
            <div class="text-subtitle-2 font-weight-light">
              Digite seu e-mail e te enviaremos um código de segurança para você
              criar sua conta!
            </div>
          </div>
        </div>
      </v-form>
    </Motion>
  </Presence>
</template>

<script setup>
import { ref } from "vue";
import { useSignInStore } from "@/store/store";
import { storeToRefs } from "pinia";
import { useRouter, onBeforeRouteLeave } from "vue-router";

import ValidationFiller from "../ValidationFiller.vue";
import { emailRules } from "@/utils/rules";

import { Motion, Presence } from "motion/vue";

const router = useRouter();

const signInStore = useSignInStore();
const { signInEmailInput } = storeToRefs(signInStore);

const emailValidationForm = ref();

const isValidEmail = ref(true);
const showForm = ref(true);

const handleContinueClick = async () => {
  const { valid } = await emailValidationForm.value.validate();

  if (valid) {
    showForm.value = false;

    // Validacao se email exite

    var isAreadyRegistered = false;

    if (signInEmailInput.value == "v@gmail.com") {
      isAreadyRegistered = false;
    } else {
      isAreadyRegistered = true;
    }

    // Fim validacao

    if (isAreadyRegistered) {
      setTimeout(() => {
        router.push({ name: "Login" });
      }, 600);
    }

    if (!isAreadyRegistered) {
      setTimeout(() => {
        router.push({ name: "EmailCodeValidation", query: { type: "create" } });
      }, 600);
    }
  } else isValidEmail.value = false;
};

onBeforeRouteLeave((to, from) => {
  if (to.name != "EmailCodeValidation" && to.name != "Login") {
    signInEmailInput.value = "";
  }
});
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
