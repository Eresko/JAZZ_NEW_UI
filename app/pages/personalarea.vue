<script setup lang="ts">
import { ref,defineEmits,reactive,watch,onMounted } from 'vue'
import { useAutorizationStore } from '@/store/autorization'
import { useProfileStore } from '@/store/profile'
import { useCardsStore } from '@/store/cards'
import { useOptionsStore } from '@/store/options'
import { useTicketStore } from '@/store/tickets'
const autorizationStore = useAutorizationStore();
const cardsStore = useCardsStore();
const profileStore = useProfileStore();
const optionsStore = useOptionsStore();
const ticketStore = useTicketStore()
const selectChapter = ref();
const profile = ref();
const historyReservation = ref();
const countPageReservation = ref();
const widthScreenPersonalArea = ref();

onMounted(async () => {
  profileStore.FETCH_PROFILE()
  await cardsStore.FETCH_CARDS()
  let query = {
    "currentPageReservation" : 1,
    "search": ''
  }
  ticketStore.FETCH_TICKETS(query)
  if (!optionsStore.myTickets) {
    await optionsStore.SET_MY_CARD(true)
  }
})
watch(
    optionsStore.myCard,  // <-- важно, чтобы не было () => myCards
    (newVal) => {
      console.log("MY myCard:", newVal)
    },
    { immediate: true }
)

</script>
<template>
  <div>
    <Main type="black">
      <ProfilePersonalArea />
      <ProfileMyTickets v-if="optionsStore.myTickets"  >
        <ProfileHistoryControl  :history-reservation="historyReservation" :count-page-reservation="countPageReservation" v-if="countPageReservation> 1"/>
      </ProfileMyTickets>

      <ProfileMyCards  v-if="optionsStore.myCard === true" >
        <ProfileHistoryControl />
      </ProfileMyCards>

      <Profile v-if="optionsStore.myProfile" :profile="profile" :flag="flagProfileUpdate" @setUpdateProfile="setUpdateProfile"/>

      <ProfileComplaints v-if="optionsStore.complaint"/>
      <BackLink v-if="!widthScreenPersonalArea" class="backLinkPersonalarea" type="white" />
    </Main>
  </div>
</template>


<style>
.backLinkPersonalarea {
  @media(max-width: 725px) {
    display: none!important;
  }
}
</style>