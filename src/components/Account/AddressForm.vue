<template>
    <div class="d-flex align-center" style="min-height: 100vh;">
        <div class="container-limit container-size-padding pt-12 pb-16">
            <v-card-title class="text-center mb-1">CADASTRAR ENDEREÇO</v-card-title>

            <v-form ref="addressForm" validate-on="layz">
                <v-text-field v-model="address.nome" label="Nome do Destinatário" variant="outlined" :rules="nomeRules"
                    density="comfortable">
                </v-text-field>
                <validation-filler :active="!addressFormValidation.nome" />

                <v-text-field v-model="address.cpf" v-maska:[cpfMask] label="CPF do Destinatário" variant="outlined"
                    :rules="CPFRules" density="comfortable">
                </v-text-field>
                <validation-filler :active="!addressFormValidation.cpf" density="compact" />

                <v-text-field v-model="address.cep" v-maska:[cepMask] label="CEP" variant="outlined" :rules="CEPRules"
                    density="comfortable">
                </v-text-field>
                <validation-filler :active="!addressFormValidation.cep" density="compact" />

                <v-text-field v-model="address.endereco" label="Rua" variant="outlined" :rules="enderecoRules"
                    density="comfortable">
                </v-text-field>
                <validation-filler :active="!addressFormValidation.endereco" density="compact" />

                <v-text-field v-model="address.numero" v-maska:[numberMask] label="Numero" variant="outlined"
                    :rules="numeroRules" density="comfortable">
                </v-text-field>
                <validation-filler :active="!addressFormValidation.numero" density="compact" />

                <v-text-field v-model="address.bairro" label="Bairro" variant="outlined" :rules="bairroRules"
                    density="comfortable"></v-text-field>
                <validation-filler :active="!addressFormValidation.bairro" density="compact" />

                <!-- <v-text-field v-model="address.cidade" label="Estado" variant="outlined" :rules="nameRules"></v-text-field>
                <v-text-field v-model="address.cidade" label="Cidade" variant="outlined" :rules="nameRules"></v-text-field> -->

                <v-text-field v-model="address.complemento" label="Complemento" variant="outlined" :rules="complementoRules"
                    density="comfortable"></v-text-field>
                <validation-filler :active="!addressFormValidation.complemento" density="compact" />

                <v-btn @click="handleSaveAddress" class="text-subtitle-1 font-weight-regular button-color button-black mb-4"
                    height="45px" width="100%" variant="flat" :ripple="false">
                    Confirmar
                </v-btn>
            </v-form>
        </div>
    </div>
</template>
  
<script setup>
import { ref, reactive } from "vue";
import {
    nomeRules,
    CPFRules,
    CEPRules,
    bairroRules,
    enderecoRules,
    numeroRules,
    complementoRules,
} from "@/utils/rules";
import ValidationFiller from "../ValidationFiller.vue";
import { vMaska } from "maska"

const cpfMask = { mask: '###.###.###-##' };
const cepMask = { mask: '#####-###' };
const numberMask = { mask: '#####' };

const addressForm = ref();

const address = reactive({
    nome: "",
    cpf: "",
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    complemento: ""
});

const addressFormValidation = reactive({
    nome: true,
    cpf: true,
    cep: true,
    endereco: true,
    numero: true,
    bairro: true,
    complemento: true
});

const handleSaveAddress = async () => {
    let keys = Object.keys(address);

    for (let i = 0; i < addressForm.value.items.length; i++) {
        console.log(keys[i]);
        let mensagemErro = await addressForm.value.items[i].validate()

        if (mensagemErro.length > 0)
            addressFormValidation[keys[i]] = false;
        else
            addressFormValidation[keys[i]] = true;
    }
};
</script>
  
<style lang="scss"></style>
    