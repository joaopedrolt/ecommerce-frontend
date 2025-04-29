<template>
  <Presence>
    <Motion v-show="showForm" :initial="{ opacity: 0, width: '100%' }" :animate="{ opacity: 1, width: '100%' }"
      :exit="{ opacity: 0, scale: 0.6 }" :transition="{ delay: 0.5, duration: 0.3, easing: 'ease-in-out' }">
      <v-form ref="loginForm" validate-on="layz" class="signin-form-container">
        <div class="signin-content">
          <SignInHeader title="Credenciais" subtitle="Insira sua senha" />

          <v-text-field v-model="signInEmailInput" class="custom-disabled-input" label="E-mail" variant="outlined"
            append-inner-icon="mdi-pencil" @click:append-inner="handleEditClick" readonly>
          </v-text-field>

          <div class="signin-password-area">
            <v-text-field ref="passwordInput" v-model="passwordInputValue" :class="[
              isPasswordValid ? 'default-input-color' : 'error-input-color',
            ]" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" :disabled="loadingRecovery"
              :type="showPassword ? 'text' : 'password'" label="Senha" variant="outlined"
              @click:append-inner="showPassword = !showPassword" :rules="passwordRules" persistent-hint
              @keyup.enter="handleLogInClick" @keydown.enter.prevent
              :hide-details="isPasswordValid && signInErrorMessage && signInErrorMessage.length > 0"></v-text-field>

            <validation-filler :active="!isPasswordValid" />
          </div>

          <template v-if="isPasswordValid && signInErrorMessage && signInErrorMessage.length > 0">
            <transition name="dropdown" @before-leave="instantLeave">
              <div v-if="isPasswordValid && signInErrorMessage && signInErrorMessage.length > 0"
                class="dropdown-content v-messages v-messages__message my-4"
                style="color: rgb(var(--v-theme-error)); opacity: 1 !important;">
                {{ signInErrorMessage }}
              </div>
            </transition>
          </template>

          <v-btn @click="handleLogInClick" :disabled="loadingRecovery" :loading="loading"
            class="text-subtitle-1 font-weight-regular button-color button-light mb-4" height="45px" width="100%"
            variant="flat" :ripple="false">
            Entrar
          </v-btn>

          <div v-if="!showCountdown" class="mt-1" style="height: 48px;">

            <template v-if="!loadingRecovery">
              <div>
                <div class="text-subtitle-1 font-weight-regular" style="height: 24px;">Esqueceu sua senha?
                </div>

                <v-btn @click="handleRecoverPassword" :disabled="loadingRecovery" :ripple="false" variant="text"
                  class="recover-link text-subtitle-2 text-decoration-underline font-weight-light">Clique aqui
                  para recuperar sua senha!</v-btn>
              </div>
            </template>
            <template v-else>
              <div class="d-flex flex-column justify-center align-center" style="height: 48px;">
                <div class="text-subtitle-2 font-weight-regular w-100">Enviando e-mail de
                  recuperação
                  de senha...</div>

                <div class="d-flex justify-center px-5 mt-1 w-100">
                  <v-progress-linear indeterminate></v-progress-linear>
                </div>
              </div>
            </template>
          </div>

          <div v-if="showCountdown" class="mt-1" style="max-height: 48px;">
            <div class="d-flex justify-center align-center" style="height: 23px;">
              <div class="text-subtitle-1 font-weight-bold">Email enviado
                com
                sucesso!</div>

              <div class="pl-1 text-subtitle-2 font-weight-regular" style="transform: translateY(0.4px);">(verifique seu
                spam).
              </div>
            </div>


            <span class="text-subtitle-2 font-weight-light">
              Tempo para reenviar novo email:
              <b>
                <vue-countdown :time="60000" v-slot="{ minutes, seconds }" :transform="formattedTime"
                  @end="showCountdown = false">
                  {{ minutes }}:{{ seconds }}
                </vue-countdown>
              </b>
            </span>
          </div>
        </div>



        <!--   <v-btn v-if="!showCountdown && !loading" @click="handleSendAnotherCodeClick"
          class="text-subtitle-1 font-weight-regular button-color button-dark mt-4 mb-2" :loading="loading"
          color="#111111" height="45px" width="100%" variant="outlined" :ripple="false">
          Solicitar Novo Código
        </v-btn> -->

      </v-form>
    </Motion>
  </Presence>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useSignInStore } from "@/store/store";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { sha256 } from "js-sha256";

