<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay } from 'swiper/modules'
import { useBannerStore } from '@/store/banners'

const bannersList = ref([])
const swiperRef = ref<any>(null)
const bannerStore = useBannerStore()
const swiperInstance = ref<any>(null)

onMounted(async () => {
  await bannerStore.FETCH_BANNERS()
  bannersList.value = await bannerStore.GET_FETCH_BANNERS
})
const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper
}
const showPrev = () => {
  swiperInstance.value?.slidePrev()
}
const showNext = () => {
  swiperInstance.value?.slideNext()
}
const clickDots = (index: number) => {
  swiperInstance.value?.slideToLoop(index)
}
</script>

<template>
  <div class="header-carousel">
    <client-only>
      <Swiper
          v-if="bannersList.length"
          :modules="[Autoplay]"
          loop
          :autoplay="{
              delay: 4000,
              disableOnInteraction: false
          }"
          navigation
          :pagination="{ clickable: true }"
          class="mySwiper"
          @swiper="onSwiper"
      >
        <SwiperSlide v-for="banner in bannersList" :key="banner.id">
          <img :src="banner.img" :alt="banner.title || ''"/>
        </SwiperSlide>
      </Swiper>
    </client-only>

    <!-- Кастомные стрелки и точки -->
    <div class="carousel-control" v-if="bannersList.length > 1">
      <div class="carousel-arrow previous" @click="showPrev">
        <svg width="51" height="8" viewBox="0 0 51 8" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.646446 4.35355C0.451183 4.15829 0.451183 3.84171 0.646446 3.64645L3.82843 0.464466C4.02369 0.269204 4.34027 0.269204 4.53553 0.464466C4.7308 0.659728 4.7308 0.976311 4.53553 1.17157L1.70711 4L4.53553 6.82843C4.7308 7.02369 4.7308 7.34027 4.53553 7.53553C4.34027 7.7308 4.02369 7.7308 3.82843 7.53553L0.646446 4.35355ZM51 4.5H1V3.5H51V4.5Z" fill="white"/>
        </svg>
      </div>

      <ul class="dots__list">
        <li
            class="dots__list-item"
            v-for="(_, index) in bannersList"
            :key="index"
            @click="clickDots(index)"
        >
          <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="3.00354" cy="3" r="3" fill="white"/>
          </svg>
        </li>
      </ul>

      <div class="carousel-arrow next" @click="showNext">
        <svg width="51" height="8" viewBox="0 0 51 8" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.646446 4.35355C0.451183 4.15829 0.451183 3.84171 0.646446 3.64645L3.82843 0.464466C4.02369 0.269204 4.34027 0.269204 4.53553 0.464466C4.7308 0.659728 4.7308 0.976311 4.53553 1.17157L1.70711 4L4.53553 6.82843C4.7308 7.02369 4.7308 7.34027 4.53553 7.53553C4.34027 7.7308 4.02369 7.7308 3.82843 7.53553L0.646446 4.35355ZM51 4.5H1V3.5H51V4.5Z" fill="white"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-carousel {
  min-height: 544px;
  position: relative;
  overflow: hidden;

  @media (max-width: 725px) {
    display: none;
  }

  &::before, &::after {
    content: "";
    position: absolute;
    width: 100%;
    z-index: 1;
  }

  &::before {
    top: 0;
    height: 292px;
    background: linear-gradient(0deg, rgba(7, 7, 7, 0) 0%, #070707 100%);
  }

  &::after {
    bottom: 0;
    height: 178px;
    background: linear-gradient(180deg, rgba(7, 7, 7, 0) 0%, rgba(7, 7, 7, 0.78) 100%);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .carousel-control {

    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 314px;
    z-index: 2;

    .dots__list {
      display: flex;
      justify-content: space-between;
      min-width: 160px;
      list-style: none;

      &-item {
        cursor: pointer;
      }
    }

    .carousel-arrow {
      cursor: pointer;
      svg {
        display: block;
        fill: white;
      }
    }

    .next {
      transform: rotateY(180deg);
    }
  }
}
</style>
