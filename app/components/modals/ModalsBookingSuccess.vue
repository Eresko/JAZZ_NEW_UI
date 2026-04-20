<script setup lang="ts">
import { reactive, ref, watch, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAutorizationStore } from '@/store/autorization'
const autorizationStore = useAutorizationStore();
import { useModalStore } from '@/store/modals'
import { useReservationStore } from '@/store/reservation'
import { useOptionsStore } from '@/store/options'
import { useTicketStore } from '@/store/tickets'
const ticketStore = useTicketStore()
const router = useRouter()
const optionsStore = useOptionsStore();
const modalStore = useModalStore();
const reservationStore = useReservationStore();
const toggleModal = () => {
  optionsStore.SET_TICKETS(true)
  modalStore.TOGGLE_BOOKING_SUCESS_MODAL()
  let query = {
    "currentPageReservation" : 1,
    "search": ''
  }
  ticketStore.FETCH_TICKETS(query)
  setTimeout(router.push,300,`/personalarea`);
}
</script>

<template>
      <modalsBaseModal :show="modalStore.bookingSuccess" title="Выбранные места успешно забронированы!" @close="toggleModal" width="370px">
      <div class="modals__form">
        <svg class="modal-success__ico" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.33335 16.6667H8.33335C8.77538 16.6667 9.1993 16.8423 9.51186 17.1549C9.82442 17.4674 10 17.8914 10 18.3334V33.3334C10 33.7754 9.82442 34.1993 9.51186 34.5119C9.1993 34.8245 8.77538 35.0001 8.33335 35.0001H3.33335C2.89133 35.0001 2.4674 34.8245 2.15484 34.5119C1.84228 34.1993 1.66669 33.7754 1.66669 33.3334V18.3334C1.66669 17.8914 1.84228 17.4674 2.15484 17.1549C2.4674 16.8423 2.89133 16.6667 3.33335 16.6667ZM3.33335 18.3334V33.3334H8.33335V18.3334H3.33335ZM29.5267 31.7084L34.5284 23.3751C34.8284 22.8751 35 22.2917 35 21.6667V20.0001C35 19.116 34.6488 18.2682 34.0237 17.643C33.3986 17.0179 32.5507 16.6667 31.6667 16.6667H22.3167L24.745 7.60006L24.7534 7.57006C24.8293 7.28757 24.8295 6.99007 24.754 6.70746C24.6785 6.42485 24.53 6.16708 24.3234 5.96006L14.3084 15.9751C13.9985 16.2845 13.7528 16.6522 13.5855 17.0569C13.4181 17.4616 13.3325 17.8954 13.3334 18.3334V30.0001C13.3334 30.8841 13.6845 31.732 14.3097 32.3571C14.9348 32.9822 15.7826 33.3334 16.6667 33.3334H26.6667C27.8834 33.3334 28.9467 32.6834 29.5267 31.7084ZM36.6667 21.6667C36.6667 22.6567 36.38 23.5784 35.8834 24.3534L31.04 32.4251C30.6072 33.2055 29.9734 33.8559 29.2043 34.3087C28.4353 34.7615 27.5591 35.0002 26.6667 35.0001H16.6667C15.3406 35.0001 14.0688 34.4733 13.1312 33.5356C12.1935 32.5979 11.6667 31.3261 11.6667 30.0001V18.3334C11.6667 16.9534 12.225 15.7051 13.1284 14.8001L24.3234 3.60339L25.5017 4.78173C25.9233 5.20339 26.2242 5.73044 26.3728 6.30794C26.5214 6.88544 26.5124 7.49223 26.3467 8.06506L24.4884 15.0001H31.6667C32.9928 15.0001 34.2645 15.5268 35.2022 16.4645C36.1399 17.4022 36.6667 18.674 36.6667 20.0001V21.6667Z" fill="#01BDF9"/>
        </svg>
        Номер брони {{ reservationStore.GET_RESERVATION_PARAMS.numberReservation }}
      </div>
      <p class="modals__warning">* Бронь снимается автоматически за 20 минут до начала сеанса</p>
      </modalsBaseModal>
</template>


<style lang="scss" scoped>
.modals {
  &__title {
    margin-bottom: 10px;
  }
  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
  &__warning {
    margin-top: 30px;
  }
}
.modal-success {
  padding: 34px 45px 32px 45px;
  &__ico {
    margin-bottom: 30px;
  }
}
</style>