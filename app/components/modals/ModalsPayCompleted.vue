<script setup lang="ts">
import { reactive, watchEffect, watch, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAutorizationStore } from '@/store/autorization'
import { useReservationStore } from '@/store/reservation'
import { usePaidStore } from '@/store/paid'
import { useModalStore } from '@/store/modals'
import { useOptionsStore } from '@/store/options'
import { useSelectedSeatStore } from '@/store/selectedSeat'
import { useCurrentScheduleStore  } from '@/store/currentSchedule'
import { useTicketStore } from '@/store/tickets'
const currentScheduleStore  = useCurrentScheduleStore();
const autorizationStore = useAutorizationStore();
const reservationStore = useReservationStore();
const modalStore = useModalStore();
const paidStore = usePaidStore();
const optionsStore = useOptionsStore();
const selectedSeatStore  = useSelectedSeatStore();
const ticketStore = useTicketStore()
const film = reactive({name:"",date:"",performanceId:0,price:0,time:"",selectedSeat: [],selectedSeatCount:0,zal:""});
const router = useRouter()
const textSeat = ref();
const amount = ref();
watchEffect(() => {
  if ((modalStore.modalsPayCompleted) && (reservationStore.textSeats)){
    if (typeof reservationStore.name == 'undefined') {
      return
    }
    textSeat.value = reservationStore.textSeats
    amount.value = reservationStore.amount
    const params = reservationStore.GET_RESERVATION_PARAMS
    Object.assign(film, params, {
      selectedSeat: selectedSeatStore.GET_SELECTED_SEATS_BY_PERFORMANCE(
          parseInt(params.performanceId)
      ),
    })
  }
})


const toggleModal = () => {
  optionsStore.SET_TICKETS(true)
  modalStore.TOGGLE_PAY_COMPLETED_MODAL()
  let query = {
    "currentPageReservation" : 1,
    "search": ''
  }
  ticketStore.FETCH_TICKETS(query)
  setTimeout(router.push,300,`/personalarea`);
}
</script>
<template>
  <modalsBaseModal :show="modalStore.modalsPayCompleted" title="Билеты успешно куплены" @close="toggleModal" width="350px">
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
        <span class="modals__form-info" v-html="textSeat"></span>
      </div>
      <div class="modals__form-total">
        <span>Стоимость:</span>
        <span>{{ amount }}	&#8381;</span>
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

