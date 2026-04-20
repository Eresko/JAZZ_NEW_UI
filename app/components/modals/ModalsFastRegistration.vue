<script setup lang="ts">
import { reactive, ref, watch, computed, nextTick } from 'vue'
import { useAutorizationStore } from '@/store/autorization'
const autorizationStore = useAutorizationStore();
import { useModalStore } from '@/store/modals'
const modalStore = useModalStore();
const phone  = reactive ({text:'',code_key1:'',code_key2:'',code_key3:'',code_key4:''});
const isSnake = ref(false)
const sms = ref(false)
const isActive = ref(false)
const check = ref(false);
const input1 = ref<HTMLInputElement | null>(null)
const input2 = ref<HTMLInputElement | null>(null)
const input3 = ref<HTMLInputElement | null>(null)
const input4 = ref<HTMLInputElement | null>(null)

watch(sms, async (newVal) => {
  if (newVal) {
    await nextTick()
    input1.value?.focus()
  }
})
const block = computed(() => {
  return check.value == false || phone.text.replace(/[\(\)\-\s]/g,"").length < 12
})
const authorizationRequest = async () => {
  const val = {
    phone: phone.text.replace(/[\(\)\-\s]/g, ""),
  }

  if (val.phone.length !== 12) return

  const failed = await autorizationStore.AUTHORIZATIONS_SMS(val)

  if (!failed) {
    modalStore.TOGGLE_FAST_REG_MODAL()
    modalStore.TOGGLE_CHECK_CODE_MODAL()
  }
}


// const checkSmsCode = async (code: string) => {
//   const val = {
//     phone: phone.text.replace(/[\(\)\-\s]/g, ""),
//     code
//   }
//
//   const result = await autorizationStore.CHECK_SMS_CODE(val)
//
//   if (!result) {
//     isSnake.value = true
//     setTimeout(() => {
//       isSnake.value = false
//     }, 200)
//   } else {
//     modalStore.TOGGLE_FAST_REG_MODAL()
//   }
// }
const formatPhone = (digits: string) => {
  let formatted = '+7'
  if (digits.length > 0) formatted += ' (' + digits.slice(0, 3)
  if (digits.length >= 4) formatted += ') ' + digits.slice(3, 6)
  if (digits.length >= 7) formatted += '-' + digits.slice(6, 8)
  if (digits.length >= 9) formatted += '-' + digits.slice(8, 10)
  return formatted
}
const onPhoneInput = (e: InputEvent) => {
  const input = e.target as HTMLInputElement
  // оставляем только цифры
  let digits = input.value.replace(/\D/g, '')

  // убираем первый 7, если пользователь вводит 7 после +7
  if (digits.startsWith('7')) digits = digits.slice(1)
  // ограничиваем 10 цифрами после +7
  digits = digits.slice(0, 10)

  const formatted = formatPhone(digits)

  phone.value = formatted
  input.value = formatted

  nextTick(() => {
    // курсор всегда в конце
    const len = input.value.length
    input.setSelectionRange(len, len)
  })
}
// const setCode = (event, input) => {
//   const val = event.target.value;
//
//   // Массив с рефами на input элементы
//   const refs = [input1.value, input2.value, input3.value, input4.value];
//
//   // Если в поле что-то введено
//   if (val.length) {
//     // Если есть следующее поле, фокусируем его
//     if (refs[input]) {
//       refs[input].focus();
//     } else {
//       // Если это последний input, выполняем действие
//       checkSmsCode(
//           phone.code_key1 +
//           phone.code_key2 +
//           phone.code_key3 +
//           phone.code_key4
//       );
//     }
//   } else {
//     // Если поле пустое, возвращаем фокус на предыдущее поле
//     if (refs[input - 2]) {
//       refs[input - 2].focus();
//     }
//   }
// };
const openReg = () => {
  modalStore.TOGGLE_AUTH_MODAL()
  modalStore.TOGGLE_FAST_REG_MODAL()
}
const close = () => {
  modalStore.TOGGLE_FAST_REG_MODAL()
}

