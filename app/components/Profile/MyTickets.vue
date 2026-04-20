<script setup lang="ts">
import { ref,defineEmits,reactive,watch,computed } from 'vue'
import { useOptionsStore } from '@/store/options'
import { useModalStore } from '@/store/modals'
import { useTicketStore } from '@/store/tickets'
const historyPurchaseShow = ref(10)
const optionsStore = useOptionsStore()
const ticketStore = useTicketStore()
const modalStore = useModalStore();
const widthScreenRes = computed(() => {
  let widthScreen = window.innerWidth;
  if (widthScreen <= 1179) {
    return true
  } else {
    return false
  }

})
const url = ref()
const isActiveQr = ref(false)
const totalPurchase = ref(false)

const historyReservation = computed(() => {
  return ticketStore.GET_FETCH_TICKETS
})
const lastPage = computed(() => {
  return ticketStore.lastPage
})
const currentPage = computed(() => {
  return ticketStore.currentPage
})
const getTickets = () => {

}
const debounceDelay = 500
let debounceTimeout = null
const debouncedSearch = ref('')
const searchInput = ref("");
watch(searchInput, (newVal) => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }
  debounceTimeout = setTimeout(() => {
    debouncedSearch.value = newVal
    getNextPage(1)
  }, debounceDelay)
})



const dayFilter = (val) => {
  console.log()
  let month = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля','Августа','Сентября','Октября','Ноября','Декабря']
  let monthNumber = ['.01.', '.02.', '.03.', '.04.', '.05.', '.06.', '.07.', '.08.', '.09.', '.10.', '.11.', '.12.']
  const arr = val.split('.')
  arr[2] = arr[2].substr(0,4);
  let date = new Date(arr[2] + '/' + arr[1] + '/' + arr[0])
  // console.log("date", date);

  let widthScreen = window.innerWidth;
  if (widthScreen <= 725) {
    return arr[0] + monthNumber[parseInt(arr[1]) - 1] +arr[2]
  } else {
    return arr[0] + ' ' + month[parseInt(arr[1]) - 1] + ' ' +arr[2] + 'г'
  }
}
const activeQr = (item) => {
  if (item.qr != null) {
    url.value = item.qr
    optionsStore.SET_URL_QR(item.qr)
    modalStore.SET_QR_MODAL(true)
  }
}
const dateFilter = (val) => {
  const arr = val.split('.')
  arr[2] = arr[2].substr(0,4);
  let dateNew = new Date(arr[2] + '/' + arr[1] + '/' + arr[0])
  return dateNew;
}

const parserReservation = (val) => {
  if (typeof val.seats_seans != 'undefined') {
    let seat = '';
    val.seats_seans.forEach( item => {
      seat += ',' + item.label;
    })
    return   val.zal + ', ' + val.seats_seans[0].row + ' Ряд, место ' + seat.substr(1);
  }
  return '';
}

const getNextPage = (val:number = null) => {
  let query = {
    currentPageReservation : val ?? (currentPage.value + 1),
    search:  debouncedSearch.value
  }
  ticketStore.FETCH_TICKETS(query)
}


