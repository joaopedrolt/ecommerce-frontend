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
            <v-text-field v-model="passwordInputValue" :class="[
              isPasswordValid ? 'default-input-color' : 'error-input-color',
            ]" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" :type="showPassword ? 'text' : 'password'"
              label="Senha" variant="outlined" @click:append-inner="showPassword = !showPassword" :rules="passwordRules"
              persistent-hint @keyup.enter="handleLogInClick" @keydown.enter.prevent
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

          <v-btn @click="handleLogInClick" class="text-subtitle-1 font-weight-regular button-color button-light mb-4"
            height="45px" width="100%" variant="flat" :ripple="false">
            Entrar
          </v-btn>

          <!--    <div>
            <div style="height: 24px;">Esqueceu sua senha?</div>
            <router-link class="recover-link font-weight-regular"
              :to="{ name: 'EmailCodeValidation', query: { type: 'recover' } }">
              Clique aqui para recuperar sua senha!</router-link>
          </div> -->
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

import SignInHeader from "./SignInHeader.vue";
import ValidationFiller from '@/components/ValidationFiller.vue';

import { passwordRules } from "@/utils/rules";

import { Motion, Presence } from "motion/vue";

import signIn from "@/auth/signIn.js";

const router = useRouter();

const signInStore = useSignInStore();
const { signInEmailInput } = storeToRefs(signInStore);

const loginForm = ref();

const passwordInputValue = ref("");

const showPassword = ref(false);
const isPasswordValid = ref(true);

const showForm = ref(true);

const signInErrorMessage = ref();

const handleEditClick = () => {
  router.push({
    name: "EmailValidation",
  });
};

const handleLogInClick = async () => {
  signInErrorMessage.value = null;

  const { valid } = await loginForm.value.validate();

  if (valid) {
    isPasswordValid.value = true;

    const { error } = await signIn(signInEmailInput.value, passwordInputValue.value);

    if (error) {
      signInErrorMessage.value = error;
      passwordInputValue.value = "";
      return;
    } else {
      router.push({ name: "Home" });
    }
  } else isPasswordValid.value = false;
};

const instantLeave = (el) => {
  el.style.transition = "none";
  el.style.maxHeight = "none";
  el.style.opacity = "0";
};

onMounted(() => {
  /*   emailInputValue = signInEmailInput.value; */
});
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
}
</style>
