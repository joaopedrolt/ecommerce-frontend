<template>
    <div class="d-flex align-center" style="min-height: 100vh;">
        <div class="container-limit container-size-padding adress-form">
            <v-card-title class="text-center mb-3">CADASTRAR ENDEREÇO</v-card-title>

            <v-form ref="addressForm" validate-on="layz">
                <div class="parent-input-container">
                    <div class="d-flex flex-column" style="flex: 1;">
                        <v-text-field v-model="address.nome" class="sibling-input" label="Nome do Destinatário"
                            variant="outlined" :rules="nomeRules" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="!addressFormValidation.nome" />
                    </div>

                    <div class="d-flex flex-column" style="flex: 1;">
                        <v-text-field v-model="address.sobrenome" class="sibling-input"
                            label="Sobrenome do Destinatário" variant="outlined" :rules="sobrenomeRules"
                            density="comfortable">
                        </v-text-field>
                        <validation-filler :active="!addressFormValidation.sobrenome" />
                    </div>
                </div>

                <div class="parent-input-container">
                    <div class="d-flex flex-column" style="flex: 1;">
                        <v-text-field v-model="address.cpf" v-maska:[cpfMask] class="sibling-input"
                            label="CPF do Destinatário" variant="outlined" :rules="cpfRules" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="!addressFormValidation.cpf" density="compact" />
                    </div>

                    <div class="d-flex flex-column" style="flex: 1;">
                        <v-text-field v-model="address.telefone" v-maska:[telefoneMask] :rules="telefoneRules"
                            label="Telefone" class="sibling-input" variant="outlined" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="!addressFormValidation.telefone" density="compact" />
                    </div>
                </div>

                <v-text-field v-model="address.cep" v-maska:[cepMask] label="CEP" class="sibling-input"
                    variant="outlined" :disabled="loadingAddress" :rules="cepRules" density="comfortable"
                    @blur="handleCepBlur">
                </v-text-field>
                <validation-filler :active="!addressFormValidation.cep" density="compact" />

                <div class="parent-input-container">
                    <div class="d-flex flex-column" style="flex: 3;">
                        <v-text-field v-model="address.endereco" label="Rua" class="sibling-input" variant="outlined"
                            :disabled="loadingAddress" :rules="enderecoRules" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="!addressFormValidation.endereco" density="compact" />
                    </div>

                    <div class="d-flex flex-column" style="flex: 2;">
                        <v-text-field v-model="address.numero" v-maska:[numeroMask] label="Numero" variant="outlined"
                            :disabled="loadingAddress" :rules="numeroRules" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="!addressFormValidation.numero" density="compact" />
                    </div>
                </div>

                <div class="parent-input-container">
                    <div class="d-flex flex-column" style="flex: 3;">
                        <v-text-field v-model="address.cidade" label="Cidade" class="sibling-input" variant="outlined"
                            :disabled="loadingAddress" :rules="cidadeRules" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="!addressFormValidation.cidade" density="compact" />
                    </div>

                    <div class="d-flex flex-column" style="flex: 2;">
                        <v-autocomplete id="estado" class="sibling-input" item-title="nome" item-value="sigla"
                            :rules="estadoRules" return-object v-model="address.estado" label="Estado" :items="estados"
                            variant="outlined" :disabled="loadingAddress" density="comfortable">
                        </v-autocomplete>
                        <validation-filler :active="!addressFormValidation.estado" density="compact" />
                    </div>
                </div>

                <div class="parent-input-container">
                    <div class="d-flex flex-column" style="flex: 1;">
                        <v-text-field v-model="address.bairro" label="Bairro" class="sibling-input" variant="outlined"
                            :disabled="loadingAddress" :rules="bairroRules" density="comfortable"></v-text-field>
                        <validation-filler :active="!addressFormValidation.bairro" density="compact" />
                    </div>

                    <div class="d-flex flex-column" style="flex: 1;">
                        <v-text-field v-model="address.complemento" label="Complemento" class="sibling-input"
                            variant="outlined" :disabled="loadingAddress" :rules="complementoRules"
                            density="comfortable"></v-text-field>
                        <validation-filler :active="!addressFormValidation.complemento" density="compact" />
                    </div>
                </div>

                <v-btn @click="handleSaveAddress" :loading="loadingAddress"
                    class="text-subtitle-1 font-weight-regular button-color button-light mb-4" height="45px"
                    width="100%" variant="flat" :ripple="false">
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
    sobrenomeRules,
    cpfRules,
    telefoneRules,
    cepRules,
    bairroRules,
    enderecoRules,
    cidadeRules,
    estadoRules,
    numeroRules,
    complementoRules,
} from "@/utils/rules";
import ValidationFiller from '@/components/ValidationFiller.vue';
import { vMaska } from "maska"

import {
    cpfMask,
    cepMask,
    numeroMask,
    telefoneMask
} from "@/utils/masks";

import getEstados from '@/utils/getEstados';

import { cepValidation, searchAdressByCEP } from "@/utils/cep.js";

const userId = ref("rXiNPm5lXTExkVtmPcy0");

const addressForm = ref();

const address = reactive({
    nome: "",
    sobrenome: "",
    cpf: "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    cidade: "",
    estado: null,
    bairro: "",
    complemento: "",
});

const addressFormValidation = reactive({
    nome: true,
    sobrenome: true,
    cpf: true,
    telefone: true,
    cep: true,
    endereco: true,
    numero: true,
    cidade: true,
    estado: true,
    bairro: true,
    complemento: true,
});

const estados = getEstados();

const loadingAddress = ref(false);

const clearAddressDetails = () => {
    address.numero = "";
    address.endereco = "";
    address.cidade = "";
    address.bairro = "";
    address.complemento = "";
    address.estado = null;
}

const loadAdressDetails = async () => {
    try {
        const valid = cepValidation(address.cep);

        if (valid) {
            loadingAddress.value = true;
            const returnedAdress = await searchAdressByCEP(address.cep);

            address.numero = "";

            if (!returnedAdress) {
                throw new Error();
            }

            Object.assign(address, {
                ...address,
                endereco: returnedAdress.logradouro,
                bairro: returnedAdress.bairro,
                cidade: returnedAdress.cidade,
                estado: estados.find(e => e.sigla.toLowerCase() == returnedAdress.uf.toLowerCase())
            });

            loadingAddress.value = false;
            return { valid: true };
        } else {
            clearAddressDetails();
            return { valid: false, reason: "Formato inválido!" };
        }
    } catch (error) {
        clearAddressDetails();
        loadingAddress.value = false;

        return { valid: false, reason: "CEP não encontrado!" };
    }
}

const handleCepBlur = async () => {
    /*    if (step.value == 0 && displayAddressPartialForm.value) {
           setShippingFormLoading(true);
            await loadAdressDetails();
           setShippingFormLoading(false);
       } */

    await loadAdressDetails();
}

const handleSaveAddress = async () => {
    let keys = Object.keys(address);

    let valid = true;

    for (let i = 0; i < addressForm.value.items.length; i++) {
        let mensagemErro = await addressForm.value.items[i].validate()

        if (mensagemErro.length > 0) {
            addressFormValidation[keys[i]] = false;
            valid = false;
        }
        else {
            /*         console.log("n foi:" + keys[i])
                    console.log(mensagemErro) */

            addressFormValidation[keys[i]] = true;
        }
    }

    console.log(valid)

    if (valid) {
        console.log(address)
        // await createAddress(address);
    }
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.adress-form {
    padding-bottom: 120px;

    @media (max-width: $phone) {
        padding-top: 20px;
        padding-bottom: 50px !important;
    }
}
</style>