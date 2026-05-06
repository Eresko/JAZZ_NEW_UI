<script setup lang="ts">
import { ref,defineEmits,reactive,defineProps,computed,onMounted,watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useSelectedSeatStore } from '@/store/selectedSeat'
import { useCurrentScheduleStore  } from '@/store/currentSchedule'
import { useModalStore } from '@/store/modals'
import { usePaidStore } from '@/store/paid'
import { useReservationStore } from '@/store/reservation'
import { useAutorizationStore } from '@/store/autorization'
import { usePrivelegePerformanceStore } from '@/store/privelege'
import hall1Stairs from '@/assets/images/hall_1_stairs.png'
import hall2Stairs from '@/assets/images/hall_2_stairs.png'
import hall3Stairs from '@/assets/images/hall_3_stairs.png'
import hall4Stairs from '@/assets/images/hall_3_stairs.png'
import hall5Stairs from '@/assets/images/hall_5_stairs.png'
import hall6Stairs from '@/assets/images/hall_6_stairs.png'
import touch from '@/assets/images/touch.png'
const selectedSeatStore  = useSelectedSeatStore();
const modalStore = useModalStore();
const reservationStore = useReservationStore();
const currentScheduleStore  = useCurrentScheduleStore();
const autorizationStore = useAutorizationStore();
const privelegePerformanceStore = usePrivelegePerformanceStore();
const paidStore = usePaidStore();
const emit = defineEmits(['selected','getStatusPerformance'])
const route = useRoute();

const stairsImages = {
  1: hall1Stairs,
  2: hall2Stairs,
  3: hall3Stairs,
  4: hall4Stairs,
  5: hall5Stairs,
  6: hall6Stairs
}

const auth = computed(() => {
  return autorizationStore.token != null
})
interface SchemeHall {
  maxX: object[];
  maxY: object[];
  statusPerformance: number
  numberHall: number
  performanceId:number
}
const limitSelectSeat = ref(5);
const props = defineProps({
      schemeHall: {
        type: Object as () => SchemeHall,
        default: () => ({maxX: [], maxY: [],statusPerformance:0,numberHall:0,performanceId:0,filmName:"",date:"",zalId:0}),
      }
    }
);
const salesAllowed = computed(() => {
  let film = currentScheduleStore.GET_FETCH_CURRENT_SCHEDULE
  if (film.isPublicSellable) {
    return true
  }
  return privelegePerformanceStore.privelege_performance?.salesAllowed ?? false
})

const selectedSeatFromParent = computed(() => {
  return selectedSeatStore.GET_SELECTED_COUNT(parseInt(props.schemeHall.performanceId))
})
const selected =(ids,y,x, item) => {
  if ((selectedSeatFromParent.value >= limitSelectSeat.value) && (!props.schemeHall.maxY[y][x].select)) {
    return;
  }
  let row = y;
  if (y < hallConstant[props.schemeHall.numberHall - 1]?.rowMax) {
    row ++
  }
  selectedSeatStore.SELECTED(parseInt(props.schemeHall.performanceId),x,y,item,row)
  emit('selected',y,x)
}
const hallConstant = reactive([
    {colspan:15,rowMax:100,additional:0,colspanExit:16,imgExit:"hall_1_stairs.png"},
    {colspan:22,rowMax:3,additional:3,colspanExit:21,imgExit:"hall_2_stairs.png"},
    {colspan:20,rowMax:3,additional:3,colspanExit:20,imgExit:"hall_3_stairs.png"},
    {colspan:20,rowMax:3,additional:3,colspanExit:20,imgExit:"hall_4_stairs.png"},
    {colspan:28,rowMax:6,additional:6,colspanExit:27,imgExit:"hall_5_stairs.png"},
    {colspan:26,rowMax:6,additional:6,colspanExit:27,imgExit:"hall_6_stairs.png"},
    {colspan:26,rowMax:6,additional:6,colspanExit:16,imgExit:"hall_7_stairs.png"},
    ])
const reservation = async () => {
  if (!auth.value) {
    modalStore.TOGGLE_FAST_REG_MODAL()
    return
  }
  let film = currentScheduleStore.GET_FETCH_CURRENT_SCHEDULE
  await reservationStore.SET_RESERVATION_PARAMS_STORAGE(
      parseInt(film.performanceId),
      film.name,
      film.dateTime,
      film.time,
      film.price,
      film.zal,
      film.zalId
  )
  await modalStore.TOGGLE_RESERVATION_MODAL()
  await emit('getStatusPerformance')
}