</script>
<template>

  <section class="tickets">
    <div class="container">
      <div class="search">
        <input class="search-input" type="text" placeholder="Начните вводить название фильма"
               v-model="searchInput">

        <button class="search-btn btn">
          <svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.7722 24.6035L17.8987 16.6562C19.4684 14.7773 20.2532 12.6107 20.2532 10.1562C20.2532 8.3112 19.8017 6.61003 18.8987 5.05273C17.9958 3.49544 16.7637 2.264 15.2025 1.3584C13.6414 0.452799 11.9451 0 10.1139 0C8.2827 0 6.59072 0.452799 5.03797 1.3584C3.48523 2.264 2.25738 3.49544 1.35443 5.05273C0.451477 6.61003 0 8.3112 0 10.1562C0 12.0013 0.451477 13.7025 1.35443 15.2598C2.25738 16.8171 3.48523 18.0485 5.03797 18.9541C6.59072 19.8597 8.28692 20.3125 10.1266 20.3125C12.6414 20.3125 14.8523 19.4831 16.7595 17.8242L24.6076 25.7461C24.7764 25.9154 24.9705 26 25.1899 26C25.4093 26 25.5992 25.9196 25.7595 25.7588C25.9198 25.598 26 25.4033 26 25.1748C26 24.9463 25.9241 24.7559 25.7722 24.6035ZM10.1266 18.7129C8.57384 18.7129 7.14346 18.3278 5.83544 17.5576C4.52743 16.7874 3.49367 15.7464 2.73418 14.4346C1.97468 13.1227 1.59494 11.6966 1.59494 10.1562C1.59494 8.61589 1.97468 7.18978 2.73418 5.87793C3.49367 4.56608 4.52743 3.52506 5.83544 2.75488C7.14346 1.9847 8.56962 1.59961 10.1139 1.59961C11.6582 1.59961 13.0844 1.9847 14.3924 2.75488C15.7004 3.52506 16.7342 4.56608 17.4937 5.87793C18.2532 7.18978 18.6329 8.61589 18.6329 10.1562C18.6329 10.8164 18.557 11.4681 18.4051 12.1113C18.2532 12.7546 18.038 13.3555 17.7595 13.9141C17.481 14.4727 17.1477 15.0016 16.7595 15.501C16.3713 16.0003 15.9325 16.4447 15.443 16.834C14.9536 17.2233 14.4304 17.5576 13.8734 17.8369C13.3165 18.1162 12.7173 18.332 12.0759 18.4844C11.4346 18.6367 10.7848 18.7129 10.1266 18.7129Z"/>
          </svg>
        </button>

        <button class="calendar-btn btn">
          <svg width="33" height="27" viewBox="0 0 33 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="2.97559" width="32" height="22.925" rx="2.5"/>
            <path d="M7 11H10.8V12.7143H7V11Z"/>
            <path d="M7 17.2857H10.8V19H7V17.2857Z"/>
            <path d="M14.6 11H18.4V12.7143H14.6V11Z"/>
            <path d="M14.6 17.2857H18.4V19H14.6V17.2857Z"/>
            <path d="M22.2 11H26V12.7143H22.2V11Z"/>
            <path d="M6.6001 0V4.95M26.4001 0V4.95" stroke-width="2"/>
          </svg>
        </button>
      </div>

      <ul class="tickets__list">
        <li class="tickets__list-item"  v-for="(commentIndex, index) in historyReservation" @click="activeQr(commentIndex)">
          <time v-if="commentIndex?.show_date && widthScreenRes">
            {{ dayFilter(commentIndex?.date_time) }}
          </time>
          <time class="date" datetime="2021-07-07" v-if="!widthScreenRes">{{ dayFilter(commentIndex.date_time)   }}</time>
          <p class="major__column">
            <span>
            <span class="number__reservation-color" v-if="commentIndex?.number_reservation">&#8470;&nbsp;</span>
              {{ commentIndex.number_reservation }}
            </span>


            <span v-if="commentIndex.paymentStatus != null">
              <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#e8eaed"><path d="M160-440v80h640v-80H160Zm0-440h640q33 0 56.5 23.5T880-800v440q0 33-23.5 56.5T800-280H640v200l-160-80-160 80v-200H160q-33 0-56.5-23.5T80-360v-440q0-33 23.5-56.5T160-880Zm0 320h640v-240H160v240Zm0 200v-440 440Z"/></svg>
              КУПЛЕН
            </span>
          </p>

          <ul class="info__list">
            <li class="info__list-item session">
              <p class="first-line">Сеанс:</p>

              <p>{{ commentIndex.name_film }}</p>
            </li>

            <li class="info__list-item time">
              <p class="first-line">Время</p>

              <p>
                <time datetime="">{{ commentIndex.time}}</time>
              </p>
            </li>

            <li class="info__list-item place">
              <p class="first-line">Выбранное место:</p>

              <p>{{  parserReservation(commentIndex) }} </p>
            </li>

            <li class="info__list-item price">
              <p class="first-line">Стоимость</p>

              <p>{{ commentIndex.price }} &#8381;</p>
            </li>
          </ul>
        </li>
      </ul>
      <slot />
      <div class="tickets__showMore-container" v-if="currentPage < lastPage">
        <button class="tickets__showMore-btn" @click="getNextPage">
          Показать больше
        </button>
      </div>
    </div>

  </section>
</template>



