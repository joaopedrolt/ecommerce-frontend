<template>
  <div class="d-flex align-center py-16" style="min-height: 100vh;">
    <div class="order-hist container-limit container-size-padding pt-7 pb-16 d-flex flex-column">

      <div class="d-flex">
        <v-btn @click="exitPage" elevation="0" :disabled="loadingProductSubmit"
          class="return-button font-weight-regular button-color button-dark " variant="flat"
          style="font-size: 0.72rem; padding-left: 0; padding-right: 8px;">
          <v-icon style="font-size: 1.5rem !important;" icon="mdi-chevron-left"></v-icon>
          Voltar
        </v-btn>
      </div>

      <v-card-title class="text-center mb-3">CADASTRAR NOVO PRODUTO</v-card-title>

      <div>
        <v-list class="frete-ratio" v-model:opened="stepListOpend" open-strategy="single" eager>
          <v-list-group :value="steps[0].title" :disabled="loadingProductSubmit">
            <template v-slot:activator="{ isOpen, props }">
              <v-list-item :ripple="false" v-bind="props">
                <template v-slot:prepend>
                  <v-icon :color="steps[0].isValid ? 'success' : 'grey'">
                    {{ steps[0].isValid ? 'mdi-check-circle' : 'mdi-circle-outline' }}
                  </v-icon>
                </template>
                <v-list-item-title>
                  <div class="d-flex align-center">
                    <div class="d-flex align-center ml-2 font-weight-medium py-2" style="font-size: 0.9rem;
                            -webkit-user-select: none; 
                            -ms-user-select: none; 
                             user-select: none;">
                      Dados Básicos
                    </div>
                  </div>
                </v-list-item-title>
              </v-list-item>
            </template>
            <v-list-item>
              <v-form class="w-100 pb-3 pt-2" ref="productBasicsForm" validate-on="layz">
                <div class="parent-input-container">
                  <div class="d-flex flex-column" style="flex: 1;">
                    <v-text-field v-model="productBasicInfo.name" class="sibling-input" label="Nome do Produto"
                      variant="outlined" :rules="notEmptyRules" maxlength="50" :disabled="loadingProductInput"
                      density="comfortable">
                    </v-text-field>
                    <validation-filler :active="!productBasicInfoFormValidation.name" />
                  </div>

                  <div class="d-flex flex-column" style="flex: 1;">
                    <v-text-field v-model="productBasicInfo.displayDescription" class="sibling-input"
                      label="Descrição de Exibição" variant="outlined" :rules="notEmptyRules" maxlength="50"
                      :disabled="loadingProductInput" density="comfortable">
                    </v-text-field>
                    <validation-filler :active="!productBasicInfoFormValidation.displayDescription" />
                  </div>
                </div>

                <div class="parent-input-container">
                  <div class="d-flex flex-column" style="flex: 1;">
                    <v-text-field v-model="productBasicInfo.price" class="sibling-input" label="Preço"
                      variant="outlined" :rules="precoRules" :disabled="loadingProductInput" density="comfortable">
                    </v-text-field>
                    <validation-filler :active="!productBasicInfoFormValidation.price" />
                  </div>

                  <div class="d-flex flex-column" style="flex: 1;">
                    <v-file-input v-model="productBasicInfo.displayImage" class="" label="Carregar Imagem de Exibição"
                      variant="outlined" :rules="imageUploadRules" :disabled="loadingProductInput"
                      density="comfortable">
                    </v-file-input>
                    <validation-filler :active="!productBasicInfoFormValidation.displayImage" />
                  </div>
                </div>

                <div class="d-flex flex-column" style="flex: 1;">
                  <v-text-field v-model="productBasicInfo.shortDescription" class="sibling-input"
                    label="Descrição Básica" variant="outlined" :rules="notEmptyRules" :disabled="loadingProductInput"
                    density="comfortable" maxlength="185">
                  </v-text-field>
                  <validation-filler :active="!productBasicInfoFormValidation.shortDescription" />
                </div>

                <div class="d-flex flex-column" style="flex: 1;">
                  <v-textarea v-model="productBasicInfo.longDescription" class="sibling-input"
                    label="Características do Produto" variant="outlined" :rules="notEmptyRules"
                    :disabled="loadingProductInput" density="comfortable" maxlength="600">
                  </v-textarea>
                  <validation-filler :active="!productBasicInfoFormValidation.longDescription" />
                </div>

                <div class="d-flex flex-column" style="flex: 1;">
                  <div class="sibling-input">
                    <v-btn @click="previewProduct" class="text-subtitle-1 font-weight-regular button-color button-light"
                      height="45px" width="100%" variant="outlined" :ripple="false">
                      Confirmar
                    </v-btn>
                  </div>
                </div>

                <div class="d-flex flex-column pt-5">
                  <div class="text-title text-center text-overline" style="font-size: 0.85rem !important;">
                    <span>Pré-visualizar</span>
                  </div>

                  <div class="pt-3 d-flex justify-center">
                    <div class="d-flex flex-column align-center"
                      style="width: 100%; max-width: 400px; gap: 7px; text-align: center;">
                      <div style="
                        border-radius: 15px;
                        overflow: hidden;
                        position: relative;
                        width: 300px;
                        height: 200px;
                      ">
                        <img v-if="tempImagePreview" :src="tempImagePreview"
                          style="height: 100%; width: 100%; object-fit: cover;" />
                        <div v-else class="image-placeholder">
                          <div class="placeholder-content">
                            <v-icon class="mb-2" size="large" color="grey">mdi-image-off-outline</v-icon>
                            <span>Sem Imagem</span>
                          </div>
                        </div>
                      </div>

                      <div class="d-flex justify-center flex-column align-center" style="min-width: 0;">
                        <div class="font-weight-bold text-subtitle-1 text-wrap" style="word-break: break-word;">
                          {{ productBasicInfo.name || '[Nome]' }}
                        </div>
                        <div class="text-subtitle-2 font-weight-light text-wrap" style="word-break: break-word;">
                          {{ productBasicInfo.displayDescription || '[Descrição]' }}
                        </div>
                        <div class="text-subtitle-2 font-weight-regular" style="word-break: break-word;">
                          {{ priceFormatted || '[Preço]' }}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </v-form>
            </v-list-item>
          </v-list-group>

          <v-divider color="111111"></v-divider>

          <v-list-group :value="steps[1].title" :disabled="loadingProductSubmit">
            <template v-slot:activator="{ isOpen, props }">
              <v-list-item :ripple="false" v-bind="props">
                <template v-slot:prepend>
                  <v-icon :color="steps[1].isValid ? 'success' : 'grey'">
                    {{ steps[1].isValid ? 'mdi-check-circle' : 'mdi-circle-outline' }}
                  </v-icon>
                </template>
                <v-list-item-title>
                  <div class="d-flex align-center">
                    <div class="d-flex align-center ml-2 font-weight-medium py-2" style="font-size: 0.9rem;
                            -webkit-user-select: none; 
                            -ms-user-select: none; 
                             user-select: none;">
                      Imagens do Produto
                    </div>
                  </div>
                </v-list-item-title>
              </v-list-item>
            </template>
            <v-list-item class="pb-10 pt-4">
              <div class="text-title text-center text-overline mb-3" style="font-size: 0.85rem !important;">
                <span>Imagens do Produto (Máximo 3)</span>
              </div>

              <v-form class="w-100" ref="productImagesForm" validate-on="lazy">
                <!-- File Input for Multiple Images -->
                <div class="d-flex flex-column mb-4" style="flex: 1;">
                  <v-file-input v-model="productImages.files" class="sibling-input" label="Carregar Imagens do Produto"
                    variant="outlined" :rules="productImageRules" :disabled="loadingProductInput" density="comfortable"
                    accept="image/*" multiple @change="onProductImagesSelected" @clear="clearAllProductImages"
                    :clearable="false">
                    <template v-slot:selection="{ fileNames }">
                      <template v-for="(fileName, index) in fileNames" :key="fileName">
                        <v-chip v-if="index < 2" color="primary" size="small" class="me-2">
                          {{ fileName }}
                        </v-chip>
                        <span v-else-if="index === 2" class="text-overline text-grey-darken-3 mx-2">
                          +{{ fileNames.length - 2 }} Arquivo(s)
                        </span>
                      </template>
                    </template>
                  </v-file-input>
                  <validation-filler :active="!productImagesFormValidation.files" />
                </div>

                <!-- Image Previews -->
                <div v-if="productImages.previews.length > 0"
                  class="mb-4 d-flex flex-column justify-center align-center">
                  <div class="text-subtitle-2 mb-2">Pré-visualização das Imagens:</div>
                  <div class="d-flex flex-wrap" style="gap: 12px;">
                    <div v-for="(preview, index) in productImages.previews" :key="index" class="position-relative"
                      style="width: 120px; height: 120px; border-radius: 8px; overflow: hidden; border: 1px solid #e0e0e0;">
                      <img :src="preview" style="width: 100%; height: 100%; object-fit: cover;"
                        :alt="`Imagem ${index + 1}`" />
                      <!-- Remove Button -->
                      <v-btn @click="removeProductImage(index)" size="x-small" icon color="error"
                        style="position: absolute; top: 4px; right: 4px; background: rgba(255, 255, 255, 0.9);"
                        elevation="1">
                        <v-icon size="small">mdi-close</v-icon>
                      </v-btn>
                      <!-- Image Number Badge -->
                      <div class="text-caption font-weight-bold"
                        style="position: absolute; bottom: 4px; left: 4px; background: rgba(0, 0, 0, 0.7); color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem;">
                        {{ index + 1 }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Empty State -->
                <div v-else class="d-flex flex-column justify-center align-center text-center"
                  style="min-height: 120px;">
                  <v-icon class="mb-2" size="large" color="grey">mdi-image-multiple-outline</v-icon>
                  <div class="text-subtitle-2 mb-1">Nenhuma imagem adicionada</div>
                  <div class="text-caption text-grey-darken-1">
                    Adicione até 3 imagens do seu produto
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="d-flex" style="gap: 10px;">
                  <v-btn @click="clearAllProductImages" v-if="productImages.previews.length > 0"
                    class="text-subtitle-2 font-weight-regular" height="40px" variant="outlined" color="error"
                    :ripple="false">
                    <v-icon class="mr-1" size="small">mdi-trash-can-outline</v-icon>
                    Limpar Todas
                  </v-btn>

                  <v-btn @click="validateProductImages"
                    class="text-subtitle-2 font-weight-regular button-color button-light mb-2" height="40px"
                    style="flex: 1;" variant="flat" :ripple="false">
                    <v-icon class="mr-1" size="small">mdi-check</v-icon>
                    Confirmar Imagens
                  </v-btn>
                </div>
              </v-form>
            </v-list-item>
          </v-list-group>

          <v-divider color="111111"></v-divider>

          {{ steps[2].opened }}

          <v-list-group :value="steps[2].title" :disabled="loadingProductSubmit">
            <template v-slot:activator="{ isOpen, props }">
              <v-list-item :ripple="false" v-bind="props">
                <template v-slot:prepend>
                  <v-icon :color="steps[2].isValid ? 'success' : 'grey'">
                    {{ steps[2].isValid ? 'mdi-check-circle' : 'mdi-circle-outline' }}
                  </v-icon>
                </template>
                <v-list-item-title>
                  <div class="d-flex align-center">
                    <div class="d-flex align-center ml-2 font-weight-medium py-2" style="font-size: 0.9rem;
                            -webkit-user-select: none; 
                            -ms-user-select: none; 
                             user-select: none;">
                      Sessões da Página
                    </div>
                  </div>
                </v-list-item-title>
              </v-list-item>
            </template>
            <v-list-item class="pb-10 pt-4">
              <div class="text-title text-center text-overline mb-3" style="font-size: 0.85rem !important;">
                <span>
                  {{ displaySectionPageController ? 'Cadastrar Nova Sessão' : 'Lista de Sessões' }}
                </span>
              </div>

              <div v-if="!displaySectionPageController" class="d-flex flex-column justify-center align-center">
                <div v-if="!sectionsPage.length" class="d-flex flex-column justify-center align-center"
                  style="min-height: 120px;">
                  <v-icon class="mb-1">mdi-cup-outline</v-icon>
                  Nenhuma seção adicionada ainda.
                  <div class="text-subtitle-2 font-weight-regular">
                    Adicione uma seção para começar a criar sua página de produto.
                  </div>
                </div>

                <v-list v-if="sectionsPage && sectionsPage.length" class="w-100 h-100 py-2 pl-1 pr-1"
                  style="overflow: hidden;">
                  <template v-for="(sp, index) in sectionsPage" :key="`section-${index}`">
                    <v-list-item style="padding: 0 !important; cursor: move;" :class="{
                      'drag-over': dragOverIndex === index,
                      'being-dragged': draggedIndex === index
                    }" draggable="true" @dragstart="handleDragStart($event, index)" @dragend="handleDragEnd"
                      @dragover="handleDragOver" @dragenter="handleDragEnter($event, index)"
                      @dragleave="handleDragLeave" @drop="handleDrop($event, index)">
                      <v-card-item class="adress-card-item py-3 pl-4 pr-3">
                        <div class="d-flex align-center">
                          <!-- Drag Handle Icon -->
                          <v-icon class="drag-handle mr-2" color="grey-darken-1" size="small">
                            mdi-drag-vertical
                          </v-icon>

                          <div>
                            <div class="text-subtitle-2"
                              style="margin-top: 3px; margin-right: 3px; opacity: .65; transform: translateX(-2px);">
                              <v-icon style="transform: translateY(-2px);">mdi-arrow-right-bold</v-icon>
                              Sessão {{ index + 1 }}
                            </div>
                          </div>
                        </div>

                        <template v-slot:append>
                          <div class="d-flex">
                            <v-tooltip location="top">
                              <template v-slot:activator="{ props }">
                                <v-btn @click="handleRemoveSection(sp)" v-bind="props" elevation="0" icon size="small">
                                  <v-icon>mdi-close</v-icon>
                                </v-btn>
                              </template>
                              <div>Remover</div>
                            </v-tooltip>
                          </div>
                        </template>

                        <div class="v-card-title"
                          style="font-size: 1rem; white-space: break-spaces; word-break: break-word;">
                          {{ sp.title }}
                        </div>

                        <v-card-subtitle style="white-space: break-spaces; word-break: break-word;">
                          {{ sp.subtitle.length > 50 ? sp.subtitle.slice(0, 50) + '...' : sp.subtitle }}
                        </v-card-subtitle>
                      </v-card-item>
                    </v-list-item>
                    <v-divider v-if="index < sectionsPage.length - 1"></v-divider>
                  </template>
                </v-list>
              </div>

              <div v-else class="d-flex flex-column justify-center align-center text-center pt-6">
                <v-form class="w-100" ref="sectionPageForm" validate-on="layz">
                  <div class="d-flex flex-column" style="flex: 1;">

                    <v-text-field v-model="selectedSectionPage.title" class="sibling-input" label="Titulo"
                      variant="outlined" :rules="notEmptyRules" maxlength="80" :disabled="loadingProductInput"
                      density="comfortable">
                    </v-text-field>
                    <validation-filler :active="!selectedSectionPageFormValidation.title" />
                  </div>

                  <div class="d-flex flex-column" style="flex: 1;">
                    <v-textarea v-model="selectedSectionPage.subtitle" class="sibling-input" label="Corpo da Sessão"
                      variant="outlined" :rules="notEmptyRules" maxlength="300" :disabled="loadingProductInput"
                      density="comfortable">
                    </v-textarea>
                    <validation-filler :active="!selectedSectionPageFormValidation.subtitle" />
                  </div>

                  <div class="d-flex flex-column" style="flex: 1;">
                    <v-file-input v-model="selectedSectionPage.image" class="sibling-input"
                      label="Carregar Imagem de Exibição" variant="outlined" :rules="imageUploadRules"
                      :disabled="loadingProductInput" density="comfortable" accept="image/*">
                    </v-file-input>
                    <validation-filler :active="!selectedSectionPageFormValidation.image" />
                  </div>

                  <div class="parent-input-container">
                    <div class="d-flex flex-column" style="flex: 3;">
                      <div class="sibling-input">
                        <v-switch class="section-switch" v-model="selectedSectionPage.position">
                          <template v-slot:label>
                            Posição: {{ selectedSectionPage.position ? 'À Direita' : 'À Esquerda' }}
                          </template>
                        </v-switch>
                      </div>
                    </div>

                    <!-- <div class="d-flex flex-column" style="flex: 4;">
                      <div class="sibling-input">
                        <v-btn class="text-subtitle-1 font-weight-regular button-color button-light" height="45px"
                          width="100%" variant="outlined" :ripple="false">
                          Pré-visualizar
                        </v-btn>
                      </div>
                    </div> -->
                  </div>
                </v-form>
              </div>

              <div class="checkout-navigation-container mt-4" style="gap: 15px;">
                <!-- <div v-if="displaySectionPageController" class="previous-section-btn justify-center">
                  < <v-icon icon="mdi-chevron-left"></v-icon>
                  <button @click="handlePreviousSection()"
                    class="d-flex align-center text-subtitle-2 font-weight-regular"
                    style="opacity: 0.65; cursor: pointer">
                    Voltar ao Carrinho
                  </button> 
                </div> -->

                <v-btn v-if="displaySectionPageController" @click="handlePreviousSection()"
                  class="next-section-btn text-subtitle-1 font-weight-regular button-color button-dark" height="45px"
                  width="100%" variant="outlined" :ripple="false">
                  <v-icon icon="mdi-chevron-left"></v-icon>
                  Voltar para a Lista
                </v-btn>

                <v-btn @click="handleSectionCommit()"
                  class="next-section-btn text-subtitle-1 font-weight-regular button-color button-light" height="45px"
                  width="100%" variant="flat" :ripple="false">
                  {{ displaySectionPageController ? 'Salvar Sessão' : 'Adicionar Sessão' }}
                  <v-icon class="pl-1" icon="mdi-plus"></v-icon>
                </v-btn>

              </div>

            </v-list-item>
          </v-list-group>
        </v-list>
      </div>

      <div v-if="!serverResponded" class="px-2 mt-6">
        <v-btn @click="submitProduct()"
          class="next-section-btn text-subtitle-1 font-weight-regular button-color button-light" height="45px"
          width="100%" variant="flat" :ripple="false" :loading="loadingProductSubmit" :disabled="!allStepsValid">
          Cadastrar Produto
        </v-btn>
      </div>
    </div>
  </div>

  <v-dialog class="product-dialog" v-model="alertModal.show" max-width="400" persistent>
    <v-card>
      <v-card-title class="text-overline d-flex align-center justify-center pt-4 pr-5">
        <v-icon class="mr-2 mb-1">
          {{ alertModal.type === 'success' ? 'mdi-check-circle' : alertModal.type === 'error' ? 'mdi-alert-circle' :
            'mdi-information' }}
        </v-icon>
        {{ alertModal.type === 'success' ? 'Sucesso' : alertModal.type === 'error' ? 'Erro' : 'Informação' }}
      </v-card-title>
      <v-card-text class="pt-1 pb-5">
        <div class="text-body-2 text-center" style="white-space: pre-wrap;">{{ alertModal.message }}</div>
      </v-card-text>
      <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="text" @click="alertModal.show = false">
          OK
        </v-btn>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive, watch, computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from "vue-router";

