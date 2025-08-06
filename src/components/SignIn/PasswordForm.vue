<template>
  <TransitionGroup>
    <Motion key="update" tag="div" style="width: 100%;" v-show="showForm" :initial="{ opacity: 0, width: '100%' }"
      :animate="{ opacity: 1 }" :exit="{ opacity: 0, width: '100%', scale: 0.6 }"
      :transition-="{ delay: 0.5, duration: 0.3, easing: 'ease-in-out' }">
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

          <v-btn @click="handleSubmitPasswordFormClick"
            class="text-subtitle-1 font-weight-regular button-color button-light mb-4" :loading="loading" height="45px"
            width="100%" variant="flat" :ripple="false" :disabled="!isPasswordValid" type="submit">
            {{ typeQuery == "recover" ? "Alterar Senha" : "Criar Conta" }}
          </v-btn>
        </div>
      </v-form>
    </Motion>

    <Motion key="updated" tag="div" style="width: 100%;" v-show="!showForm && passwordUpdated && typeQuery == 'recover'"
      :initial="{ opacity: 0, width: '100%' }" :animate="{ opacity: 1 }"
      :exit="{ opacity: 0, width: '100%', scale: 0.6 }"
      :transition="{ delay: 0.5, duration: 0.3, easing: 'ease-in-out' }">
      <div class="signin-form-container">
        <div class="signin-content">
          <div class="d-flex justify-center" style="height: 100%; width: 100%;">
            <v-icon size="80" class="pb-4" style=" flex: 2;">mdi-check-circle</v-icon>
            <div class="d-flex flex-column justify-center align-center" style="height: 100%; flex: 6;">
              <SignInHeader title="Senha Alterada" subtitle="Sua senha foi alterada com sucesso!" />
            </div>
          </div>

          <v-btn @click="handleTabClose" class="text-subtitle-1 font-weight-regular button-color button-light mb-4"
            height="45px" width="100%" variant="flat" :ripple="false">
            Continuar
          </v-btn>
        </div>
      </div>
    </Motion>
  </TransitionGroup>
</template>

<script setup>
import { ref, watch, computed, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";

import { useRouter, useRoute } from "vue-router";

import { Motion, Presence } from "motion/vue";
import { useSignInStore } from "@/store/store";

import { passwordRules, emailRules } from "@/utils/rules";

import ValidationFiller from '@/components/ValidationFiller.vue';
import SignInHeader from "./SignInHeader.vue";

import updatePassword from "@/auth/updatePassword"
import { updatePassword as updatePasswordDB } from "@/data/user"

import signUp from "@/auth/signUp"
import signOut from "@/auth/signOut";
import { recoverPasswordIn } from "@/auth/recoverPassword"
import { set } from "@vueuse/core";

const router = useRouter();
const route = useRoute()

const fromQuery = computed(() => route.query.from)
const typeQuery = computed(() => route.query.type)
const emailQuery = computed(() => route.query.email)

const passwordUpdated = ref(false);

const url = computed(() => window.location.href);

const signInStore = useSignInStore();
const { signInEmailInput } = storeToRefs(signInStore);

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

const handleSubmitPasswordFormClick = async () => {
  loading.value = true;
  signUpErrorMessage.value = null;

  var valid = await handlePasswordValidation();

  if (valid)
    valid = handlePasswordConfirmationValidation();

  if (valid) {
    if (typeQuery.value == "recover") {
      const { success, user, error } = await recoverPasswordIn(url.value, signInEmailInput.value);

      if (success) {
        valid = await updatePassword(user, passwordInputValue.value);

        if (valid) {
          await signOut()

          passwordUpdated.value = true;
          showForm.value = false;

          updatePasswordDB(signInEmailInput.value, passwordInputValue.value);
          return;
        }
        else {
          signUpErrorMessage.value = "Erro ao atualizar a senha!";
        }
      }
      else {
        signUpErrorMessage.value = error;
      }
    }
    else if (typeQuery.value == "create") {
      const { success, error } = await signUp(signInEmailInput.value, passwordInputValue.value);

      if (success) {
        if (fromQuery.value != null && fromQuery.value?.length > 0) {
          try {
            setTimeout(() => {
              router.push({ name: fromQuery.value });
            }, 400);
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
    else {
      router.push({ name: "Home" });
    }
  }

  loading.value = false;
};

const handleTabClose = () => {
  /*   window.close(); */

  router.push({ name: "EmailValidation" });
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

onBeforeMount(async () => {
  document.title = "Senha | FURVANA"

  if (typeQuery.value == "recover") {
    signInEmailInput.value = decodeURIComponent(emailQuery.value);

    const isEmailValid = emailRules.every((rule) => rule(signInEmailInput.value) === true);
    if (!isEmailValid) {
      router.push({ name: "Home" });
    }
  }
})
</script>

<style lang="scss"></style>
