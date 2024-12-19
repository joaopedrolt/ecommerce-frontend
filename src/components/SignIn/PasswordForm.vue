<template>
  <Presence>
    <Motion v-show="showForm" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0, scale: 0.6 }"
      :transition="{ delay: 0.5, duration: 0.3, easing: 'ease-in-out' }">
      <v-form ref="passwordForm" class="signin-form-container" @submit.prevent>
        <div class="signin-content">
          <SignInHeader title="Criar Senha" subtitle="Insira uma senha para sua conta" />

          <v-text-field v-model="passwordInputValue" class="mt-4 hide-details-replacement" :class="[
      isPasswordValid ? 'default-input-color' : 'error-input-color',
    ]" type="password" label="Senha" variant="outlined" :rules="passwordRules" @blur="handlePasswordValidation"
            validate-on="blur" hide-details>
          </v-text-field>

          <v-text-field ref="passwordConfirmationInput" v-model="passwordConfirmationInputValue" :class="[
      isPasswordConfirmationValid
        ? 'default-input-color'
        : 'error-input-color',
    ]" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" :type="showPassword ? 'text' : 'password'"
            label="Repita a senha mais uma vez " variant="outlined" @click:append-inner="showPassword = !showPassword"
            validate-on="submit" :rules="isPasswordConfirmationValid
      ? [() => true]
      : [() => 'As senhas não são iguais!']
      " :disabled="!isPasswordValid || passwordInputValue.length == 0">
          </v-text-field>

          <validation-filler :active="!isPasswordConfirmationValid" />

          <v-btn @click="handleCreateAccountClick"
            class="text-subtitle-1 font-weight-regular button-color button-dark mb-4" height="45px" width="100%"
            variant="flat" :ripple="false" type="submit">
            Criar Conta
          </v-btn>

          <div class="d-flex flex-column text-subtitle-1 font-weight-regular" :class="[
      isPasswordValid ? 'default-input-color' : 'error-input-color',
    ]">
            Atenção!
            <div class="text-subtitle-2 font-weight-light">
              A senha requer no mínimo 8 caracteres, incluindo letras e números.
            </div>
          </div>
        </div>
      </v-form>
    </Motion>
  </Presence>
</template>

<script setup>
import { ref, watch } from "vue";
import { Motion, Presence } from "motion/vue";

import { passwordRules } from "@/utils/rules";

import ValidationFiller from '@/components/ValidationFiller.vue';
import SignInHeader from "./SignInHeader.vue";

const passwordForm = ref();

const showForm = ref(true);

const passwordInputValue = ref("");

const passwordConfirmationInput = ref();
const passwordConfirmationInputValue = ref("");

const showPassword = ref(false);

const isPasswordValid = ref(true);
const isPasswordConfirmationValid = ref(true);

const handlePasswordValidation = () => {
  const validationFunction = passwordRules[0].bind(this);

  console.log(validationFunction(passwordInputValue.value))

  if (validationFunction(passwordInputValue.value) != true) {
    isPasswordValid.value = false;
    passwordConfirmationInputValue.value = "";
    isPasswordConfirmationValid.value = true;
    return;
  }

  isPasswordValid.value = true;
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
  const valid = handlePasswordConfirmationValidation();

  if (valid) {
    console.log("valido");
  }
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
