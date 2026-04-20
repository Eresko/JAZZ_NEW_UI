<script setup lang="ts">
import { ref,computed,watchEffect,defineProps } from 'vue'
import { useCurrentScheduleStore  } from '@/store/currentSchedule'
const currentScheduleStore  = useCurrentScheduleStore();
const film = ref({})
watchEffect(() => {
  if (currentScheduleStore.GET_FETCH_CURRENT_SCHEDULE) {
    film.value = currentScheduleStore.GET_FETCH_CURRENT_SCHEDULE
  }
})
const date = computed(() => {
  if (film.value?.dateTime) {
    return film.value.dateTime.split(' ')[0];
  }
  return ""
});
const dayOfWeek = computed(() => {
  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
  if (film.value?.dateTime) {
    const datePart = film.value.dateTime.split(' ')[0];
    const arr = datePart.split('.');
    let date = new Date(arr[2] + '-' + arr[1] + '-' + arr[0])
    return days[date.getDay()]
  }
  return ""
})


</script>


<template>
  <ul class="purchase__list">
    <li class="purchase__list-item">
      <h2 class="purchase__list-title">Покупка <br /> и бронирование</h2>
    </li>

    <li class="purchase__list-item">
      <p class="purchase__item-title">Сеанс:</p>

      <p class="purchase__item-text session">{{ film.name }}</p>
    </li>

    <li class="purchase__list-item">
      <p class="purchase__item-title">Дата:</p>

      <p class="purchase__item-text">{{ date }}, <br /> {{  dayOfWeek  }}<span class="purchase__item-time">, {{ film.time }}</span></p>

      <p class="purchase__item-text purchase__item-none">Время: {{ film.time }}</p>
    </li>

    <li class="purchase__list-item">
      <p class="purchase__item-title"><span class="purchase__item-none">Выбранные</span> места:</p>

      <p class="purchase__item-text">{{ film.zal }}</p>
    </li>

    <li class="purchase__list-item">
      <p class="purchase__item-title">Стоимость:</p>

      <p class="purchase__item-text">{{ film.price }} &#8381;</p>
    </li>
  </ul>
</template>


<style lang="scss">

.purchase__list {
  width: 29.7%;
  min-width: 340px;
  padding-top: 88px;

  font-family: "Montserrat";
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;

  color: #FFFFFF;
  list-style-type: none;
  background: #1C1C1C;

  @media (max-width: 1300px) {
    width: 27.2%;
    min-width: auto;
    font-size: 12px;
    line-height: 16px;
  }

  @media (max-width: 725px) {
    margin-top: 59px;
    padding-top: 27px;
    padding-bottom: 12px;
    width: 100%;
    background: #1c1c1c;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    grid-template-areas:
    "a a a a"
    "b b c d";
    &:nth-child(1) {
      grid-area: a;
    }
    &:nth-child(2) {
      grid-area: b;
    }
    &:nth-child(3) {
      grid-area: c;
    }
    &:nth-child(4) {
      grid-area: d;
    }
  }

  &-item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    padding-left: 39%;
    padding-bottom: 8px;
    max-width: 81%;
    min-height: 79px;

    border-bottom: 1px solid rgba(139, 139, 139, 0.2);

    @media (max-width: 1399px) {
      padding-left: 37%;
      border-bottom: none;

      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 87%;
        height: 1px;
        background: rgba(139, 139, 139, 0.2);

        @media (max-width: 725px) {
          display: none;
        }
      }
    }

    @media (max-width: 1300px) {
      //padding-left: 34%;
      padding-left: 24px;
    }

    @media (max-width: 1000px) {
      padding-left: 11.5%;
    }
    @media (max-width: 725px) {
      min-height: 44px;
      padding: 0 10px 0 0;
      display: inline-table;
      border-bottom: none;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px;
      grid-template-areas:
          "a a a a"
          "b b c d";
      &:nth-child(2) {
        grid-area: a;
        align-self: start;
        padding-left: 10px;
        width: 100%;
        max-width: none;
      }
      &:nth-child(3) {
        grid-area: b;
        align-self: start;
        padding-left: 10px;

        display: inline-block;

        & br {
          display: inline-block;
        }

        //&-text {
        //  display: inline-block;
        //}
      }
      &:nth-child(4) {
        grid-area: c;
        align-self: start;
      }
      &:nth-child(5) {
        grid-area: d;
        margin-left: auto;
        //padding-right: 10px;
        //align-self: end;
      }
    }

    & br {
      display: none;
    }

    &:first-child {
      position: relative;
      margin-bottom: 36px;
      padding-bottom: 13px;
      max-width: 85%;

      border-bottom: 1px solid #FFFFFF;

      @media (max-width: 1099px) {
        margin-bottom: 0;
        max-width: 100%;
        border-bottom: none;

        &:after {
          position: absolute;
          content: '';
          margin-left: -24px;
          //width: 146px;
          width: 80%;
          height: 1px;
          background: #fff;
          bottom: 0;
        }
      }

      @media (max-width: 725px) {
        display: none;
      }
    }

    // &:not(:first-child):after {
    //   content: '';
    //   position: absolute;
    //   left: 0;
    //   top: 279px;

    //   width: 25%;
    //   height: 1px;

    //   background-color: rgba(139, 139, 139, 0.2);

    //   @media (max-width: 1399px) {
    //     width: 28%;
    //   }
    // }

    // &:nth-child(2):after {
    //   top: 359px;
    // }

    // &:nth-child(3):after {
    //   top: 437px;
    // }

    // &:nth-child(4):after {
    //   top: 516px;
    // }
  }

  &-title {
    // width: min-content;

    font-family: "NEXT ART";
    font-weight: 600;
    font-size: 20px;
    line-height: 22px;

    @media (max-width: 1300px) {
      font-size: 18px;
      line-height: 19px;
    }

    & br {
      display: none;

      @media (max-width: 1300px) {
        display: block;
      }
    }

    // &:after {
    //   content: '';
    //   position: absolute;
    //   left: 0;
    //   top: 165px;

    //   width: 25%;
    //   height: 1px;

    //   background-color: #fff;

    //   @media (max-width: 1399px) {
    //     width: 28%;
    //   }
    // }
  }
}

.purchase__item  {
  &-title {
    font-weight: 300;
    color: #01BDF9;
    @media (max-width: 725px) {
      font-size: 10px;
      font-weight: 500;
      line-height: 16px;
      text-transform: capitalize;

      & span {
        //display: none;
      }
    }
  }

  &-text {
    @media (max-width: 725px) {
      font-size: 12px;
      line-height: 16px;
      &.session {
        font-size: 14px;
      }

      & span {
        //display: none;
      }
    }
  }

  &-none {
    @media (max-width: 725px) {
      display: none;
    }
  }

  &-time {
    display: none;
    @media (max-width: 725px) {
      display: inline-block;
    }
  }
}
</style>