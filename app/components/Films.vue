<script setup lang="ts">
import { ref,onMounted } from 'vue'
import { useScheduleStore  } from '@/store/schedule'
import { useCurrentFilmsStore } from '@/store/useCurrentFilmsStore'
import { useRouter } from 'vue-router';
const currentFilmsStore = useCurrentFilmsStore();
const scheduleStore  = useScheduleStore();
const carouselTab = ref(1);
const filmList = ref();


const router = useRouter();
const toggleCoruselTab = async (val:number) => {
  carouselTab.value = val
  await currentFilmsStore.FETCH_CURRENT_FILMS(carouselTab.value);
  filmList.value = currentFilmsStore.GET_CURRENT_FILMS
}

onMounted( async () => {
  await currentFilmsStore.FETCH_CURRENT_FILMS(carouselTab.value);
  filmList.value = currentFilmsStore.GET_CURRENT_FILMS
});

const goToDetails = (id:number) => {
  router.push(`/filmDetails/${id}`);
}


</script>


<template>
  <section class="films">
    <div class="container films__container">
      <div class="header header__container">
        <h2 class="header__title">Фильмы</h2>

        <ul class="header__list">
          <li class="header__list-item" @click.prevent="toggleCoruselTab(1)">
            <span
                class="header__list-link"
                :class="{ active: carouselTab == 1 }"
            >В прокате</span
            >
          </li>

          <li class="header__list-item" @click.prevent="toggleCoruselTab(2)">
            <span
                class="header__list-link"
                :class="{ active: carouselTab == 2 }"
            >Скоро</span
            >
          </li>

          <li class="header__list-item" @click.prevent="toggleCoruselTab(3)">
            <span
                class="header__list-link"
                :class="{ active: carouselTab == 3 }"
            >Киноклуб ПС</span
            >
          </li>

          <li class="header__list-item" @click.prevent="toggleCoruselTab(4)">
            <span
                class="header__list-link"
                :class="{ active: carouselTab == 4 }"
            >Ретроспектива</span
            >
          </li>

          <li class="header__list-item" @click.prevent="toggleCoruselTab(5)">
            <span
                class="header__list-link"
                :class="{ active: carouselTab == 5 }"
            >Не только ДЖАЗ</span
            >
          </li>
        </ul>
      </div>

      <ul class="films__list">
        <li
            class="films__list-item"
            v-for="item in filmList"
            :key="item.filmCopyId"
        >
          <img class="films__banner" :src="item.posters" :alt="item.name" @click="goToDetails(item.id)"/>

          <div class="films__item-container">
            <p class="films__title">{{ item.name_film }}</p>

            <div class="films__descr-wrapper">
              <div class="films__descr">
                <div class="films__genre-wrapper">
                  <span
                      class="films__genre"

                  >{{ item.genre }}</span
                  >
                </div>

                <span class="films__duration">{{ item.duration }} мин</span>
              </div>

              <span class="films__descr-link" @click="goToDetails(item.id)">
                <svg
                    width="51"
                    height="8"
                    viewBox="0 0 51 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                  <path
                      d="M50.3536 4.35355C50.5488 4.15829 50.5488 3.84171 50.3536 3.64645L47.1716 0.464466C46.9763 0.269204 46.6597 0.269204 46.4645 0.464466C46.2692 0.659728 46.2692 0.976311 46.4645 1.17157L49.2929 4L46.4645 6.82843C46.2692 7.02369 46.2692 7.34027 46.4645 7.53553C46.6597 7.7308 46.9763 7.7308 47.1716 7.53553L50.3536 4.35355ZM0 4.5H50V3.5H0V4.5Z"
                      fill="white"
                  />
                </svg>
              </span>
            </div>
          </div>
        </li>
      </ul>

      <slot />
    </div>
  </section>
</template>



