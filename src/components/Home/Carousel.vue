<template>
  <div class="carousel-container">
    <div class="carousel-height-limit">
      <v-divider color="#111111"></v-divider>

      <div class="h-100 w-100 d-flex justify-center align-center container-limit container-size-padding">
        <div class="d-flex flex-column text-center">
          <div class="font-weight-bold" style="font-size: 2.3rem;">
            <div>
              SIMPLES.
            </div>
            <div>
              CONFIAVEL.
            </div>
            <div>
              LUCRATIVA.
            </div>
          </div>

          <div class="text-overline" style="font-size: 0.9rem !important;">
            para pessoas ambiciosas ...
          </div>
        </div>
      </div>

      <v-divider color="#111111"></v-divider>

      <!-- <Splide
        :has-track="false"
        aria-label="..."
        :options="{
          rewind: true,
          arrows: false,
          autoplay: true,
          interval: 5000,
          speed: 1000,
          pauseOnHover: true,
        }"
      >
        <SplideTrack>
          <SplideSlide style="width: 100%" class="carousel-height-limit">
            <img
              class="carousel-height-limit carousel-img-sizing"
              src="/wallpaperflare.com_wallpaper.jpg"
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
      </Splide> -->
    </div>
  </div>
</template>

<script setup>
import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
</script>

<style lang="scss">
@import "@/styles/global.scss";

.carousel-limit.carousel-limit {
  max-width: 1920px !important;
}

.carousel-container {
  .carousel-height-limit {
    height: 500px !important;
  }

  .carousel-img-sizing {
    width: 100%;
    object-fit: cover;
    object-position: center center;
  }
}
</style>
