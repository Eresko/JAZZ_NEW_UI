<script setup lang="ts">
import { reactive, watchEffect, watch, computed, onMounted } from 'vue'
import { useAutorizationStore } from '@/store/autorization'
import { useReservationStore } from '@/store/reservation'
import { usePaidStore } from '@/store/paid'
import { useModalStore } from '@/store/modals'
import { useSelectedSeatStore } from '@/store/selectedSeat'
import { useCurrentScheduleStore  } from '@/store/currentSchedule'
import { useCardsStore } from '@/store/cards'
const currentScheduleStore  = useCurrentScheduleStore();
const autorizationStore = useAutorizationStore();
const reservationStore = useReservationStore();
const modalStore = useModalStore();
const paidStore = usePaidStore();
const cardsStore = useCardsStore();
const selectedSeatStore  = useSelectedSeatStore();
const film = reactive({name:"",date:"",performanceId:0,price:0,time:"",selectedSeat: [],selectedSeatCount:0,zal:""});
onMounted( async () => {
  film.selectedSeat = await selectedSeatStore.GET_SELECTED_SEATS_BY_PERFORMANCE(film.performanceId)
  film.selectedSeatCount = await selectedSeatStore.GET_SELECTED_COUNT(film.performanceId)
});
watchEffect(() => {
  if (modalStore.paymentWithBonus) {
    const params = reservationStore.GET_RESERVATION_PARAMS
    Object.assign(film, params, {
      selectedSeat: selectedSeatStore.GET_SELECTED_SEATS_BY_PERFORMANCE(
          parseInt(params.performanceId)
      ),
      selectedSeatCount: selectedSeatStore.GET_SELECTED_COUNT(
          params.performanceId
      ),
    })
  }
})

const  balance = computed(() => {
  return cardsStore.GET_FETCH_CARDS?.Jazzcinema_Club.balance
});

const paidBonus = () => {
  const ids = film.selectedSeat.map(item => item.item.id)

  const query = {
    idPerformance: String(film.performanceId),
    zalId: parseInt(currentScheduleStore.schedule.StructureElementID),
    selectIds: ids,
    datePerformance: film.date,
    dev: true
  }

  paidStore.SET_PAID_WITH_BONUS_NOT_SELECT(query)
}