<style lang="scss">
.films {
  position: relative;

  padding: 125px 0 153px;

  background-color: #161616;
  color: #ffffff;

  @media (max-width: 1300px) {
    padding-bottom: 149px;
  }

  @media (max-width: 725px) {
    padding: 137px 0 41px;
  }

  &__container {
    display: flex;
    flex-direction: column;
  }

  & .header {
    display: flex;
    justify-content: space-between;
    //width: 61%;
    padding-left: 10px;
    padding-right: 15px;
    margin-bottom: 63px;

    font-family: "NEXT ART";

    //width: 79.5%;
    //width: 70%;

    @media (max-width: 1760px) {
      //width: 79.5%;
    }

    @media (max-width: 1500px) {
      //width: 80.5%;
    }

    @media (max-width: 1399px) {
      //width: 100%;
      //justify-content: flex-start;
      //width: 83%;
    }

    @media (max-width: 1300px) {
      justify-content: flex-start;
      gap: 77px;
      padding-left: 0;
      //width: 100%;
    }

    @media (max-width: 1023px) {
      justify-content: flex-start;
      gap: 48px;
      padding-left: 0;
      //width: 100%;
    }

    @media (max-width: 725px) {
      margin-top: -39px;
      margin-bottom: 0;
      //width: 100%;
      overflow-x: auto;

      -ms-overflow-style: none;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &::before {
      position: absolute;
      content: "";
      left: 0;
      top: 166px;

      width: 25%;
      height: 1px;

      background-color: #ffffff;

      @media (max-width: 1300px) {
        width: 146px;
      }

      @media (max-width: 725px) {
        display: none;
      }
    }

    &__container {
      width: 100%;
      overflow-y: hidden;
    }

    &__title {
      font-weight: 600;
      font-size: 26px;
      line-height: 28px;

      text-transform: uppercase;

      @media (max-width: 1300px) {
        font-size: 23px;
        line-height: 25px;
      }

      @media (max-width: 725px) {
        display: none;
      }
    }

    &__list {
      display: flex;
      justify-content: space-between;
      gap: 40px;

      min-width: 400px;

      font-size: 20px;
      line-height: 22px;

      list-style-type: none;

      @media (max-width: 1300px) {
        justify-content: flex-start;
        //gap: 38px;
        gap: 18px;
        align-items: center;
        //min-width: 100%;
        //width: 100%;
        font-size: 15px;
        line-height: 16px;
      }

      @media (max-width: 1023px) {
        font-size: 14px;
        line-height: 16px;
      }

      @media (max-width: 725px) {
        gap: 19px;
        justify-content: flex-start;
        align-items: baseline;
        font-size: 12px;
        line-height: 13px;
        min-width: auto;
        margin-left: 10px;
      }

      &-link {
        text-decoration: none;
        color: #ffffff;
        cursor: pointer;
        @media (max-width: 725px) {
          width: max-content;
          display: flex;
          font-weight: 400;
        }

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

          @media (max-width: 725px) {
            font-weight: 600;
            font-size: 18px;
            line-height: 19px;
          }

          &:hover {
            text-shadow: none;
          }
        }
      }
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;

    font-family: "Montserrat";
    font-weight: 500;

    list-style-type: none;

    @media (max-width: 1300px) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      row-gap: 40px;
      column-gap: 20px;
      align-self: center;
    }

    //@media (max-width: 750px) {
    //  grid-template-columns: repeat(3, 1fr);
    //  column-gap: 14px;
    //  row-gap: 22px;
    //  justify-content: center;
    //  margin: 0 10px;
    //}

    @media (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 14px;
      row-gap: 22px;
      justify-content: center;
      margin: 0 10px;
    }

    @media (max-width: 319px) {
      grid-template-columns: repeat(1, 1fr);
    }


    &-item {
      display: flex;
      flex-direction: column;

      width: 23.5%;
      margin: 0 20px 36px 0;

      background-color: #1c1c1c;

      &:nth-child(4n) {
        margin-right: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      @media (max-width: 1365px) {
        margin-right: 15px;
      }

      @media (max-width: 1300px) {
        margin: 0;
        width: 227px;
      }

      @media (max-width: 725px) {
        margin: 0;
        //width: 143px;
        //height: auto;
        min-width: 143px;
        width: auto;
      }
    }

    &:last-child {
      @media (max-width: 725px) {
        justify-content: flex-start;
      }
    }
  }

  &__item-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    flex: 1;
    padding: 8px 20px 15px 16px;

    @media (max-width: 1300px) {
      padding: 9px 10px 14px 11px;
    }

    @media (max-width: 725px) {
      padding: 10px 6px 15px 5px;
    }
  }

  &__banner {
    width: 100%;
    min-height: 332px;
    height: 332px;

    object-fit: fill;
    object-position: center;

    @media (max-width: 1300px) {
      object-fit: initial;
      //object-position: top;
      min-height: 288px;
      height: 288px;
    }

    @media (max-width: 725px) {
      min-height: 181px;
      //height: 181px;
      object-position: top;
    }
  }

  &__title {
    margin-bottom: 29px;

    font-size: 15px;
    line-height: 18px;

    @media (max-width: 1300px) {
      margin-bottom: 46px;
      font-size: 16px;
      line-height: 19.5px;
    }

    @media (max-width: 725px) {
      font-size: 14px;
      line-height: 17px;
    }
  }

  &__descr-wrapper {
    display: flex;
    justify-content: space-between;

    & a {
      align-self: flex-end;

      transition: all 0.3s;

      &:hover {
        transform: translateX(10%);
      }
    }

    @media (max-width: 725px) {
      flex-direction: column;
    }
  }

  &__descr {
    display: flex;
    flex-direction: column;

    font-size: 14px;
    line-height: 17px;

    @media (max-width: 1300px) {
      font-size: 12px;
      line-height: 14.63px;
      color: rgba(255, 255, 255, 0.7);
    }

    @media (max-width: 725px) {
      font-size: 10px;
      line-height: 10px;
      //color: rgba(255, 255, 255, 0.7);
    }

    &-link {
      display: flex;
      align-self: flex-end;
      cursor: pointer;

      @media (max-width: 1300px) {
        width: 43px;
      }

      @media (max-width: 725px) {
        width: 100%;
        display: flex;
        align-self: flex-start;
        margin-top: 10px;
      }

      & svg {
        @media (max-width: 725px) {
          width: 60%;
        }
      }
    }
  }

  &__genre-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  &__genre {
    margin-right: 5px;
  }

  &__duration {
    font-size: 16px;
    line-height: 19.5px;
    color: #8b8b8b;

    @media (max-width: 1300px) {
      font-size: 12px;
      font-weight: 400;
      line-height: 14.63px;
      color: rgba(139, 139, 139, 0.7);
      text-transform: lowercase;
    }

    @media (max-width: 725px) {
      font-size: 10px;
      line-height: 10px;
      //color: rgba(139, 139, 139, 0.7);
    }
  }
}
</style>
