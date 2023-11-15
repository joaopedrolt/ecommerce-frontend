<template>
  <div class="signin-form-container">
    <div class="signin-content mb-15">
      <div class="text-h3 font-weight-light">Bem-vindo</div>
      <div class="text-h6 mb-4 font-weight-light">Digite seu e-mail</div>
      <v-text-field
        v-model="emailInputValue"
        variant="outlined"
        placeholder="E-mail"
      >
      </v-text-field>

      <v-btn
        @click="handleContinueClick"
        class="text-subtitle-1 font-weight-regular mb-4"
        color="primary"
        height="45px"
        width="100%"
        variant="flat"
        :ripple="false"
      >
        Continuar
      </v-btn>

      <div class="">
        Novo por aqui?
        <a class="text-decoration-none" href="" style="color: #0d47a1">
          Criar uma nova conta
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSignInStore } from "@/store/store";
import { useRouter } from "vue-router";

const router = useRouter();

const signInStore = useSignInStore();

const emailInputValue = ref("");

const handleContinueClick = () => {
  signInStore.setSignInEmail(emailInputValue.value);
  setTimeout(() => {
    router.push({ name: "Credentials" });
  }, 100);
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
