<script setup lang="ts">
import { ref,onMounted } from 'vue'
import { useScheduleStore  } from '@/store/schedule'

const scheduleStore  = useScheduleStore();
const schedule = ref();
onMounted( async () => {
  await scheduleStore.FETCH_SCHEDULE()
  schedule.value = await scheduleStore.GET_FETCH_SCHEDULE
});


</script>

<template>
  <div>
    <Main>
      <ScheduleTable :schedule="schedule" v-if="schedule?.length" />
      <BackLink class="backLinkSchedule"/>
    </Main>
  </div>
</template>


<style lang="scss">
.backLinkSchedule {
  @media(max-width: 725px) {
    display: none!important;
  }
}
</style>