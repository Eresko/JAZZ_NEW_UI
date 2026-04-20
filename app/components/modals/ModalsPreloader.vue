<script setup lang="ts">
import { reactive, watchEffect, watch, computed, ref } from 'vue'
import { useModalStore } from '@/store/modals'
import { useOptionsStore } from '@/store/options'
const modalStore = useModalStore();
const optionsStore = useOptionsStore()



</script>
<template>
  <div class="preloader">
    <div class="loader"></div>
  </div>
</template>



<style lang="scss" scoped>
.preloader {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader {
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  /* Добавим эффект хлопка: */
  box-shadow: 0 0 20px #333;
}

/* Анимация вращения */
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
