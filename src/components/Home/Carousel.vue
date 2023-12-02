<template>
  <div class="carousel-container">
    <div class="container-limit carousel-limit carousel-height-limit">
      <Splide
        :has-track="false"
        aria-label="..."
        :options="{
          rewind: true,
          arrows: false,
          autoplay: true,
          interval: 5000,
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
        <!-- 
        <div class="splide__arrows">
          <button
            class="splide__arrow splide__arrow--prev"
            style="display: none"
          ></button>
          <button
            class="splide__arrow splide__arrow--next"
            style="display: none"
          ></button>
        </div> -->
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
