<template>
  <Presence>
    <Motion tag="div" style="width: 100%;" v-show="showForm" :initial="{ opacity: 0, width: '100%' }"
      :animate="{ opacity: 1 }" :exit="{ opacity: 0, width: '100%', scale: 0.6 }"
      :transition="{ delay: 0.5, duration: 0.3, easing: 'ease-in-out' }">
      <v-form ref="passwordForm" class="signin-form-container" @submit.prevent>
        <div class="signin-content">
          <SignInHeader title="Criar Senha" subtitle="Insira uma senha para sua conta" />

          <v-text-field ref="passwordInput" v-model="passwordInputValue" :class="[
            isPasswordValid ? 'default-input-color' : 'error-input-color',
          ]" type="password" label="Senha" variant="outlined" :rules="passwordRules" 
            @blur="handlePasswordValidation(true)" validate-on="blur" :disabled="loading">
          </v-text-field>

          <validation-filler :active="!isPasswordValid" />

          <v-text-field ref="passwordConfirmationInput" v-model="passwordConfirmationInputValue" :class="[
            isPasswordConfirmationValid
              ? 'default-input-color'
              : 'error-input-color',
          ]" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" :type="showPassword ? 'text' : 'password'"
            label="Repita a senha mais uma vez " variant="outlined" @click:append-inner="showPassword = !showPassword"
            validate-on="submit" :rules="isPasswordConfirmationValid
              ? [() => true]
              : [() => 'As senhas não são iguais!']
              " :disabled="!isPasswordValid || passwordInputValue.length == 0 || loading">
          </v-text-field>

          <validation-filler :active="!isPasswordConfirmationValid" />

          <template
            v-if="isPasswordValid && isPasswordConfirmationValid && signUpErrorMessage && signUpErrorMessage.length > 0">
            <div v-if="isPasswordValid && signUpErrorMessage && signUpErrorMessage.length > 0"
              class="dropdown-content v-messages v-messages__message mb-5"
              style="color: rgb(var(--v-theme-error)); opacity: 1 !important;">
              {{ signUpErrorMessage }}
            </div>
          </template>

          <v-btn @click="handleCreateAccountClick"
            class="text-subtitle-1 font-weight-regular button-color button-light mb-4" :loading="loading" height="45px"
            width="100%" variant="flat" :ripple="false" :disabled="!isPasswordValid" type="submit">
            Criar Conta
          </v-btn>
        </div>
      </v-form>
    </Motion>
  </Presence>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { storeToRefs } from "pinia";

import { useRouter, useRoute } from "vue-router";

import { Motion, Presence } from "motion/vue";
import { useSignInStore } from "@/store/store";

import { passwordRules, nomeRules } from "@/utils/rules";

import ValidationFiller from '@/components/ValidationFiller.vue';
import SignInHeader from "./SignInHeader.vue";

import signUp from "@/auth/signUp"

const router = useRouter();
const route = useRoute()

const fromQuery = computed(() => route.query.from)

const signInStore = useSignInStore();
const { signInEmailInput, otpCode } = storeToRefs(signInStore);

const passwordForm = ref();

const showForm = ref(true);

const passwordInput = ref();
const passwordInputValue = ref("");

const passwordConfirmationInput = ref();
const passwordConfirmationInputValue = ref("");

const showPassword = ref(false);

const isPasswordValid = ref(true);
const isPasswordConfirmationValid = ref(true);

const signUpErrorMessage = ref();

const loading = ref(false);

const handlePasswordValidation = async (blur = false) => {
  if (blur) {
    isPasswordValid.value = passwordRules.every((rule) => rule(passwordInputValue.value) === true);
  }
  else {
    const validationResponse = await passwordInput.value.validate();
    isPasswordValid.value = validationResponse?.length > 0 ? false : true;
  }

  if (!isPasswordValid.value) {
    isPasswordConfirmationValid.value = true;

    passwordConfirmationInput.value.reset();
    setTimeout(() => {
      passwordConfirmationInputValue.value = "";
    }, 10);

    return false;
  }

  return true;
};

const handlePasswordConfirmationValidation = () => {
  if (passwordConfirmationInputValue.value == passwordInputValue.value) {
    isPasswordConfirmationValid.value = true;
    return true;
  } else {
    isPasswordConfirmationValid.value = false;
    return false;
  }
};

const handleCreateAccountClick = async () => {
  loading.value = true;
  signUpErrorMessage.value = null;

  var valid = await handlePasswordValidation();

  if (valid)
    valid = handlePasswordConfirmationValidation();

  if (valid) {
    const { success, error } = await signUp(signInEmailInput.value, passwordInputValue.value);

    if (success) {
      if (fromQuery.value != null && fromQuery.value?.length > 0) {
        try {
          router.push({ name: fromQuery.value });
        } catch (error) {
          console.log(error);
          router.push({ name: "Home" });
        }
      }
    }
    else {
      signUpErrorMessage.value = error;
    }
  }

  loading.value = false;
};

watch(passwordInputValue, () => {
  if (passwordConfirmationInputValue.value.length > 0) {
    isPasswordConfirmationValid.value = true;

    passwordConfirmationInput.value.reset();
    setTimeout(() => {
      passwordConfirmationInputValue.value = "";
    }, 10);
  }
});
</script>

<style lang="scss"></style>
