<template>
  <Presence>
    <Motion
      v-show="showForm"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0, scale: 0.6 }"
      :transition="{ delay: 0.5, duration: 0.3, easing: 'ease-in-out' }"
    >
      <v-form ref="createPasswordForm" class="signin-form-container">
        <div class="signin-content mb-16">
          <div class="text-h3 font-weight-light">Criar Senha</div>
          <div class="text-h6 mb-7 font-weight-light">
            Insira uma senha para sua conta
          </div>

          <v-text-field
            v-model="passwordInputValue"
            class="mt-4 hide-details-replacement"
            :class="[
              isPasswordValid ? 'default-input-color' : 'error-input-color',
            ]"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="showPassword ? 'text' : 'password'"
            label="Senha"
            variant="outlined"
            @click:append-inner="showPassword = !showPassword"
            :rules="passwordRules"
            @blur="passwordStringValidation"
            validate-on="blur"
            hide-details
          >
          </v-text-field>

          <v-text-field
            v-model="passwordConfirmationInputValue"
            class="mt-4 hide-details-replacement"
            :class="[
              isPasswordValid ? 'default-input-color' : 'error-input-color',
            ]"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="showPassword ? 'text' : 'password'"
            label="Repita a senha mais uma vez "
            variant="outlined"
            @click:append-inner="showPassword = !showPassword"
            :rules="passwordRules"
            @blur="passwordStringValidation"
            validate-on="blur"
            hide-details
          >
          </v-text-field>

          <v-btn
            class="text-subtitle-1 font-weight-regular mb-4"
            color="primary"
            height="45px"
            width="100%"
            variant="flat"
            :ripple="false"
          >
            Criar Conta
          </v-btn>

          <div
            class="d-flex flex-column text-subtitle-1 font-weight-regular"
            :class="[
              isPasswordValid ? 'default-input-color' : 'error-input-color',
            ]"
          >
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
import { ref } from "vue";
import { Motion, Presence } from "motion/vue";

import { passwordRules } from "@/utils/rules";

const createPasswordForm = ref();

const showForm = ref(true);

const passwordInputValue = ref("");
const passwordConfirmationInputValue = ref("");

const showPassword = ref(false);

const isPasswordValid = ref(true);
const isPasswordConfirmationValid = ref(true);

const passwordStringValidation = () => {
  const validationFunction = passwordRules[0].bind(this);

  if (validationFunction(passwordInputValue.value) != true) {
    isPasswordValid.value = false;
    return;
  }

  isPasswordValid.value = true;
};

const handleCreateAccountClick = async () => {
  const { valid } = await createPasswordForm.value.validate();

  if (valid) {
    // parei aqui


  } else isPasswordConfirmationValid.value = false;
};
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
