<script setup lang="ts">
import { ref, computed } from 'vue'
const cardInfo = ref();




</script>
<template>
  <Main>
    <section class="loyalty-details">
      <div class="container">
        <h1 class="loyalty-details__title">Программа лояльности</h1>
        <div class="loyalty-details__info">
          <img class="loyalty-details__info-card" :src="cardInfo.img" alt="image">
          <h2 class="loyalty-details__info-title">{{ cardInfo.name }}</h2>
          <p class="loyalty-details__info-text">{{ cardInfo.text }}</p>
        </div>
      </div>
    </section>

    <BackLink url="/loyalty"/>
  </Main>
</template>



<style lang="scss">
.loyalty-details {
  padding-top: 70px;

  font-family: "Montserrat";
  color: #1C1C1C;

  @media (max-width: 725px) {
    padding-top: 0;
    background: #fff;
    box-shadow: inset 0px 14px 14px -13px rgba(0,0,0,0.75);
  }

  & .container {
    @media (max-width: 725px) {
      flex-direction: column;
      background: #fff;
    }
  }

  &__title  {
    max-width: 170px;
    font-family: "NEXT ART";
    font-weight: 600;
    font-size: 20px;
    line-height: 22px;

    color: #FFFFFF;

    @media (max-width: 1300px) {
      margin-top: 30px;
      font-size: 18px;
      line-height: 20px;
    }

    @media (max-width: 725px) {
      visibility: hidden;
      margin-top: 0;
      font-size: 13px;
      line-height: 15px;
    }

    &::before {
      position: absolute;
      content: '';
      left: 0;
      top: 166px;

      width: 20%;
      height: 1px;

      background-color: #FFFFFF;

      @media (max-width: 1900px) {
        width: 23%;
      }

      @media (max-width: 1360px) {
        width: 26%;
      }

      @media (max-width: 1300px) {
        top: 196px;
        width: 19%;
      }
    }
  }

  &__info {
    position: relative;

    width: 74%;
    padding: 20px 0 0 91px;

    @media (max-width: 1300px) {
      padding: 0 0 0 52px;
    }

    @media (max-width: 725px) {
      padding: 0 10px;
      width: 100%;
    }

    &-card {
      position: absolute;
      //top: 7px;
      //left: -218px;
      top: 62px;
      left: -167px;
      width: 211px;
      height: 137px;
      border-radius: 10px;
      box-shadow: -7px 4px 33px 0px #FFFFFF12,
      4px 5px 15px 0px #00000036;
      rotate: -15deg;

      border-radius: 10px;

      @media (max-width: 1300px) {
        top: 103px;
        left: -123px;
        width: 153px;
        height: 99px;
      }

      @media (max-width: 725px) {
        position: relative;
        top: 0;
        left: 0;
        display: flex;
        margin: 0 auto;
        width: 211px;
        height: 137px;

        box-shadow: 4px 5px 15px 0px #00000036;
        rotate: 0deg;
      }
    }

    &-title {
      margin-bottom: 20px;

      font-weight: 700;
      font-size: 23px;
      line-height: 28px;
      color: #01BDF9;

      @media (max-width: 1300px) {
        margin-bottom: 33px;
      }

      @media (max-width: 725px) {
        margin-top: 38px;
        margin-bottom: 19px;
        font-size: 16px;
        line-height: 19.5px;
        text-align: center;
      }
    }

    &-text  {
      font-weight: 500;
      font-size: 15px;
      line-height: 30px;

      @media (max-width: 725px) {
        font-size: 12px;
        line-height: 25px;
      }

      &:not(:last-child) {
        margin-bottom: 29px;
      }

      &:last-child {
        @media (max-width: 725px) {
          margin-bottom: 29px;
        }
      }
    }
  }
}
</style>