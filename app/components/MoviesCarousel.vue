<script setup lang="ts">
import { reactive,defineProps,ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay } from 'swiper/modules'
const swiperInstance = ref<any>(null)
const swiperRef = ref<any>(null)
const props = defineProps({
      films: {
        type: Array,
        default: ()=> [],
      }
    }
);

const settings = reactive({
  arrows: false,
  dots: false,
  slidesToShow: 9,
  infinite: true,
  lazyLoad: "ondemand",
  responsive: [
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 7,
      },
    },

    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
      },
    },

    {
      breakpoint: 725,
      settings: {
        // infinite: false,
        slidesToShow: 1,
        centerMode: true,
        vertical: false,
        cssEase: 'ease',
        focusOnSelect: true,
        waitForAnimate:false
      },
    },
  ],
});

const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper
}
const showPrev = () => {
  swiperInstance.value?.slidePrev()
}
const showNext = () => {
  swiperInstance.value?.slideNext()
}
const goToDetails = (id:number) => {

}
</script>

<template>
  <div class="movies__carousel" v-if="films.length" :class="films.length <= 5 ? 'margin__track' : ''">
    <Swiper
        v-if="films.length"
        navigation
        :pagination="{ clickable: true }"
        class="carousel-item"
        @swiper="onSwiper"
        :slidesPerView="'auto'"
        spaceBetween="32"
    >
      <SwiperSlide
          v-for="film in films"
          :key="film.id"
          @click="goToDetails(film.id)"
          class="carousel-item__content slick-slide"
      >

          <img :src="film.posters" alt="фильм" />
          <span>{{ film.name_film }}</span>

      </SwiperSlide>
    </Swiper>
    <div class="carousel-arrow previous" @click="showPrev" v-if="films.length > 5">
      <svg
          width="35"
          height="34"
          viewBox="0 0 35 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M33 2L18 17L33 32M18 2L3 17L18 32" stroke-width="3" />
      </svg>
    </div>

    <div class="carousel-arrow next" @click="showNext" v-if="films.length > 5">
      <svg
          width="35"
          height="34"
          viewBox="0 0 35 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M33 2L18 17L33 32M18 2L3 17L18 32" stroke-width="3" />
      </svg>
    </div>
  </div>
</template>



<style lang="scss">
.margin__track {
  &.movies__carousel::before {
    display: none;
  }

  &.movies__carousel::after {
    display: none;
  }

  & .slick-track {
    @media (min-width: 1200px) {
      margin-left: 190px;
    }
  }
}

.movies__carousel {
  position: relative;
  width: 100%;

  overflow: hidden;

  @media (max-width: 725px) {
    //overflow: scroll;
  }

  &::before,
  &::after {
    position: absolute;
    content: "";
    top: 0;

    width: 180px;
    height: 100%;

    z-index: 1;

    @media (max-width: 1200px) {
      width: 190px;
    }

    @media (max-width: 1024px) {
      width: 174px;
    }
    @media (max-width: 877px) {
      width: 150px;
    }

    @media (max-width: 768px) {
      width: 140px;
    }

    @media (max-width: 1299px) and (min-width: 1200px) {
      width: 165px;
    }

    @media (min-width: 1600px) {
      width: 190px;
    }

    @media (max-width: 725px) {
      display: none;
    }
  }

  &::before {
    left: -1px;

    background: linear-gradient(
            90deg,
            #070707 36.09%,
            rgba(0, 0, 0, 0) 159.17%
    );
  }

  &::after {
    right: -1px;

    background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0) -61.97%,
            #070707 65.85%
    );
  }

  .slick-track {
    position: relative;
    display: flex;
    justify-content: space-between;

    @media (max-width: 725px) {
      justify-content: space-around;
      margin-left: -23%;
      column-gap: 17px;
    }
  }

  .slick-slide {
    display: inline-block;
    max-width: 160px;

    @media (max-width: 1300px) {
      width: 123px;
      max-width: none;
    }

    @media (max-width: 725px) {
      width: 252px!important;
      max-width: 252px;
      //margin-left: 8px;
      //margin-right: 8px;
    }

    &:not(:last-child) {
      @media (max-width: 725px) {
        //margin-right: 17px;
      }
    }

    & .carousel-item__content {
      display: flex;
      flex-direction: column;
      align-items: center;

      font-family: "Montserrat";
      font-weight: 300;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
      text-decoration: none;
      cursor: pointer;

      @media (max-width: 1300px) {
        font-size: 12px;
        line-height: 15px;
      }

      @media (max-width: 725px) {
        font-size: 15px;
        line-height: 18px;
        text-align: center;
      }

      & span {
        @media (max-width: 1300px) {
          width: 123px;
        }

        @media (max-width: 725px) {
          width: 252px;
        }
      }
    }
  }

  & .carousel-item img {
    width: 142px;
    height: 214px;

    margin-bottom: 14px;

    @media (max-width: 1300px) {
      width: 123px;
      height: 185px;
    }

    @media (max-width: 725px) {
      width: 252px;
      height: 402px;
    }
  }

  & .carousel-arrow {
    position: absolute;
    top: 50%;

    transform: translateY(-50%);
    cursor: pointer;
    z-index: 2;

    @media (max-width: 725px) {
      display: none;
    }

    & svg {
      stroke: #ffffff;
    }

    &:hover {
      & svg {
        stroke: #01bdf9;
        filter: drop-shadow(0px 0px 4px #01bdf9);
      }
    }

    &.previous {
      left: 75px;

      @media (max-width: 1300px) {
        left: 35px;
      }
    }

    &.next {
      right: 75px;

      transform: translateY(-50%) rotateY(180deg);

      @media (max-width: 1300px) {
        right: 35px;
      }
    }
  }
}

.slider_wrap * {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
</style>