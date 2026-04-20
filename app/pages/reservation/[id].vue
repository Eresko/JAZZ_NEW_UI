<script setup lang="ts">
import { ref,onMounted,reactive,computed,watchEffect,watch } from 'vue'
import { useHallPlanStore  } from '@/store/hallPlan'

import { useCurrentScheduleStore  } from '@/store/currentSchedule'
import { useStatusPerformanceStore  } from '@/store/statusPerformance'
import { useAutorizationStore  } from '@/store/autorization'
import { useSelectedSeatStore } from '@/store/selectedSeat'
import { useReservationStore } from '@/store/reservation'
import { usePrivelegePerformanceStore } from '@/store/privelege'
import { useCardsStore } from '@/store/cards'
import { useRoute } from 'vue-router' // Для получения параметров маршрута
const route = useRoute(); // Используем для получения параметра id из URL
const hallPlanStore  = useHallPlanStore();
const currentScheduleStore  = useCurrentScheduleStore();
const statusPerformanceStore  = useStatusPerformanceStore();
const autorizationStore  = useAutorizationStore();
const selectedSeatStore  = useSelectedSeatStore();
const reservationStore = useReservationStore();
const privelegePerformanceStore = usePrivelegePerformanceStore();
const cardsStore = useCardsStore();


interface SchemeHall {
  maxX: object[];
  maxY: object[];
  statusPerformance: number
  numberHall: number
}
const schemeHall:SchemeHall = reactive({maxX:[],maxY:[],statusPerformance:0,numberHall:0,performanceId:0,filmName:"",date:""})

onMounted( async () => {
  cardsStore.FETCH_CARDS()
  film.StructureElementID = 0;
  film.id = route.params.id as string;
  schemeHall.performanceId = film.id
  await hallPlanStore.FETCH_PLAN(film.id)
  await privelegePerformanceStore.FETCH_PRIVELETE_PERFORMANCE()
  await currentScheduleStore.FETCH_CURRENT_SCHEDULE(film.id)
});

const film = reactive({StructureElementID:null,price:0,name:"",date:"",nameHall:"",id:0});
const flag = ref(0);
const statusRequestPlan = ref(false)
const modalNotSuccess = ref(false)
const statusPerformance = ref([])
const selectedSeat = ref([])

const scheme = computed(() => {
  statusRequestPlan.value = true
  return hallPlanStore.hallPlan;
})
const schedule = computed(() => {
  film.StructureElementID = currentScheduleStore.schedule.StructureElementID
  return currentScheduleStore.schedule;
})
const hall = computed(() => {
  return  film.StructureElementID;
})
watch(() => hallPlanStore.hallPlan, (newVal, oldVal) => {
  start()
});
watch(() => film.StructureElementID, (newVal, oldVal) => {
  getStatusPerformance()
});
watch(() => reservationStore.status, (newVal, oldVal) => {
  updateStatus()
});

watchEffect(() => {
  if (currentScheduleStore.GET_FETCH_CURRENT_SCHEDULE) {
    schemeHall.numberHall = parseInt(currentScheduleStore.GET_FETCH_CURRENT_SCHEDULE?.zal);
  }
  if (selectedSeatStore.GET_SELECTED_COUNT(film.id)) {

  }
})
const selected = (x,y) => {
  schemeHall.maxY[x][y].select = !schemeHall.maxY[x][y].select
}
const getStatusPerformance = async () => {
  await statusPerformanceStore.FETCH_STATUS_PERFORMANCE3(film.id);
  schemeHall.statusPerformance = statusPerformanceStore.GET_STATUS_PERFORMANCE;
}

const updateStatus = async () => {
  console.log("UPDATE STATUS")
  await getStatusPerformance()
  let move = schemeHall.maxY;
  schemeHall.statusPerformance = statusPerformanceStore.GET_STATUS_PERFORMANCE
  statusPerformanceStore.GET_STATUS_PERFORMANCE.forEach(val => {
    move.forEach(va1 => {
      const match = va1.find(va2 => parseInt(va2.id) === parseInt(val.id));
      if (match) {
        match.status = val.status;
      }
    });
  });
  schemeHall.maxY = move;
  let selectSeat =  selectedSeatStore.GET_SELECTED_SEATS_BY_PERFORMANCE(film.id)
  let seatIds = selectSeat.map(seat => parseInt(seat.item.id));
  schemeHall.maxY.map(item => {
    item.map(itemElement => {
      if (seatIds.includes(parseInt(itemElement.id))) {
        itemElement.select = true;
      }
      else {
        itemElement.select = false;
      }

    })

  })

}
const start = () => {
  let maxX = 0;
  let maxY = 0;
  scheme.value.scheme?.forEach(function (val, key) {
        if (maxX < parseInt(val['gr_x'])) {
          maxX = parseInt(val['gr_x']);
        }
        if (maxY < parseInt(val['gr_y'])) {
          maxY = parseInt(val['gr_y']);
        }
      }
  );
  let row = [];
  for (let a = 0; a < maxY; a++) {
    row[a] = []
    for (let b = 0; b < maxX; b++) {
      row[a][b] = {status: 0, label: 0, id: 0, select: false}
    }
  }
  schemeHall.maxX = [];
  schemeHall.maxY = [];

  scheme.value.scheme?.forEach(function (val, key) {
        row[parseInt(val['gr_y']) - 1][parseInt(val['gr_x']) - 1]['status'] = 1;
        row[parseInt(val['gr_y']) - 1][parseInt(val['gr_x']) - 1]['label'] = val['label'];
        row[parseInt(val['gr_y']) - 1][parseInt(val['gr_x']) - 1]['id'] = val['name'];
      }
  );
  schemeHall.maxY = row;
  updateStatus()
}
</script>


<template>
  <div>
    <GroupHalls>
      <PurchaseList :film="film"/>
      <HallDetail
          :scheme-hall="schemeHall"
          @selected="selected"
          @get-status-performance="getStatusPerformance"
      />
      <BackLink />
    </GroupHalls>
  </div>
</template>