import {
  nomeRules,
  imageUploadRules,
  precoRules,
  productImageRules,
  notEmptyRules
} from "@/utils/rules";

import formatPrice from "@/utils/formatPrice";
import { generateUUID } from '@/utils/generateUUID';

import ValidationFiller from '@/components/ValidationFiller.vue';

import uploadProductImage from '@/storage/uploadProductImage';

import { createProduct } from "@/data/product"

/* const route = useRoute() */
const router = useRouter();

/* const fromQuery = computed(() => route.query.from) */

const exitPage = async () => {
  router.push({ name: "Home" });

  /*  if (fromQuery.value != null && fromQuery.value?.length > 0) {
     console.log(fromQuery.value)
 
     try {
       router.push({ name: fromQuery.value });
     } catch (error) {
       alert("oi")
       router.push({ name: "Home" });
     }
   } */
};

// Main list 
const stepListOpend = ref([]);

const steps = reactive([
  { title: 'Dados Básicos', isValid: false },
  { title: 'Imagens', isValid: false },
  { title: 'Sessões', isValid: true }
]);

const allStepsValid = computed(() => {
  return steps.every(step => step.isValid);
});

/* Produtos Basics */
const productBasicsForm = ref();

const loadingProductInput = ref(false);

const tempImagePreview = ref(null)