<style lang="scss">
.tickets {
  margin-top: 40px;
  margin-bottom: 136px;

  font-family: 'Montserrat';
  font-weight: 500;
  font-size: 18px;
  color: #FFFFFF;

  @media (max-width: 1179px) {
    margin-top: 14px;
    margin-bottom: 62px;
  }

  @media (max-width: 725px) {
    margin-top: 12px;
    margin-bottom: 0;
  }

  &__showMore-container {
    display: grid;
    grid-template-columns: 1fr; // занимает всю ширину списка
    margin: 0 auto;
    margin-bottom: 40px; // как у tickets__list

    // добавляем границы и фон как у items
    background: #1C1C1C;
    border: 1px solid rgba(139, 139, 139, 0.2);
    border-radius: 20px;
    padding: 20px 0;
    text-align: center;

    @media (max-width: 1179px) {
      border-radius: 20px 20px 20px 20px;
      padding: 16px 0;
    }

    @media (max-width: 725px) {
      border-radius: 20px 20px 20px 20px;
      padding: 12px 0;
    }

    .tickets__showMore-btn {
      background: transparent;
      border: none;
      color: #01BDF9;
      font-weight: 700;
      font-size: 18px;
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 2px;

      &:hover {
        color: #FFFFFF;
      }

      @media (max-width: 725px) {
        font-size: 16px;
      }
    }
  }


  .container {
    flex-direction: column;
  }

  .search {
    margin-bottom: 139px;

    text-align: right;

    @media (max-width: 1300px) {
      display: none;
    }

    &-input {
      width: 481px;

      font-family: 'Montserrat';
      font-weight: 300;
      font-size: 15px;
      line-height: 18px;
      color: #FFFFFF;

      background: transparent;
      border: none;
      border-bottom: 1px solid #282828;
      outline: none;

      &::placeholder {
        font-family: 'Montserrat';
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        color: #FFFFFF;
      }
    }

    .btn {
      background: transparent;
      border: none;
      cursor: pointer;

      &:hover {
        fill: #01BDF9;
        filter: drop-shadow(0px 0px 4px #01BDF9);
      }
    }

    &-btn {
      fill: #FFFFFF;
    }

    .calendar-btn path:not(:last-child) {
      fill: #FFFFFF;
    }

    .calendar-btn:hover path:not(:last-child) {
      fill: #01BDF9;
    }

    .calendar-btn path:last-child,
    .calendar-btn rect {
      stroke: #FFFFFF;
    }

    .calendar-btn:hover path:last-child,
    .calendar-btn:hover rect {
      stroke: #01BDF9;
    }
  }

  &__list {
    margin-bottom: 40px;

    list-style: none;

    @media (max-width: 1179px) {
      margin-bottom: 68px;
    }

    @media (max-width: 725px) {
      margin-right: 10px;
      margin-left: 10px;
      margin-bottom: 40px;
    }

    &-item {
      align-items: center;

      margin-bottom: 13px;

      font-size: 18px;

      display: grid;
      grid-template-areas:
            "a c"
            "b c";

      grid-template-columns: 187px 1fr;

      @media (max-width: 1179px) {
        margin-top: 10px;
        flex-direction: column;
        margin-bottom: 15px;
        line-height: 25px;

        display: grid;
        grid-template-areas:
            "a a"
            "b c"
            "b c";

        grid-template-columns: 178px 1fr;
      }

      //@media (max-width: 1199px) {
      //  font-size: 15px;
      //}

      @media (max-width: 725px) {
        margin-bottom: 0;

        grid-template-areas:
            "a a"
            "b b"
            "c c";
      }

      &:last-child {
        margin-bottom: 0;
      }

      & .major__column {
        display: flex;
        align-items: center;
        position: relative;
        margin-bottom: auto;
        font-size: 20px;
        line-height: 24px;
        font-weight: 700;
        letter-spacing: 0.07em;
        text-align: left;
        grid-area: b;
        @media (min-width: 725px) {
          flex-direction: column;
          align-items: flex-start;
        }
        @media (max-width: 725px) {
          span:nth-child(2n) {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-left: 5px;
            font-weight: 300;
            color: #01BDF9;
            svg {
              fill:#01BDF9;
              margin-right: 5px;
            }

          }
        }
        span:nth-child(2n) {
          font-weight: 300;
          color: #01BDF9;
          svg {
            fill:#01BDF9;
            margin-right: 5px;
          }
        }


        @media (max-width: 1179px) {
          display: flex;
          align-items: center;
          justify-content: center;
          grid-area: b;
          height: 100%;
          background: #1C1C1C;
          border: 1px solid rgba(139, 139, 139, 0.2);
          border-right: none;
          border-radius: 20px 0 0 20px;
        }

        @media (max-width: 725px) {
          justify-content: flex-start;
          margin-top: 12px;
          padding-left: 13px;
          font-size: 16px;
          line-height: 25px;
          font-weight: 700;
          border-right: 1px solid rgba(139, 139, 139, 0.2);
          border-bottom: none;
          border-radius: 20px 20px 0 0;
        }

        &::after {
          @media (max-width: 725px) {
            content: '';
            position: absolute;
            bottom: 0;
            width: calc(100% - 29px);
            height: 1px;
            background-color: #8B8B8B33;
            z-index: 1;
          }
        }

        & .number__reservation-color {
          font-weight: 600;
          line-height: 19.5px;
          color: #01BDF9;
        }
      }

      .date {
        margin-top: auto;

        font-weight: 500;
        line-height: 22px;
        text-transform: lowercase;

        //@media (max-width: 1199px) {
        //  margin-right: 18px;
        //}

        grid-area: a;

        @media (max-width: 1179px) {
          margin-top: 58px;
          margin-right: 0;
          margin-bottom: 16px;

          grid-area: a;
          text-align: center;
        }

        @media (max-width: 725px) {
          margin-top: 32px;
          margin-bottom: 0;
          font-size: 15px;
        }
      }

      .info__list {
        display: flex;
        flex-grow: 2;

        padding: 8px 14px 7px 12px;

        list-style: none;
        background: #1C1C1C;
        border: 1px solid rgba(139, 139, 139, 0.2);
        border-radius: 20px;
        grid-area: c;

        @media (max-width: 1179px) {
          position: relative;
          display: grid;
          grid-area: c;
          grid-template-columns: 1fr 134px;
          padding: 19px 0 3px;
          border-left: none;
          border-radius: 0 20px 20px 0;
        }

        @media (max-width: 725px) {
          grid-template-columns: 1fr 92px;
          padding: 20px 0 0 2px;
          width: 100%;

          font-size: 13px;
          line-height: 18px;

          border-left: 1px solid rgba(139, 139, 139, 0.2);
          border-top: none;
          border-radius: 0 0 20px 20px;
        }

        &::after {
          @media (max-width: 1179px) {
            content: "";
            position: absolute;
            top: 5px;
            left: 0;
            width: 1px;
            height: 100%;
            background-image: linear-gradient(rgba(139, 139, 139, 0.2) 61%, rgba(255,255,255,0) 0%);
            background-size: 1px 26px;
            background-repeat: repeat-y;
          }

          @media (max-width: 725px) {
            top: 18px;
            right: 92px;
            left: inherit;
            height: 85%;
            background-size: 1px 19px;
          }
        }

        &-item {
          padding: 12px 20px;

          line-height: 25px;

          border-right:  1px dashed rgba(139, 139, 139, 0.2);

          @media (max-width: 1179px) {
            padding: 0 0 17px 32px;
            border-right: none;
          }

          @media (max-width: 725px) {
            padding: 0 0 17px 13px;
            border-right: none;
          }


          &:nth-of-type(3) p:last-child {
            text-transform: lowercase;
          }

          &:last-child {
            border: none;
          }

          &::first-line,
          .first-line {
            font-weight: 300;
            color: #01BDF9;

            @media (max-width: 1300px) {
              font-size: 16px;
            }

            @media (max-width: 725px) {
              font-size: 11px;
              line-height: normal;
            }
          }

          &.session {
            flex-grow: 10;
          }

          &.time {
            max-width: 120px;
            width: 100%;
            text-align: center;

            @media (max-width: 1179px) {
              padding-left: 0;
              text-align: left;
            }

            @media (max-width: 725px) {
              padding-left: 11px;
              width: 92px;
            }
          }

          &.price {
            padding-left: 21px;
            padding-right: 0;
            width: 119px;

            @media (max-width: 1179px) {
              padding-left: 0;
            }

            @media (max-width: 725px) {
              padding-left: 11px;
              width: 92px;
            }
          }

          &.place {
            padding-left: 49px;
            flex-grow: 2;
            max-width: 279px;
            width: 100%;

            @media (max-width: 1179px) {
              padding-left: 32px;
            }

            @media (max-width: 725px) {
              padding-left: 13px;
            }
          }
        }
      }
    }
  }

  &__showMore {
    display: none;

    @media (max-width: 725px) {
      display: block;
      margin: 0 auto;
    }

    &-btn {
      @media (max-width: 725px) {
        display: inline-block;
        margin: 4px auto 3px;
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
}
</style>
