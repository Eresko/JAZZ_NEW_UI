<script setup lang="ts">
import { ref,onMounted } from 'vue'
import { useCurrentFilmsStore } from '@/store/useCurrentFilmsStore'

const filmList = ref()
const carouselTab = ref<number>(1);

// Создаем стор
const currentFilmsStore = useCurrentFilmsStore();

// Функция переключения вкладки и вызова API
const toggleCarouselTab = async (val: number) => {
  carouselTab.value = val;
  await currentFilmsStore.FETCH_CURRENT_FILMS(val);
  filmList.value = currentFilmsStore.GET_CURRENT_FILMS
}

onMounted( async () => {
  await currentFilmsStore.FETCH_CURRENT_FILMS(1);
  filmList.value = currentFilmsStore.GET_CURRENT_FILMS
});
</script>


<template>
  <section class="movies">
    <div class="container movies__container">
      <h2 class="movies__title">Фильмы</h2>

      <ul class="movies__list">
        <li class="movies__list-item" @click.prevent="toggleCarouselTab(1)">
          <span
              class="movies__list-link"
              :class="{ active: carouselTab == 1 }"
          >В прокате</span>
        </li>

        <li class="movies__list-item" @click.prevent="toggleCarouselTab(2)">
          <span
              class="movies__list-link"
              :class="{ active: carouselTab == 2 }"
          >Скоро</span>
        </li>

        <li class="movies__list-item" @click.prevent="toggleCarouselTab(3)">
          <span
              class="movies__list-link"
              :class="{ active: carouselTab == 3 }"
          >Киноклуб PS</span>
        </li>

        <li class="movies__list-item" @click.prevent="toggleCarouselTab(4)">
          <span
              class="movies__list-link"
              :class="{ active: carouselTab == 4 }"
          >Ретроспектива</span>
        </li>

        <li class="movies__list-item" @click.prevent="toggleCarouselTab(5)">
          <span
              class="movies__list-link"
              :class="{ active: carouselTab == 5 }"
          >Не только JAZZ</span>
        </li>
      </ul>

      <NuxtLink to="films" class="movies__details-link">
        <span>Подробнее</span>

        <svg
            class="link-arrow"
            width="151"
            height="9"
            viewBox="0 0 151 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M150.354 4.70328C150.549 4.50802 150.549 4.19144 150.354 3.99618L147.172 0.814198C146.976 0.618935 146.66 0.618935 146.464 0.814198C146.269 1.00946 146.269 1.32604 146.464 1.5213L149.293 4.34973L146.464 7.17816C146.269 7.37342 146.269 7.69 146.464 7.88527C146.66 8.08053 146.976 8.08053 147.172 7.88527L150.354 4.70328ZM0 4.84973H150V3.84973H0V4.84973Z"
              fill="white"
          />
        </svg>
      </NuxtLink>
    </div>

    <div class="container carousel-container" >
      <MoviesCarousel :films="filmList" />
    </div>
  </section>
</template>



<style lang="scss">
.movies {
  position: relative;

  display: flex;
  flex-direction: column;
  padding: 26px 0 38px;

  background-color: #070707;

  &::before {
    position: absolute;
    content: "";
    left: 0;
    top: 71px;

    width: 25%;
    height: 1px;

    background-color: #ffffff;
  }

  &__container {
    align-items: baseline;

    margin-bottom: 32px;

    font-family: "NEXT ART";
    font-weight: 400;
    text-transform: uppercase;

    color: #ffffff;
  }

  &__title {
    font-weight: 600;
    font-size: 26px;
    line-height: 28px;
  }

  &__list {
    display: flex;
    justify-content: space-between;
    gap: 40px;

    min-width: 400px;

    //font-size: 20px;
    //line-height: 22px;
    font-size: 13px;
    line-height: 15px;

    list-style-type: none;

    &-link {
      text-decoration: none;
      color: #ffffff;
      cursor: pointer;

      &:hover {
        text-shadow: 0px 0px 4px #01bdf9;
      }

      &:active {
        color: #01bdf9;
        text-shadow: 0px 0px 4px #01bdf9;
      }

      &.active {
        font-weight: 600;
        color: #01bdf9;

        &:hover {
          text-shadow: none;
        }
      }
    }
  }

  &__details-link {
    display: flex;
    flex-direction: column;

    text-decoration: none;
    color: #ffffff;

    font-size: 15px;
    line-height: 16px;

    & span {
      margin-bottom: 3px;
    }

    &:hover {
      .link-arrow {
        transform: translateX(10%);
      }
    }

    .link-arrow {
      transition: all 0.3s;
    }
  }

  .carousel-container {
    width: 88%;
  }
}

@media (max-width: 1300px) {
  .movies {
    padding: 30px 0 49px;

    &__container {
      //margin-bottom: 11px;
      margin-bottom: 59px;
    }

    &::before {
      width: 147px;
    }

    &__title {
      font-size: 23px;
      line-height: 25px;
    }

    &__list {
      display: flex;
      gap: 38px;
      min-width: 0px;
      font-size: 15px;
      line-height: 16px;
    }

    &__details-link {
      font-size: 13px;
      line-height: 14px;
      svg {
        width: 103px;
      }
    }

    .carousel-container {
      width: 93.7%;
    }
  }
}

@media (max-width: 880px) {
  .movies {
    &__list {
      gap: 20px;
      font-size: 11px;
      line-height: 13px;
    }
  }
}

@media (max-width: 725px) {
  .movies {
    //padding: 89px 0 66px;
    padding: 89px 0 0;

    &__container {
      margin-bottom: 11px;
      //margin-left: 10px;
      padding-left: 10px;

      -ms-overflow-style: none;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &::before {
      display: none;
    }

    &__title {
      display: none;
    }

    &__list {
      gap: 25px;
      align-items: baseline;
      font-size: 12px;
      line-height: 13px;

      &-link {
        display: flex;
        width: max-content;
        font-weight: 400;

        &.active {
          font-weight: 600;
          font-size: 18px;
          line-height: 19px;
        }
      }
    }

    &__details-link {
      display: none;
    }

    .carousel-container {
      width: 100%;
    }
  }
}
</style>