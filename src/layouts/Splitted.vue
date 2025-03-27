<template>
  <v-main>
    <div class="splitted">
      <router-view />
    </div>
  </v-main>
</template>

<script setup>

</script>

<style lang="scss">
@import "@/styles/global.scss";

.splitted {
  display: flex;
  height: 100% !important;
  width: 100% !important;

  .left-side {
    display: flex;
    width: 55%;
    justify-content: end;
    height: 100%;
    padding-top: 40px;
    padding-right: 36px;
    padding-left: 36px;
    padding-bottom: 4px;

    .wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      max-width: 700px;

      // .parent-input-container {
      //   display: flex;
      //   gap: 10px;

      //   .sibling-input {
      //     max-height: 70px !important;
      //     min-width: 223px !important;
      //   }

      //   @media (max-width: $phone) {
      //     flex-direction: column;
      //     gap: 0 !important;
      //   }
      // }

      .shipping-sumery {
        padding-left: 1px !important;
      }
    }

    .v-list-item {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .right-side {
    display: flex;
    justify-content: start;
    height: 100%;
    position: fixed;
    width: 45%;
    right: 0;
    top: 0;
    padding-top: 40px;
    padding-bottom: 36px;
    padding-right: 36px;
    padding-left: 36px;

    .mobile-expansion-summary {
      display: none;
    }

    .wrapper {
      height: 100%;
      width: 100%;
      max-width: 513px;
    }

    .cart-itens {
      display: flex;
      flex-direction: column;
      gap: 15px;

      padding-top: 20px;
      padding-bottom: 16px;
    }

    .order-sum {
      padding: 18px 0;
    }

    .order-summery {
      display: none;
    }
  }

  @media (max-width: $tablet) {
    flex-direction: column-reverse;

    .left-side {
      display: flex;
      width: 100%;
      justify-content: center;
      padding-left: 10px !important;
      padding-right: 10px !important;
      padding-top: 20px !important;

      .wrapper {
        max-width: none !important;

        .-sumery {}

        /*       .payment-footer {
          .v-breadcrumbs {
            padding-right: 12px !important;
          }
        } */
      }
    }

    .right-side {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: fit-content;
      width: 100%;
      position: relative;
      right: auto;
      top: auto;
      padding-bottom: 0 !important;
      padding-left: 10px !important;
      padding-right: 10px !important;

      .mobile-expansion-summary {
        display: block;
        width: 100%;

        .v-expansion-panel-title {
          padding-left: 0;
          padding-right: 0;
        }

        .v-expansion-panel-text__wrapper {
          padding: 2px 0 !important;
        }

        .v-expansion-panel-title__overlay {
          opacity: 0 !important;
        }
      }

      .wrapper {
        display: none;
        max-width: none !important;
      }

      .order-summery {
        display: block !important;
        margin-left: -2px;
      }

      .v-expansion-panel-title__icon {
        margin-right: -3px;
      }

      .order-sum {
        padding: 13px 0 !important;
      }

      /* .edit-cart {
        display: none !important;
      } */

      .cart-itens {
        padding-top: 25px !important;
        padding-bottom: 19px !important;
      }
    }
  }

  .splitted-header {
    &.desktop {
      display: block !important;

      @media (max-width: $tablet) {
        display: none !important;
      }
    }

    &.mobile {
      display: block !important;

      @media (min-width: $tablet) {
        display: none !important;
      }
    }
  }
}

.border-right {
  border-right: 1px solid $color-border;
}
</style>
