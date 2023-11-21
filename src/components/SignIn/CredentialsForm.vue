<template>
  <Presence>
    <Motion
      v-show="showForm"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0, scale: 0.6 }"
      :transition="{ delay: 0.5, duration: 0.30, easing: 'ease-in-out' }"
    >
      <v-form
        ref="credentialsForm"
        validate-on="layz"
        class="signin-form-container"
      >
        <div class="signin-content mb-16">
          <div class="text-h3 font-weight-light">Credenciais</div>
          <div class="text-h6 mb-7 font-weight-light">Digite sua senha</div>

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

          <div class="signin-password-area">
            <v-text-field
              v-model="passwordInputValue"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :type="showPassword ? 'text' : 'password'"
              label="Senha"
              variant="outlined"
              @click:append-inner="showPassword = !showPassword"
              :rules="passwordRules"
              hint="A senha requer no mínimo 8 caracteres, incluindo letras e números."
              persistent-hint
            ></v-text-field>
          </div>

          <validation-filler :active="true" />

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
      </v-form>
    </Motion>
  </Presence>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSignInStore } from "@/store/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { sha256 } from "js-sha256";

import ValidationFiller from "../ValidationFiller.vue";
import { passwordRules } from "@/utils/rules";

import { Motion, Presence } from "motion/vue";

const router = useRouter();

const signInStore = useSignInStore();
const { signInEmailInput } = storeToRefs(signInStore);

const credentialsForm = ref();

const passwordInputValue = ref("");
const showPassword = ref(false);

const showForm = ref(true);

var emailInputValue = "";

const handleEditClick = () => {
  router.push({
    name: "Identifier",
  });
};

const handleLogInClick = async () => {
  const { valid } = await credentialsForm.value.validate();

  if (valid) {
    console.log(sha256(passwordInputValue.value));
    console.log(emailInputValue);
  } else console.log("erro");
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
