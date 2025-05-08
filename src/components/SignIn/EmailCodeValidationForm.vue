<template>
  <Presence>
    <Motion v-show="showForm" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0, scale: 1 }"
      :transition="{ delay: 0.5, duration: 0.3, easing: 'ease-in-out' }">
      <v-form ref="emailCodeValidation" validate-on="layz" class="signin-form-container">
        <div class="signin-content">
          <SignInHeader title="Validação" subtitle="Insira o código de segurança recebido" />

          <v-otp-input v-model="validationCodeInput" class="my-1" type="number" :disabled="loading" :error="validationError"></v-otp-input>

          <template v-if="validationErrorMessage && validationErrorMessage.length > 0">
            <transition name="dropdown" @before-leave="instantLeave">
              <div v-if="validationErrorMessage && validationErrorMessage.length > 0"
                class="dropdown-content v-messages v-messages__message mb-4"
                style="color: rgb(var(--v-theme-error)); opacity: 1 !important;">
                {{ validationErrorMessage }}
              </div>
            </transition>
          </template>

          <div class="text-subtitle-2 font-weight-light">
            Enviamos um código para o e-mail
            <b>{{ signInEmailInput }}</b> para garantir sua segurança. Caso não
            tenha recebido, verifique sua caixa de spam.
          </div>

          <div v-if="showCountdown" class="text-subtitle-1 font-weight-light mt-2 mb-3">
            Tempo para reenviar o código:
            <b>
              <vue-countdown :time="90000" v-slot="{ minutes, seconds }" :transform="formattedTime"
                @end="showCountdown = false">
                {{ minutes }}:{{ seconds }}
              </vue-countdown>
            </b>
          </div>

          <v-btn v-if="!showCountdown && !loading" @click="handleSendAnotherCodeClick"
            class="text-subtitle-1 font-weight-regular button-color button-dark mt-4 mb-2" :loading="loading"
            color="#111111" height="45px" width="100%" variant="outlined" :ripple="false">
            Solicitar Novo Código
          </v-btn>

          <v-btn @click="handleValidationClick"
            class="text-subtitle-1 font-weight-regular button-color button-light mb-4" :loading="loading" height="45px"
            :class="loading ? 'mt-4' : ''" width="100%" variant="flat" :ripple="false" :disabled="disableConfirmButton">
            Confirmar
          </v-btn>
        </div>
      </v-form>
    </Motion>
  </Presence>
</template>

<script setup>
import { ref, watch, computed, onUnmounted } from "vue";
import { useSignInStore } from "@/store/store";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

import SignInHeader from "./SignInHeader.vue";

import { Motion, Presence } from "motion/vue";

import { sendOtpEmail } from "@/services/emailService";

const router = useRouter();
const route = useRoute();

const queryParamType = computed(() => route.query.type)
const fromQuery = computed(() => route.query.from)

const signInStore = useSignInStore();
const { signInEmailInput, otpCode } = storeToRefs(signInStore);

const showForm = ref(true);

const showCountdown = ref(true);
const validationCodeInput = ref("");
const validationError = ref(false);

const disableConfirmButton = ref(true);

const validationErrorMessage = ref();

const loading = ref(false);

const formattedTime = (props) => {
  const formattedProps = {};

  Object.entries(props).forEach(([key, value]) => {
    formattedProps[key] = value < 10 ? `0${value}` : String(value);
  });

  return formattedProps;
};

const codeStringValidation = (codeString) => {
  return (
    codeString.length >= 6 &&
    !/\s/g.test(codeString) &&
    !/[a-zA-Z]/.test(codeString)
  );
};

const handleSendAnotherCodeClick = async () => {
  loading.value = true;

  validationErrorMessage.value = null;
  validationError.value = false;
  validationCodeInput.value = "";

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

const handleValidationClick = async () => {
  if (!codeStringValidation(validationCodeInput.value)) {
    validationError.value = true;
    return;
  }

  if (otpCode.value == validationCodeInput.value) {
    let routeParams = {
      name: "Password",
      query: { type: queryParamType.value },
    }

    if (fromQuery.value != null && fromQuery.value?.length > 0) {
      routeParams.query['from'] = fromQuery.value;
      console.log(routeParams.query['from'])
    }

    validationErrorMessage.value = null;
    validationError.value = false;

    router.push(routeParams);
    return;
  }
  else {
    validationError.value = true;
    validationErrorMessage.value = "Código Inválido!";
  }
};

watch(validationCodeInput, (newCodeInput) => {
  validationErrorMessage.value = null;
  validationError.value = false;

  if (codeStringValidation(newCodeInput)) disableConfirmButton.value = false;
  else if (!disableConfirmButton.value) disableConfirmButton.value = true;
});

const instantLeave = (el) => {
  el.style.transition = "none";
  el.style.maxHeight = "none";
  el.style.opacity = "0";
};

/* onUnmounted(() => {
  signInEmailInput.value = "";
}); */
</script>

<style lang="scss">
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
</style>