const reservationId = computed(() => {
  if (modalStore) {
    return route.query.reservation
  }
  return ''
});

watchEffect( async () => {
  if (reservationId.value !== undefined && reservationId.value !== null && reservationId.value !== '') {
    let film = await currentScheduleStore.GET_FETCH_CURRENT_SCHEDULE
    await reservationStore.SET_RESERVATION_PARAMS_STORAGE(
        parseInt(film.performanceId),
        film.name,
        film.dateTime,
        film.time,
        film.price,
        film.zal,
        film.zalId
    )
    paidStore.CHECK_PAY(reservationId.value)
  }
});
const pay = async () => {
  let film = currentScheduleStore.GET_FETCH_CURRENT_SCHEDULE
  if ((!auth.value) && (film.isPublicSellable)) {
    console.log("UP",film);
    await reservationStore.SET_RESERVATION_PARAMS_STORAGE(
        parseInt(film.performanceId),
        film.name,
        film.dateTime,
        film.time,
        film.price,
        film.zal,
        film.zalId
    )
    modalStore.TOGGLE_PAID_PUBLISHED_MODAL()
    await emit('getStatusPerformance')
    return
  }
  else if (!auth.value) {
    modalStore.TOGGLE_FAST_REG_MODAL()
    return
  }

  await reservationStore.SET_RESERVATION_PARAMS_STORAGE(
      parseInt(film.performanceId),
      film.name,
      film.dateTime,
      film.time,
      film.price,
      film.zal,
      film.zalId
  )
  await modalStore.TOGGLE_PAID_MODAL()
  await emit('getStatusPerformance')
}


const isSchemeReady = computed(() => {
  return props.schemeHall?.maxY?.length > 0
})
const showScreen = ref(false)
onMounted(() => {
  requestAnimationFrame(() => {
    showScreen.value = true
  })
})
const getSeat =  () => {

}
</script>


