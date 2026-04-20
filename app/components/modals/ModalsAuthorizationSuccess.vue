<script setup lang="ts">
import { reactive, ref, watch, computed, nextTick } from 'vue'
import { useAutorizationStore } from '@/store/autorization'
const autorizationStore = useAutorizationStore();
import { useModalStore } from '@/store/modals'
const modalStore = useModalStore();

const toggleModal = () => {
  modalStore.TOGGLE_AUTH_SUCCESS_MODAL()
}



</script>
<template>
  <modalsBaseModal :show="modalStore.authSuccess" title="Авторизация" @close="toggleModal" width="370px">
    <div class="modals__form">
      Вы успешно авторизовались
    </div>
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