const priceFormatted = computed(() => {
  try {
    const priceDotReplace = productBasicInfo.price.replace(',', '.');
    const result = formatPrice(priceDotReplace);

    if (!result || result === 'nan' || result.toLowerCase().includes('nan') || isNaN(Number(result.replace(/[^0-9.-]+/g, "")))) {
      return false;
    }

    return result;
  } catch (error) {
    /* console.log(error); */
    return false;
  }
});

const productBasicInfo = reactive({
  name: "",
  displayDescription: "",
  price: null,
  displayImage: [],
  shortDescription: '',
  longDescription: '',
});

const productBasicInfoFormValidation = reactive({
  name: true,
  displayDescription: true,
  price: true,
  displayImage: true,
  shortDescription: true,
  longDescription: true
});

watch(() => productBasicInfo.displayImage, (newValue) => {
  if (newValue && newValue.length > 0) {
    const file = newValue[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      tempImagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    tempImagePreview.value = null;
  }
}, { immediate: true });

const previewProduct = async () => {
  let keys = Object.keys(productBasicInfo);

  let valid = true;

  for (let i = 0; i < productBasicsForm.value.items.length; i++) {
    let mensagemErro = await productBasicsForm.value.items[i].validate()

    if (mensagemErro.length > 0) {
      productBasicInfoFormValidation[keys[i]] = false;
      valid = false;
    }
    else {
      productBasicInfoFormValidation[keys[i]] = true;
    }
  }

  if (valid) {
    steps[0].isValid = true;

    if (!steps[1].isValid) {
      stepListOpend.value = [steps[1].title];
    } else {
      stepListOpend.value = [];
    }

    /* alert("Produto pronto para ser salvo!"); */
    /* showAlert("Produto pronto para ser salvo!", 'success'); */
  }
  else {
    steps[0].isValid = false;
    /* alert("Por favor, preencha todos os campos obrigatórios corretamente."); */
    /* showAlert("Por favor, preencha todos os campos obrigatórios corretamente.", 'error'); */
  }
};

/* Sections Page */
const sectionPageForm = ref();

const loadingSectionPage = ref(false);

const sectionsPage = ref([]);

const selectedSectionPage = reactive({
  title: "",
  subtitle: "",
  image: [],
  position: false,
  sectionPosition: "",
});

const selectedSectionPageFormValidation = reactive({
  title: true,
  subtitle: true,
  image: true
});

// false = list
// true = form
const displaySectionPageController = ref(false);

const handlePreviousSection = () => {
  displaySectionPageController.value = false;

  Object.assign(selectedSectionPage, {
    title: "",
    subtitle: "",
    position: "",
    image: [],
    sectionPosition: "",
  });
};

const handleSectionCommit = async () => {
  if (displaySectionPageController.value) {
    let keys = Object.keys(selectedSectionPage);

    let valid = true;

    for (let i = 0; i < sectionPageForm.value.items.length; i++) {
      let mensagemErro = await sectionPageForm.value.items[i].validate()

      if (mensagemErro.length > 0) {
        selectedSectionPageFormValidation[keys[i]] = false;
        valid = false;
      }
      else {
        selectedSectionPageFormValidation[keys[i]] = true;
      }
    }

    if (valid) {
      sectionsPage.value.push({
        title: selectedSectionPage.title,
        subtitle: selectedSectionPage.subtitle,
        position: selectedSectionPage.position ? 'right' : 'left',
        image: selectedSectionPage.image,
        sectionPosition: selectedSectionPage.sectionPosition
      });

      handlePreviousSection();
    }
  }
  else {
    displaySectionPageController.value = true;
  }
};

const handleRemoveSection = (section) => {
  const index = sectionsPage.value.indexOf(section);
  if (index > -1) {
    sectionsPage.value.splice(index, 1);
  }
};

/* Section Image */
const productImagesForm = ref();

const productImages = reactive({
  files: [],
  previews: []
});

const productImagesFormValidation = reactive({
  files: true
});

const onProductImagesSelected = () => {
  steps[1].isValid = false;

  const files = productImages.files;

  if (!files || files.length === 0) {
    productImages.previews = [];
    return;
  }

  // Limit to 3 files
  if (files.length > 3) {
    productImages.files = files.slice(0, 3);
    alert('Máximo de 3 imagens permitidas. Apenas as primeiras 3 foram selecionadas.');
    /*  showAlert('Máximo de 3 imagens permitidas. Apenas as primeiras 3 foram selecionadas.', 'error'); */
  }

  // Generate previews
  const previews = [];
  const filesToProcess = productImages.files.slice(0, 3);

  filesToProcess.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      previews[index] = e.target.result;
      if (previews.length === filesToProcess.length) {
        productImages.previews = previews;
      }
    };
    reader.readAsDataURL(file);
  });
};