</script>
<template>


        <modalsBaseModal :show="modalStore.fastRegModal" title="Вход по номеру телефона" @close="close"  width="500px">
        <form class="modals__form" action="#" id="demo-form">
          <p class="modals__form-label">Номер телефона</p>

          <input class="modals__form-input" type="tel"  placeholder="+7(___)___-__-__" v-model="phone.text" @input="onPhoneInput">
          <span class="modals__phone-succes" v-show="isActive"></span>
        </form>

        <label class="custom-checkbox__label">
          <input class="custom-checkbox__input" type="checkbox" v-model="check">

          <span class="custom-checkbox"></span>

          <p class="custom-checkbox__text" >Я соглашаюсь с&nbsp; <a class="politics" href="#">политикой конфиденциальности</a></p>
        </label>

        <button
            class="modals-btn g-recaptcha"
            :class="{'block': block}"
            @click="authorizationRequest"
            data-sitekey="6LcF3NMpAAAAALRh6eRhHMAiDnXZimdPDiBIq6I-"
            data-callback='onSubmit'
            data-action='submit'
        >
          Вход
        </button>

        <button class="registration-btn" @click="openReg">Войти в личный кабинет</button>
        </modalsBaseModal>

</template>


<style lang="scss">
@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
.block {
  color: #8B8B8B;
  border: 1px solid #8B8B8B;
}
.block:hover {
  color: #8B8B8B;
  border: 1px solid #8B8B8B;
  text-shadow: 0px 0px 0px;
  filter: none;
}
.custom-checkbox {
  position: absolute;
  top: 2px;
  left: 4px;
  display: none;

  width: 8px;
  height: 8px;

  border-left: 1px solid #8B8B8B;
  border-bottom: 1px solid #8B8B8B;
  transform: rotate(-45deg);
}

.custom-checkbox__label {
  position: relative;
  display: inline-flex;
  align-items: center;

  margin-bottom: 32px;

  cursor: pointer;
}

.custom-checkbox__input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.custom-checkbox__text {
  display: flex;
  align-items: center;

  font-weight: 400;
  font-size: 13px;
  line-height: 16px;

  @media (max-width: 505px) {
    display: inline-block;
    padding-left: 26px;
  }

  &::before {
    content: '';
    display: inline-block;
    width: 15px;
    height: 14px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #8B8B8B;
    border-radius: 1px;
    margin-right: 5px;

    @media (max-width: 505px) {
      position: absolute;
      left: 0;
    }
  }
}

.custom-checkbox__input:checked+.custom-checkbox {
  display: inline;
}
.registration-btn {
  display: block;
  margin: 0 auto;
  margin-top: 14px;

  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #01BDF9;
  cursor: pointer;

  background: none;
  border: none;

  &:hover {
    text-shadow: 0px 0px 4px #01BDF9;
  }

  &:active {
    color: #98E6FF;
    text-shadow: none;
  }
}
.politics {
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #01BDF9;
}

.modals-btn {
  height: 45px;
  max-width: 392px;
  width: 100%;
  //width: 392px;
}
.reg-modal {
  padding: 37px 24px 40px;
  position: fixed;
  top: calc(50% - 202px);
  left: calc(50% - 188px);
  width: 515px;
  font-family: 'Montserrat';
  color: #FFFFFF;
  background: #1C1C1C;
  border-radius: 5px;
  box-shadow: 0px 4px 20px 11px rgba(1, 178, 235, 0.19);
  z-index: 10;
  //position: fixed;
  //width: 515px;
  //padding: 37px 30px 47px;

  @media (max-width: 767px) {
    top: calc(25%);
    left: calc(5%);
    //top: 50%;
    //left: 50%;
    //transform: translate(-50%, -50%);
  }

  @media (max-width: 590px) {

    width: 90%;
    //left:0;
    //width: 100%;
  }

  .modals__title {
    margin-bottom: 38px;
  }

  .modals__form {
    margin-bottom: 20px;
  }

  .password-label {
    position: relative;
    margin-bottom: 27px;

    .modals__form-input {
      margin-bottom: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .password-icon {
    position: absolute;
    right: 5px;
    top: -5px;

    cursor: pointer;
  }

  .hide-password {
    display: none;
  }














}

.modals__phone-succes {
  position: absolute;
  top: 126px;
  right: 40px;
  display: block;
  width: 14px;
  height: 7px;
  border-right: 1px solid #ffffff;
  border-top: 1px solid #ffffff;
  transform: rotate(138deg);
}
</style>
