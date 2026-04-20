<script setup lang="ts">
import { ref,watchEffect, reactive,defineProps,computed,onMounted } from 'vue'
import { useOptionsStore  } from '@/store/options'
import { useRouter } from 'vue-router'
const router = useRouter()
const scheduleTab = ref();
const optionsStore = useOptionsStore();
const scheduleFilms = reactive({schedule: []})
const props = defineProps({
      schedule: {
        type: Array,
        default: ()=> [],
      }
    }
);
const isMobile = computed(() => {
  const width = ref(typeof window !== 'undefined' ? window.innerWidth : 0)
  if (width <= 1300) {
    return true
  } else {
    return false
  }
})
const toggleScheduleTab = (day:string) => {
  console.log("day=",day)
  scheduleTab.value = day
  optionsStore.SET_SELECTED_DAY(day);
  const daySchedule = props.schedule.find(item => item.day === scheduleTab.value)
  scheduleFilms.schedule = daySchedule.schedule

}
const dayOfWeek = (val) => {
  let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
  const arr = val.split('.')
  let date = new Date(arr[2] + '-' + arr[1] + '-' + arr[0])
  return days[date.getDay()]
}
const day = (val) => {
  const arr = val.split('.')
  return arr[0]
}
const month = (val) => {
  const arr = val.split('.')
  return arr[1]
}

const filterGenre = (val) => {
  return val.join(", ")
}

const goToDetails = (id:number) => {
  router.push(`/filmDetails/${id}`)
}

const  openReservation = (id:number) => {
  router.push(`/reservation/${id}`)
}

const updatePageFilm = () => {
  let scheduleTab = props.schedule[0].day
  let schedule = props.schedule.filter(item => item.day === scheduleTab)[0]
  scheduleFilms.schedule = schedule.schedule
}

const myItems = computed(() => {
  if ((props.schedule[0]?.schedule?.length == 0)){
    if (optionsStore.selectedDay == "") {
      setTimeout(toggleScheduleTab,400,props.schedule[1].day)
    }
    return (isMobile.value) ? props.schedule.slice(1,7) : props.schedule.slice(1,8)
  }
  return (isMobile.value) ? props.schedule.slice(0,6) : props.schedule.slice(0,8)
})
onMounted( async () => {
  const now = new Date()
  const day = now.getDate().toString().padStart(2, '0')
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const year = now.getFullYear()
  scheduleTab.value = `${day}.${month}.${year}`
});
watchEffect(() => {
  if (props.schedule.length) {
    updatePageFilm()
  }
})
</script>