const removeProductImage = (index) => {
  productImages.files.splice(index, 1);
  productImages.previews.splice(index, 1);

  steps[1].isValid = false;
};

const clearAllProductImages = () => {
  /* alert('Todas as imagens foram removidas.'); */
  /*  showAlert('Todas as imagens foram removidas.', 'info'); */

  productImages.files = [];
  productImages.previews = [];

  steps[1].isValid = false;
};

const validateProductImages = async () => {
  if (!productImagesForm.value) return;

  const validation = await productImagesForm.value.validate();

  if (validation.valid) {
    productImagesFormValidation.files = true;
    steps[1].isValid = true;

    if (sectionsPage.value && sectionsPage.value.length) {
      stepListOpend.value = [];
    } else {
      stepListOpend.value = [steps[2].title];
    }

    /* alert(`${productImages.files.length} imagem(ns) confirmada(s) com sucesso!`); */
    /* showAlert(`${productImages.files.length} imagem(ns) confirmada(s) com sucesso!`, 'success'); */
  } else {
    productImagesFormValidation.files = false;
    steps[1].isValid = false;
    /* alert('Por favor, corrija os erros antes de continuar.'); */
    /*  showAlert('Por favor, corrija os erros antes de continuar.', 'error'); */
  }
};

const draggedIndex = ref(null);
const dragOverIndex = ref(null);

