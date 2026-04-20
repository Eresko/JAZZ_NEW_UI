<script setup lang="ts">
import { ref, defineProps,computed,defineEmits } from 'vue'
import { useModalStore } from '@/store/modals'
const modalStore = useModalStore()
const emit = defineEmits(['showMove'])
const props = defineProps({
      dataFilm: {
        type: Object,
        default: ()=> {},
      }
    }
);
const file = ref('')
const rating = ref(0)

const director = computed(() => {
  if (typeof props.dataFilm.director != 'undefined') {
    return props.dataFilm.director[0]
  }
  return ""
})

const setShowMove = () => {
  modalStore.TOGGLE_VIDEO_MODAL()
}
const handleRating = (val:any) => {
  rating.value = val
}
</script>







<template>
  <section class="moviedetails">

    <div class="container moviedetails__container">
      <div class="details">
        <div class="details__banner">
          <img :src="props.dataFilm?.posters" alt="" v-if="props.dataFilm && props.dataFilm.posters"/>


          <div class="review">
            <ul class="review__stars">
              <li
                  class="review__stars-item"
                  style="display: none"
                  :class="{ active: rating == 0 }"
                  @click="handleRating(1)"
              >
                <svg
                    width="35"
                    height="33"
                    viewBox="0 0 35 33"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M28.1079 32.8031L17.6361 26.5106L7.15481 32.8088L9.90356 20.9025L0.674805 12.8813L12.8454 11.8181L17.6248 0.5625L22.3986 11.8088L34.5786 12.8756L25.3573 20.8913L28.1079 32.8031Z"
                      stroke-width="2"
                  />
                </svg>
              </li>

              <li
                  class="review__stars-item"
                  :class="{ active: rating == 1 }"
                  @click="handleRating(1)"
              >
                <svg
                    width="35"
                    height="33"
                    viewBox="0 0 35 33"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M28.1079 32.8031L17.6361 26.5106L7.15481 32.8088L9.90356 20.9025L0.674805 12.8813L12.8454 11.8181L17.6248 0.5625L22.3986 11.8088L34.5786 12.8756L25.3573 20.8913L28.1079 32.8031Z"
                      stroke-width="2"
                  />
                </svg>
              </li>

              <li
                  class="review__stars-item"
                  :class="{ active: rating == 2 }"
                  @click="handleRating(2)"
              >
                <svg
                    width="35"
                    height="33"
                    viewBox="0 0 35 33"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M28.1079 32.8031L17.6361 26.5106L7.15481 32.8088L9.90356 20.9025L0.674805 12.8813L12.8454 11.8181L17.6248 0.5625L22.3986 11.8088L34.5786 12.8756L25.3573 20.8913L28.1079 32.8031Z"
                      stroke-width="2"
                  />
                </svg>
              </li>

              <li
                  class="review__stars-item"
                  :class="{ active: rating == 3 }"
                  @click="handleRating(3)"
              >
                <svg
                    width="35"
                    height="33"
                    viewBox="0 0 35 33"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M28.1079 32.8031L17.6361 26.5106L7.15481 32.8088L9.90356 20.9025L0.674805 12.8813L12.8454 11.8181L17.6248 0.5625L22.3986 11.8088L34.5786 12.8756L25.3573 20.8913L28.1079 32.8031Z"
                      stroke-width="2"
                  />
                </svg>
              </li>

              <li
                  class="review__stars-item"
                  :class="{ active: rating == 4 }"
                  @click="handleRating(4)"
              >
                <svg
                    width="35"
                    height="33"
                    viewBox="0 0 35 33"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M28.1079 32.8031L17.6361 26.5106L7.15481 32.8088L9.90356 20.9025L0.674805 12.8813L12.8454 11.8181L17.6248 0.5625L22.3986 11.8088L34.5786 12.8756L25.3573 20.8913L28.1079 32.8031Z"
                      stroke-width="2"
                  />
                </svg>
              </li>

              <li
                  class="review__stars-item"
                  :class="{ active: rating == 5 }"
                  @click="handleRating(5)"
              >
                <svg
                    width="35"
                    height="33"
                    viewBox="0 0 35 33"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M28.1079 32.8031L17.6361 26.5106L7.15481 32.8088L9.90356 20.9025L0.674805 12.8813L12.8454 11.8181L17.6248 0.5625L22.3986 11.8088L34.5786 12.8756L25.3573 20.8913L28.1079 32.8031Z"
                      stroke-width="2"
                  />
                </svg>
              </li>
            </ul>

            <button class="review__btn">Оценить</button>
          </div>
        </div>

        <div class="details__movie">
          <div class="details__movie-info">
            <div class="details__movie-item">
              <h2 class="movie-title">{{ dataFilm?.name_film }}</h2>

              <ul class="movie-genre">
                <li
                    class="movie-genre__item"
                    v-for="genre in props.dataFilm?.genre"
                    :key="genre">{{ genre }}</li>
              </ul>

              <p class="movie-duration">{{ dataFilm?.time_film }} мин</p>
            </div>

            <div class="details__movie-item movie__icons">
              <a class="movies-icon" href="#" @click="setShowMove">
                <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                      class="movies-icon__change-color"
                      cx="29.908"
                      cy="29.908"
                      r="29.908"
                  />
                  <path
                      d="M46.915 29.908L19.646 45.6518V14.1642L46.915 29.908Z"
                      fill="white"
                  />
                </svg>
              </a>

              <a class="movies-icon" href="#">
                <!-- <img src="../assets/images/film.svg" alt=""> -->
                <svg
                    width="52"
                    height="60"
                    viewBox="0 0 52 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                      class="movies-icon__change-color"
                      width="51.8405"
                      height="59.816"
                      rx="5"
                  />
                  <rect
                      x="5.58301"
                      y="3.98773"
                      width="7.17791"
                      height="7.17791"
                      rx="2"
                      fill="white"
                  />
                  <rect
                      x="39.0796"
                      y="3.98773"
                      width="7.17791"
                      height="7.17791"
                      rx="2"
                      fill="white"
                  />
                  <rect
                      x="5.58301"
                      y="18.3436"
                      width="7.17791"
                      height="7.17791"
                      rx="2"
                      fill="white"
                  />
                  <rect
                      x="39.0796"
                      y="18.3436"
                      width="7.17791"
                      height="7.17791"
                      rx="2"
                      fill="white"
                  />
                  <rect
                      x="5.58301"
                      y="32.6994"
                      width="7.17791"
                      height="7.17791"
                      rx="2"
                      fill="white"
                  />
                  <rect
                      x="39.0796"
                      y="32.6994"
                      width="7.17791"
                      height="7.17791"
                      rx="2"
                      fill="white"
                  />
                  <path
                      d="M5.58301 49.0552C5.58301 47.9506 6.47844 47.0552 7.58301 47.0552H10.7609C11.8655 47.0552 12.7609 47.9506 12.7609 49.0552V52.2331C12.7609 53.3377 11.8655 54.2331 10.7609 54.2331H7.58301C6.47844 54.2331 5.58301 53.3377 5.58301 52.2331V49.0552Z"
                      fill="white"
                  />
                  <path
                      d="M39.0796 49.0552C39.0796 47.9506 39.975 47.0552 41.0796 47.0552H44.2575C45.3621 47.0552 46.2575 47.9506 46.2575 49.0552V52.2331C46.2575 53.3377 45.3621 54.2331 44.2575 54.2331H41.0796C39.975 54.2331 39.0796 53.3377 39.0796 52.2331V49.0552Z"
                      fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div class="details__movie-info">
            <div class="movie-rent details__movie-item">
              <p><span>Начало проката:</span> <time>{{ dataFilm?.start_date }}</time></p>

              <p><span>Окончание проката:</span> <time>{{ dataFilm?.end_date }}</time></p>

              <p><span>Страна:</span> {{ dataFilm?.country }}</p>
              <p><span>Год выпуска:</span> {{ dataFilm?.year_of_issue }}</p>

              <p><span>Режиссёр:</span> {{ dataFilm?.director }}</p>
            </div>

            <div class="movie__cast details__movie-item">
              <p>В ролях:</p>

              <ul class="movie__cast-list">
                <li
                    class="movie__cast-item"
                    v-for="actor in props.dataFilm?.actors"
                    :key="actor">{{ actor }}</li>
              </ul>

              <a href="#">
                ещё
                <svg
                    width="51"
                    height="8"
                    viewBox="0 0 51 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M50.3536 4.35355C50.5488 4.15829 50.5488 3.84171 50.3536 3.64645L47.1716 0.464466C46.9763 0.269204 46.6597 0.269204 46.4645 0.464466C46.2692 0.659728 46.2692 0.976311 46.4645 1.17157L49.2929 4L46.4645 6.82843C46.2692 7.02369 46.2692 7.34027 46.4645 7.53553C46.6597 7.7308 46.9763 7.7308 47.1716 7.53553L50.3536 4.35355ZM0 4.5H50V3.5H0V4.5Z"
                      fill="#1C1C1C"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div class="details__movie-annotation">
            <span>Аннотация:</span>
            <p v-html="props.dataFilm?.description">
            </p>
          </div>
        </div>
      </div>

      <div class="memorandum" v-if="props.dataFilm?.memorandum_show">
        <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="13" cy="13" r="12" stroke="#01BDF9" stroke-width="2" />
          <path
              d="M10.936 6.4H14.284L13.726 14.626H11.494L10.936 6.4ZM12.61 19.144C12.118 19.144 11.704 18.988 11.368 18.676C11.044 18.352 10.882 17.962 10.882 17.506C10.882 17.05 11.044 16.672 11.368 16.372C11.692 16.06 12.106 15.904 12.61 15.904C13.114 15.904 13.528 16.06 13.852 16.372C14.176 16.672 14.338 17.05 14.338 17.506C14.338 17.962 14.17 18.352 13.834 18.676C13.51 18.988 13.102 19.144 12.61 19.144Z"
              fill="#01BDF9"
          />
        </svg>
        &nbsp;

        <p class="memorandum-text">
          <a class="memorandum-link" href="memorandum">МЕМОРАНДУМ:</a>

          скидки и пригласительные не действуют по {{ props.dataFilm?.memorandum }}
        </p>
      </div>
    </div>
  </section>
