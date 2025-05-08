<template>
    <div class="d-flex align-center" style="min-height: 100vh;">
        <div class="container-limit container-size-padding floating-form">
            <div class="d-flex">
                <v-btn @click="handleGoBack" elevation="0" class="font-weight-regular button-color button-dark "
                    variant="flat" style="font-size: 0.72rem; padding-left: 0; padding-right: 8px;">
                    <v-icon style="font-size: 1.5rem !important;" icon="mdi-chevron-left"></v-icon>
                    Voltar
                </v-btn>
            </div>

            <v-card-title class="text-center mb-3">CADASTRAR ENDEREÇO</v-card-title>

            <v-form ref="addressForm" validate-on="layz">
                <div class="parent-input-container">
                    <div class="d-flex flex-column" style="flex: 1;">
                        <v-text-field v-model="address.nome" class="sibling-input" label="Nome do Destinatário"
                            variant="outlined" :rules="nomeRules" :disabled="loadingAddress" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="!addressFormValidation.nome" />
                    </div>

                    <div class="d-flex flex-column" style="flex: 1;">
                        <v-text-field v-model="address.sobrenome" class="sibling-input"
                            label="Sobrenome do Destinatário" :disabled="loadingAddress" variant="outlined"
                            :rules="sobrenomeRules" density="comfortable">
                        </v-text-field>
                        <validation-filler :active="!addressFormValidation.sobrenome" />
                    </div>
                </div>

                <div class="parent-input-container">
                    <div class="d-flex flex-column" style="flex: 1;">
                        <v-text-field v-model="address.cpf" v-maska:[cpfMask] class="sibling-input"
                            label="CPF do Destinatário" :disabled="loadingAddress" variant="outlined" :rules="cpfRules"
                            density="comfortable">
                        </v-text-field>
                        <validation-filler :active="!addressFormValidation.cpf" density="compact" />
                    </div>

                    <div class="d-flex flex-column" style="flex: 1;">
                        <v-text-field v-model="address.telefone" v-maska:[telefoneMask] :rules="telefoneRules"
                            label="Telefone" :disabled="loadingAddress" class="sibling-input" variant="outlined"
                            density="comfortable">
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

                <v-checkbox v-if="addressId == null && !isFirstAddressForUser" class="mb-5" id="main" v-model="address.main"
                    :disabled="loadingAddress" density="compact" hide-details>
                    <template v-slot:label>
                        <div class="d-flex text-subtitle-2 font-weight-regular mr-1 pl-1"
                            style="opacity: 1 !important;">
                            <v-icon class="mr-1">mdi-home</v-icon>
                            <div style="margin-top: 0.063rem;">
                                Definir como endereço principal
                            </div>
                        </div>
                    </template>
                </v-checkbox>

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
import { ref, reactive, onBeforeMount, computed } from "vue";
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

import { useRouter, useRoute } from 'vue-router';

import {
    cpfMask,
    cepMask,
    numeroMask,
    telefoneMask
} from "@/utils/masks";

import { useAuthStore } from '@/store/store';

import getEstados from '@/utils/getEstados';

import { cepValidation, searchAddressByCEP } from "@/utils/cep.js";

import { createAddress, getAddress, updateAddress, checkFirstAddressForUser } from "@/data/address"
import { tr } from "vuetify/lib/locale/index.mjs";

const router = useRouter();
const route = useRoute();

const queryCheckout = computed(() => route.query.checkout)

const userId = ref();
const authStore = useAuthStore();

const isFirstAddressForUser = ref(true);

const addressId = ref();

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
    main: true,
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
    main: true,
});

const estados = getEstados();

const loadingAddress = ref(false);

const handleGoBack = () => {
    router.push({
        name: "AccountOverview",
        query: queryCheckout.value === 'true' ? { checkout: true } : {}
    });

    return;
}

const clearAddressDetails = () => {
    address.numero = "";
    address.endereco = "";
    address.cidade = "";
    address.bairro = "";
    address.complemento = "";
    address.estado = null;
}

const loadAddressDetails = async () => {
    try {
        const valid = cepValidation(address.cep);

        if (valid) {
            loadingAddress.value = true;
            const returnedAddress = await searchAddressByCEP(address.cep);

            address.numero = "";

            if (!returnedAddress) {
                throw new Error();
            }

            Object.assign(address, {
                ...address,
                endereco: returnedAddress.logradouro,
                bairro: returnedAddress.bairro,
                cidade: returnedAddress.cidade,
                estado: estados.find(e => e.sigla.toLowerCase() == returnedAddress.uf.toLowerCase())
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
    await loadAddressDetails();
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
            addressFormValidation[keys[i]] = true;
        }
    }

    if (valid) {
        let addressData = { ...address, userId: userId.value };
        const response = !addressId.value ? await createAddress(addressData) : await updateAddress(addressData);

        if (response) {
            handleGoBack();
        }
    }
};

const loadAddress = async (addressId) => {
    const returnedAddress = await getAddress(addressId);

    if (returnedAddress) {
        Object.assign(address, returnedAddress);
    }

    loadingAddress.value = false;
}

onBeforeMount(async () => {
    userId.value = authStore.getUserId();
    if (!userId.value) {
        router.push({
            name: "Home",
        });
    }

    try {
        const response = await checkFirstAddressForUser(userId.value);
        isFirstAddressForUser.value = response;
    } catch (error) {
        console.error("Error checking first address for user:", error);
        isFirstAddressForUser.value = false;
    }

    const addressIdParam = route.params.addressId

    if (addressIdParam) {
        addressId.value = addressIdParam;
        loadingAddress.value = true;

        await loadAddress(addressId.value);
    }
})
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.floating-form {
    padding-bottom: 120px;

    @media (max-width: $phone) {
        padding-top: 20px;
        padding-bottom: 50px !important;
    }
}
</style>