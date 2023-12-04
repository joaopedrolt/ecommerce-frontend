<template>
  <div class="footer-top-side-container">
    <div class="footer-row left-row">
      <div class="footer-column side-field brand-field">
        <div class="brand-column-wrapper">
          <div class="column-title logo-white">
            <v-img src="/logo.svg" width="120px" height="40px"></v-img>
          </div>
          <div class="column-components">
            <div class="text-caption opacity-text">
              Há mais de 10 anos no mercado, a Ellos Design tem como um de seus
              principais pilares, o compromisso em gerar resultados de
              qualidade, de maneira prática e efetiva aos nossos clientes por
              todo o Brasil. Há mais de 10 anos no mercado, rcado, rcado, rcado,
              rcado, rcado, rcado,
            </div>
            <div style="display: flex; margin-left: -8px">
              <v-btn
                size="x-small"
                variant="text"
                icon="mdi-instagram"
                :ripple="false"
              />
              <v-btn
                size="x-small"
                variant="text"
                icon="mdi-facebook"
                :ripple="false"
              />
              <v-btn
                size="x-small"
                variant="text"
                icon="mdi-twitter"
                :ripple="false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-row right-row">
      <div class="footer-column side-field newsletter">
        <div class="newsletter-column-wrapper">
          <div class="column-title text-h6">Newsletter</div>
          <div class="column-components">
            <div class="text-caption opacity-text mb-2">
              Inscreva-se na nossa newsletter e fique por dentro das últimas
              novidades e promoções!
            </div>

            <v-text-field
              v-model="newsletterEmailInputValue"
              class="newsletter-email-input mb-1"
              density="compact"
              hide-details="auto"
              variant="outlined"
              placeholder="Digite seu E-mail"
            >
            </v-text-field>

            <v-btn
              color="white"
              height="30px"
              width="100%"
              size="x-small"
              variant="outlined"
            >
              Fique por Dentro!
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const newsletterEmailInputValue = ref("");
</script>

<style lang="scss">
@import "@/styles/global.scss";

.footer-top-side-container {
  height: 100%;
  width: 100%;
  display: flex;
  padding: 20px 0 28px 0 !important;

  .footer-row {
    display: flex;
    flex: 1;

    .footer-column {
      flex: 1;

      &.side-field {
        height: 166px;
        display: flex;
        flex-direction: column;
        align-items: start;

        .text-caption {
          color: $color-gray;
        }
      }

      &.newsletter {
        align-items: end;
        margin-left: 30px;

        .newsletter-email-input {
          .v-field {
            font-size: 0.75rem !important;
          }
        }
      }

      &.brand-field {
        margin-right: 40px;
      }

      .newsletter-column-wrapper,
      .brand-column-wrapper {
        width: 420px;
      }

      .column-list .column-list-wrapper {
        display: flex;
        flex-direction: column;
        align-items: end;
        padding: 0 !important;

        .column-list-item {
          padding: 0 !important;
          width: 65px !important;
          min-height: 25px !important;
          max-height: 25px !important;
        }
      }

      .column-title {
        margin-bottom: 2px;

        &.list-title {
          text-align: center;
        }
      }
    }
  }

  @media (max-width: $tablet) {
    flex-direction: column;
    padding: 20px 0 18px 0 !important;

    .footer-row {
      &.left-row {
        margin-bottom: 30px;
      }

      &.left-row,
      &.right-row {
        gap: 40px;
      }

      .footer-column {
        &.side-field {
          margin-left: 0px !important;
          margin-right: 0px !important;
          display: flex;
          align-items: center;
          flex-direction: column;
        }
      }
    }
  }

  @media (max-width: $phone) {
    padding: 50px 0 48px 0 !important;

    .footer-row {
      flex-direction: column;

      &.left-row,
      &.right-row {
        gap: 0px;
      }

      &.right-row {
        flex-direction: column;
      }

      .footer-column {
        &.side-field {
          /*  min-height: auto !important; */
          /*  max-height: auto !important; */
          align-items: start;
        }

        &.brand-field {
          margin-bottom: 5px;
        }

        .brand-column-wrapper,
        .newsletter-column-wrapper {
          margin-left: 0 !important;
          width: auto;
        }

        .column-list .column-list-wrapper {
          align-items: start;
        }

        .column-title.list-title {
          text-align: start;
        }
      }
    }
  }
}
</style>