const handleDragStart = (event, index) => {
  draggedIndex.value = index;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', event.target.outerHTML);
  event.target.style.opacity = '0.5';
};

const handleDragEnd = (event) => {
  event.target.style.opacity = '1';
  draggedIndex.value = null;
  dragOverIndex.value = null;
};

const handleDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

const handleDragEnter = (event, index) => {
  event.preventDefault();
  dragOverIndex.value = index;
};

const handleDragLeave = (event) => {
  // Only clear dragOverIndex if we're leaving the container entirely
  if (!event.currentTarget.contains(event.relatedTarget)) {
    dragOverIndex.value = null;
  }
};

const handleDrop = (event, dropIndex) => {
  event.preventDefault();

  if (draggedIndex.value === null || draggedIndex.value === dropIndex) {
    return;
  }

  // Create a copy of the array
  const newSections = [...sectionsPage.value];

  // Remove the dragged item
  const draggedItem = newSections.splice(draggedIndex.value, 1)[0];

  // Insert it at the new position
  newSections.splice(dropIndex, 0, draggedItem);

  // Update the array
  sectionsPage.value = newSections;

  // Update section positions
  sectionsPage.value.forEach((section, index) => {
    section.sectionPosition = index + 1;
  });

  draggedIndex.value = null;
  dragOverIndex.value = null;
};