<template>
  <section class="schedule" ref="schedule">
    <div class="container schedule__container">
      <table class="schedule__table">
        <caption class="schedule__table-text">Сеансы после 00:00 состоятся только при наличии <br /> 10 проданных билетов.</caption>
        <thead>
        <tr>
          <th class="schedule__table-title">Расписание</th>
          <th class="schedule__table-calendar" @click="toggleScheduleTab(item.day)" v-for="item in myItems" :key="item.day">
            <span class="schedule__table-day-of-week">{{ dayOfWeek(item.day) }}</span>
            <div class="schedule__table-date" :class="{active:scheduleTab==item.day}">
              <span class="schedule__table-day">{{ day(item.day) }}</span>
              <span class="schedule__table-month">{{ month(item.day) }}</span>
            </div>
          </th>
        </tr>
        </thead>

        <tbody>
        <tr class="schedule__table-row" v-for="item in scheduleFilms.schedule" :key="item.id" >
          <th class="schedule__table-film"  @click="goToDetails(item.id)">
            <p class="film-name">{{item.name_film}}
            </p>
            <div class="film-genre-wrapper">
              <span class="film-genre">{{ item.genre  }}</span>
            </div>
          </th>

          <td class="schedule__table-time" v-for="item2 in item.schedule_time" :key="item2.performanceId">
            <div class="wrapper" @click="openReservation(item2.performanceId)">
              <span class="hall">{{item2.zal}}</span>
              <time class="time">{{item2.time}}</time>
              <span class="price">{{item2.price}}&#8381;</span>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.schedule {
  position: relative;

  @media (max-width: 725px) {
    background: #fff;
  }

  &::before {
    @media (max-width: 725px) {
      content: 'расписание';
      display: block;
      padding-top: 30px;
      padding-bottom: 7px;
      width: 100%;
      font-family: 'NEXT ART';
      font-size: 30px;
      line-height: 33px;
      text-align: center;
      text-transform: uppercase;
      color: #fff;
      background: #070707;
    }
  }

  .schedule__table {
    width: 100%;
    border-collapse: collapse;
    z-index: 1;

    @media (max-width: 725px) {
      padding-top: 82px;
    }

    &::before {
      @media (max-width: 725px) {
        content: 'Выберите нужную дату:';
        position: absolute;
        top: 123px;
        margin-left: 10px;
        font-family: Montserrat;
        font-size: 13px;
        font-weight: 600;
        line-height: 16px;
        color: #01BDF9;

        z-index: 99;
      }
    }

    & thead {
      font-family: 'NEXT ART';
    }

    &-text {
      margin-left: 137px;
      margin-bottom: 39px;

      font-family: 'Montserrat';
      font-weight: 600;
      font-size: 15px;
      line-height: 18px;

      color: #01BDF9;
      z-index: 1;

      @media (max-width: 1300px) {
        margin-left: 200px;
        font-size: 13px;
        line-height: 16px;
      }

      @media (max-width: 725px) {
        margin: 0;
        padding-bottom: 17px;
        width: 100%;
        font-size: 10px;
        line-height: 12px;
        background: #000;
      }

      & br {
        display: none;

        @media (max-width: 725px) {
          display: block;
        }
      }
    }

    &-title {
      padding-bottom: 25px;
      font-size: 26px;
      font-weight: 600;
      line-height: 28px;
      text-transform: uppercase;
      text-align: left;
      color: #FFFFFF;

      @media (max-width: 1300px) {
        padding-bottom: 0;
        font-size: 23px;
        line-height: 25px;
      }

      @media (max-width: 725px) {
        position: absolute;
        top: -50px;
        padding-bottom: 5px;
        width: 100%;
        font-size: 30px;
        line-height: 33px;
        background: #000;
        text-align: center;
      }

      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 128px;

        width: 25%;
        height: 1px;

        background-color: #fff;

        @media (max-width: 1300px) {
          top: 141px;
          width: 147px;
        }

        @media (max-width: 725px) {
          display: none;
        }
      }
    }

    & th:not(.schedule__table-title) {
      cursor: pointer;
    }

    &-calendar {
      padding-bottom: 7px;

      @media (max-width: 1300px) {
        padding-bottom: 0;
      }

      @media (max-width: 725px) {
        padding-top: 49px;
      }
    }

    &-day-of-week {
      font-family: 'Montserrat';
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      text-transform: lowercase;

      color: #1C1C1C;

      @media (max-width: 725px) {
        margin-left: 17px;
      }
    }

    &-date {
      max-width: 74px;
      padding: 3px 0;
      margin: 0 auto;
      margin-top: 3px;

      border: 2px solid transparent;

      &.active {
        border: 2px solid #01BDF9;
        border-radius: 20px;

        & .schedule__table-month {
          visibility: visible;
        }
      }
      @media (max-width: 725px) {
        margin-left: 11px;
      }
    }

    &-day {
      font-weight: 600;
      font-size: 35px;
      line-height: 38px;

      @media (max-width: 725px) {
        margin-left: 15px;
        margin-right: 17px;
      }
    }

    &-month {
      display: block;
      width: 41px;
      margin: 0 auto;

      font-weight: 300;
      font-size: 25px;
      line-height: 27px;

      border-top: 1px solid #8B8B8B;

      color: #8B8B8B;

      visibility: hidden;
    }

    &-row {
      position: relative;

      height: 91px;

      font-family: 'Montserrat';

      @media (max-width: 725px) {
        height: fit-content;
      }

      &:nth-child(1) {
        @media (max-width: 725px) {
          margin-top: 143px;
        }
      }

      &::after {
        content: '';

        position: absolute;
        bottom: 0;
        left: 0;

        width: 100%;
        height: 1px;

        background-color: rgba(139, 139, 139, 0.2);

        @media (max-width: 725px) {
          bottom: 80px;
          z-index: -1;
        }
      }

      &:last-child {
        @media (max-width: 725px) {
          padding-bottom: 37px;
        }

        &::after {
          @media (max-width: 725px) {
            display: none;
          }
        }
      }

      &:hover {

        .schedule__table-film {
          color: #01BDF9;
        }

        &::after {
          background-color: #01BDF9;
        }
      }
    }

    &-film {
      width: 29%;
      padding-right: 6%;

      text-align: left;
      vertical-align: bottom;

      color: #FFFFFF;

      // border-bottom: 1px solid rgba(139, 139, 139, 0.2);

      @media (max-width: 1300px) {
        padding-right: 4%;
      }

      @media (max-width: 1100px) {
        //width: 33%;
      }

      @media (max-width: 725px) {
        display: block;
        margin-top: 19px;
        padding: 17px 10px 11px;
        width: 100%;
        color: #1C1C1C;
        background: #C4C4C4;
      }

      & .film-name {
        // width: 70%;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;

        @media (max-width: 1300px) {
          font-size: 15px;
          line-height: 18px;
          margin-top: 48px;
          margin-bottom: 3px;
        }

        @media (max-width: 725px) {
          margin-top: 0;
          margin-bottom: 3px;
          font-size: 18px;
          font-weight: 600;
          line-height: 22px;
        }

        & img {
          vertical-align: middle;
        }
      }

      & .film-genre {
        margin-right: 5px;
        font-weight: 300;
        font-size: 14px;
        line-height: 17px;

        @media (max-width: 1300px) {
          color: rgba(255, 255, 255, 0.6);
        }

        @media (max-width: 725px) {
          color: #1C1C1C;
        }

        &-wrapper {
          display: flex;
          flex-wrap: wrap;
        }
      }
    }

    &-time {
      font-weight: 500;
      text-align: center;
      vertical-align: bottom;
      color: #8B8B8B;
      // border-bottom: 1px solid rgba(139, 139, 139, 0.2);
      cursor: pointer;

      @media (max-width: 725px) {
        margin-bottom: 18px;
      }

      & .wrapper {
        display: inline-block;
        text-align: right;
      }

      & .hall {
        font-size: 12px;
        line-height: 12px;
      }

      & .time {
        display: block;
        font-weight: 600;
        font-size: 18px;
        line-height: 15px;
        color: #1C1C1C;

        @media (max-width: 725px) {
          padding-left: 10px;
        }
      }

      & .price {
        font-size: 14px;
        line-height: 17px;
      }
    }
  }
}

@media (max-width: 1300px) {
  tr {
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
    -webkit-tap-highlight-color: transparent;
  }
}

@media (max-width: 725px) {
  tr {
    position: absolute;
    display: block;
    width: 100%;
    height: fit-content;
    overflow-y: hidden;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  th {
    width: 77px;
  }

  td {
    display: inline-block;
    margin-right: 19px;
  }
}
</style>