<template>
  <transition name="hall-fade">
  <section class="hall"  v-if="isSchemeReady">
    <div class="hall__wrapper">
      <table class="hall__table">
        <caption class="hall__table-title">
          Выберите места в зале
          <img class="touch-hall" :src="touch" alt="проведи влево-вправо">
        </caption>

        <thead class="hall__table-screen">
        <tr>
          <th>&nbsp;</th>
          <th
              class="hall__table-screen-text"
              :colspan="hallConstant[props.schemeHall.numberHall - 1]?.colspan"
          >
            <span class="screen-expand" :class="{ show: showScreen }">
              Экран
            </span>
          </th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(item1,y) in props.schemeHall.maxY">
          <th class="hall__table-row" v-if="y < hallConstant[props.schemeHall.numberHall - 1]?.rowMax">{{ y + 1 }}</th>
          <th class="hall__table-row" v-else-if=" y === hallConstant[props.schemeHall.numberHall - 1]?.additional  && props.schemeHall.numberHall > 1"></th>
          <th class="hall__table-row" v-else-if="props.schemeHall.numberHall > 1">{{ y }}</th>
          <td class="hall__table-seat free-seat"
              @click="selected(item2.id,y,x,item2)"
              :class="{
                'empty-seat': (item2.status == 0 ),
                 'вusy-seat': (item2.status == 3 || item2.status == 4 || item2.status == 2 || item2.status == 8),
                 'active': item2.select
              }"
              :aria-label="getSeat(item2.label)"  v-for="(item2,x) in item1">{{ item2.label }}

          </td>
        </tr>

        </tbody>

        <tfoot>
        <tr>
          <td
              class="hall__table-enter "
              :class="{ left: (props.schemeHall.numberHall == 4 || props.schemeHall.numberHall == 3  || props.schemeHall.numberHall == 6) }"
              :colspan="hallConstant[props.schemeHall.numberHall - 1]?.colspan"
          >
            Вход

            <img
                v-if="stairsImages[props.schemeHall.numberHall]"
                class="stairs-hall"
                :class="`hall-${props.schemeHall.numberHall}-stairs`"
                :src="stairsImages[props.schemeHall.numberHall]"
                alt=""
            />
          </td>
        </tr>
        </tfoot>
      </table>
    </div>

    <div class="hall__photo" v-if="props.schemeHall.numberHall == 1">
      <img class="hall__img" :src="`@/assets/images/${hallConstant[props.schemeHall.numberHall - 1]?.imgExit}`" alt="Залл" >

      <p class="hall__photo-text">
        <svg width="27" height="20" viewBox="0 0 27 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M25.7544 4.67899C25.5599 4.51671 25.3236 4.41235 25.0727 4.37782C24.8217 4.34329 24.5661 4.37998 24.335 4.4837L18.605 7.03037C18.5016 7.07695 18.3845 7.08286 18.2769 7.04691C18.1694 7.01097 18.0793 6.93581 18.0247 6.83643L14.6884 0.830943C14.5706 0.61905 14.3984 0.442497 14.1894 0.319576C13.9805 0.196655 13.7425 0.131836 13.5001 0.131836C13.2577 0.131836 13.0196 0.196655 12.8107 0.319576C12.6018 0.442497 12.4295 0.61905 12.3117 0.830943L8.9755 6.83632C8.92095 6.93574 8.83091 7.01094 8.72337 7.0469C8.61582 7.08287 8.49866 7.07697 8.39527 7.03037L2.66415 4.48324C2.43288 4.38049 2.17752 4.34434 1.92681 4.37884C1.6761 4.41335 1.44 4.51715 1.24509 4.67855C1.05018 4.83996 0.904183 5.05257 0.823546 5.29245C0.742909 5.53233 0.730829 5.78996 0.788665 6.03633L3.67111 18.3085C3.7416 18.6064 3.9104 18.8719 4.15028 19.062C4.39015 19.2522 4.68711 19.356 4.99321 19.3566C5.11831 19.3564 5.24281 19.3393 5.3633 19.3056C10.6863 17.8361 16.308 17.8355 21.6313 19.3042C21.8079 19.3537 21.9926 19.367 22.1745 19.3433C22.3564 19.3197 22.5316 19.2595 22.6896 19.1664C22.8476 19.0733 22.9851 18.9492 23.094 18.8016C23.2029 18.654 23.2808 18.486 23.323 18.3075L26.2106 6.03712C26.2695 5.79074 26.2579 5.53277 26.1773 5.29263C26.0966 5.05249 25.9501 4.83986 25.7544 4.67899ZM25.3283 5.82959L22.4408 18.1C22.4271 18.159 22.4016 18.2146 22.3658 18.2635C22.3299 18.3123 22.2845 18.3533 22.2322 18.384C22.1788 18.4158 22.1194 18.4363 22.0577 18.4444C21.996 18.4525 21.9333 18.4479 21.8735 18.4309C16.3916 16.9183 10.6025 16.9188 5.12088 18.4324C5.06103 18.4494 4.99833 18.454 4.93662 18.446C4.87491 18.4379 4.81549 18.4174 4.76201 18.3856C4.70979 18.3548 4.66438 18.3138 4.62855 18.265C4.59271 18.2161 4.5672 18.1605 4.55357 18.1015L4.55334 18.1013L1.67101 5.82925C1.65562 5.76289 1.65532 5.69391 1.67012 5.62741C1.68492 5.56091 1.71446 5.49858 1.75655 5.44501C1.79864 5.39144 1.85221 5.348 1.91332 5.31789C1.97443 5.28777 2.04152 5.27175 2.10964 5.271C2.17393 5.27123 2.23746 5.28497 2.2961 5.31133L8.02711 7.85857C8.33729 7.99804 8.68861 8.01559 9.01115 7.90774C9.33369 7.79988 9.60378 7.57453 9.76768 7.27653L13.104 1.27093C13.1433 1.20032 13.2007 1.1415 13.2703 1.10054C13.34 1.05958 13.4193 1.03799 13.5001 1.03799C13.5809 1.03799 13.6602 1.05958 13.7298 1.10054C13.7994 1.1415 13.8568 1.20032 13.8961 1.27093L17.2326 7.27665C17.3964 7.57469 17.6665 7.80009 17.989 7.90793C18.3116 8.01577 18.6629 7.99815 18.973 7.85857L24.7031 5.31167C24.7802 5.27738 24.8654 5.26531 24.949 5.2768C25.0326 5.28829 25.1113 5.3229 25.1763 5.37673C25.2413 5.43055 25.2899 5.50145 25.3168 5.58144C25.3437 5.66144 25.3477 5.74734 25.3283 5.82948V5.82959ZM17.5757 14.3626C17.564 14.4738 17.5115 14.5768 17.4284 14.6517C17.3453 14.7265 17.2375 14.768 17.1256 14.7682C17.1096 14.7682 17.0936 14.7675 17.0776 14.7659C14.6991 14.5159 12.301 14.5159 9.92253 14.7659C9.86334 14.7721 9.8035 14.7666 9.74643 14.7497C9.68936 14.7329 9.63617 14.7049 9.58991 14.6674C9.54364 14.63 9.50521 14.5838 9.4768 14.5315C9.44839 14.4792 9.43055 14.4218 9.42432 14.3626C9.41809 14.3034 9.42358 14.2436 9.44047 14.1865C9.45736 14.1294 9.48533 14.0762 9.52278 14.03C9.56023 13.9837 9.60642 13.9453 9.65872 13.9169C9.71102 13.8885 9.76841 13.8706 9.8276 13.8644C12.2692 13.608 14.7309 13.608 17.1725 13.8644C17.2921 13.877 17.4017 13.9366 17.4773 14.03C17.5529 14.1234 17.5884 14.2431 17.5758 14.3626H17.5757Z"
              fill="#01BDF9"/>
        </svg>

        Мягкие велюровые раскладывающиеся кресла <br /> с возможностью USB зарядки
      </p>
    </div>

    <div class="hall__bottom">
      <div class="hall__info">
        <span class="hall__info-item">
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="23" height="23" rx="2" fill="#C4C4C4"/>
          </svg>

          Место свободно
        </span>

        <span class="hall__info-item">
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="23" height="23" rx="2" fill="#01BDF9"/>
          </svg>

          Место куплено
        </span>
      </div>

      <div class="hall__buy">
        <button :disabled="selectedSeatFromParent == 0" class="hall__btn hall__btn-reserv" @click="reservation">Забронировать</button>

        <button :disabled="selectedSeatFromParent == 0" class="hall__btn hall__btn-buy" @click="pay" v-if="salesAllowed">Купить</button>

      </div>
    </div>
  </section>
  </transition>