/* Modals - Alerts */

const alertModal = reactive({
  show: false,
  message: '',
  type: 'info' // 'info', 'success', 'error'
});

const showAlert = (message, type = 'info') => {
  alertModal.message = message;
  alertModal.type = type;
  alertModal.show = true;
};

/* Submit Product */
const loadingProductSubmit = ref(false);

watch(loadingProductSubmit, (newValue) => {
  if (newValue) {
    stepListOpend.value = [];
  }
}, { immediate: true });

watch(stepListOpend, (newValue) => {
  if (loadingProductSubmit.value && newValue.length > 0) {
    stepListOpend.value = [];
  }
}, { immediate: true });

const uploadImage = async (imageIdRef, fileName, file) => {
  if (!file) return

  var response = await uploadProductImage(imageIdRef, fileName, file);

  if (response) {
    /*    console.log('Upload successful:', response); */
    return response;
  } else {
    console.error('Upload failed');
    return null;
  }
}

const redirectPage = async (routeName, addTimeout, productId = null) => {
  const isRoot = routeName === "/";

  const redirect = () => {
    if (isRoot) {
      router.go(0);
    } else {
      const params = productId ? { productId } : {};
      router.push({ name: routeName, params });
    }
  };

  if (addTimeout) {
    setTimeout(redirect, 5000);
  } else {
    redirect();
  }
};

