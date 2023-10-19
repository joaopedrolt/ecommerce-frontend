<template>
  <div class="footer-top-side-container">
    <div class="footer-row left-row">
      <div class="footer-column side-field brand-field">
        <div class="brand-column-wrapper">
          <div class="column-title">ECOMMERCE</div>
          <div class="column-components">
            <div class="text-caption">
              Há mais de 10 anos no mercado, a Ellos Design tem como um de seus
              principais pilares, o compromisso em gerar resultados de
              qualidade, de maneira prática e efetiva aos nossos clientes por
              todo o Brasil.
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
      <div class="footer-column footer-list">
        <div class="column-title list-title" style="margin-bottom: 0">Section 2</div>
        <div class="column-list">
          <v-list class="column-list-wrapper" variant="plain">
            <v-list-item
              class="column-list-item"
              href="https://www.google.com/"
              :ripple="false"
            >
              <div class="text-caption">Loja</div>
            </v-list-item>
            <v-list-item
              class="column-list-item"
              href="https://www.google.com/"
              :ripple="false"
            >
              <div class="text-caption">Mac</div>
            </v-list-item>
            <v-list-item
              class="column-list-item"
              href="https://www.google.com/"
              :ripple="false"
            >
              <div class="text-caption">iPad</div>
            </v-list-item>
            <v-list-item
              class="column-list-item"
              href="https://www.google.com/"
              :ripple="false"
            >
              <div class="text-caption">iPhone</div>
            </v-list-item>
            <v-list-item
              class="column-list-item"
              href="https://www.google.com/"
              :ripple="false"
            >
              <div class="text-caption">Watch</div>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </div>
    <div class="footer-row right-row">
      <div class="footer-column footer-list">
        <div class="column-title list-title" style="margin: 0">Section 3</div>
        <div class="column-list">
          <v-list class="column-list-wrapper" variant="plain">
            <v-list-item
              class="column-list-item"
              href="https://www.google.com/"
              :ripple="false"
            >
              <div class="text-caption">Loja</div>
            </v-list-item>
            <v-list-item
              class="column-list-item"
              href="https://www.google.com/"
              :ripple="false"
            >
              <div class="text-caption">Mac</div>
            </v-list-item>
            <v-list-item
              class="column-list-item"
              href="https://www.google.com/"
              :ripple="false"
            >
              <div class="text-caption">iPad</div>
            </v-list-item>
            <v-list-item
              class="column-list-item"
              href="https://www.google.com/"
              :ripple="false"
            >
              <div class="text-caption">iPhone</div>
            </v-list-item>
            <v-list-item
              class="column-list-item"
              href="https://www.google.com/"
              :ripple="false"
            >
              <div class="text-caption">Watch</div>
            </v-list-item>
          </v-list>
        </div>
      </div>
      <div class="footer-column side-field newsletter">
        <div class="newsletter-column-wrapper">
          <div class="column-title">Newsletter</div>
          <div class="column-components">
            <div class="text-caption" style="margin-bottom: 2px">
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
              color="primary"
              height="30px"
              width="100%"
              size="x-small"
              variant="flat"
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

  .footer-row {
    display: flex;
    flex: 1;

    .footer-column {
      flex: 1;

      &.side-field {
        /*  min-height: 166px;
                max-height: 166px; */
        height: 166px;
        display: flex;
        flex-direction: column;

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
        width: 270px;
      }

      .column-list .column-list-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
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

    .footer-row {
      &.left-row,
      &.right-row {
        gap: 40px;
      }

      &.right-row {
        flex-direction: row-reverse;
      }

      .footer-column {
        margin-bottom: 10px;

        &.side-field {
          margin-left: 0px !important;
          margin-right: 0px !important;
          display: flex;
          align-items: end;
          flex-direction: column;
        }

        .brand-column-wrapper,
        .newsletter-column-wrapper {
          margin-left: 50px;
        }
      }
    }
  }

  @media (max-width: $phone) {
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
