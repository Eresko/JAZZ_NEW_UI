<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router' 
import { useCurrentFilmStore } from '@/store/currentFilms'

const currentFilmsStore = useCurrentFilmStore();
const route = useRoute();
const film = ref<any>(null);
const schedule = ref<any>([]);
const showFrameVideo = ref(false);
onMounted(async () => {
  const filmId = route.params.id as string;
  await currentFilmsStore.GET_FILM_BY_ID(Number(filmId));
  film.value = await currentFilmsStore.GET_CURRENT_FILM;
  schedule.value = await currentFilmsStore.GET_CURRENT_FILM_SCHEDULE
});
import { useRouter } from 'vue-router'
const router = useRouter()
const showMove = () => {
  if (showFrameVideo.value == false) {
    document.body.style.overflow='hidden';
  }
  else {
    document.body.style.overflow='auto';
  }
  showFrameVideo.value = !showFrameVideo.value;
}
const goTo =() => {
  router.push('/films');
}

</script>


<template>
  <div>
<!--    <Video :dataFilm="film" :active="showFrameVideo" @showMove="showMove"></Video>-->
    <Main>
      <MovieDetails :data-film="film"  @showMove="showMove" v-if="typeof film != 'undefined'"/>
      <ScheduleTable :schedule="schedule" v-if="schedule?.length" class="moviedetailsSchedule"/>
      <BackLink url="/films" />
    </Main>
  </div>
</template>
<style lang="scss">
.moviedetailsSchedule.schedule  {
  &::before {
    @media (max-width: 725px) {
      display: none!important;
    }
  }

  & .schedule__table {
    &::before {
      @media (max-width: 725px) {
        display: none!important;
      }
    }

    &-text {
      @media (max-width: 725px) {
        padding: 0 10px!important;
        //width: 260px !important;
        font-size: 11px !important;
        line-height: 16px !important;
        text-align: left!important;
        background: #fff !important;
      }

      @media (max-width: 320px) {
        width: 260px !important;
      }

      & br {
        @media (max-width: 725px) {
          display: none !important;
        }
      }
    }

    &-calendar {
      @media (max-width: 725px) {
        padding-top: 32px!important;
      }
    }
  }
}
</style>