</template>


<style lang="scss">
.video {
  width: 100%;
  position: absolute;
  top:10;
  z-index: 10;
}
.moviedetails {
  padding-top: 86px;
  position: relative;
  font-family: "Montserrat";

  @media (max-width: 1300px) {
    padding-top: 57px;
  }

  @media (max-width: 725px) {
    padding-top: 20px;
    background: #fff;
    box-shadow: inset 0px 14px 14px -13px rgba(0,0,0,0.75);
  }

  &__container {
    display: flex;
    flex-direction: column;
  }

  & .details {
    display: flex;
    justify-content: space-between;
    margin-bottom: 38px;

    @media (max-width: 1300px){
      margin-bottom: 78px;
    }

    @media (max-width: 725px){
      flex-direction: column;
      margin-bottom: 34px;
      padding: 0 10px;
      background: #fff;
    }


    &__banner {
      position: relative;
      width: 37.7%;
      align-self: flex-start;

      @media (max-width: 1300px){
        width: 32%;
      }

      @media (max-width: 725px){
        padding: 30px 0;
        width: 100%;
      }

      & img {
        width: 100%;

        object-fit: cover;
        object-position: center;
      }

      & .review {
        position: absolute;
        left: 0;
        bottom: -87px;

        @media (max-width: 725px) {
          position: relative;
          bottom: 0;
          margin-top: 10px;
          padding: 3px 0;
          display: flex;
          justify-content: space-between;
        }

        &__stars {
          display: flex;
          margin-bottom: 20px;

          list-style-type: none;

          @media (max-width: 725px) {
            margin-bottom: 0;
          }

          &-item {
            margin-right: 11px;

            cursor: pointer;

            & svg {
              fill: #01bdf9;
              stroke: #01bdf9;
              @media (max-width: 1300px) {
                width: 24px;
                height: 23px;
              }
            }

            &.active {
              & ~ * {
                svg {
                  fill: none;
                  stroke: #01bdf9;
                }
              }
            }
          }
        }

        &__btn {
          padding: 5px 13px;
          font-family: Montserrat;
          font-weight: 400;
          font-size: 13px;
          line-height: 16px;

          color: #ffffff;
          background-color: #2c2c2c;
          border: none;
          border-radius: 5px;
          cursor: pointer;

          @media (max-width: 725px) {
            color: #1C1C1C;
            background-color: rgba(139, 139, 139, 0.14);
          }
        }
      }
    }

    &__movie {
      width: 57.5%;
      padding-top: 11px;

      font-weight: 500;
      font-size: 15px;
      line-height: 25px;

      color: #1c1c1c;

      @media (max-width: 1300px) {
        padding-top: 0;
        width: 65.5%;
        font-size: 13px;
      }

      @media (max-width: 725px) {
        position: relative;
        width: 100%;
      }

      &-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 34px;

        @media (max-width: 1300px) {
          margin-bottom: 31px;
        }
        @media (max-width: 725px) {
          flex-direction: column;
          gap: 12px;
          margin-bottom: 14px;
        }


        & .movie-title {
          margin-bottom: 7px;

          font-weight: 700;
          font-size: 26px;
          line-height: 32px;

          @media (max-width: 725px) {
            margin-bottom: 5px;
            font-size: 20px;
            line-height: 24px;
          }
        }

        & .movie-genre{
          display: flex;
          flex-wrap: wrap;

          @media (max-width: 1300px) {
            line-height: 16px;
          }

          &__item {
            margin-right: 5px;

            list-style-type: none;
          }
        }

        & .movie-duration {
          line-height: 18px;

          color: #8b8b8b;

          @media (max-width: 1300px) {
            margin-top: 9px;
          }

          @media (max-width: 725px) {
            margin-top: 2px;
          }
        }

        & .movie-rent span {
          font-weight: 700;
        }
      }

      &-item {
        width: 41%;

        &:first-child {
          @media(max-width: 1300px) {
            width: 60%;
          }

          @media(max-width: 725px) {
            width: 100%;
          }
        }

        &:last-child {
          @media(max-width: 1300px) {
            width: 32%;
          }
          @media(max-width: 725px) {
            width: fit-content;
          }
        }

        & .movies-icon {

          @media(max-width: 725px) {
            text-align: right;
          }

          &:first-child {
            margin-right: 35px;

            @media(max-width: 725px) {
              margin-right: 0;
              width: 41px;
              height: 41px;
            }
          }

          &:last-child {
            @media(max-width: 725px) {
              width: 33px;
              height: 38px;
            }
          }

          & svg {
            @media(max-width: 725px) {
              width: 41px;
              height: 41px;
            }
          }
        }

        & .movies-icon {
          .movies-icon__change-color {
            fill: #98e6ff;
          }

          &:hover {
            .movies-icon__change-color {
              fill: #01bdf9;
            }
          }
        }
      }

      & .movie__icons {
        @media(max-width: 725px) {
          position: absolute;
          top: 215px;
          right: 10px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: fit-content;
        }
      }

      & .movie-rent {
        @media (max-width: 1300px) {
          width: 67%;
        }

        @media (max-width: 725px) {
          width: 100%;
        }
      }

      & .movie__cast {
        @media (max-width: 725px) {
          position: relative;
          min-height: 93px;
        }

        & p,
        a {
          font-weight: 700;

          text-decoration: none;
          color: #1c1c1c;
        }

        &-list {
          list-style-type: none;
        }
      }

      &-annotation span {
        display: block;

        font-weight: 700;

        @media (max-width: 725px) {
          padding-top: 18px;
        }
      }
    }
  }

  & .memorandum {
    position: relative;
    display: flex;
    align-items: center;
    align-self: center;
    margin-left: 127px;
    margin-bottom: 12px;

    font-weight: 600;
    font-size: 15px;
    line-height: 18px;

    color: #1c1c1c;

    @media (max-width: 1300px) {
      justify-content: center;
      margin-left: 200px;
      font-size: 13px;
      line-height: 16px;

      align-self: initial;
    }

    @media (max-width: 770px) {
      margin-left: 27.2%;
      justify-content: flex-start;
    }

    @media (max-width: 725px) {
      margin-left: 10px;
      margin-right: 10px;
      font-size: 11px;
    }

    &-link {
      font-weight: 700;

      text-decoration: none;
      color: #01bdf9;

      @media (max-width: 725px) {
        font-size: 12px;
      }
    }

    & svg {
      @media (max-width: 1300px) {
        width: 20px;
        height: 20px;
      }

      @media (max-width: 725px) {
        position: absolute;
        top:0;
        left: 0;
        width: 16px;
        height: 16px;
      }
    }

    &-text {
      @media (max-width: 725px) {
        text-indent: 16px;
      }
    }
  }
}

.schedule::before {
  @media (max-width: 725px) {
    display: none;
  }
}

</style>