</template>
<style lang="scss" scoped>
.hall-fade-enter-active {
  transition: opacity .35s ease, transform .35s ease;
}

.hall-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.hall-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

//Экран
.hall__table-screen-text {
  background: #EBEAEA;
  text-align: center;
}

.screen-expand {
  display: inline-block;
  transform: scaleX(0);
  transform-origin: center;
  opacity: 0;
}

.screen-expand.show {
  animation: screenOpenCenter .6s cubic-bezier(.4,0,.2,1) forwards;
}

@keyframes screenOpenCenter {

  0% {
    transform: scaleX(0);
    opacity: 0;
  }

  70% {
    transform: scaleX(1.08);
    opacity: 1;
  }

  100% {
    transform: scaleX(1);
    opacity: 1;
  }

}
//выбор места

@keyframes seatWiggle {

  0% { transform: rotate(0deg); }

  10% { transform: rotate(-10deg); }
  20% { transform: rotate(10deg); }

  30% { transform: rotate(-8deg); }
  40% { transform: rotate(8deg); }

  50% { transform: rotate(-6deg); }
  60% { transform: rotate(6deg); }

  70% { transform: rotate(-4deg); }
  80% { transform: rotate(4deg); }

  90% { transform: rotate(-2deg); }
  100% { transform: rotate(0deg); }

}



.left {
  padding-left: 135px!important;
  text-align: left!important;
}


