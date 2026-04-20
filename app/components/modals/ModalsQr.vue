<script setup lang="ts">
import { reactive, watchEffect, watch, computed, ref } from 'vue'
import { useModalStore } from '@/store/modals'
import { useOptionsStore } from '@/store/options'
const modalStore = useModalStore();
const optionsStore = useOptionsStore()

const toggleModal = () => {
  modalStore.TOGGLE_QR_MODAL()
}


</script>
<template>
  <modalsBaseModal :show="modalStore.qrModal" title="БИЛЕТ" @close="toggleModal" width="350px">
    <div class="modals__form">
      <img :src="optionsStore.GET_URL_QR">
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
