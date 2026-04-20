<script setup lang="ts">
import { ref,defineEmits,reactive,defineProps,computed } from 'vue'
import { useModalStore } from '@/store/modals'
import { useSendMessageStore } from '@/store/sendMessage'

const modalStore = useModalStore()
const sendMessageStore = useSendMessageStore()
const number = computed(() => sendMessageStore.number)
const close = () => {
  modalStore.TOGGLE_APPEAL_MODAL()
}

</script>
<template>
        <modalsBaseModal :show="modalStore.appeal" title="Спасибо за обращение!" @close="close"  width="400px">
        <div class="modals__description">
          <p>Мы внимательно ознакомимся с ним<br>
            и ответим в ближайшее время.
          </p>
        </div>
        </modalsBaseModal>

</template>


<style lang="scss" scoped>
.modals {
  &__title {
    margin-bottom: 21px;
    font-size: 18px;
    font-weight: 600;
    line-height: 30px;
    text-align: center;
  }
  &__description {
    display: flex;
    flex-direction: column;
    gap: 44px;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 600;
    line-height: 18px;
    text-align: center;

    &-item {
      line-height: 30px;

      & span {
        font-size: 18px;
      }
    }
  }
}
.modal-appeal {
  padding: 51px 36px 32px 35px;
}
</style>