const toggleModal = () => {
  modalStore.TOGGLE_PAID_MODAL()
}
const seats = computed(() => {
  let text = ''
  const arr = []

  let selected = selectedSeatStore.GET_SELECTED_SEATS_BY_PERFORMANCE(film.performanceId)
  if (typeof selected == 'undefined') {
    return text
  }
  const unicRows = [...new Set(selected.map(item => item.row))];

  unicRows.forEach(i => {
    arr.push({ row: i, seats: [] })
  })

  arr.forEach(i => {
    selected.forEach(j => {
      if (i.row === j.row) {
        i.seats.push(j.item.label)
      }
    })
  })

  const sortedArr = arr.sort((a, b) => a.x > b.x ? 1 : -1);

  sortedArr.forEach(i => {
    text += film.zal + ', ' + (i.row)+ ' ряд, место '
    const len = i.seats.length
    i.seats.forEach((j, index) => {
      text += (len !== index + 1 ? j + ', ' : j)
    })
    text += '<br />'
  })


  return text
})
const payMoney = () => {
  modalStore.TOGGLE_PAID_MODAL()
  modalStore.TOGGLE_PAYMENT_WITH_BONUS_MODAL()
}
</script>
<template>
  <modalsBaseModal :show="modalStore.paymentWithBonus" title="Оплата балами" @close="toggleModal" width="350px">
    <div class="modals__form">
      <div class="modals__form-field">
        <label class="modals__form-label">Сеанс:</label>
        <span class="modals__form-info">{{ film.name }}</span>
      </div>
      <div class="modals__form-field">
        <label class="modals__form-label">Дата:</label>
        <span class="modals__form-info">
            {{ film.date }} <br>
            Время: {{ film.time }}
          </span>
      </div>
      <div class="modals__form-field">
        <label class="modals__form-label">Выбранные места:</label>
        <span class="modals__form-info" v-html="seats"></span>
      </div>
      <div class="modals__form-total">
        <span>Стоимость:</span>
        <span>{{ film.price * film.selectedSeatCount }}	Бал</span>
      </div>
      <BaseButton @onClick="paidBonus">
        Оплатить
      </BaseButton>
      <div class="modals__footer">
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.4996 0C7.83493 0 0 7.83511 0 17.5C0 27.1649 7.83493 35 17.4996 35C27.1651 35 35 27.1649 35 17.5C35 7.83511 27.1651 0 17.4996 0ZM24.2121 10.0332C24.1962 14.0325 24.1811 18.0311 24.1653 22.0304C23.7834 22.8933 22.861 24.6365 20.9209 25.9329C20.2176 26.4036 18.7943 27.334 16.8225 27.353C15.4643 27.3665 14.4347 26.9474 13.5893 26.6029C12.1303 26.0083 11.1713 25.2494 10.3561 24.5937C9.59561 23.9824 8.60096 23.0727 7.6079 21.7994C6.02742 21.8645 5.59559 21.6827 5.54161 21.4763C5.37649 20.8516 8.50173 19.3798 11.3261 18.6122C14.137 17.8485 16.9289 17.7072 17.0416 18.1335C17.0995 18.3526 16.4748 18.8154 16.2882 18.9559C16.0549 19.1313 15.8294 19.248 15.6453 19.3266C15.6429 19.691 15.6405 20.0553 15.6389 20.4197C15.6548 21.0762 15.8096 21.5787 15.9334 21.8915C16.1422 22.4225 16.3756 23.0132 16.9725 23.318C17.4369 23.5553 17.8981 23.5045 18.1323 23.4791C18.6467 23.4236 18.9991 23.2172 19.4778 22.9369C19.7556 22.7742 20.1232 22.5297 20.5169 22.1749C20.5153 21.3279 20.5129 20.4808 20.5113 19.6346C19.9231 19.7172 19.4452 19.275 19.4373 18.8376C19.4294 18.3915 19.9096 17.9239 20.5113 18.0065V17.7755C19.9072 17.8533 19.4309 17.3825 19.4429 16.938C19.4556 16.5077 19.9279 16.0735 20.5113 16.1529C20.5129 16.0608 20.5153 15.9687 20.5169 15.8758C19.9271 15.9703 19.4413 15.5289 19.4317 15.0907C19.4214 14.6486 19.8953 14.1818 20.4939 14.2596C20.4859 13.1355 20.4788 12.0115 20.4708 10.8882C22.0259 9.67918 23.5802 8.47097 25.1353 7.26197C25.4782 7.68905 25.8203 8.11692 26.1633 8.544C25.5124 9.04015 24.8622 9.53708 24.2121 10.0332Z" fill="#01BDF9"/>
        </svg>

        <span @click="payMoney">Оплатить деньгами</span>
      </div>
    </div>
  </modalsBaseModal>
</template>



<style lang="scss" scoped>
.modals {
  &__footer {

    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-left: 10px;
      color: #01BDF9;
      font-family: 'degular', 'Montserrat', sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 15px;
      line-height: 18px;
      text-align: center;
      text-decoration-line: underline;
      cursor: pointer;
    }
  }
  &__title {
    margin-bottom: 40px;
  }
  &__form-label {
    font-size: 15px;
    font-weight: 300;
    color: #01BDF9;
    margin-bottom: 4px;
    display: flex;
  }
  &__form-field {
    margin-bottom: 34px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(139, 139, 139, 0.2);
  }
  &__form-info {
    font-size: 15px;
    font-weight: 500;
  }
  &__form-total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 60px;
    & > *:first-child {
      font-size: 15px;
      font-weight: 300;
      color: #01BDF9;
    }
    & > *:last-child {
      font-size: 15px;
      font-weight: 500;
      color: #fff;
    }
  }
}
.modal-reserv {
  padding: 34px 45px 60px 45px;
  @media (max-width: 525px) {
    width: 90%;
  }
}
</style>
