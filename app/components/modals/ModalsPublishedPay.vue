<script setup lang="ts">
import { reactive, watchEffect, ref, computed, onMounted,watch } from 'vue'
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
const guestEmail = ref('')
const emailError = ref(false)
const film = reactive({name:"",date:"",performanceId:0,price:0,time:"",selectedSeat: [],selectedSeatCount:0,zal:""});
onMounted( async () => {
  film.selectedSeat = await selectedSeatStore.GET_SELECTED_SEATS_BY_PERFORMANCE(film.performanceId)
  film.selectedSeatCount = await selectedSeatStore.GET_SELECTED_COUNT(film.performanceId)
});
watchEffect(() => {
  if (modalStore.paidPublishedModal) {

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
  return cardsStore.cards?.Jazzcinema_Club[0].balance
});
const validateEmail = (email: string) => {
  return String(email)
      .toLowerCase()
      .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};
const paidMoney = () => {
  if (!guestEmail.value || !validateEmail(guestEmail.value)) {
    emailError.value = true
    return
  } else {
    emailError.value = false
  }
  const ids = film.selectedSeat.map(item => item.item.id)

  const query = {
    idPerformance: String(film.performanceId),
    zalId: parseInt(currentScheduleStore.schedule.StructureElementID),
    selectIds: ids,
    datePerformance: film.date,
    email: guestEmail.value,
    dev: true
  }

  paidStore.SET_PUBLISHED_PAID_NOT_SELECT(query)
}

const toggleModal = () => {
  modalStore.TOGGLE_PAID_PUBLISHED_MODAL()
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
  watch(guestEmail, () => {
    if (emailError.value) emailError.value = false
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
const switchToAuth = () => {
  modalStore.TOGGLE_PAID_PUBLISHED_MODAL()
  modalStore.TOGGLE_FAST_REG_MODAL()
}

const payCard = () => {
  modalStore.TOGGLE_PAID_MODAL()
  modalStore.TOGGLE_PAYMENT_WITH_BONUS_MODAL()
}
</script>
<template>
  <modalsBaseModal :show="modalStore.paidPublishedModal" title="Покупка билета" @close="toggleModal" width="350px">
    <div class="modals__form">
      <!-- Информация о фильме -->
      <div class="modals__form-field">
        <label class="modals__form-label">Сеанс:</label>
        <span class="modals__form-info">{{ film.name }}</span>
      </div>

      <div class="modals__form-field">
        <label class="modals__form-label">Дата и время:</label>
        <span class="modals__form-info">
          {{ film.date }}
        </span>
      </div>

      <div class="modals__form-field">
        <label class="modals__form-label">Выбранные места:</label>
        <span class="modals__form-info" v-html="seats"></span>
      </div>

      <!-- Поле для Email (обязательно для гостя) -->
      <div class="modals__form-field" :class="{ 'modals__form-field--error': emailError }">
        <label class="modals__form-label">Email для получения чека:</label>
        <input
            type="email"
            v-model="guestEmail"
            placeholder="example@mail.com"
            class="modals__guest-input"
            :class="{ 'input-error': emailError }"
        >
        <span v-if="emailError" class="error-text">Введите корректный email</span>
      </div>

      <div class="modals__form-total">
        <span>Стоимость:</span>
        <span>{{ film.price * film.selectedSeatCount }} ₽</span>
      </div>

      <BaseButton @onClick="paidMoney">
        Оплатить как гость
      </BaseButton>

      <!-- Блок предложения авторизации -->
      <div class="modals__auth-offer">
        <p>Получайте баллы за каждую покупку!</p>
        <span @click="switchToAuth">Войти или зарегистрироваться</span>
      </div>
    </div>
  </modalsBaseModal>
</template>

<style lang="scss" scoped>


.modals {
  &__guest-input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(1, 189, 249, 0.5);
    color: #fff;
    padding: 8px 0;
    font-size: 15px;
    outline: none;
    transition: border-color 0.3s;
    &.input-error {
      border-bottom-color: #ff4d4d; // Красный цвет при ошибке
    }
    &:focus {
      border-bottom-color: #01BDF9;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  }
  .error-text {
    color: #ff4d4d;
    font-size: 12px;
    margin-top: 4px;
    display: block;
  }
  
  .modals__form-field--error {
    .modals__form-label {
      color: #ff4d4d;
    }
  }
  &__auth-offer {
    margin-top: 25px;
    text-align: center;

    p {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 5px;
    }

    span {
      font-size: 14px;
      color: #01BDF9;
      text-decoration: underline;
      cursor: pointer;
      font-weight: 600;

      &:hover {
        text-decoration: none;
      }
    }
  }

  // Дублируем твои стили для полей (или они у тебя глобальные)
  &__form-label {
    font-size: 15px;
    font-weight: 300;
    color: #01BDF9;
    margin-bottom: 4px;
    display: flex;
  }
  &__form-field {
    margin-bottom: 25px;
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
    margin: 30px 0;
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
</style>
