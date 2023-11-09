<template>
  <div class="carousel-container">
    <div class="container-limit carousel-limit carousel-height-limit">
   <!--    <v-carousel
        cycle
        interval="4000"
        hide-delimiter-background
        show-arrows="hover"
        height="100%"
      >
        <template v-slot:prev="{ props }">
          <v-btn
            @click="props.onClick"
            icon
            density="compact"
            color="grey-lighten-5"
            elevation="0"
            :ripple="false"
          >
            <v-icon icon="mdi-chevron-left" size="small"></v-icon>
          </v-btn>
        </template>
        <template v-slot:next="{ props }">
          <v-btn
            @click="props.onClick"
            icon
            density="compact"
            color="grey-lighten-5"
            elevation="0"
            :ripple="false"
          >
            <v-icon icon="mdi-chevron-right" size="small"></v-icon>
          </v-btn>
        </template>

        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          cover
        ></v-carousel-item>

        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
          cover
        ></v-carousel-item>

        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          cover
        ></v-carousel-item>
      </v-carousel> -->

      <!-- <Splide class="carousel-height-limit" :has-track="false" aria-label="...">
        <SplideTrack style="width: 100%">
          <SplideSlide style="width: 100%" class="carousel-height-limit">
            <img
              class="carousel-height-limit carousel-img-sizing"
              src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
              alt="Sample 1"
            />
          </SplideSlide>

          <SplideSlide>
            <img
              class="carousel-height-limit carousel-img-sizing"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              alt="Sample 2"
            />
          </SplideSlide>
        </SplideTrack>

        <div class="splide__arrows">
          <button class="splide__arrow splide__arrow--prev">Prev</button>
          <button class="splide__arrow splide__arrow--next">Next</button>
        </div>
      </Splide> -->

      <Splide :has-track="false" aria-label="..." :options="{ rewind: true }">
        <SplideTrack>
          <SplideSlide style="width: 100%" class="carousel-height-limit">
            <img
              class="carousel-height-limit carousel-img-sizing"
              src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
              alt="Sample 1"
            />
          </SplideSlide>

          <SplideSlide style="width: 100%" class="carousel-height-limit">
            <img
              class="carousel-height-limit carousel-img-sizing"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              alt="Sample 1"
            />
          </SplideSlide>
        </SplideTrack>

        <div class="splide__arrows">
          <button class="splide__arrow splide__arrow--prev">
            <v-icon
              icon="mdi-chevron-left"
              size="small"
            ></v-icon>
          </button>
          <button class="splide__arrow splide__arrow--next">
            <v-icon
              icon="mdi-chevron-right"
              size="small"
            ></v-icon>
          </button>
        </div>
      </Splide>
    </div>
  </div>
</template>

<script setup>
import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
</script>

<style lang="scss">
@import "@/styles/global.scss";

/* .carousel-limit.carousel-limit {
  max-width: 1600px !important;
}
 */

.splide__arrow /* .splide__arrow--prev */
/* .splide__arrow .splide__arrow--next  */{
  background: $color-white !important;
  opacity: 1 !important;

  &:hover{
    opacity: 0.87 !important;
  }
}

.carousel-container {
  .carousel-height-limit {
    height: 340px !important;
  }

  .carousel-img-sizing {
    width: 100%;
    object-fit: cover;
  }
}
</style>
