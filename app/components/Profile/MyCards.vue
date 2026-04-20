<script setup lang="ts">
import { watch, computed } from 'vue'
import { useOptionsStore } from '@/store/options'
import { useCardsStore } from '@/store/cards'


const cardsStore = useCardsStore()
const optionsStore = useOptionsStore()

import base from '@/assets/images/jazz_pa.png'
import kinoshka from '@/assets/images/movie_pa.png'
import stud from '@/assets/images/stud_pa.png'


const myCards = computed(() => cardsStore.cards)

// watch(
//     () => optionsStore.updateCard,
//     (newVal) => {
//       console.log("MY CARD UPDATED:", newVal)
//       if (newVal) {
//         console.log("MY CARD IS TRUE")
//       }
//     },
//     { immediate: true }
// )

// watch(
//     myCards,  // <-- важно, чтобы не было () => myCards
//     (newVal) => {
//       console.log("MY CARDS UPDATED:", newVal)
//       if (newVal) {
//         console.log("THERE ARE CARDS:", newVal)
//       }
//     },
//     { immediate: true }
// )
</script>
<template>
  <section class="mycards">
    <div class="container" >
      <div class="list__container" id="cards__list">
        <ul class="mycards__list" ref="carousel">
          <li v-for="(value, name, index) in myCards" class="mycards__item">
            <div v-for="item in value">
              <div class="mycards__list-item active-card main-card">
                <div class="mycards__item-card">
                  <img v-if='name === "Kinoshka"' :src="kinoshka" alt="Карта Киношка">
                  <img v-else-if='name === "Jazzcinema_Club"' :src="base" alt="Карта Jazz Cinema">
                  <img v-else :src="stud" alt="Студенческа карта">
                  <div class="mycards__item-text">
                    <p class="card-text__active">
                      <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.4996 0C7.83493 0 0 7.83511 0 17.5C0 27.1649 7.83493 35 17.4996 35C27.1651 35 35 27.1649 35 17.5C35 7.83511 27.1651 0 17.4996 0ZM24.2121 10.0332C24.1962 14.0325 24.1811 18.0311 24.1653 22.0304C23.7834 22.8933 22.861 24.6365 20.9209 25.9329C20.2176 26.4036 18.7943 27.334 16.8225 27.353C15.4643 27.3665 14.4347 26.9474 13.5893 26.6029C12.1303 26.0083 11.1713 25.2494 10.3561 24.5937C9.59561 23.9824 8.60096 23.0727 7.6079 21.7994C6.02742 21.8645 5.59559 21.6827 5.54161 21.4763C5.37649 20.8516 8.50173 19.3798 11.3261 18.6122C14.137 17.8485 16.9289 17.7072 17.0416 18.1335C17.0995 18.3526 16.4748 18.8154 16.2882 18.9559C16.0549 19.1313 15.8294 19.248 15.6453 19.3266C15.6429 19.691 15.6405 20.0553 15.6389 20.4197C15.6548 21.0762 15.8096 21.5787 15.9334 21.8915C16.1422 22.4225 16.3756 23.0132 16.9725 23.318C17.4369 23.5553 17.8981 23.5045 18.1323 23.4791C18.6467 23.4236 18.9991 23.2172 19.4778 22.9369C19.7556 22.7742 20.1232 22.5297 20.5169 22.1749C20.5153 21.3279 20.5129 20.4808 20.5113 19.6346C19.9231 19.7172 19.4452 19.275 19.4373 18.8376C19.4294 18.3915 19.9096 17.9239 20.5113 18.0065V17.7755C19.9072 17.8533 19.4309 17.3825 19.4429 16.938C19.4556 16.5077 19.9279 16.0735 20.5113 16.1529C20.5129 16.0608 20.5153 15.9687 20.5169 15.8758C19.9271 15.9703 19.4413 15.5289 19.4317 15.0907C19.4214 14.6486 19.8953 14.1818 20.4939 14.2596C20.4859 13.1355 20.4788 12.0115 20.4708 10.8882C22.0259 9.67918 23.5802 8.47097 25.1353 7.26197C25.4782 7.68905 25.8203 8.11692 26.1633 8.544C25.5124 9.04015 24.8622 9.53708 24.2121 10.0332Z" fill="#01BDF9"/>
                      </svg>&nbsp;
                      <span>{{ item.balance }}</span> &nbsp; баллов
                    </p>
                  </div>
                </div>
                <div class="mycards__item-info">
                  <ul class="mycards__item-list">
                    <li class="mycards__item-list__item">Номер карты: {{item.number}}</li>
                    <li class="mycards__item-list__item">Владелец: {{item.owner}}</li>
                    <li class="mycards__item-list__item">Дата открытия: {{item.issue_date}}</li>
                  </ul>
                  <div class="main-card__choice">
                    <button class="main-card__choice-btn mycards-btn">
                      <svg width="24" height="23" viewBox="0 0 24 23" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.4301 22.7307L12.2162 18.3959L4.99574 22.7346L6.88932 14.5325L0.531738 9.00676L8.91595 8.27438L12.2084 0.520508L15.497 8.26793L23.8877 9.00288L17.5352 14.5248L19.4301 22.7307Z"/>
                      </svg>
                      Сделать карту основной
                    </button>

                    <p class="main-card__text">
                      <svg width="24" height="23" viewBox="0 0 24 23" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.43 22.7307L12.216 18.3959L4.99562 22.7346L6.8892 14.5325L0.531616 9.00676L8.91583 8.27438L12.2083 0.520508L15.4969 8.26793L23.8875 9.00288L17.5351 14.5248L19.43 22.7307Z"/>
                      </svg>
                      Основная карта
                    </p>
                  </div>
                </div>
                <div class="mycards__item-footer" >
                  <ul class="control__list">
                    <li class="control__list-item" v-if="widthScreenResCard" :class="{active:showHistoryMobile==true}">
                      <button class="mycards-btn" @click="showHistoryMobile=true">Посмотреть историю операций</button>
                    </li>
                    <li class="control__list-item" v-else :class="{active:showHistory==true}">
                      <button class="mycards-btn" @click="showHistory=true">Посмотреть историю операций</button>
                    </li>
                    <li class="control__list-item">
                      <a v-if='name === "Kinoshka"' href="/loyalty/KidsCard" class="mycards-link">Узнать подробнее о карте</a>
                      <a v-else-if='name === "Jazzcinema_Club"' href="/loyalty/jazzCinemaCard" class="mycards-link">Узнать подробнее о карте</a>
                      <a v-else href="/loyalty/StudentCard" class="mycards-link">Узнать подробнее о карте</a>
                    </li>
                    <li class="control__list-item">
                      <button class="mycards-btn mycards-btn__delete" v-if="name > 1">
                        Удалить карту

                        <svg width="19" height="19" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.125 7.125H8.3125V14.25H7.125V7.125Z"/>
                          <path d="M10.6875 7.125H11.875V14.25H10.6875V7.125Z"/>
                          <path d="M2.375 3.5625V4.75H3.5625V16.625C3.5625 16.9399 3.68761 17.242 3.91031 17.4647C4.13301 17.6874 4.43506 17.8125 4.75 17.8125H14.25C14.5649 17.8125 14.867 17.6874 15.0897 17.4647C15.3124 17.242 15.4375 16.9399 15.4375 16.625V4.75H16.625V3.5625H2.375ZM4.75 16.625V4.75H14.25V16.625H4.75Z"/>
                          <path d="M7.125 1.1875H11.875V2.375H7.125V1.1875Z"/>
                        </svg>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="history history__mobile" v-if="showHistoryMobile">
                <div class="history__wrapper">
                  <div class="history__card">
                    <img :src="base" alt="Карта Jazz Cinema">
                  </div>
                  <h2 class="history__title">История операций <span>(карта 464 19050 32 484)</span></h2>

                  <div class="history__table-wrapper">
                    <span class="close" @click="showHistoryMobile=false"></span>

                    <table class="history__table">
                      <tr v-if="!widthScreenResCard" v-for="item in history" :key="item.id" class="history__table-line">
                        <td class="history__table-operation">{{item.operation}}</td>
                        <td class="history__table-film">{{item.film}}</td>
                        <td class="history__table-quantity">{{item.quantity}}</td>
                        <td class="history__table-date" v-if="item.show_date && widthScreenResCard">{{item.date}}</td>
                        <td class="history__table-date" v-if="!widthScreenResCard">{{item.date}}</td>
                        <td class="history__table-scores" :class="{ red : item.scores[0] == '-' }">{{item.scores}}</td>
                      </tr>

                      <tr v-if="index < history.length && widthScreenResCard" v-for="(commentIndex, index) in historyPurchaseShow" class="history__table-line">
                        <td class="history__table-operation">{{history[index].operation}}</td>
                        <td class="history__table-film">{{history[index].film}}</td>
                        <td class="history__table-quantity">{{history[index].quantity}}</td>
                        <td class="history__table-date" v-if="history[index].show_date && widthScreenResCard">{{history[index].date}}</td>
                        <td class="history__table-date" v-if="!widthScreenResCard">{{history[index].date}}</td>
                        <td class="history__table-scores" :class="{ red : history[index].scores[0] == '-' }">{{history[index].scores}}</td>
                      </tr>
                    </table>

                    <div class="history__showMore" v-if="historyPurchaseShow < history.length || history.length > historyPurchaseShow">
                      <button class="history__showMore-btn" @click="historyPurchaseShow += 10">Показать больше</button>
                    </div>

                    <slot />

                  </div>
                </div>
              </div>
            </div>

            <div v-if="value.length == 0" class="mycards__list-item nonactive-card">
              <div class="mycards__item-card">
                <img v-if='name === "Kinoshka"' :src="kinoshka" alt="Карта Киношка">
                <img v-else-if='name === "Jazzcinema_Club"' :src="base" alt="Карта Jazz Cinema">
                <img v-else :src="stud" alt="Студенческа карта">
                <div class="mycards__item-text">
                  <p class="card-text">Данная карта не привязана</p>
                </div>
              </div>
              <div class="mycards__item-info">
                <ul class="mycards__item-list">
                  <li class="mycards__item-list__item">Номер карты: </li>
                  <li class="mycards__item-list__item">Владелец: </li>
                  <li class="mycards__item-list__item">Дата открытия: </li>
                </ul>
              </div>
              <div class="mycards__item-footer">
                <button class="mycards__addcard-btn mycards-btn">Добавить карту</button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="history" v-if="showHistory">
        <div class="history__wrapper">
          <div class="history__card">
            <img :src="base" alt="Карта Jazz Cinema">
          </div>
          <h2 class="history__title">История операций <span>(карта 464 19050 32 484)</span></h2>

          <div class="history__table-wrapper">
            <span class="close" @click="showHistory=false"></span>

            <table class="history__table">
              <tr v-if="!widthScreenResCard" v-for="item in history" :key="item.id" class="history__table-line">
                <td class="history__table-operation">{{item.operation}}</td>
                <td class="history__table-film">{{item.film}}</td>
                <td class="history__table-quantity">{{item.quantity}}</td>
                <td class="history__table-date" v-if="item.show_date && widthScreenResCard">{{item.date}}</td>
                <td class="history__table-date" v-if="!widthScreenResCard">{{item.date}}</td>
                <td class="history__table-scores" :class="{ red : item.scores[0] == '-' }">{{item.scores}}</td>
              </tr>

              <tr v-if="index < history.length && widthScreenResCard" v-for="(commentIndex, index) in historyPurchaseShow" class="history__table-line">
                <td class="history__table-operation">{{history[index].operation}}</td>
                <td class="history__table-film">{{history[index].film}}</td>
                <td class="history__table-quantity">{{history[index].quantity}}</td>
                <td class="history__table-date" v-if="history[index].show_date && widthScreenResCard">{{history[index].date}}</td>
                <td class="history__table-date" v-if="!widthScreenResCard">{{history[index].date}}</td>
                <td class="history__table-scores" :class="{ red : history[index].scores[0] == '-' }">{{history[index].scores}}</td>
              </tr>
            </table>

            <div class="history__showMore" v-if="historyPurchaseShow < history.length || history.length > historyPurchaseShow">
              <button class="history__showMore-btn" @click="historyPurchaseShow += 10">Показать больше</button>
            </div>

            <slot />

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.mycards {
  margin-bottom: 113px;
  margin-top: 80px;

  @media (max-width: 1300px) {
    margin-top: 49px;
    margin-bottom: 79px;
  }

  @media (max-width: 725px) {
    margin-top: 0;
    margin-bottom: 0;
  }

  & .container {
    flex-direction: column;

    @media(max-width: 725px) {
      padding: 0 10px;
    }

    & .list__container {
      @media (max-width: 1300px) {
        overflow-x: scroll;

        &::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }
      }
    }
  }

  &__item {
    width: 32%;

    @media (max-width: 1179px) {
      width: 356px;
    }

    @media (max-width: 725px) {
      width: 272px;
    }
  }

  &__list {
    display: flex;
    justify-content: space-between;

    width: 100%;

    list-style: none;

    @media (max-width: 1300px) {
      //width: fit-content;
      width: 1108px;
    }

    @media (max-width: 725px) {
      width: fit-content;
      gap: 16px;
    }

    &-item {
      //width: 32%;

      padding: 15px 20px;
      padding-bottom: 23px;

      min-height: 548px;
      height: 100%;

      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 18px;
      color: #FFFFFF;


      background: rgba(28, 28, 28, 0.39);
      border-radius: 20px;
      border: 1px solid rgba(139, 139, 139, 0.2);

      @media (max-width: 1300px) {
        padding-top: 11px;
        width: 356px!important;
        height: 548px;
      }

      @media (max-width: 725px) {
        padding: 11px 12px 27px;
        width: 272px!important;
        height: 590px;
        font-size: 13px;
        line-height: 16px;
      }

      & img {
        width: 100%;
        max-width: 248px;
        max-height: 164px;
        margin-bottom: 26px;

        filter: drop-shadow(4px 5px 15px rgba(0, 0, 0, 0.21)) drop-shadow(-7px 4px 33px rgba(255, 255, 255, 0.07));
      }

      &:not(:last-child) {
        @media (max-width: 1439px) {
          margin-right: 20px;
        }

        @media (max-width: 725px) {
          margin-right: 16px;
        }
      }
    }

    & .active-card {
      background: linear-gradient(157.91deg, #464646 13.7%, rgba(28, 28, 28, 0) 112.05%);

      & .mycards__item-card *,
      & .mycards__item-info * {
        opacity: 1;
      }

      & .card-text__active {
        display: flex;
        align-items: center;

        color: #01BDF9;
      }

      & .card-text {
        display: none;
      }

      & .main-card__choice {
        visibility: visible;
      }

      & .mycards__addcard-btn {
        display: none;
      }

      &.main-card {
        & .main-card__choice-btn {
          display: none;
        }

        & .main-card__text {
          display: flex;
        }
      }

      & .control__list {
        display: grid;
        grid-gap: 8px;

        @media(max-width: 725px) {
          grid-gap: 18px;
        }
      }
    }
  }

  &__item-card {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;

    min-height: 236px;
    margin-bottom: 12px;

    border-bottom: 1px solid rgba(139, 139, 139, 0.2);

    & * {
      opacity: 0.36;
    }
  }

  &__item-text {
    font-size: 20px;
    line-height: 24px;

    @media(max-width: 725px) {
      width: 100%;
    }

    & .card-text {
      text-align: center;
    }
  }

  & .card-text__active {
    display: none;
  }

  &__item-info {
    padding-bottom: 28px;
    margin-bottom: 12px;

    height: 164px;

    border-bottom: 1px solid rgba(139, 139, 139, 0.2);

    & * {
      opacity: 0.36;
    }

    & .main-card__choice {
      visibility: hidden;

      &-btn svg {
        margin-right: 10px;

        fill: currentColor;
      }

      & .main-card__text {
        display: none;
        align-items: center;

        font-weight: 700;
        color: #01BDF9;

        & svg {
          margin-right: 10px;

          fill: currentColor;
        }
      }
    }
  }

  &__item-list {
    margin-bottom: 33px;

    list-style: none;

    &__item:not(:last-child) {
      margin-bottom: 7px;
    }
  }

  &-btn {
    position: relative;
    display: flex;
    align-items: center;

    padding: 0;

    font-family: 'Montserrat';
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
    text-align: left;

    background: none;
    border: none;
    cursor: pointer;

    @media(max-width: 725px) {
      font-size: 13px;
      line-height: 16px;
    }

    &::after {
      content:'';
      position: absolute;
      bottom: 1px;
      left: 0;
      width: 100%;
      height: 0.5px;
      background-color: #fff;
    }

    &:not(.mycards-btn__delete):hover {
      color: #01BDF9;
      text-shadow: 0px 0px 4px #01BDF9;

      &::after {
        background-color: #01BDF9;
      }
    }

    &:not(.mycards-btn__delete):active {
      color: #98E6FF;
      text-shadow: none;

      &::after {
        background-color: #98E6FF;
      }
    }

    &__delete {
      color: rgba(139, 139, 139, 0.4);
      text-decoration: 0.5px underline;
      text-underline-offset: 2px;

      &::after {
        display: none;
      }

      & svg {
        margin-left: 8px;

        fill: currentColor;
      }
    }
  }





  &-link {
    font-family: 'Montserrat';
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
    text-align: left;
    text-decoration: 0.5px underline;
    text-underline-offset: 3px;

    @media(max-width: 725px) {
      font-size: 13px;
      line-height: 16px;
    }

    &:hover {
      color: #01BDF9;
      text-shadow: 0px 0px 4px #01BDF9;

      &::after {
        background-color: #01BDF9;
      }
    }

    &:active {
      color: #98E6FF;
      text-shadow: none;

      &::after {
        background-color: #98E6FF;
      }
    }
  }





  &__item-footer {
    padding-top: 25px;
  }

  &__addcard-btn {
    position: relative;
    //margin: 0 auto;
    margin: 0 calc(50% - 71px) 0 calc(50% - 53px);

    transform: translateY(100%);
    text-decoration: 0.5px underline;
    text-underline-offset: 3px;

    @media (max-width: 725px) {
      margin: 0 calc(50% - 62px) 0 calc(50% - 46px);
    }

    & svg {
      margin-right: 7px;
    }

    &::before,
    &::after {
      content: '';

      position: absolute;
      top: 50%;
      left: -23px;

      width: 17px;
      height: 1px;

      background: currentColor;
    }

    &::after {
      transform: rotate(90deg);
    }
  }

  & .control__list {
    display: none;

    list-style-type: none;

    &-item:not(:last-child) {
      margin-bottom: 8px;
    }

    &-item.active .mycards-btn {
      color: #01BDF9;

      &::after {
        background-color: #01BDF9;
      }
    }
  }

  & .history {
    margin-top: 60px;

    font-family: 'Montserrat';
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;

    color: #FFFFFF;

    @media (max-width: 1178px) {
      font-size: 13px;
      line-height: 16px;
    }

    @media (max-width: 725px) {
      position: relative;
      top: -650px;
      margin-bottom: -650px;
      width: 272px;
      background: #000;
      border-top: none;
    }

    &__mobile {
      @media (max-width: 725px) {
        top: inherit;
        margin-bottom: inherit;
        margin-top: -590px;
        min-height: 590px;
      }
    }

    &__wrapper {
      @media (max-width: 725px) {
        background: linear-gradient(157.91deg, #464646 13.7%, rgba(28, 28, 28, 0) 112.05%);
        border: 1px solid rgba(139, 139, 139, 0.2);
        border-radius: 20px;
      }
    }

    &__card {
      display: none;

      @media (max-width: 725px) {
        display: flex;
        margin: 11px 12px 23px;
      }

      & img {
        width: 100%;
        max-width: 248px;
        max-height: 164px;

        filter: drop-shadow(4px 5px 15px rgba(0, 0, 0, 0.21)) drop-shadow(-7px 4px 33px rgba(255, 255, 255, 0.07));
      }
    }

    &__title {
      margin-bottom: 20px;

      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      text-align: center;

      @media (max-width: 725px) {
        margin-left: 12px;
        margin-bottom: 0;
        font-size: 16px;
        line-height: 19px;
        text-align: left;
      }

      & span {
        @media (max-width: 725px) {
          display: none;
        }
      }
    }

    &__table-wrapper {
      position: relative;
      padding: 47px 90px 19px 80px;

      background: #1C1C1C;
      border: 1px solid rgba(139, 139, 139, 0.2);
      border-radius: 20px;

      @media (max-width: 1179px) {
        padding: 50px 36px;
      }

      @media (max-width: 725px) {
        display: flex;
        flex-direction: column-reverse;
        padding: 0 0 14px 0;

        border: none;
        background: initial;
        border-radius: 0;
      }

      & .close {
        @media (max-width: 725px) {
          position: relative;
          display: block;
          margin: 40px auto 39px;
          width: 100%;
          text-align: center;
        }

        &:hover::before {
          @media (max-width: 725px) {
            box-shadow: none;
          }
        }

        &::before {
          @media (max-width: 725px) {
            content: 'Выйти из истории операций';
            position: initial;
            top: inherit;
            left: inherit;
            right: inherit;
            margin-left: 22px;
            width: max-content;
            font-size: 13px;
            font-weight: 700;
            line-height: 16px;
            transform: none;
            background: none;
            border-bottom: 0.5px solid #fff;
          }
        }
        &::after {
          @media (max-width: 725px) {
            display: none;
          }
        }
      }

      &::after {
        content: '';

        position: absolute;
        left: 0;
        bottom: 55px;

        width: 100%;
        height: 1px;

        background: rgba(139, 139, 139, 0.2);

        @media (max-width: 725px) {
          display: none;
        }
      }

      & .history__control {
        @media (max-width: 725px) {
          display: none;
        }
      }
    }

    &__table {
      width: 100%;
      padding-bottom: 47px;

      @media (max-width: 1179px) {
        padding-bottom: 27px;
      }

      @media (max-width: 725px) {
        order: 1;
        border-spacing: 0px;
        border-collapse: collapse;
      }

      &-line {
        @media (max-width: 1179px) {
          display: grid;
          grid-template-columns: 148px 256px 49px 100px 95px;
        }
        @media (max-width: 725px) {
          display: grid;
          grid-template-columns: 1fr 56px;
          grid-template-areas:
            "a a"
            "b c";
        }
      }

      & td {
        padding-bottom: 17px;

        @media (max-width: 1179px) {
          padding-bottom: 22px;
        }

        @media (max-width: 725px) {
          margin-bottom: 6px;
          padding-bottom: 0;

          border-spacing: 0;
          border-collapse: collapse;
        }
      }

      &-date,
      &-scores {
        text-align: right;
      }

      &-scores {
        font-weight: 700;

        @media (max-width: 1179px) {
          max-width: 95px;
          text-align: right;
        }

        @media (max-width: 725px) {
          margin-right: 11px;
          height: 16px;
          overflow: hidden;
        }
      }

      & .red {
        color: #D85353;
      }

      &-operation {
        @media (max-width: 1179px) {
          display: inline-block;
        }

        @media (max-width: 725px) {
          display: none;
        }
      }

      &-quantity {
        @media (max-width: 725px) {
          display: none;
        }
      }

      &-date {
        @media (max-width: 1179px) {
          text-align: left;
        }

        @media (max-width: 725px) {
          grid-area: a;
          margin-top: 21px;
          padding-right: 0;
          padding-top: 3px;
          padding-left: 14px;
          height: 22px;
          background: rgba(255, 255, 255, 0.2);
        }
      }

      &-film {
        @media (max-width: 1179px) {
          max-width: 221px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        @media (max-width: 725px) {
          max-width: 195px;
          padding-left: 14px;
          padding-right: 5px;
        }
      }
    }

    &__showMore {
      display: none;
      @media (max-width: 725px) {
        display: block;
        margin: auto;
      }

      &-btn {
        @media (max-width: 725px) {
          display: inline-block;
          margin: 45px auto 0;
          padding: 0;
          width: 124px;
          font-size: 13px;
          line-height: 16px;
          font-weight: 700;
          text-align: center;
          text-decoration: underline;
          text-underline-offset: 2px;
          color: rgba(1, 189, 249, 1);
          background: none;
          border: none;
        }
      }
    }

    & .history__control {
      @media (max-width: 1179px) {
        position: absolute;
        bottom: 19px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>