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
    <Movies />
    <Main>
      <ScheduleTable :schedule="schedule"/>
    </Main>
  </div>
</template>



<style lang="scss" scoped>
html {

}

</style>




