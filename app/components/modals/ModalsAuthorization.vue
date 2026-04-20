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
const failedAuthorization = ref(false)
const password = ref("")
const login = ref("")
const stopSnake = ()  => {
  failedAuthorization.value = false;
}

const close = () => {
  modalStore.TOGGLE_AUTH_MODAL()
}


const formatPhone = (digits: string) => {
  let formatted = '+7'
  if (digits.length > 0) formatted += ' (' + digits.slice(0, 3)
  if (digits.length >= 4) formatted += ') ' + digits.slice(3, 6)
  if (digits.length >= 7) formatted += '-' + digits.slice(6, 8)
  if (digits.length >= 9) formatted += '-' + digits.slice(8, 10)
  return formatted
}
const openReg = () => {
  modalStore.TOGGLE_AUTH_MODAL()
  modalStore.TOGGLE_FAST_REG_MODAL()
}

const authorizationRequest = async () => {
  let val  = {
    login: phone.text.replace(/[\(\)\-\s]/g,""),
    password: password.value
  }
  const result = await autorizationStore.AUTHORIZATIONS(val)
  if (result) {
    modalStore.TOGGLE_AUTH_MODAL();
    modalStore.SET_AUTH_SECCESS(true)
  }
  else {
    failedAuthorization.value = true
    setTimeout(stopSnake,200)
  }
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

</script>
<template>

  <modalsBaseModal :show="modalStore.authModal" title="Войти в личный кабинет" @close="close" width="450px">
    <form class="modals__form" action="#">
      <p class="modals__form-label">Номер телефона</p>

      <input class="modals__form-input" type="tel" placeholder="+7(___)___-__-__" v-model="phone.text"
             @input="onPhoneInput">

      <p class="modals__form-label">Пароль</p>

      <input class="modals__form-input" type="password" placeholder="Введите пароль" v-model="password">
    </form>

    <div class="password-buttons">
      <button class="auth__pass-btn">Запомнить</button>

      <button class="auth__pass-btn" @click="openReg">Забыли пароль?</button>
    </div>

    <button class="modals-btn" @click="authorizationRequest">войти</button>

    <button class="registration-btn" @click="openReg">Вход по номеру телефона</button>
  </modalsBaseModal>

</template>

<style lang="scss">

.snake {
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}


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
.modals__form {
  margin-bottom: 20px;
}

.password-buttons {
  display: flex;
  justify-content: space-between;

  margin-bottom: 33px;
}

.auth__pass-btn {
  font-family: 'Montserrat';
  font-weight: 300;
  font-size: 12px;
  line-height: 15px;
  text-decoration-line: underline;
  color: #FFFFFF;

  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    color: #01bdf9;
    text-shadow: 0px 0px 4px #01bdf9;
  }
}

.modals-btn {
  margin-bottom: 11px;
}

.registration-btn {
  display: block;
  margin: 0 auto;

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
.auth-modal {
  padding: 37px 24px 40px;
  position: fixed;
  top: calc(50% - 202px);
  left: calc(50% - 188px);
  width: 376px;
  font-family: 'Montserrat';
  color: #FFFFFF;
  background: #1C1C1C;
  border-radius: 5px;
  box-shadow: 0px 4px 20px 11px rgba(1, 178, 235, 0.19);
  z-index: 10;

  @media (max-width: 420px) {
    top: calc(25%);
    left: calc(5%);
    position: absolute;
    //top: 50%;
    //left: 50%;
    //transform: translate(-50%, -50%);
    width: 90%;
    //left:0;
    //width: 100%;
  }

  .modals__title {
    margin-bottom: 38px;
  }


}
</style>