const serverResponded = ref(false);

const submitProduct = async () => {
  try {
    loadingProductSubmit.value = true;

    const imageIdRef = generateUUID();

    const displayImageUrl = await uploadImage(imageIdRef, 'displayImage.jpg', productBasicInfo.displayImage[0]);

    if (!displayImageUrl) {
      throw new Error('Erro ao fazer upload da imagem display.');
    }

    const productImagesUrls = await Promise.all(
      productImages.files.map((file, index) => uploadImage(imageIdRef, `productImage${index + 1}.jpg`, file))
    );

    const sectionsImagesUrls = await Promise.all(
      sectionsPage.value.map(async (section, index) => {
        if (section.image && section.image.length > 0) {
          return await uploadImage(imageIdRef, `sectionImage${index + 1}.jpg`, section.image[0]);
        }
        return '';
      })
    );

    if (productImagesUrls.includes(null) || sectionsImagesUrls.includes(null)) {
      throw new Error('Erro ao fazer upload das imagens section.');
    }

    console.log(productBasicInfo.price);

    const productData = {
      name: productBasicInfo.name,
      imagesIdRef: imageIdRef,
      displayDescription: productBasicInfo.displayDescription,
      price: parseFloat(productBasicInfo.price.replace(',', '.')),
      shortDescription: productBasicInfo.shortDescription,
      longDescription: productBasicInfo.longDescription,
      createdAt: new Date(),
      discount: 0,
      grossPrice: parseFloat(productBasicInfo.price.replace(',', '.')),
      stock: 100,
      images: productImagesUrls,
      sections: sectionsPage.value.map((section, index) => ({
        title: section.title,
        subtitle: section.subtitle,
        image: sectionsImagesUrls[index],
        position: section.position,
        sectionPosition: index + 1
      })),

      displayImage: displayImageUrl
    }

    const responseProductId = await createProduct(productData);

    if (responseProductId) {
      console.log('Produto cadastrado com sucesso:', productData);

      showAlert(`Produto cadastrado com sucesso, você será redirecionado!`, 'success');
      redirectPage('Product', true, responseProductId);
    }
  } catch (error) {
    console.error('Erro ao cadastrar produto, regarregando componente!', error);

    showAlert(`Erro ao cadastrar produto: ${error.message} (Regarregando Cadastro)`, 'error');
    redirectPage('/', true);
  } finally {
    serverResponded.value = true;
    loadingProductSubmit.value = false;
  }
}

