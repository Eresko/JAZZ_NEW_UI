<script setup lang="ts">
import { useModalStore } from '@/store/modals'
const modalStore = useModalStore();



</script>

<template>
  <div>
     <ModalsFastRegistration v-if="modalStore.fastRegModal" />
    <ModalsReservation v-if="modalStore.reservationModal" />
    <ModalsAuthorization v-if="modalStore.authModal" />
    <ModalsBookingNotSuccess v-if="modalStore.bookingNotSuccess" />
    <ModalsAppeal v-if="modalStore.appeal" />
    <ModalsVideo v-if="modalStore.video" />
    <ModalsBookingSuccess v-if="modalStore.bookingSuccess" />
    <ModalsCheckCode  v-if="modalStore.checkCode" />
    <ModalsAuthorizationSuccess  v-if="modalStore.authSuccess" />
    <ModalsPay  v-if="modalStore.paidModal" />
    <ModalsPayCompleted  v-if="modalStore.modalsPayCompleted" />
    <ModalsPaidNotSuccess  v-if="modalStore.paidNotSuccess" />
    <ModalsPaymentWithBonus  v-if="modalStore.paymentWithBonus" />
    <ModalsQr  v-if="modalStore.qrModal" />
    <ModalsPreloader  v-if="modalStore.preloader" />
    <Header/>
    <slot />
    <Footer/>
  </div>
</template>

<style lang="scss">
.default {
display: flex;
flex-direction: column;

&__main {
flex: 1 1 auto;
}
}
</style>