.hall-1-stairs {
  position: absolute;
  bottom: 65px;
  right: 6px;

  @media (min-width: 1600px) {
    bottom: 71px;
    right: 17px;
    width: 175px;
  }

  @media (max-width: 1300px) {
    right: auto;
    left:358px;
  }
}
.hall-2-stairs {
  position: absolute;
  bottom: 80px;
  right: 8px;

  @media (min-width: 1600px) {
    bottom: 92px;
    right: 22px;
    width: 170px;
  }

  @media (max-width: 1300px) {
    width: 128px;
    height: 128px;
    bottom: 87px;
    right: auto;
    left: 520px;
  }

  @media (max-width: 725px) {
    bottom: 78px;
  }
}
.hall-3-stairs {
  position: absolute;
  bottom: 82px;
  left: 60px;
  @media (min-width: 1600px) {
    bottom: 90px;
    left: 60px;
    width: 175px;
  }

  @media (max-width: 1300px) {
    width: 128px;
    height: 128px;
    bottom: 88px;
    left: auto;
    right: 463px;
  }
}
.hall-4-stairs {
  position: absolute;
  bottom: 82px;
  left: 60px;

  @media (min-width: 1600px) {
    bottom: 90px;
    left: 60px;
    width: 175px;
  }

  @media (max-width: 1300px) {
    bottom: 83px;
    right: 387px;
    width: 128px;
    height: 152px;
    left: 68px;
  }
}
.right-enter {
  padding-right: 93px!important;
}
.hall-5-stairs {
  position: absolute;
  bottom: 82px;
  right: 15px;

  //@media (min-width: 1601px) {
  //  bottom: 90px;
  //  width: 210px;
  //}

  @media (max-width: 1850px) {
    right: 8px;
    bottom: 87px;
    width: 208px;
  }

  @media (max-width: 1750px) {
    right: 8px;
    bottom: 106px;
    width: 177px;
  }

  @media (max-width: 1600px) {
    right: 8px;
    bottom: 87px;
    width: 170px;
  }

  @media (max-width: 1500px) {
    right: 8px;
    bottom: 87px;
    width: 165px;
  }

  @media (max-width: 1400px) {
    right: 17px;
    bottom: 98px;
    width: 137px;
  }

  @media (max-width: 1300px) {
    right: 20px;
    bottom: 97px;
    width: 146px;
  }
}

.hall-6-stairs {
  position: absolute;
  bottom: 82px;
  left: 60px;

  @media (max-width: 1600px) {
    bottom: 104px;
    width: 156px;
    right: 460px;
    left: 68px;
  }

  @media (max-width: 1500px) {
    bottom: 104px;
    width: 151px;
    right: 460px;
    left: 59px;
  }

  @media (max-width: 1400px) {
    bottom: 104px;
    width: 157px;
    right: 460px;
    left: 59px;
  }


  @media (max-width: 1300px) {
    bottom: 94px;
    width: 156px;
    right: 460px;
    left: 69px;
  }
}