onBeforeMount(async () => {
  setTimeout(() => {
    document.title = "Cadastrar Produto" + " | FURVANA";
  }, 500);
})
</script>

<style lang="scss">
.section-switch {
  .v-selection-control {
    justify-content: center !important;
  }

  .v-switch__track {
    background-color: black !important;
    opacity: 1 !important;
  }
}

.order-hist .v-list-group__items .v-list-item {
  padding: 22px !important;
}

.image-placeholder {
  height: 100%;
  width: 100%;
  min-height: 122px;
  border: 2px dotted gray;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 14px;
  background-color: #f9f9f9;
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.placeholder-content i {
  font-size: 24px;
  margin-bottom: 4px;
}

.card-property {
  @media (max-width: 600px) {
    align-items: center;
  }
}

.drag-over {
  background-color: rgba(25, 118, 210, 0.1) !important;
  border: 2px dashed #1976d2 !important;
  border-radius: 8px !important;
}

.being-dragged {
  opacity: 0.5 !important;
  transform: rotate(2deg) !important;
  transition: transform 0.2s ease !important;
}

.drag-handle {
  cursor: grab !important;

  &:hover {
    color: #1976d2 !important;
  }

  &:active {
    cursor: grabbing !important;
  }
}

.v-list-item[draggable="true"] {
  transition: all 0.2s ease !important;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04) !important;
  }
}

.product-dialog .v-dialog {
  @media (max-width: 600px) {
    margin: 16px;
  }
}

.product-dialog .v-dialog .v-card {
  @media (max-width: 600px) {
    max-width: calc(100vw - 32px) !important;
  }
}

.return-button.v-btn--disabled.v-btn--variant-elevated .v-btn__overlay,
.return-button.v-btn--disabled.v-btn--variant-flat .v-btn__overlay {
  opacity: 0 !important;
}
</style>
