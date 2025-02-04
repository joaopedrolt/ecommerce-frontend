<template>
  <Presence>
    <Motion v-show="showForm" :initial="{ opacity: 0, scale: 0 }" :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0.6 }" :transition="{ duration: 0.35, easing: 'ease-in-out' }">
      <v-form ref="emailValidationForm" validate-on="layz" class="signin-form-container">
        <div class="signin-content">
          <SignInHeader title="Bem-Vindo" subtitle="Digite seu e-mail" />

          <v-text-field class="mt-4" v-model="signInEmailInput" variant="outlined" label="E-mail" :disabled="loading"
            :rules="emailRules" @keyup.enter="handleContinueClick" @keydown.enter.prevent>
          </v-text-field>

          <validation-filler :active="!isValidEmail" />

          <v-btn @click="handleContinueClick" :loading="loading"
            class="text-subtitle-1 font-weight-regular button-color button-light mb-4" height="45px" width="100%"
            variant="flat" :ripple="false">
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

import ValidationFiller from '@/components/ValidationFiller.vue';
import SignInHeader from "./SignInHeader.vue";

import { emailRules } from "@/utils/rules";

import { Motion, Presence } from "motion/vue";

import { sendOtpEmail } from "@/services/otp";

import { checkEmailExists } from "@/data/user"

const router = useRouter();

const signInStore = useSignInStore();
const { signInEmailInput, otpCode } = storeToRefs(signInStore);

const emailValidationForm = ref();

const isValidEmail = ref(true);
const showForm = ref(true);

const loading = ref(false);

const handleContinueClick = async () => {
  loading.value = true;

  const { valid } = await emailValidationForm.value.validate();

  if (valid) {
    showForm.value = false;

    var isAreadyRegistered = await checkEmailExists(signInEmailInput.value);

    if (isAreadyRegistered) {
      router.push({ name: "Login" });
      return;
    }

    if (!isAreadyRegistered) {
      const response = await sendOtpEmail(signInEmailInput.value);

      if (response.success && response.code) {
        router.push({ name: "EmailCodeValidation", query: { type: "create" } });
        otpCode.value = response.code;
      }

      return;
    }
  } else {
    isValidEmail.value = false;
  }

  loading.value = false;
};

onBeforeRouteLeave((to, from) => {
  if (to.name != "EmailCodeValidation" && to.name != "Login") {
    signInEmailInput.value = "";
  }
});
</script>

<style lang="scss"></style>