.hall {
  position: relative;
  width: 70.3%;
  padding: 125px 11.4% 191px 14px;

  font-family: "Montserrat";

  color: #1C1C1C;

  @media (max-width: 1300px) {
    width: calc(100% - 27.2%);
    padding: 125px 0 137px 0;
  }

  @media (max-width: 725px) {
    padding: 0;
    width: 100%;
    background: #fff;
  }

  &__wrapper {
    @media (max-width: 725px) {
      width: 100%;
      overflow-x: scroll;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  &__table {
    position: relative;

    margin-bottom: 10px;

    font-weight: 700;

    border-spacing: 7px;

    @media (max-width: 1300px) {
      margin: 0 auto;
    }

    @media (max-width: 1000px) {
      //width: 100%;
    }

    @media (max-width: 725px) {
      width: max-content;
    }

    &-title {
      margin-bottom: 68px;

      font-size: 26px;
      line-height: 32px;

      @media (max-width: 725px) {
        position: relative;
        margin-top: 11px;
        margin-bottom: 25px;
        font-size: 14px;
        line-height: 17px;
      }

      & .touch-hall {
        display: none;

        @media (max-width: 725px) {
          position: absolute;
          display: inline;
          margin-left: 10px;
        }
      }
    }

    &-screen {

      &::after {
        content: '';
        height: 56px;
        display: table-row;
      }

      &-text {
        height: 25px;

        font-size: 15px;
        line-height: 18px;
        text-align: center;

        background: #EBEAEA;
      }
    }

    &-row {
      width: 45px;
      margin-right: 44px;

      font-size: 18px;
      line-height: 22px;
      text-align: left;

      @media (max-width: 1300px) {
        font-size: 14px;
        line-height: 17px;
      }
    }

    &-seat {
      width: 23px;
      height: 23px;

      font-weight: 400;
      font-size: 15px;
      line-height: 18px;
      text-align: center;

      color: #C4C4C4;
      border-radius: 2px;
      cursor: pointer;

      //vertical-align: middle;

      @media (max-width: 725px) {
        min-width: 23px!important;
        width: 23px!important;
        height: 23px;
        font-size: 14px;
        line-height: 17px;
      }

      &:hover {
        color: #FFFFFF;
        border: 1px solid #01BDF9;
        @media (max-width: 1200px) {
          color: #c4c4c4;
          border: none;
        }
      }

      &.active {
        color: #FFFFFF;
        border: 1px solid #01BDF9;

        transform-origin: center;
        animation: seatPop .25s ease, seatWiggle .7s ease .25s;
      }
      @keyframes seatPop {
        0% { transform: scale(1); }
        50% { transform: scale(1.25); }
        100% { transform: scale(1); }
      }
      &.вusy {
        color: red;
        border: 1px solid #01BDF9;
      }

      @media (min-width: 1600px) {
        width: 30px;
        height: 30px;
      }
    }

    & .free-seat {
      background: #C4C4C4;
    }

    & .empty-seat {
      visibility: hidden;
    }
    & .вusy-seat {
      background: #01BDF9;
      color:#01BDF9;
    }
    &-enter {
      padding-right: 93px;
      font-size: 15px;
      line-height: 18px;
      text-align: right;
    }
  }



  .hall__photo {
    position: absolute;
    right: 14.6%;
    top: 23.7%;

    @media (max-width: 1300px) {
      top: auto;
      left: 50%;
      right: auto;
      bottom: 92px;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 238px;
      height: 180px;

      transform: translateX(-116%);
    }

    @media (max-width: 725px) {
      display: none;
    }

    & img {
      @media (max-width: 1300px) {
        display: inline-block;
        margin: 0 auto;
        width: 138px;
        height: auto;
      }
    }

    &-text {
      max-width: 238px;
      margin-top: -55px;

      font-weight: 500;
      font-size: 15px;
      line-height: 18px;
      text-align: center;

      @media (max-width: 1300px) {
        position: absolute;
        bottom: 22px;
        width: 160px;
        font-size: 10px;
        line-height: 12.19px;
      }

      & br {
        display: none;

        @media (max-width: 1300px) {
          display: block;
        }
      }

      & svg {
        margin-right: 5px;

        @media (max-width: 1300px) {
          width: 20px;
          margin-left: -23px;
          margin-right: 0;
          margin-bottom: -4px;
        }

      }
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;

    padding: 27px 0 0 59px;

    @media (max-width: 1300px) {
      flex-direction: column;
      gap: 76px;
      padding: 11px 24px 0 59px;
      border-top: 1px solid rgba(139, 139, 139, 0.2);



      width: 560px;
      margin: 0 auto;
    }

    @media (max-width: 780px) {
      width: 100%;
    }

    @media (max-width: 725px) {
      margin: 0;
      padding: 9px 10px 47px;
      //width: 100%;
      gap: 26px;

      color: #fff;
      background: #161616;
    }

    .hall__info {
      @media (max-width: 1300px) {
        display: flex;
        justify-content: center;
      }

      @media (max-width: 1000px) {
        justify-content: flex-start;
      }

      @media (max-width: 256px) {
        flex-direction: column;
        gap: 5px;
      }

      &-item  {
        margin-right: 34px;

        font-weight: 500;
        font-size: 15px;
        line-height: 18px;
        white-space: nowrap;

        @media (max-width: 1300px) {
          display: flex;
          align-items: center;
          font-size: 10px;
          line-height: 12px;
        }

        & svg {
          margin-right: 14px;

          @media (max-width: 1300px) {
            margin-right: 5px;
            width: 12px;
            height: 12px;
          }
        }
      }
    }
  }

  &__buy {
    display: flex;
    flex-direction: column;
  }

  &__btn {
    padding: 14px 0 13px;
    min-width: 263px;

    font-family: 'Montserrat';
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;

    text-align: center;
    text-decoration: none;
    color: #1C1C1C;
    border-radius: 20px;
    background: transparent;
    cursor: pointer;

    &:hover {
      background: #01BDF9;
    }

    &:active {
      color: #898989;
      background: #DAF6FF;
    }

    @media (max-width: 1300px) {
      margin-left: auto;
      width: 50%;
    }

    @media (max-width: 725px) {
      margin: 0 auto;
      width: 263px;
    }

    @media (max-width: 283px) {
      width: 100%;
      min-width: auto;
    }

    &-reserv {
      margin-bottom: 8px;

      border: 1px solid #98E6FF;

      &:hover {
        border: 1px solid #01BDF9;
      }

      &:active {
        border: 1px solid #DAF6FF;
      }

      @media (max-width: 725px) {
        color: #98E6FF;
      }
    }

    &-buy {
      background: #98E6FF;
      border: none;
    }
  }

  @media (min-width: 1600px) {
    padding-left: 70px;
  }
}
</style>
