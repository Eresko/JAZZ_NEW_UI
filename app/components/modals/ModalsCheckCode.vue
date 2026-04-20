<script setup lang="ts">
import { reactive, ref, watch, computed, nextTick } from 'vue'
import { useAutorizationStore } from '@/store/autorization'
import { useModalStore } from '@/store/modals'
const modalStore = useModalStore();
const autorizationStore = useAutorizationStore();
const phone  = reactive ({text:'',code_key1:'',code_key2:'',code_key3:'',code_key4:''});
const input1 = ref<HTMLInputElement | null>(null)
const input2 = ref<HTMLInputElement | null>(null)
const input3 = ref<HTMLInputElement | null>(null)
const input4 = ref<HTMLInputElement | null>(null)
const isSnake = ref(false);
const checkSmsCode = async (code: string) => {
  const val = {
    phone: phone.text.replace(/[\(\)\-\s]/g, ""),
    code
  }

  const result = await autorizationStore.CHECK_SMS_CODE(val)

  if (!result) {
    isSnake.value = true
    setTimeout(() => {
      isSnake.value = false
    }, 200)
  } else {
    modalStore.TOGGLE_CHECK_CODE_MODAL()
    modalStore.SET_AUTH_SECCESS(true)
  }
}


const setCode = (event, input) => {
  const val = event.target.value;

  // Массив с рефами на input элементы
  const refs = [input1.value, input2.value, input3.value, input4.value];

  // Если в поле что-то введено
  if (val.length) {
    // Если есть следующее поле, фокусируем его
    if (refs[input]) {
      refs[input].focus();
    } else {
      // Если это последний input, выполняем действие
      checkSmsCode(
          phone.code_key1 +
          phone.code_key2 +
          phone.code_key3 +
          phone.code_key4
      );
    }
  } else {
    // Если поле пустое, возвращаем фокус на предыдущее поле
    if (refs[input - 2]) {
      refs[input - 2].focus();
    }
  }
};
const close = () => {
  modalStore.TOGGLE_CHECK_CODE_MODAL()
}
</script>


<template>
  <modalsBaseModal :show="modalStore.checkCode" title="Введите последние 4 цифры входящего номера" @close="close"  width="450px">
  <div  class="smsCode" >
    <div class="smsCode__form">
      <input class="smsCode__input" type="tel" maxlength="1" ref="input1" @keyup="setCode($event, 1)" v-model="phone.code_key1">
      <input class="smsCode__input" type="tel" maxlength="1" ref="input2" @keyup="setCode($event, 2)" v-model="phone.code_key2">
      <input class="smsCode__input" type="tel" maxlength="1" ref="input3" @keyup="setCode($event, 3)" v-model="phone.code_key3">
      <input class="smsCode__input" type="tel" maxlength="1" ref="input4" @keyup="setCode($event, 4)" v-model="phone.code_key4">
    </div>
  </div>
  </modalsBaseModal>
</template>

<style lang="scss" scoped>

.smsCode {
  &__form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__input {
    max-width: 70px;
    width: 100%;
    height: 50px;
    border: none;
    border-bottom: 1px solid rgba(139, 139, 139, 0.2);
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 48px;
    text-align: center;
    color: #fff;
    background-color: transparent;
    outline: none;

    @media (max-width: 1300px) {
      width: 100%;
      font-size: 38px;
    }
  }
}

</style>



