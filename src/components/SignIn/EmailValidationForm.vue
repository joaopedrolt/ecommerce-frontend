<template>
  <Presence>
    <Motion
      v-show="showForm"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0, scale: 0.6 }"
      :transition="{ delay: 0.5, duration: 0.3, easing: 'ease-in-out' }"
    >
      <v-form
        ref="credentialsForm"
        validate-on="layz"
        class="signin-form-container"
      >
        <div class="signin-content mb-16">
          <div class="text-h3 font-weight-light">Validação</div>
          <div class="text-h6 font-weight-light">
            Insira o código de segurança recebido
          </div>

          <v-otp-input
            v-model="validationCodeInput"
            class="my-1"
            :error="validationError"
          ></v-otp-input>

          <div class="text-subtitle-2 font-weight-light">
            Enviamos um código para o e-mail
            <b>{{ signInEmailInput }}</b> para garantir sua segurança. Caso não
            tenha recebido, verifique sua caixa de spam.
          </div>

          <div
            v-if="showCountdown"
            class="text-subtitle-1 font-weight-light mt-2 mb-3"
          >
            Tempo para reenviar o código:
            <b>
              <vue-countdown
                :time="90000"
                v-slot="{ minutes, seconds }"
                :transform="formattedTime"
                @end="showCountdown = false"
              >
                {{ minutes }}:{{ seconds }}
              </vue-countdown>
            </b>
          </div>

          <v-btn
            v-if="!showCountdown"
            @click="showCountdown = true"
            class="text-subtitle-1 font-weight-regular mt-4 mb-2"
            color="primary"
            height="45px"
            width="100%"
            variant="flat"
            :ripple="false"
          >
            Solicitar Código
          </v-btn>

          <v-btn
            @click="handleValidationClick"
            class="text-subtitle-1 font-weight-regular mb-4"
            color="primary"
            height="45px"
            width="100%"
            variant="flat"
            :ripple="false"
          >
            Confirmar
          </v-btn>
        </div>
      </v-form>
    </Motion>
  </Presence>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSignInStore } from "@/store/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import { Motion, Presence } from "motion/vue";

const router = useRouter();

const signInStore = useSignInStore();
const { signInEmailInput } = storeToRefs(signInStore);

const credentialsForm = ref();

const showForm = ref(true);
const showCountdown = ref(true);

const validationCodeInput = ref("");
const validationError = ref(false);

var emailInputValue = ""; // request email

const formattedTime = (props) => {
  const formattedProps = {};

  Object.entries(props).forEach(([key, value]) => {
    formattedProps[key] = value < 10 ? `0${value}` : String(value);
  });

  return formattedProps;
};

const handleValidationClick = async () => {
  alert(validationCodeInput.value);
  // handle code validation
  validationError.value = true;
};

onMounted(() => {
  emailInputValue = signInEmailInput.value;
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
