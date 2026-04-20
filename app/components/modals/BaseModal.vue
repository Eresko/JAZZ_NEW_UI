<script setup lang="ts">
import { defineProps, defineEmits,watch,onUnmounted } from 'vue'

const props = defineProps({
  show: Boolean,
  title: String,
  width: {
    type: String,
    default: '500px'
  }
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
watch(() => props.show, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})
onUnmounted(() => {
  document.body.style.overflow = ''
})

</script>

<template>
  <transition name="modal-fade" appear>
    <div v-if="show" class="modals__overlay" @click.self="close">
      <div class="modals modal-reserv" :style="{ width: props.width }">
        <span class="close" @click="close"></span>
        <h2 class="modals__title">{{ title }}</h2>
        <slot />
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
/* Overlay */
.modals__layout2 {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(3px);
  align-items: center;
  z-index: 10;
  top: -600px;
  left: 0;
  right: 0;
  bottom: 0;
  height: 200%;
  @media (max-width: 525px) {
    top: -400px;
  }
}
.modals__overlay {
  position: fixed;
  inset: 0; /* занимает весь экран */
  display: flex;
  justify-content: center; /* по горизонтали */
  align-items: center;    /* по вертикали */
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(3px);
  z-index: 10;
}
.modals {
  top: unset !important;
  left: unset !important;
  transform: none !important;
  position: static !important;
}
/* Modal box */
.modal-reserv {
  padding: 34px 45px 60px 45px;
  background: #1c1c1c;
  border-radius: 12px;
  position: relative;
  max-width: 100%;

  @media (max-width: 525px) {
    width: calc(100% - 10%);
    max-width: calc(100% - 10%);
  }
}

.modals__title {
  margin-bottom: 40px;
}

/* Transition */
.modal-fade-enter-active,
.modal-fade-leave-active,
.modal-fade-appear-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to,
.modal-fade-appear-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95); /* плавное появление сверху */
}

.modal-fade-enter-to,
.modal-fade-leave-from,
.modal-fade-appear-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>