import SignInHeader from "./SignInHeader.vue";
import ValidationFiller from '@/components/ValidationFiller.vue';

import { passwordRules } from "@/utils/rules";

import { Motion, Presence } from "motion/vue";

import signIn from "@/auth/signIn.js";
import { recoverPasswordOut } from "@/auth/recoverPassword"

import { sendOtpEmail } from "@/services/otp";
import { set } from "@vueuse/core";

const router = useRouter();
const route = useRoute()

const fromQuery = computed(() => route.query.from)

const signInStore = useSignInStore();
const { signInEmailInput, otpCode } = storeToRefs(signInStore);

const loginForm = ref();

const passwordInput = ref();
const passwordInputValue = ref("");

const showPassword = ref(false);
const isPasswordValid = ref(true);

const showForm = ref(true);

const signInErrorMessage = ref();

const loading = ref(false);
const loadingRecovery = ref(false);

const showCountdown = ref(false);

const formattedTime = (props) => {
  const formattedProps = {};

  Object.entries(props).forEach(([key, value]) => {
    formattedProps[key] = value < 10 ? `0${value}` : String(value);
  });

  return formattedProps;
};

const handleSendAnotherCodeClick = async () => {
  loading.value = true;

  /*   validationErrorMessage.value = null;
    validationError.value = false;
    validationCodeInput.value = ""; */

  const response = await sendOtpEmail(signInEmailInput.value);

  if (response.success) {
    showCountdown.value = true;
    otpCode.value = response.code;
  }
  else {
    validationErrorMessage.value = response.message;
  }

  loading.value = false;
};

const handleEditClick = () => {
  let routeParams = {
    name: "EmailValidation",
  }

  if (fromQuery.value != null && fromQuery.value?.length > 0) {
    routeParams.query = { from: fromQuery.value }
  }

  router.push(routeParams);
};

const handleLogInClick = async () => {
  loading.value = true;
  signInErrorMessage.value = null;

  const { valid } = await loginForm.value.validate();

  if (valid) {
    isPasswordValid.value = true;

    const { error } = await signIn(signInEmailInput.value, passwordInputValue.value);

    if (error) {
      signInErrorMessage.value = error;
      passwordInputValue.value = "";
    } else {
      if (fromQuery.value != null && fromQuery.value?.length > 0) {
        try {
          router.push({ name: fromQuery.value });
        } catch (error) {
          console.error(error);
          router.push({ name: "Home" });
        }
      } else {
        router.push({ name: "Home" });
      }
    }
  } else isPasswordValid.value = false;

  loading.value = false;
};

const handleRecoverPassword = async () => {
  loadingRecovery.value = true;

  passwordInputValue.value = "";
  passwordInput.value?.reset();
  isPasswordValid.value = true

  const response = await recoverPasswordOut(signInEmailInput.value);

  if (!response) {
    alert("Houve um erro ao enviar o e-mail de recuperação!");
    loadingRecovery.value = false;
  } else {
    showCountdown.value = true;
  }

  loadingRecovery.value = false;
}

onMounted(() => {
  /*   emailInputValue = signInEmailInput.value; */
});

const instantLeave = (el) => {
  el.style.transition = "none";
  el.style.maxHeight = "none";
  el.style.opacity = "0";
};
</script>

<style lang="scss">
@import "@/styles/global.scss";

.signin-password-area {
  .v-messages__message {
    height: 24px !important;
  }
}

.custom-disabled-input {
  label {
    opacity: var(--v-medium-emphasis-opacity) !important;
  }

  input {
    cursor: default !important;
  }

  .v-field__outline {
    --v-field-border-opacity: 0.38 !important;
    --v-field-border-width: 1px !important;
  }
}

.recover-link {
  color: black !important;
  cursor: pointer !important;

  .v-btn__overlay {
    opacity: 0 !important;
  }

  &.v-btn.v-btn--density-default {
    height: fit-content !important;
  }
}
</style>
