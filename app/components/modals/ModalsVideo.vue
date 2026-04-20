<script setup lang="ts">
import { ref,onMounted,reactive,defineProps,computed } from 'vue'
import { useModalStore } from '@/store/modals'
import { useCurrentFilmStore } from '@/store/currentFilms'

const modalStore = useModalStore()
const currentFilmsStore = useCurrentFilmStore();
const film = computed(() => currentFilmsStore.GET_CURRENT_FILM)
const close = () => {
  modalStore.TOGGLE_VIDEO_MODAL()
}
onMounted(async () => {
  console.log("START VIDEO")

})

const setFrame =() => {
  if (modalStore.video == true) {
    let vid = document.getElementById("videoFrame");
    let self = this;
    vid.onended = function() {
      self.notActive()
    };
  }
}
</script>



<template>
  <section >
    <div class="video">
      <div class="black" @click="close">
      </div>
      <video class="video_frame"  id="videoFrame"  controls="controls" autoplay="">
        <source id="vid" :src="film.trailer" type="video/mp4"  codecs="theora, vorbis" >
      </video>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.black {
  opacity: 0.4;
  background: #070707;
  z-index: 9;
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
}
.video {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  align-items: center;
  z-index: 8;
}
.video_frame {
  justify-content: center;
  z-index: 10;
  position: absolute;
  width: 100%;

}

</style>