<script setup lang="ts">
import { reactive, watchEffect, watch, computed, onMounted } from 'vue'
import { useAutorizationStore } from '@/store/autorization'
import { useReservationStore } from '@/store/reservation'
import { useModalStore } from '@/store/modals'
import { useSelectedSeatStore } from '@/store/selectedSeat'
import { useCurrentScheduleStore  } from '@/store/currentSchedule'
const currentScheduleStore  = useCurrentScheduleStore();
const autorizationStore = useAutorizationStore();
const reservationStore = useReservationStore();
const modalStore = useModalStore();
const selectedSeatStore  = useSelectedSeatStore();
const film = reactive({name:"",date:"",performanceId:0,price:0,time:"",selectedSeat: [],selectedSeatCount:0,zal:""});
onMounted( async () => {
  film.selectedSeat = await selectedSeatStore.GET_SELECTED_SEATS_BY_PERFORMANCE(film.performanceId)
  film.selectedSeatCount = await selectedSeatStore.GET_SELECTED_COUNT(film.performanceId)
});


watchEffect(() => {
  if (modalStore.reservationModal) {
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

const toggleModal = () => {
  modalStore.TOGGLE_RESERVATION_MODAL()
}
const reservation = () => {
  const ids = film.selectedSeat.map(item => item.item.id)

  const query = {
    idPerformance: String(film.performanceId),
    zalId: parseInt(currentScheduleStore.schedule.StructureElementID),
    selectIds: ids,
  }

  reservationStore.SET_RESERVATION_NOT_SELECT(query)
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
</script>
<template>
  <modalsBaseModal :show="modalStore.reservationModal" title="Бронирование билетов" @close="toggleModal" width="350px">
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
        <span>{{ film.price * film.selectedSeatCount }}	&#8381;</span>
      </div>
      <BaseButton @on-click="reservation">
        подтвердить
      </BaseButton>
    </div>
  </modalsBaseModal>

</template>



<style lang="scss" scoped>
.modals {

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